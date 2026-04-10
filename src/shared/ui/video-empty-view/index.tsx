import { useNavigate } from "react-router-dom";

import IcUploadWhite from "@assets/icon/ic_upload_white.svg";
import IcOverviewTotal from "@assets/icon/ic_overview_total.svg";

import Button from "../button";

export default function VideoEmptyView() {
  const navigate = useNavigate();
  const handleToUpload = () => {
    navigate("/video-upload");
  };

  return (
    <div className="flex min-h-150 flex-1 flex-col items-center justify-center gap-12">
      <img className="h-30 w-30" src={IcOverviewTotal} alt="총 연습 영상" />
      <div className="flex flex-col items-center gap-3">
        <span className="text-3xl leading-10 font-medium text-[#1A1A2E]">
          아직 업로드된 영상이 없어요
        </span>
        <p className="text-xl leading-9 text-[#71718A]">
          첫 발표 영상을 업로드하면 AI가 상세한 피드백과 평가를 제공해드려요.
          지금 바로 시작해보세요!
        </p>
      </div>
      <Button size="lg" handleClick={handleToUpload}>
        <div className="flex flex-row items-center gap-2.5">
          <img src={IcUploadWhite} aria-hidden="true" />
          <span className="text-xl leading-8 font-medium text-white">
            첫 영상 업로드하기
          </span>
        </div>
      </Button>
    </div>
  );
}
