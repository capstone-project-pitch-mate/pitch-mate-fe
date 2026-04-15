import { Camera, Circle, Square } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@shared/ui";
import { formatDuration } from "@utils/formatter";

interface VideoRecordSectionProps {
  previewUrl: string | null;
  handleCompleteRecording: (file: File) => void;
}

const RECORDING_MIME_TYPES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

const getRecordingMimeType = () => {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }

  return (
    RECORDING_MIME_TYPES.find((mimeType) =>
      MediaRecorder.isTypeSupported(mimeType),
    ) ?? ""
  );
};

const getRecordingExtension = (mimeType: string) => {
  if (mimeType.includes("mp4")) {
    return "mp4";
  }

  return "webm";
};

export default function VideoRecordSection({
  previewUrl,
  handleCompleteRecording,
}: VideoRecordSectionProps) {
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const ignoreStopEventRef = useRef(false);
  const recordingStartAtRef = useRef<number | null>(null);

  const [isPreparing, setIsPreparing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasLivePreview, setHasLivePreview] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [elapsedRecordingSeconds, setElapsedRecordingSeconds] = useState(0);

  const attachStreamToVideo = useCallback(async (stream: MediaStream) => {
    const videoElement = liveVideoRef.current;

    if (!videoElement) {
      return;
    }

    if (videoElement.srcObject !== stream) {
      videoElement.srcObject = stream;
    }

    try {
      await videoElement.play();
    } catch {
      // Autoplay can fail temporarily depending on browser policies.
    }
  }, []);

  const stopStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }

    if (liveVideoRef.current) {
      liveVideoRef.current.srcObject = null;
    }
    setHasLivePreview(false);
  }, []);

  const startPreview = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera is not supported in this browser.");
      return null;
    }

    if (mediaStreamRef.current) {
      setHasLivePreview(true);
      setCameraError(null);
      void attachStreamToVideo(mediaStreamRef.current);
      return mediaStreamRef.current;
    }

    try {
      setIsPreparing(true);
      setCameraError(null);

      let stream: MediaStream | null = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      if (stream.getVideoTracks().length === 0) {
        throw new Error("No video track available.");
      }

      mediaStreamRef.current = stream;
      setHasLivePreview(true);
      await attachStreamToVideo(stream);
      return stream;
    } catch {
      setCameraError(
        "Unable to access camera. Check browser/OS camera permissions.",
      );
      stopStream();
      return null;
    } finally {
      setIsPreparing(false);
    }
  }, [attachStreamToVideo, stopStream]);

  const handleStartRecording = async () => {
    if (isPreparing) {
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      setCameraError("Recording is not supported in this browser.");
      return;
    }

    const stream = await startPreview();

    if (!stream) {
      return;
    }

    try {
      const mimeType = getRecordingMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recordedChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (ignoreStopEventRef.current) {
          ignoreStopEventRef.current = false;
          recordedChunksRef.current = [];
          stopStream();
          recordingStartAtRef.current = null;
          setElapsedRecordingSeconds(0);
          setIsRecording(false);
          mediaRecorderRef.current = null;
          return;
        }

        const blobType = recorder.mimeType || "video/webm";
        const recordedBlob = new Blob(recordedChunksRef.current, {
          type: blobType,
        });

        const extension = getRecordingExtension(blobType);
        const recordedFile = new File(
          [recordedBlob],
          `recorded-${Date.now()}.${extension}`,
          {
            type: blobType,
          },
        );

        handleCompleteRecording(recordedFile);
        recordedChunksRef.current = [];
        stopStream();
        recordingStartAtRef.current = null;
        setElapsedRecordingSeconds(0);
        setIsRecording(false);
        mediaRecorderRef.current = null;
      };

      recorder.start();
      recordingStartAtRef.current = Date.now();
      setElapsedRecordingSeconds(0);
      setIsRecording(true);
    } catch {
      setCameraError("Failed to start recording.");
      stopStream();
      recordingStartAtRef.current = null;
      setElapsedRecordingSeconds(0);
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder || recorder.state === "inactive") {
      stopStream();
      recordingStartAtRef.current = null;
      setElapsedRecordingSeconds(0);
      setIsRecording(false);
      return;
    }

    recorder.stop();
    recordingStartAtRef.current = null;
    setElapsedRecordingSeconds(0);
    setIsRecording(false);
  };

  useEffect(() => {
    if (!isRecording) {
      setElapsedRecordingSeconds(0);
      return;
    }

    const updateElapsedSeconds = () => {
      if (!recordingStartAtRef.current) {
        return;
      }

      const seconds = Math.floor(
        (Date.now() - recordingStartAtRef.current) / 1000,
      );
      setElapsedRecordingSeconds(seconds);
    };

    updateElapsedSeconds();
    const intervalId = window.setInterval(updateElapsedSeconds, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!hasLivePreview || !mediaStreamRef.current) {
      return;
    }

    void attachStreamToVideo(mediaStreamRef.current);
  }, [attachStreamToVideo, hasLivePreview, isPreparing, isRecording]);

  useEffect(() => {
    void startPreview();

    return () => {
      const recorder = mediaRecorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        ignoreStopEventRef.current = true;
        recorder.stop();
      } else {
        stopStream();
      }
    };
  }, [startPreview, stopStream]);

  const isLivePreviewVisible = isPreparing || isRecording || hasLivePreview;
  const buttonText = isPreparing
    ? "준비중..."
    : isRecording
      ? "녹화 중지"
      : previewUrl
        ? "다시 녹화하기"
        : "녹화 시작";

  return (
    <div className="flex flex-col items-center gap-10 rounded-3xl bg-[#F5F5FA] p-10">
      <div className="flex aspect-video w-full flex-1 items-center justify-center rounded-3xl border-3 border-[rgba(0,0,0,0.08)] bg-[rgba(26,26,46,0.05)] p-4 text-[#71718A]">
        {isLivePreviewVisible ? (
          <div className="relative aspect-video w-full">
            <video
              ref={liveVideoRef}
              className="aspect-video w-full rounded-2xl object-cover"
              autoPlay
              muted
              playsInline
            />
            {isRecording && (
              <div className="absolute top-4 left-4 flex flex-row items-center gap-2 rounded-full bg-[rgba(0,0,0,0.65)] px-3 py-1.5">
                <Circle
                  color="#FB2C36"
                  fill="#FB2C36"
                  className="animate-pulse"
                  size={12}
                />
                <span className="font-semibold text-white">
                  {formatDuration(elapsedRecordingSeconds)}
                </span>
              </div>
            )}
          </div>
        ) : previewUrl ? (
          <video
            className="aspect-video w-full rounded-2xl object-contain"
            src={previewUrl}
            controls
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Camera size={45} />
            <span className="text-2xl font-bold">Camera Preview</span>
          </div>
        )}
      </div>

      {cameraError && <p className="text-lg text-[#FF6B6B]">{cameraError}</p>}

      <Button
        handleClick={isRecording ? handleStopRecording : handleStartRecording}
        disabled={isPreparing}
      >
        <span className="flex items-center gap-3 pr-3 pl-3 text-xl font-bold">
          {isRecording && <Square size={18} />}
          {buttonText}
        </span>
      </Button>
    </div>
  );
}
