"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@images/logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="bg-white py-4">
        <div className="container mx-auto flex max-w-screen-2xl items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="CTU-Works Logo" width={50} height={50} />
            <h1 className="ml-3 cursor-pointer text-2xl font-bold text-black">
              CTU-Works
            </h1>
          </Link>
          <div className="mr-8 flex items-center gap-8 text-black">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-gray-300">Việc làm</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-2">
                <DropdownMenuItem className="my-[6px] bg-[#F1F1F1]">
                  Tìm việc làm
                </DropdownMenuItem>
                <DropdownMenuItem className="my-[6px] bg-[#F1F1F1]">
                  Việc làm phù hợp
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-gray-300">CV / Hồ Sơ</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-gray-300">Công ty</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-gray-300">Công cụ</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/salary-calculator">
                  <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                    Tính lương GROSS - NET
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-gray-300">
                  Cẩm nang nghề nghiệp
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2">
                <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                  Các câu hỏi phỏng vấn thường gặp
                </DropdownMenuItem>
                <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                  Bí kíp tìm việc
                </DropdownMenuItem>
                <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                  Chế độ lương thưởng
                </DropdownMenuItem>
                <Link href="/blog/knowledge">
                  <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                    Kiến thức chuyên ngành
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                  Hành trang nghề nghiệp
                </DropdownMenuItem>
                <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                  Thị trường và xu hướng tuyển dụng
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-gray-300">Blog</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-4 text-black">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
              Đăng Tuyển
            </button>
            <button className="rounded-md bg-green-600 px-4 py-2 text-white transition duration-300 hover:bg-green-700">
              Đăng Nhập
            </button>
            <Link href="/register">
              <button className="rounded-md border border-blue-600 bg-transparent px-4 py-2 text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white">
                Đăng Ký
              </button>
            </Link>
          </div>
        </div>
      </header>
      <div className="bg-[#F6FAFB] p-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3">
            <Select>
              <SelectTrigger className="w-[200px] py-5 shadow-none focus-visible:ring-0">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
          <div className="mt-4 flex items-center justify-center gap-3">
            <button className="rounded-md border border-teal-300 bg-white px-2 py-[2px] text-gray-600 transition hover:bg-slate-100 hover:text-teal-600">
              Công nghệ thông tin
            </button>
            <button className="rounded-md border border-teal-300 bg-white px-2 py-[2px] text-gray-600 transition hover:bg-slate-100 hover:text-teal-600">
              Kế toán
            </button>
            <button className="rounded-md border border-teal-300 bg-white px-2 py-[2px] text-gray-600 transition hover:bg-slate-100 hover:text-teal-600">
              Cơ khí
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="max-w-80 rounded-md border border-blue-600 p-4">
            <p className="text-xl font-semibold">Phân tích CN</p>
            <p className="text-xs">
              Bạn đã có sẳn CV? Tải lên để nhận phân tích và gợi ý của CTU-Works
            </p>
          </div>
          <div className="max-w-80 rounded-md border border-blue-600 p-4">
            <p className="text-xl font-semibold">Tạo CV tự động trong 2 phút</p>
            <p className="text-xs">
              Tạo CV nhanh chóng , chuẩn , đẹp , phong phú bằng công cụ tự động
              hoàn toàn miễn phí
            </p>
          </div>
        </div>
      </div>

      {/* <div className="bg-white py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-4">
            <div className="max-w-80 rounded-md border border-blue-600 p-4">
              <p className="text-xl font-semibold">Phân tích CN</p>
              <p className="text-xs">
                Bạn đã có sẳn CV? Tải lên để nhận phân tích và gợi ý của
                CTU-Works
              </p>
            </div>
            <div className="max-w-80 rounded-md border border-blue-600 p-4">
              <p className="text-xl font-semibold">
                Tạo CV tự động trong 2 phút
              </p>
              <p className="text-xs">
                Tạo CV nhanh chóng , chuẩn , đẹp , phong phú bằng công cụ tự
                động hoàn toàn miễn phí
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Header;
