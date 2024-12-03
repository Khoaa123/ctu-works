"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import bg from "@images/recruiter/dashboard-recruiter.png";
import empty from "@images/recruiter/empty-status.png";
import emptyJob from "@images/recruiter/empty-job.png";
import defaultProfile from "@images/recruiter/default-profile.png";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FaClock } from "react-icons/fa6";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import ChatbotRecruiter from "@/components/ChatBotRecruiter/ChatBotRecruiter";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
const Recruiter = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [recruiterInfo, setRecruiterInfo] = useState({
    fullName: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRecruiterInfo();
      const data = res.data;
      setRecruiterInfo(data);
    };
    fetchData();
  }, []);
  const fetchRecruiterInfo = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/get-details-recruiter/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  return (
    <>
      <ChatbotRecruiter />
      <div>
        <HeaderRecruiter />
        <div className="bg-[#F6F6F6]">
          <div className="container p-4">
            <div className="mb-6 grid grid-cols-12 gap-4">
              <div className="lg:col-span-5">
                <div
                  style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundPosition: "right",
                    backgroundSize: "290px 170px",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "rgb(225, 241, 255)",
                    borderRadius: "8px",
                  }}
                  className="shadow-sm"
                >
                  <div className="p-4">
                    <p className="text-lg font-bold">Xin chào,</p>
                    <p className="text-lg font-medium text-[#ff7d55]">
                      {recruiterInfo?.fullName}
                    </p>
                    <p className="mt-8 text-sm">
                      Đây là một số thông tin để bạn có thể bắt đầu sử dụng
                    </p>
                    <p className="mt-2 text-sm text-blue-500">
                      FAQ/Hướng dẫn sử dụng
                    </p>
                    <p className="mt-2 text-sm text-blue-500">
                      Khám phá sản phẩm
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-md bg-white p-4 shadow-sm">
                  {/* <p className="text-lg font-medium">Điểm khả dụng</p> */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="border-solod col-span-1 flex min-h-44 cursor-pointer flex-col justify-center rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] p-2 transition-all duration-300 hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <img src="https://images.vietnamworks.com/announcement-images/1732004232-announcement-pop-up-Pop-up%20banner%20EM_%20500%20x%20200%20(1).png"></img>
                      {/* <p className="text-2xl font-semibold text-[#ff7d55]">0</p> */}
                      {/* <p className="text-sm">Điểm đăng tuyển</p> */}
                    </div>
                    <div className="border-solod col-span-1 flex min-h-44 cursor-pointer flex-col justify-center rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] p-2 transition-all duration-300 hover:border-sky-200 hover:bg-[#F9FBFF]">
                      {/* <p className="text-2xl font-semibold text-[#ff7d55]">0</p> */}
                      {/* <p className="text-sm">Điểm xem hồ sơ</p> */}
                      <img src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fmondelez_hrbn1024_129061.png&w=1920&q=75"></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="h-full rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span>Tổng số lượng hồ sơ trong 7 ngày</span>
                      <span className="text-2xl font-bold">0</span>
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px] shadow-none focus:ring-0 data-[state=open]:border-sky-400">
                        <SelectValue placeholder="Tất cả công việc" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">Tất cả công việc</SelectItem>
                          <SelectItem value="fresher">
                            Fresher Developer
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <Image
                      src={empty}
                      alt="empty"
                      height={200}
                      width={300}
                      className="w-[400px]"
                    />
                    <p>Không có dữ liệu cho báo cáo này</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mb-6 rounded-md bg-white p-4 shadow-sm">
              <p className="text-lg font-bold">Quản lý nhanh tin đăng</p>
              <div className="mt-4 flex h-full flex-col items-center justify-center gap-3 text-center">
                <div>
                  <Image
                    src={emptyJob}
                    alt="empty job"
                    height={185}
                    width={300}
                    className="w-[400px]"
                  />
                  <p>Không có việc làm nào</p>
                </div>
              </div>
            </div> */}

            {/* <div className="mb-6 grid grid-cols-12 gap-3">
              <div className="col-span-5">
                <div className="flex h-full flex-col gap-3 rounded-md bg-white p-4 shadow-sm">
                  <p className="text-lg font-bold">Trang thái tin đăng</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border-solod col-span-1 flex cursor-pointer flex-col justify-center rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] p-2 transition-all duration-300 hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <p className="text-2xl font-semibold text-[#ff7d55]">0</p>
                      <p className="text-sm">Đang hiển thị</p>
                    </div>
                    <div className="border-solod col-span-1 flex cursor-pointer flex-col justify-center rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] p-2 transition-all duration-300 hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <p className="text-2xl font-semibold text-[#919191]">0</p>
                      <p className="text-sm">Đang ẩn</p>
                    </div>
                    <div className="border-solod col-span-1 flex cursor-pointer flex-col justify-center rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] p-2 transition-all duration-300 hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <p className="text-2xl font-semibold text-[#474747]">0</p>
                      <p className="text-sm">Nháp</p>
                    </div>
                    <div className="border-solod col-span-1 flex cursor-pointer flex-col justify-center rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] p-2 transition-all duration-300 hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <p className="text-2xl font-semibold text-[#f7941d]">0</p>
                      <p className="text-sm">Việc làm ảo</p>
                    </div>
                    <div className="border-solod col-span-1 flex cursor-pointer flex-col justify-center rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] p-2 transition-all duration-300 hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <p className="text-2xl font-semibold text-[#ff7d55]">0</p>
                      <p className="text-sm">Hết hạn</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-7">
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="flex flex-col gap-6 rounded-md bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold">
                              Ứng viên vừa cập nhật
                            </p>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => api?.scrollTo(current - 1)}
                                className="text-gray-600"
                                disabled={current === 0}
                              >
                                <ChevronLeftIcon className="h-4 w-4" />
                              </button>
                              <div className="py-2 text-center text-sm text-muted-foreground">
                                {current + 1}/{count}
                              </div>
                              <button
                                onClick={() => api?.scrollTo(current + 1)}
                                className="text-gray-600"
                                disabled={current === count - 1}
                              >
                                <ChevronRightIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 px-3">
                            <Image
                              src={defaultProfile}
                              alt="profile"
                              height={100}
                              width={100}
                              className="rounded-full"
                            />
                            <div className="text-sm">
                              <p>
                                <span className="font-semibold">Tên: </span>Hoài
                                Anh Võ Võ
                              </p>
                              <p>
                                <span className="font-semibold">Tiêu đề: </span>
                                Biên tập viên, Chịu Trách Nhiệm Sản Xuất mảng
                                giải trí
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Kinh nghiệm:{" "}
                                </span>
                                5 năm
                              </p>
                              <p>
                                <span className="font-semibold">Vị trí: </span>
                                Bình Dương, Hồ Chí Minh
                              </p>
                            </div>
                          </div>
                          <div className="flex h-full items-center justify-end gap-3">
                            <FaClock className="text-[#979797]" />
                            <span className="text-[#979797]">
                              Cập nhật 7 phút trước
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div> */}

            {/* <div className="mb-6 grid grid-cols-12 gap-3">
              <div className="rounded-md bg-white p-4 lg:col-span-7">
                <p className="text-lg font-bold">
                  Thông tin khách hàng thân thiết
                </p>
                <div className="mt-4 rounded-md bg-[#F5F5F5]">
                  <div className="flex items-center gap-4 p-4">
                    <Image
                      src={defaultProfile}
                      alt="image"
                      height={100}
                      width={100}
                      className="rounded-full"
                    />
                    <div className="flex flex-1 flex-col gap-2 text-sm">
                      <p>
                        <span className="font-semibold">Tên: </span>Chưa có
                        thành viên
                      </p>
                      <p>
                        <span className="font-semibold">Giá trị: </span>0 VND
                      </p>
                      <div className="flex w-full items-center gap-2">
                        <span className="font-semibold">Trạng thái: </span>
                        <div className="h-3 w-4/5 rounded-lg bg-[#e9ecef]"></div>
                      </div>
                      <span className="italic">
                        (Cần mua thêm 48,000,000 VNĐ để lên hạng Bạc)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5"></div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recruiter;
