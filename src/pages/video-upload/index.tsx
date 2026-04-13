import { useState } from "react";

import {
  UploadFooter,
  UploadTopContent,
  VideoDescSection,
  VideoRecordSection,
  VideoUploadSection,
} from "./components";

export default function VideoUpload() {
  const [uploadType, setUploadType] = useState<"UPLOAD" | "RECORD">("UPLOAD");

  const handleChangeUploadType = (type: "UPLOAD" | "RECORD") => {
    setUploadType(type);
  };

  return (
    <div className="flex flex-1 justify-center p-9 pb-50">
      <div className="flex max-w-300 min-w-250 flex-1 flex-col gap-9">
        <UploadTopContent
          uploadType={uploadType}
          handleChangeUploadType={handleChangeUploadType}
        />
        {uploadType === "UPLOAD" ? (
          <VideoUploadSection />
        ) : (
          <VideoRecordSection />
        )}
        <VideoDescSection />
        <UploadFooter />
      </div>
    </div>
  );
}
