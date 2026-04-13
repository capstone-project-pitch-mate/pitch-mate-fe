import { Upload, Camera } from "lucide-react";

import { Button } from "@shared/ui";

interface UploadTopContentProps {
  uploadType: "UPLOAD" | "RECORD";
  handleChangeUploadType: (type: "UPLOAD" | "RECORD") => void;
}

export default function UploadTopContent({
  uploadType,
  handleChangeUploadType,
}: UploadTopContentProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-4xl leading-14 font-medium">영상 업로드</h1>
        <p className="text-2xl leading-9 text-[#71718A]">
          발표 또는 면접 연습 영상을 업로드하거나 직접 녹화하세요
        </p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <Button
          color={uploadType === "UPLOAD" ? "primary" : "secondary"}
          handleClick={() => handleChangeUploadType("UPLOAD")}
        >
          <div className="flex flex-row items-center gap-2.5">
            <Upload size={20} />
            <span className="text-xl font-semibold">파일 업로드</span>
          </div>
        </Button>
        <Button
          color={uploadType === "RECORD" ? "primary" : "secondary"}
          handleClick={() => handleChangeUploadType("RECORD")}
        >
          <div className="flex flex-row items-center gap-2.5">
            <Camera size={20} />
            <span className="text-xl font-semibold">웹캠 녹화</span>
          </div>
        </Button>
      </div>
    </>
  );
}
