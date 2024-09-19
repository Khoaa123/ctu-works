"use client";
import React, { useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { HiMiniUserGroup } from "react-icons/hi2";
import {
  FaLocationDot,
  FaClock,
  FaRegPaperPlane,
  FaRegHeart,
} from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import nexon from "@images/nexon.png";
import Image from "next/image";
import Link from "next/link";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButotn";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const JobDetail = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    toast.success(
      isSaved ? (
        "Đã bỏ lưu công việc"
      ) : (
        <p>
          Bạn đã lưu việc làm thành công, xem
          <Link href="/">
            <span className="text-blue-500 hover:text-[#ff7d55]">
              {" "}
              Việc làm của tôi
            </span>
          </Link>
        </p>
      )
    );
  };
  return (
    <>
      <div className="bg-[#F1F2F4]">
        <div className="container">
          <div className="pt-5">
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-3">
                <div className="rounded-md bg-white p-6">
                  <div className="rounded-md bg-[#F8F9FA] p-3">
                    <p className="mb-1 line-clamp-1 text-xl font-bold">
                      QA Game Tester
                    </p>
                    <div className="mt-6 flex flex-col gap-4">
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-[#f1f2f4] p-2">
                            <AiOutlineDollarCircle color="grey" size={14} />
                          </div>
                          <span className="text-sm">15 - 20 triệu</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-[#f1f2f4] p-2">
                            <HiMiniUserGroup color="grey" size={14} />
                          </div>
                          <span className="text-sm">5000 lượt xem</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-[#f1f2f4] p-2">
                            <FaLocationDot color="grey" size={14} />
                          </div>
                          <span className="text-sm">Thành phố Hồ Chí Minh</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-[#f1f2f4] p-2">
                          <FaClock color="grey" size={14} />
                        </div>
                        <span className="text-sm text-[#ff7d55]">
                          Hạn nộp hồ sơ: 30/9/2024
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex w-3/4 items-center justify-center gap-3 rounded-lg bg-[#ff7d55] p-2 text-sm text-white transition hover:bg-[#fd916f]">
                              <FaRegPaperPlane size={16} />
                              Ứng tuyển ngay
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl p-0">
                            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                              <DialogTitle>Ứng tuyển công việc</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <label htmlFor="fullName" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Họ và tên
                                </label>
                                <input
                                  id="fullName"
                                  type="text"
                                  className="h-10 rounded-md border border-solid px-3 text-sm placeholder-gray-300 outline-none focus:border-sky-400"
                                  placeholder="Họ và tên hiển thị với NTD"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-1 flex flex-col gap-1">
                                  <label htmlFor="email" className="text-sm">
                                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                      *
                                    </span>
                                    Email
                                  </label>
                                  <input
                                    id="email"
                                    type="email"
                                    className="h-10 rounded-md border border-solid px-3 text-sm placeholder-gray-300 outline-none focus:border-sky-400"
                                    placeholder="Email hiển thị với NTD"
                                  />
                                </div>
                                <div className="col-span-1 flex flex-col gap-1">
                                  <label htmlFor="phone" className="text-sm">
                                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                      *
                                    </span>
                                    Số điện thoại
                                  </label>
                                  <input
                                    id="phone"
                                    type="tel"
                                    className="h-10 rounded-md border border-solid px-3 text-sm placeholder-gray-300 outline-none focus:border-sky-400"
                                    placeholder="Số điện thoại hiển thị với NTD"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label htmlFor="cv" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Tải lên CV
                                </label>
                                <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                                  <svg
                                    className="mb-4 h-8 w-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500">
                                    Tải lên CV từ máy tính, chọn hoặc kéo thả
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Hỗ trợ định dạng .doc, .docx, pdf có kích
                                    thước dưới 5MB
                                  </p>
                                  <label
                                    htmlFor="file-upload"
                                    className="mt-4 cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                                  >
                                    Chọn CV
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                      onChange={handleFileChange}
                                      accept=".doc,.docx,.pdf"
                                    />
                                  </label>
                                </div>
                                {file && (
                                  <p className="mt-2 text-sm text-gray-500">
                                    File đã chọn: {file.name}
                                  </p>
                                )}
                              </div>
                            </div>
                            <DialogFooter className="px-6 py-4">
                              <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                                Ứng tuyển
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <button
                          className={`flex flex-1 justify-center items-center gap-3 rounded-lg border px-4 py-2 transition ${
                            isSaved
                              ? "border-[#005aff] text-[#005aff] hover:bg-[#347bff26] "
                              : "border-gray-300 "
                          }`}
                          onClick={handleSaveClick}
                        >
                          {isSaved ? (
                            <FaHeart color="#005aff" />
                          ) : (
                            <FaRegHeart />
                          )}
                          {isSaved ? "Đã lưu" : "Lưu công việc"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg font-bold">Mô tả công việc</p>
                    <div className="mt-3">
                      <p className="text-sm">
                        Chúng tôi tuyển dụng Nhân viên kiểm soát chất lượng để
                        đảm bảo chất lượng các trò chơi thông qua biện pháp kiểm
                        tra thủ công.
                      </p>
                      <p className="text-sm">
                        Ứng viên đủ tiêu chuẩn cần có đôi mắt tinh tường và có
                        khả năng thiết lập các tình huống kiểm tra lỗi khác
                        nhau. Đam mê game là một lợi thế.
                      </p>
                      <p></p>
                      <p className="mt-2 text-sm font-bold">
                        Ứng viên CẦN mô tả kinh nghiệm về Game hoặc kiến thức về
                        Game trong CV bao gồm các tựa games mà bạn đã chơi qua.
                      </p>
                      <p className="mt-4 text-sm font-bold">Mô tả công việc</p>
                      <ul className="text-sm">
                        <li>Kiểm soát nội dung cơ bản trong game</li>
                        <li>
                          Kiểm soát các chức năng có độ phức tạp khác nhau.
                        </li>
                        <li>Nội dung kiểm tra liên quan đến dữ liệu số.</li>
                      </ul>
                      <p className="mt-4 text-sm font-bold">Phúc lợi:</p>
                      <ul className="text-sm">
                        <li>
                          Thời gian làm việc: 8 tiếng/ngày [9:00 - 18:00] and 5
                          ngày/ tuần (Từ Thứ Hai đến Thứ Sáu).
                        </li>
                        <li>
                          Kiểm soát các chức năng có độ phức tạp khác nhau.
                        </li>
                        <li>
                          Cơ hội làm việc trong các dự án toàn cầu với các nhóm
                          đa văn hóa, các trò chơi đẳng cấp thế giới
                        </li>
                      </ul>
                      <p className="mt-4 text-sm font-bold">
                        Địa điểm làm việc
                      </p>
                      <p className="text-sm">
                        - Hà Nội: Hà Nội: Liền kề, Toà Nhà SME Hoàng Gia, Quang
                        Trung, Hà Đông, Hà Nội, Hà Đông
                      </p>
                      <div className="mt-3 flex gap-3">
                        <button className="flex items-center justify-center gap-3 rounded-lg bg-[#ff7d55] p-2 text-sm text-white transition hover:bg-[#fd916f]">
                          Ứng tuyển ngay
                        </button>
                        <button className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-[#838da326]">
                          <FaRegHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-md bg-white p-6">
                  <p className="mb-4 text-xl font-bold">Việc làm liên quan</p>

                  <div className="mt-2 flex flex-col gap-4">
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                          Testerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                          Testerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                          Testerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                          Testerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col rounded-md bg-white px-8 py-4">
                  <div className="flex items-center justify-center">
                    <Image src={nexon} alt="" height={100} width={100} />
                  </div>
                  <div className="flex flex-col">
                    <Link href="/company/1">
                      <p className="my-3 cursor-pointer text-center font-medium hover:text-[#ff7d55]">
                        Nexon Networks Vina Co. Ltd,
                      </p>
                    </Link>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-[#f1f2f4] p-1">
                          <FaLocationDot color="grey" size={14} />
                        </div>
                        <span className="text-sm">
                          UOA Tower, 6 Tan Trao Street, Tan Phu Ward, District
                          7, HCMC, Vietnam
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-[#f1f2f4] p-1">
                          <HiMiniUserGroup color="grey" size={14} />
                        </div>
                        <span className="text-sm">5000 lượt xem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <ScrollToTopButton />
    </>
  );
};

export default JobDetail;
