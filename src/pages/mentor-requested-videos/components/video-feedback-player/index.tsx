import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
} from "lucide-react";

import { cn } from "@utils/cn";
import { formatDuration } from "@utils/formatter";

import type { SegmentCommentDraft } from "../../types";

interface VideoFeedbackPlayerProps {
  videoUrl: string;
  durationSeconds: number;
  draft: SegmentCommentDraft;
  handleChangeDraft: (draft: SegmentCommentDraft) => void;
}

export default function VideoFeedbackPlayer({
  videoUrl,
  durationSeconds,
  draft,
  handleChangeDraft,
}: VideoFeedbackPlayerProps) {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [timelineDurationSeconds, setTimelineDurationSeconds] =
    useState(durationSeconds);
  const [selectionMode, setSelectionMode] = useState(false);
  const [pendingStartTime, setPendingStartTime] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const progressPercent = (currentTime / timelineDurationSeconds) * 100;
  const selectedStartPercent =
    (Math.min(draft.startTimeSeconds, draft.endTimeSeconds) /
      timelineDurationSeconds) *
    100;
  const selectedWidthPercent =
    (Math.abs(draft.endTimeSeconds - draft.startTimeSeconds) /
      timelineDurationSeconds) *
    100;
  const pendingStartPercent =
    pendingStartTime === null
      ? 0
      : (pendingStartTime / timelineDurationSeconds) * 100;

  const getTimeFromTimelineClick = (
    event: MouseEvent<HTMLButtonElement>,
  ): number => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1,
    );

    return Math.round(clickPosition * timelineDurationSeconds);
  };

  const handleClickTimeline = (event: MouseEvent<HTMLButtonElement>) => {
    const selectedTime = getTimeFromTimelineClick(event);

    if (!selectionMode) {
      if (videoRef.current) {
        videoRef.current.currentTime = selectedTime;
      }
      setCurrentTime(selectedTime);
      return;
    }

    if (pendingStartTime === null) {
      setPendingStartTime(selectedTime);
      handleChangeDraft({
        ...draft,
        startTimeSeconds: selectedTime,
        endTimeSeconds: selectedTime,
      });
      return;
    }

    const startTimeSeconds = Math.min(pendingStartTime, selectedTime);
    const endTimeSeconds = Math.max(pendingStartTime, selectedTime);

    handleChangeDraft({
      ...draft,
      startTimeSeconds,
      endTimeSeconds,
    });
    setPendingStartTime(null);
  };

  const handleTogglePlay = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await videoRef.current.play();
      setIsPlaying(true);
      return;
    }

    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleMoveTime = (amount: number) => {
    if (!videoRef.current) return;

    const nextTime = Math.min(
      Math.max(videoRef.current.currentTime + amount, 0),
      timelineDurationSeconds,
    );
    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode((prev) => !prev);
    setPendingStartTime(null);
  };

  const handleRequestFullscreen = async () => {
    await playerRef.current?.requestFullscreen();
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl border-3 border-[rgba(0,0,0,0.08)] bg-[rgba(104,104,255,0.05)] p-7">
      <div
        ref={playerRef}
        className="relative overflow-hidden rounded-3xl bg-black"
      >
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black object-contain"
          src={videoUrl}
          onClick={handleTogglePlay}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(event) => {
            const videoDuration = event.currentTarget.duration;

            if (Number.isFinite(videoDuration)) {
              setTimelineDurationSeconds(Math.round(videoDuration));
            }
          }}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime)
          }
        />

        {/* ADDED_MENTOR_FEEDBACK_FLOW: timeline selection now lives inside the video player controls. */}
        <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-3 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.68)_38%,rgba(0,0,0,0.84)_100%)] px-4 pt-9 pb-3">
          <button
            className="relative h-3 rounded-full bg-[rgba(255,255,255,0.34)]"
            type="button"
            aria-label="동영상 타임라인"
            onClick={handleClickTimeline}
          >
            <span
              className="absolute top-0 left-0 h-full rounded-full bg-[rgba(255,255,255,0.38)]"
              style={{ width: `${progressPercent}%` }}
            />
            {draft.endTimeSeconds > draft.startTimeSeconds && (
              <span
                className="absolute top-0 h-full rounded-full bg-[#6868FF]"
                style={{
                  left: `${selectedStartPercent}%`,
                  width: `${selectedWidthPercent}%`,
                }}
              />
            )}
            {pendingStartTime !== null && (
              <span
                className="absolute -top-1.5 h-6 w-1.5 rounded-full bg-white"
                style={{ left: `${pendingStartPercent}%` }}
              />
            )}
            <span
              className="absolute -top-1.5 h-6 w-6 -translate-x-1/2 rounded-full border-3 border-white bg-[#6868FF] shadow-[0_2px_5px_0_rgba(0,0,0,0.25)]"
              style={{ left: `${progressPercent}%` }}
            />
          </button>

          <div className="flex flex-row items-center justify-between text-white">
            <div className="flex flex-row items-center gap-4">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.18)]"
                type="button"
                aria-label={isPlaying ? "일시정지" : "재생"}
                onClick={handleTogglePlay}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.14)]"
                type="button"
                aria-label="10초 뒤로"
                onClick={() => handleMoveTime(-10)}
              >
                <RotateCcw size={17} />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.14)]"
                type="button"
                aria-label="10초 앞으로"
                onClick={() => handleMoveTime(10)}
              >
                <RotateCw size={17} />
              </button>
              <span className="min-w-27 text-base font-semibold">
                {formatDuration(Math.floor(currentTime))} /{" "}
                {formatDuration(timelineDurationSeconds)}
              </span>
            </div>

            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm font-semibold">구간 선택</span>
                <button
                  className={cn(
                    "flex h-6 w-11 items-center rounded-full p-0.75 transition-colors",
                    selectionMode ? "bg-[#6868FF]" : "bg-[#D9D9E3]",
                  )}
                  type="button"
                  aria-label="구간 선택 토글"
                  aria-pressed={selectionMode}
                  onClick={handleToggleSelectionMode}
                >
                  <span
                    className={cn(
                      "h-4.5 w-4.5 rounded-full bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] transition-transform",
                      selectionMode ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
              </div>
              <Volume2 size={18} />
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.14)]"
                type="button"
                aria-label="전체 화면"
                onClick={handleRequestFullscreen}
              >
                <Maximize2 size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg leading-7 text-[#71718A]">
        구간 선택을 켜면 플레이어 하단 타임라인에서 첫 클릭은 시작점, 두 번째
        클릭은 종료점으로 저장됩니다. 꺼져 있을 때는 클릭한 시점으로 이동합니다.
      </p>
    </div>
  );
}
