import { Button } from "@shared/ui";

export default function UploadFooter() {
  return (
    <div className="flex flex-row items-center justify-end gap-5">
      <Button color="secondary">
        <div className="flex flex-row items-center gap-2.5 pr-3 pl-3">
          <span className="text-xl font-bold">초기화</span>
        </div>
      </Button>
      <Button>
        <div className="flex flex-row items-center gap-2.5 pr-8 pl-8">
          <span className="text-xl font-bold">업로드</span>
        </div>
      </Button>
    </div>
  );
}
