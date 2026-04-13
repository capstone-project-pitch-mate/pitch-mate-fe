import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  handleChangeSearch: (text: string) => void;
}

export default function SearchBar({
  search,
  handleChangeSearch,
}: SearchBarProps) {
  return (
    <div className="sticky top-0 flex h-22 w-full items-center border-b border-[rgba(0,0,0,0.08)] bg-white pr-9 pl-9">
      <div className="flex h-14 w-full max-w-150 min-w-100 flex-row items-center gap-3 rounded-xl bg-[#F5F5FA] pr-4 pl-4">
        <Search color="#71718A" />
        <input
          className="w-full text-xl placeholder:text-[#71718A]"
          type="search"
          placeholder="영상 검색..."
          value={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
