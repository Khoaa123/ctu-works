import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/job-search/${searchQuery}`);
    }
  };
  return (
    <>
      <div className="container mb-12 flex flex-wrap items-center justify-center gap-3 bg-[#F6FAFB] py-12">
        <Select>
          <SelectTrigger className="w-[200px] bg-white py-5 shadow-none focus:ring-0">
            <SelectValue placeholder="Tất cả địa điểm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hanoi">Hà Nội</SelectItem>
            <SelectItem value="hochiminh">Thành phố Hồ Chí Minh</SelectItem>
            <SelectItem value="cantho">Cần Thơ</SelectItem>
          </SelectContent>
        </Select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm việc làm..."
          className="w-full max-w-lg rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </div>
    </>
  );
};

export default Search;
