import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Search = () => {
  return (
    <>
      <div className="my-16 flex items-center justify-center gap-3">
        <Select>
          <SelectTrigger className="w-[200px] py-5 shadow-none focus:ring-0">
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
          placeholder="Tìm kiếm việc làm..."
          className="w-full max-w-lg rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
          Tìm kiếm
        </button>
      </div>
    </>
  );
};

export default Search;
