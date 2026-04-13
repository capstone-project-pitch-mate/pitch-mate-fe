import { Camera } from "lucide-react";

import { Button } from "@shared/ui";

export default function VideoRecordSection() {
  return (
    <div className="flex flex-col items-center gap-10 rounded-3xl bg-[#F5F5FA] p-10">
      <div className="flex aspect-video w-full flex-1 flex-col items-center justify-center gap-3 rounded-3xl border-3 border-[rgba(0,0,0,0.08)] bg-[rgba(26,26,46,0.05)] text-[#71718A]">
        <Camera size={45} />
        <span className="text-2xl font-bold">웹캠 미리보기</span>
      </div>
      <Button>
        <span className="pr-3 pl-3 text-xl font-bold">녹화 시작</span>
      </Button>
    </div>
  );
}
