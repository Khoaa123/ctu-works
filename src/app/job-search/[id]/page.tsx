"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import nexon from "@images/nexon.png";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoFilterSharp, IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
const JobSearch = () => {
  const [isActive, setIsActive] = useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [jobData, setJobData] = useState<any[]>([]);
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const router = useRouter();

  useEffect(() => {
    const query = location.pathname.split("/job-search/")[1];
    const search = location.pathname.split("/job-search/keyword=")[1].split("&")[0]
    console.log(query,"asdadas")
    if (query) {
      setSearchQuery(decodeURIComponent(search));
      fetchSearchJob(query);
    }
    fetchSearhData();
  }, []);
  const createSearch = async (query: any) => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search-history/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          description: query,
        }),
      }
    );

    return res.json();
  };
  const fetchSearhData = () => { };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery) {
      createSearch(searchQuery);
      router.push(`/job-search/keyword=${searchQuery}`);
    }
  };

  const fetchSearchJob = async (query: any) => {
    const res = await fetch(
      `http://localhost:3001/api/search/search?${query}`
    );
    const data = await res.json();
    setJobData(data.data);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const [jobLevelFilter, setJobLevelFilter] = useState('')
  const [jobTypeFilter, setJobTypeFilter] = useState('')
  const handleSearchFilter = (e: any) => {
    e.preventDefault();
    const path = location.pathname.split("&")[0]
    // if (searchQuery) {
    createSearch(searchQuery);
    if (jobLevelFilter === "all" && jobTypeFilter === "all") {
      router.push(`${path}`);
    } else {
      if (jobLevelFilter !== "all" && jobTypeFilter !== "all") {
        router.push(`${path}&jobType=${jobTypeFilter}&jobLevel=${jobLevelFilter}`);
      } else {

        if (jobLevelFilter !== "all") {
          router.push(`${path}&jobLevel=${jobLevelFilter}`);
        }
        if (jobTypeFilter !== "all") {
          router.push(`${path}&jobType=${jobTypeFilter}`);
        }
      }
    }
    // }
  };
  return (
    <>
      <div className="bg-[#F7F8FA]">
        <div className="container py-6">
          <div
            className="flex justify-between gap-2 rounded-lg p-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 8px" }}
          >
            <input
              type="text"
              placeholder="Tìm kiếm việc làm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-4xl rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
            >
              Tìm kiếm
            </button>

            <Select>
              <SelectTrigger className="w-fit bg-white py-5 shadow-none focus:ring-0">
                <SelectValue placeholder="Tất cả địa điểm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Quốc tế">Quốc tế</SelectItem>
                <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
                <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                <SelectItem value="Bà Rịa - Vũng Tàu">
                  Bà Rịa - Vũng Tàu
                </SelectItem>
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
            </Select>
            <Drawer direction="left" >
              <DrawerTrigger asChild>
                <button className="flex items-center gap-2 rounded-md border border-solid px-3">
                  {" "}
                  <IoFilterSharp />
                  Lọc nâng cao
                </button>
              </DrawerTrigger>
              <DrawerContent className="w-96 right-0 top-0 mt-0 h-full rounded-none pb-5 outline-none">
                <DrawerHeader>
                  <div className="flex items-center justify-between gap-6">
                    <DrawerTitle>Bộ lọc</DrawerTitle>
                    <DrawerClose>
                      <IoCloseSharp size={24} className="cursor-pointer" />
                    </DrawerClose>
                  </div>
                </DrawerHeader>
                <ScrollArea className=" h-4/5 py-4">
                  <div className="px-4">
                    <div className="flex flex-col gap-2">
                      <p>Loại công việc</p>{" "}
                      <Select onValueChange={setJobTypeFilter}>
                        <SelectTrigger className="w-full bg-white py-5 shadow-none focus:ring-0">
                          <SelectValue placeholder="Tất cả loại công việc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Toàn thời gian">Toàn thời gian</SelectItem>
                          <SelectItem value="Bán thời gian">Bán thời gian</SelectItem>
                          <SelectItem value="Thực tập">Thực tập</SelectItem>
                          <SelectItem value="Việc làm online">Việc làm online</SelectItem>
                          <SelectItem value="Nghề tự do">Nghề tự do</SelectItem>
                          <SelectItem value="Hợp đồng thời vụ">Hợp đồng thời vụ</SelectItem>
                          <SelectItem value="Khác">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Cấp bậc</p>{" "}
                      <Select onValueChange={setJobLevelFilter}>
                        <SelectTrigger className="w-full bg-white py-5 shadow-none focus:ring-0">
                          <SelectValue placeholder="Tất cả cấp bậc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Thực tập sinh/Sinh viên">Thực tập sinh/Sinh viên</SelectItem>
                          <SelectItem value="Mới tốt nghiệp">Mới tốt nghiệp</SelectItem>
                          <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                          <SelectItem value="Trưởng phòng">Trưởng phòng</SelectItem>
                          <SelectItem value="Giám đốc và Cấp cao hơn">Giám đốc và Cấp cao hơn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Chức vụ</p>{" "}
                      <Select>
                        <SelectTrigger className="w-full bg-white py-5 shadow-none focus:ring-0">
                          <SelectValue placeholder="Tất cả địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hochiminh">
                            Thành phố Hồ Chí Minh
                          </SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Mức lương</p>{" "}
                      <Select>
                        <SelectTrigger className="w-full bg-white py-5 shadow-none focus:ring-0">
                          <SelectValue placeholder="Tất cả địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hochiminh">
                            Thành phố Hồ Chí Minh
                          </SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Ngành nghề</p>{" "}
                      <Select>
                        <SelectTrigger className="w-full bg-white py-5 shadow-none focus:ring-0">
                          <SelectValue placeholder="Tất cả địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hochiminh">
                            Thành phố Hồ Chí Minh
                          </SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Hình thức</p>{" "}
                      <Select>
                        <SelectTrigger className="w-full bg-white py-5 shadow-none focus:ring-0">
                          <SelectValue placeholder="Tất cả địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hochiminh">
                            Thành phố Hồ Chí Minh
                          </SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Chức vụ</p>
                      <Select>
                        <SelectTrigger className="w-full bg-white py-5 shadow-none focus:ring-0">
                          <SelectValue placeholder="Tất cả địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hochiminh">
                            Thành phố Hồ Chí Minh
                          </SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </ScrollArea>
                <div className="flex gap-3 px-4">
                  <button className="rounded-md bg-[#ff7d55] p-2 text-white">
                    Xóa bộ lọc
                  </button>
                  <button onClick={handleSearchFilter} className="rounded-md bg-[#ff7d55] p-2 text-white">
                    Tìm kiếm
                  </button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="my-3 rounded-sm border border-solid p-4">
            <div className="flex items-center justify-between text-base">
              <p>
                {jobData?.length || 0} việc làm{" "}
                <span className="font-bold">"{searchQuery} "</span> phù hợp
              </p>
              <button className="flex items-center gap-3">
                Tạo thông báo việc làm
                <label className="relative inline-flex cursor-pointer items-center">
                  <input id="switch" type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                </label>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span>Sắp xếp theo</span>
            <button
              className={`rounded-md text-gray-600  ${isActive === "all"
                ? "bg-[#ebf2ff] text-[#005aff] border border-solid border-[#005aff33]"
                : "bg-white"
                } py-1 px-2 `}
            >
              Tất cả
            </button>
            <button
              className={`rounded-md text-gray-600  ${isActive === "salary"
                ? "bg-[#ebf2ff] text-[#005aff] border border-solid border-[#005aff33]"
                : "bg-white"
                } py-1 px-2 `}
            >
              Lương (cao - thấp)
            </button>
            <button
              className={`rounded-md text-gray-600  ${isActive === "newest"
                ? "bg-[#ebf2ff] text-[#005aff] border border-solid border-[#005aff33]"
                : "bg-white"
                } py-1 px-2 `}
            >
              Ngày đăng (mới nhất)
            </button>
            <button
              className={`rounded-md text-gray-600  ${isActive === "oldest"
                ? "bg-[#ebf2ff] text-[#005aff] border border-solid border-[#005aff33]"
                : "bg-white"
                } py-1 px-2 `}
            >
              Ngày đăng (cũ nhất)
            </button>
          </div>

          <div>
            <div className="mt-4 flex flex-col gap-4">
              {jobData?.map((job, index) => (
                <Link
                  href={`/job/${job.jobPostId}`}
                  className="flex items-center gap-5 rounded-md border border-solid border-[#a0c1ff] bg-[#eff5ff] p-4 transition hover:border-sky-200 hover:bg-[#f9fbff]"
                >
                  {/* <Image src={nexon} alt="" height={80} width={80} /> */}
                  <div>
                    <h1 className="mb-1 line-clamp-1 text-lg font-medium">
                      {job.jobInfoId.jobTitle}
                    </h1>
                    {/* <p>Nexon Networks Vina Co.Ltd</p> */}
                    <p className="my-1 text-sm text-amber-600">
                      ${job.jobInfoId.minSalary} - {job.jobInfoId.maxSalary}{" "}
                      /tháng
                    </p>
                    <div>
                      <span className="text-sm">
                        Cập nhật {formatDate(job.jobInfoId.datePosted)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Pagination className="mt-10">
            <PaginationContent className="list-none">
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default JobSearch;