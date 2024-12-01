"use client";

import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaUserCog, FaFileAlt, FaChartBar, FaCogs } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";

type JwtPayload = {
  userid: string;
  email: string;
  fullName: string;
  role: string;
};

const Sidebar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("user-management");
  const cookies = useCookies();
  const accessTokenAdmin = cookies.get("accessTokenAdmin");
  const decodedToken = accessTokenAdmin
    ? jwtDecode<JwtPayload>(accessTokenAdmin)
    : null;
  const email = decodedToken?.email || "";
  const handleLogout = () => {
    toast.success("Đăng xuất thành công");
    cookies.remove("accessTokenAdmin");
    cookies.remove("refreshTokenAdmin");
    router.replace("/admin/login");
  };
  return (
    <div className="p-4">
      <Link href="/">
        <p className="text-2xl font-bold text-[#00b14f]">CTU-Works</p>
      </Link>
      <div className="mt-2 text-[#4b5563]"> {email}</div>
      <div className="mt-8 flex flex-col gap-2 text-[#4b5563]">
        <div className="flex flex-col gap-2">
          <p className="uppercase">Chức năng</p>
          <div className="flex list-none flex-col gap-2">
            <Link href="/admin/user-management">
              <div
                className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md ${
                  isActive === "user-management"
                    ? "bg-[#5750f112] text-blue-600"
                    : ""
                } px-4 py-3`}
                onClick={() => setIsActive("user-management")}
              >
                <FaUserCog
                  size={22}
                  className={
                    isActive === "user-management"
                      ? "text-blue-600"
                      : "text-[#4b5563]"
                  }
                />
                Quản lý người tìm việc
              </div>
            </Link>
            <Link href="/admin/employer-management">
              <div
                className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md ${
                  isActive === "employer-management"
                    ? "bg-[#5750f112] text-blue-600"
                    : ""
                } px-4 py-3`}
                onClick={() => setIsActive("employer-management")}
              >
                <FaUserCog
                  size={22}
                  className={
                    isActive === "employer-management"
                      ? "text-blue-600"
                      : "text-[#4b5563]"
                  }
                />
                Quản lý nhà tuyển dụng
              </div>
            </Link>
            <Link href="/admin/job-post-approval">
              <div
                className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md ${
                  isActive === "job-post-approval"
                    ? "bg-[#5750f112] text-blue-600"
                    : ""
                } px-4 py-3`}
                onClick={() => setIsActive("job-post-approval")}
              >
                <FaFileAlt
                  size={22}
                  className={
                    isActive === "job-post-approval"
                      ? "text-blue-600"
                      : "text-[#4b5563]"
                  }
                />
                Quản lý tin tuyển dụng
              </div>
            </Link>
            <Link href="/admin/post-management">
              <div
                className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md ${
                  isActive === "post-management"
                    ? "bg-[#5750f112] text-blue-600"
                    : ""
                } px-4 py-3`}
                onClick={() => setIsActive("post-management")}
              >
                <FaFileAlt
                  size={22}
                  className={
                    isActive === "post-management"
                      ? "text-blue-600"
                      : "text-[#4b5563]"
                  }
                />
                Quản lý bài viết
              </div>
            </Link>
            <Link href="/admin/reports">
              <div
                className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md ${
                  isActive === "reports" ? "bg-[#5750f112] text-blue-600" : ""
                } px-4 py-3`}
                onClick={() => setIsActive("reports")}
              >
                <FaChartBar
                  size={22}
                  className={
                    isActive === "reports" ? "text-blue-600" : "text-[#4b5563]"
                  }
                />
                Báo cáo thống kê
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="uppercase">Khác</p>
          <ul className="flex list-none flex-col gap-2">
            <li
              className={`flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 duration-300 ease-in-out hover:bg-[#F7F8Fa]`}
              onClick={handleLogout}
            >
              <LuLogOut size={22} />
              Đăng xuất
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
