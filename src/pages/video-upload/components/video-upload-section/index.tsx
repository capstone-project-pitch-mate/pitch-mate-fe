import { Upload } from "lucide-react";

import { Button } from "@shared/ui";

export default function VideoUploadSection() {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-10 rounded-3xl border-3 border-dashed border-[rgba(104,104,255,0.30)] bg-[rgba(104,104,255,0.05)]">
      <div className="flex h-25 w-25 items-center justify-center rounded-3xl bg-[rgba(104,104,255,0.10)]">
        <Upload color="#6868FF" size={45} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl leading-9 font-bold">
          영상 파일을 드래그하거나 클릭하여 업로드
        </p>
        <p className="text-xl leading-8 font-semibold text-[#71718A]">
          MP4, MOV, AVI (최대 500MB)
        </p>
      </div>
      <Button size="lg" color="secondary">
        <span className="text-xl font-bold">파일 선택</span>
      </Button>
    </div>
  );
}
