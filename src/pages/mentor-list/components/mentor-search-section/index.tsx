import { Search } from "lucide-react";

import type { Mentor } from "../../types";
import MentorCard from "../mentor-card";

interface MentorSearchSectionProps {
  search: string;
  hasSearched: boolean;
  filteredMentors: Mentor[];
  handleChangeSearch: (value: string) => void;
  handleRequestMentor: (mentorId: number) => void;
}

export default function MentorSearchSection({
  search,
  hasSearched,
  filteredMentors,
  handleChangeSearch,
  handleRequestMentor,
}: MentorSearchSectionProps) {
  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0_2px_5px_0_rgba(0,0,0,0.10),0_2px_3px_-2px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl leading-10 font-semibold">멘토 검색 및 신청</h2>
        <p className="text-xl leading-8 text-[#71718A]">
          닉네임을 입력하면 일치하는 멘토만 표시됩니다.
        </p>
      </div>

      <div className="flex h-15 w-full max-w-170 flex-row items-center gap-3 rounded-xl bg-[#F5F5FA] px-5">
        <Search color="#71718A" />
        <input
          className="w-full text-xl placeholder:text-[#71718A]"
          type="search"
          placeholder="멘토 닉네임 검색"
          value={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
      </div>

      {!hasSearched ? null : filteredMentors.length === 0 ? (
        <div className="flex min-h-36 items-center justify-center rounded-2xl bg-[#F5F5FA] text-xl text-[#71718A]">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              handleRequestMentor={handleRequestMentor}
            />
          ))}
        </div>
      )}
    </section>
  );
}
