import Image from "next/image";
import React, { useState } from "react";
import logo from "@images/logo.png";
import Link from "next/link";
import SearchWrapper from "../client/SearchWrapper";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import {
  FaCircleUser,
  FaMessage,
  FaUser,
  FaBell,
  FaEye,
  FaLock,
} from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type JwtPayload = {
  userid: string;
  email: string;
  fullName: string;
  role: string;
};

const Header = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const userName = decodedToken?.fullName || "";
  const email = decodedToken?.email || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto flex max-w-screen-2xl justify-between gap-8 px-6 xl:items-center">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="CTU-Works Logo" width={50} height={50} />
            <h1 className="ml-3 cursor-pointer text-2xl font-bold text-[#00b14f]">
              CTU-Works
            </h1>
          </Link>
          <div className="mr-8 hidden items-center gap-8 font-semibold text-black xl:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-[#00b14f]">Việc làm</p>
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
                <p className="cursor-pointer hover:text-[#00b14f]">
                  CV / Hồ Sơ
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-[#00b14f]">Công ty</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-[#00b14f] data-[state=open]:text-[#00b14f]">
                  Công cụ
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <Link href="/salary-calculator">
                  <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                    Tính lương GROSS - NET
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-[#00b14f] data-[state=open]:text-[#00b14f]">
                  Cẩm nang nghề nghiệp
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="p-2">
                <Link href="/interview-questions">
                  <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                    Các câu hỏi phỏng vấn thường gặp
                  </DropdownMenuItem>
                </Link>
                <Link href="/career-path">
                  <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                    Lộ trình sự nghiệp
                  </DropdownMenuItem>
                </Link>
                <Link href="/blog/knowledge">
                  <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                    Kiến thức chuyên ngành
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                  Bí kíp tìm việc
                </DropdownMenuItem>
                <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                  Chế độ lương thưởng
                </DropdownMenuItem>
                <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                  Hành trang nghề nghiệp
                </DropdownMenuItem>
                <DropdownMenuItem className="my-[6px] bg-[#F6FAFB] p-3">
                  Thị trường và xu hướng tuyển dụng
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer hover:text-[#00b14f]">Blog</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            onClick={toggleMenu}
            className="relative h-8 w-8 focus:outline-none xl:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
              <FaBars
                size={24}
                className={`text-[#00b14f] transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
              <IoClose
                size={24}
                className={`text-[#00b14f] transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-0"
                }`}
              />
            </div>
          </button>

          <div className="hidden flex-1 items-center justify-end gap-4 text-black xl:flex">
            {accessToken ? (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00b14f1a]">
                  <FaBell size={20} color="#00b14f" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00b14f1a]">
                  <FaMessage size={20} color="#00b14f" />
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div>
                        <FaCircleUser size={40} color="#D2D7DB" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="p-2 xl:min-w-[350px]"
                    >
                      <div className="flex flex-col items-start gap-1 border-b-2 border-teal-100 px-2 pb-2">
                        <p className="text-[#00b14f]">{userName}</p>
                        <p className="text-sm text-gray-400">{email}</p>
                      </div>
                      <Link href="/profile">
                        <DropdownMenuItem className="my-[6px] flex items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                          <FaUser size={16} color="#00b14f" />
                          Hồ sơ của tôi
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/blog/knowledge">
                        <DropdownMenuItem className="my-[6px] flex items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                          <FaBell size={16} color="#00b14f" />
                          Thông báo việc làm
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="my-[6px] flex items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                        <FaEye size={16} color="#00b14f" />
                        Nhà tuyển dụng xem hồ sơ
                      </DropdownMenuItem>
                      <DropdownMenuItem className="my-[6px] flex items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                        <FaCog size={16} color="#00b14f" />
                        Cài đặt gợi ý việc làm
                      </DropdownMenuItem>
                      <DropdownMenuItem className="my-[6px] flex items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                        <FaLock size={16} color="#00b14f" />
                        Đổi mật khẩu
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="my-[6px] flex items-center gap-3 bg-[#F6FAFB] p-3 font-medium"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt size={16} color="#00b14f" />
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <button className="rounded-sm bg-[#212f3f] px-4 py-2 font-medium text-white transition duration-300 hover:bg-black">
                  Đăng Tuyển Dụng
                </button>
                <Link href="/login">
                  <button className="rounded-sm border border-[#00b14f] px-4 py-2 font-medium text-[#00b14f] transition duration-300 hover:bg-[#e5f7ed80]">
                    Đăng Nhập
                  </button>
                </Link>
                <Link href="/register">
                  <button className="rounded-sm border bg-[#00b14f] px-4 py-2 font-medium text-white transition duration-300 hover:bg-[#3ba769] hover:text-white">
                    Đăng Ký
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <Accordion type="single" collapsible className="container w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold text-[#00b14f]">
              Việc Làm
            </AccordionTrigger>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Tìm việc phù hợp{" "}
            </AccordionContent>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Việc làm phù hợp{" "}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold text-[#00b14f]">
              CV / Hồ Sơ
            </AccordionTrigger>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold text-[#00b14f]">
              Công ty
            </AccordionTrigger>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-semibold text-[#00b14f]">
              Công cụ
            </AccordionTrigger>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Tính lương GROSS - NET
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-semibold text-[#00b14f]">
              Cẩm nang nghề nghiệp
            </AccordionTrigger>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Các câu hỏi phỏng vấn thường gặp
            </AccordionContent>
            <AccordionContent className="rounded-md bg-[#f4f5f5] p-3">
              Lộ trình sự nghiệp
            </AccordionContent>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Kiến thức chuyên ngành
            </AccordionContent>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Bí kíp tìm việc
            </AccordionContent>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Chế độ lương thưởng
            </AccordionContent>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Hành trang sự nghiệp
            </AccordionContent>
            <AccordionContent className="my-2 rounded-md bg-[#f4f5f5] p-3">
              Thị trường và xu hướng tuyển dụng
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <SearchWrapper />
    </>
  );
};

export default Header;
