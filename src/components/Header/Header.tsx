import Image from "next/image";
import React from "react";
import logo from "@images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SearchWrapper from "../client/SearchWrapper";

const Header = () => {
  return (
    <>
      <header className="bg-[#003699] py-4">
        <div className="container mx-auto flex max-w-screen-2xl items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="CTU-Works Logo" width={50} height={50} />
            <h1 className="ml-3 cursor-pointer text-2xl font-bold text-white">
              CTU-Works
            </h1>
          </Link>
          <div className="mr-8 flex items-center gap-8 text-white">
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
                <Link href="/interview-questions">
                  <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                    Các câu hỏi phỏng vấn thường gặp
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                  Bí kíp tìm việc
                </DropdownMenuItem>
                <Link href="/career-path">
                  <DropdownMenuItem className="my-[6px] bg-[#f4f5f5] p-3">
                    Lộ trình sự nghiệp
                  </DropdownMenuItem>
                </Link>
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
              <button className="rounded-md border border-blue-600 bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-blue-600 hover:text-white">
                Đăng Ký
              </button>
            </Link>
          </div>
        </div>
      </header>

      <SearchWrapper />
    </>
  );
};

export default Header;
