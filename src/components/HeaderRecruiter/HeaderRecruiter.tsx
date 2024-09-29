import React from "react";
import Link from "next/link";
import {
  FaUsers,
  FaClipboardList,
  FaLayerGroup,
  FaCircleUser,
  FaBell,
  FaCartShopping,
  FaUser,
  FaEye,
  FaLock,
} from "react-icons/fa6";
import { RiRefreshLine } from "react-icons/ri";
import { FaCog, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const HeaderRecruiter = () => {
  return (
    <>
      <div className="bg-header-recruiter">
        <div className="container py-3">
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-[#d9d9d9]">
              <Link href="/recruiter">
                <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55]">
                  Dashboard
                </p>
              </Link>

              <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55]">
                Việc làm
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href="/recruiter/my-company">

                    <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55] data-[state=open]:text-[#ff7d55]">
                      Ứng viên
                    </p>
                  </Link>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent align="start">
                  <DropdownMenuItem className="flex items-center gap-3">
                    Quản lý theo việc đăng tuyển{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3">
                    Quản lý theo thư mục và thẻ{" "}
                  </DropdownMenuItem>
                </DropdownMenuContent> */}
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55] data-[state=open]:text-[#ff7d55]">
                    Onboarding
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="flex items-center gap-3">
                    <FaUsers size={18} />
                    Quản lý Nhân Viên
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3">
                    <RiRefreshLine size={18} />
                    Sửa quy trình Onboarding
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3">
                    <FaFileAlt size={18} />
                    Mẫu thông tin Nhân Viên
                  </DropdownMenuItem>{" "}
                  <DropdownMenuItem className="flex items-center gap-3">
                    <FaClipboardList size={18} />
                    Khảo sát nhân viên
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3">
                    <FaLayerGroup size={18} />
                    Tài liệu onboarding
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55] data-[state=open]:text-[#ff7d55]">
                    Đơn hàng
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="flex items-center gap-3">
                    Danh sách đơn hàng
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3">
                    Danh sách chia sẻ sản phẩm
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55]">
                Báo cáo
              </p>
            </div>
            <div className="flex gap-4 text-white">
              <Link href="/recruiter/create-jobpost">
                <Button className="h-10 bg-[#ff7d55] hover:bg-[#fd6333] lg:min-w-32">
                  Đăng Tuyển Dụng
                </Button>
              </Link>
              <Link href="/recruiter/search">
                <Button className="h-10 bg-[#ff7d55] hover:bg-[#fd6333] lg:min-w-32">
                  Tìm Ứng Viên
                </Button>
              </Link>
              <Button className="h-10 bg-[#ff7d55] hover:bg-[#fd6333] lg:min-w-32">
                Mua
              </Button>
            </div>
            <div className="flex flex-1 items-center justify-end gap-8">
              <FaCartShopping size={24} className="text-white" />
              <FaBell size={24} className="text-white" />

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div>
                      <FaCircleUser size={24} className="text-white" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="p-2 lg:min-w-[350px]"
                  >
                    <div className="flex flex-col items-start gap-1 border-b-2 border-teal-100 px-2 pb-2">
                      <p className="text-[#00b14f]">khoaa</p>
                      <p className="text-sm text-gray-400">khoa@gmail.com</p>
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
                    <DropdownMenuItem className="my-[6px] flex items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                      <FaSignOutAlt size={16} color="#00b14f" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default HeaderRecruiter;
