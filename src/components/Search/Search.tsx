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
      router.push(`/job-search/keyword=${searchQuery}`);
<<<<<<< Updated upstream
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e);
=======
>>>>>>> Stashed changes
    }
  };
  return (
    <>
      <div className="mb-12 flex items-center justify-center gap-3 bg-[#F6FAFB] py-12">
        {/* <Select>
          <SelectTrigger className="w-[200px] bg-white py-5 shadow-none focus:ring-0">
            <SelectValue placeholder="Tất cả địa điểm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Quốc tế">Quốc tế</SelectItem>
            <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
            <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
            <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
            <SelectItem value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</SelectItem>
            <SelectItem value="An Giang">An Giang</SelectItem>
            <SelectItem value="Bắc Kạn">Bắc Kạn</SelectItem>
            <SelectItem value="Bắc Giang">Bắc Giang</SelectItem>
            <SelectItem value="Bạc Liêu">Bạc Liêu</SelectItem>
            <SelectItem value="Bắc Ninh">Bắc Ninh</SelectItem>
            <SelectItem value="Bến Tre">Bến Tre</SelectItem>
            <SelectItem value="Bình Định">Bình Định</SelectItem>
            <SelectItem value="Bình Dương">Bình Dương</SelectItem>
            <SelectItem value="Bình Phước">Bình Phước</SelectItem>
            <SelectItem value="Bình Thuận">Bình Thuận</SelectItem>
            <SelectItem value="Cà Mau">Cà Mau</SelectItem>
            <SelectItem value="Cao Bằng">Cao Bằng</SelectItem>
            <SelectItem value="Đắk Nông">Đắk Nông</SelectItem>
            <SelectItem value="Đắk Lắk">Đắk Lắk</SelectItem>
            <SelectItem value="ĐBSCL">ĐBSCL</SelectItem>
            <SelectItem value="Điện Biên">Điện Biên</SelectItem>
            <SelectItem value="Đồng Nai">Đồng Nai</SelectItem>
            <SelectItem value="Đồng Tháp">Đồng Tháp</SelectItem>
            <SelectItem value="Gia Lai">Gia Lai</SelectItem>
            <SelectItem value="Hà Giang">Hà Giang</SelectItem>
            <SelectItem value="Hà Nam">Hà Nam</SelectItem>
            <SelectItem value="Hà Tĩnh">Hà Tĩnh</SelectItem>
            <SelectItem value="Hải Dương">Hải Dương</SelectItem>
            <SelectItem value="Hậu Giang">Hậu Giang</SelectItem>
            <SelectItem value="Hòa Bình">Hòa Bình</SelectItem>
            <SelectItem value="Hưng Yên">Hưng Yên</SelectItem>
            <SelectItem value="Khánh Hòa">Khánh Hòa</SelectItem>
            <SelectItem value="Kon Tum">Kon Tum</SelectItem>
            <SelectItem value="Lai Châu">Lai Châu</SelectItem>
            <SelectItem value="Lâm Đồng">Lâm Đồng</SelectItem>
            <SelectItem value="Lạng Sơn">Lạng Sơn</SelectItem>
            <SelectItem value="Lào Cai">Lào Cai</SelectItem>
            <SelectItem value="Long An">Long An</SelectItem>
            <SelectItem value="Nam Định">Nam Định</SelectItem>
            <SelectItem value="Nghệ An">Nghệ An</SelectItem>
            <SelectItem value="Ninh Bình">Ninh Bình</SelectItem>
            <SelectItem value="Ninh Thuận">Ninh Thuận</SelectItem>
            <SelectItem value="Phú Thọ">Phú Thọ</SelectItem>
            <SelectItem value="Phú Yên">Phú Yên</SelectItem>
            <SelectItem value="Quảng Bình">Quảng Bình</SelectItem>
            <SelectItem value="Quảng Nam">Quảng Nam</SelectItem>
            <SelectItem value="Quảng Ngãi">Quảng Ngãi</SelectItem>
            <SelectItem value="Quảng Ninh">Quảng Ninh</SelectItem>
            <SelectItem value="Quảng Trị">Quảng Trị</SelectItem>
            <SelectItem value="Sóc Trăng">Sóc Trăng</SelectItem>
            <SelectItem value="Sơn La">Sơn La</SelectItem>
            <SelectItem value="Tây Ninh">Tây Ninh</SelectItem>
            <SelectItem value="Thái Bình">Thái Bình</SelectItem>
            <SelectItem value="Thái Nguyên">Thái Nguyên</SelectItem>
            <SelectItem value="Thanh Hóa">Thanh Hóa</SelectItem>
            <SelectItem value="Thừa Thiên Huế">Thừa Thiên Huế</SelectItem>
            <SelectItem value="Tiền Giang">Tiền Giang</SelectItem>
            <SelectItem value="Trà Vinh">Trà Vinh</SelectItem>
            <SelectItem value="Tuyên Quang">Tuyên Quang</SelectItem>
            <SelectItem value="Kiên Giang">Kiên Giang</SelectItem>
            <SelectItem value="Vĩnh Long">Vĩnh Long</SelectItem>
            <SelectItem value="Vĩnh Phúc">Vĩnh Phúc</SelectItem>
            <SelectItem value="Yên Bái">Yên Bái</SelectItem>
            <SelectItem value="Khác">Khác</SelectItem>
          </SelectContent>
        </Select> */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
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
