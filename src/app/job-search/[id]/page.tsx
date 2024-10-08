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
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
const JobSearch = () => {
  const [isActive, setIsActive] = useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const router = useRouter();

  useEffect(() => {
    const query = location.pathname.split("/job-search/")[1];
    if (query) {
      // setSearchQuery(query);
      
    }
    fetchSearhData()
  }, [])
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
  }
  const fetchSearhData = () => {

  }
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery) {
      createSearch(searchQuery)
      router.push(`/job-search/${searchQuery}`);
    }
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
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
              Tìm kiếm
            </button>

            <Select>
              <SelectTrigger className="w-fit bg-white py-5 shadow-none focus:ring-0">
                <SelectValue placeholder="Tất cả địa điểm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="hochiminh">Thành phố Hồ Chí Minh</SelectItem>
                <SelectItem value="cantho">Cần Thơ</SelectItem>
              </SelectContent>
            </Select>
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <button className="flex items-center gap-2 rounded-md border border-solid px-3">
                  {" "}
                  <IoFilterSharp />
                  Lọc nâng cao
                </button>
              </DrawerTrigger>
              <DrawerContent className="right-0 top-0 mt-0 h-full w-[500px] rounded-none pb-5 outline-none">
                <DrawerHeader>
                  <div className="flex items-center justify-between gap-6">
                    <DrawerTitle>Bộ lọc</DrawerTitle>
                    <IoCloseSharp size={24} className="cursor-pointer" />
                  </div>
                </DrawerHeader>
                <ScrollArea className="h-4/5 py-4">
                  <div className="px-4">
                    <div className="my-3 flex flex-col gap-2">
                      <p>Địa điểm</p>
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
                      <p>Tên công ty</p>{" "}
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
                  <button className="rounded-md bg-[#ff7d55] p-2 text-white">
                    Tìm kiếm
                  </button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="my-3 rounded-sm border border-solid p-4">
            <div className="flex items-center justify-between text-base">
              <p>
                8 việc làm <span className="font-bold">"flutter"</span> phù hợp
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
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="flex items-center gap-5 rounded-md border border-solid border-[#a0c1ff] bg-[#eff5ff] p-4 transition hover:border-sky-200 hover:bg-[#f9fbff]">
                  <Image src={nexon} alt="" height={80} width={80} />
                  <div>
                    <h1 className="mb-1 line-clamp-1 text-lg font-medium">
                      QA Game Tester
                    </h1>
                    <p>Nexon Networks Vina Co.Ltd</p>
                    <p className="my-1 text-sm text-amber-600">
                      $500 - 1000 /tháng
                    </p>
                    <div>
                      <span className="text-sm">Cập nhật 31/8/2024</span>
                    </div>
                  </div>
                </div>
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
