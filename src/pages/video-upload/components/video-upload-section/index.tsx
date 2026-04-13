import { Upload } from "lucide-react";
import { useRef, type ChangeEvent, type DragEvent } from "react";

import { Button } from "@shared/ui";

interface VideoUploadSectionProps {
  previewUrl: string | null;
  handleSelectFile: (file: File) => void;
}

export default function VideoUploadSection({
  previewUrl,
  handleSelectFile,
}: VideoUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    handleSelectFile(file);
    e.target.value = "";
  };

  const handleDropFile = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    handleSelectFile(file);
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex aspect-video w-full flex-col items-center justify-center gap-10 rounded-3xl border-3 border-dashed border-[rgba(104,104,255,0.30)] bg-[rgba(104,104,255,0.05)] p-6"
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDrop={handleDropFile}
      >
        {previewUrl ? (
          <video
            className="h-full w-full rounded-2xl object-contain"
            src={previewUrl}
            controls
          />
        ) : (
          <>
            <div className="flex h-25 w-25 items-center justify-center rounded-3xl bg-[rgba(104,104,255,0.10)]">
              <Upload color="#6868FF" size={45} />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-2xl leading-9 font-bold">
                영상 파일을 드래그하거나 아래 버튼을 클릭해 업로드하세요
              </p>
              <p className="text-xl leading-8 font-semibold text-[#71718A]">
                MP4, MOV, AVI, WEBM (최대 500MB)
              </p>
            </div>
            <Button size="lg" color="secondary" handleClick={openFileDialog}>
              <span className="text-xl font-bold">파일 선택</span>
            </Button>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".mp4,.mov,.avi,.webm,video/mp4,video/quicktime,video/x-msvideo,video/webm"
        className="hidden"
        onChange={handleChangeFile}
      />
    </div>
  );
}
