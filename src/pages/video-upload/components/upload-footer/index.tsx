import { Button } from "@shared/ui";

interface UploadFooterProps {
  disabledToUpload: boolean;
  handleUpload: () => void;
  handleReset: () => void;
}

export default function UploadFooter({
  disabledToUpload,
  handleUpload,
  handleReset,
}: UploadFooterProps) {
  return (
    <div className="flex flex-row items-center justify-end gap-5">
      <Button color="secondary" handleClick={handleReset}>
        <div className="flex flex-row items-center gap-2.5 pr-3 pl-3">
          <span className="text-xl font-bold">초기화</span>
        </div>
      </Button>
      <Button handleClick={handleUpload} disabled={disabledToUpload}>
        <div className="flex flex-row items-center gap-2.5 pr-8 pl-8">
          <span className="text-xl font-bold">업로드</span>
        </div>
      </Button>
    </div>
  );
}
