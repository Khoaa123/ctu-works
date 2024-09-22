"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaUserCog,
  FaFileAlt,
  FaChartBar,
  FaCogs,
  FaUserTie,
  FaBriefcase,
} from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const Sidebar = () => {
  const [isActive, setIsActive] = useState("user-management");

  return (
    <>
      <div className="p-4">
        <p className="text-xl font-bold">CTU-Works</p>
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
                    className={`${
                      isActive === "user-management"
                        ? "text-blue-600"
                        : "text-[#4b5563]"
                    }`}
                  />
                  Quản lý người dùng
                </div>
              </Link>
              <Link href="/admin/recruiter-management">
                <div
                  className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md ${
                    isActive === "recruiter-management"
                      ? "bg-[#5750f112] text-blue-600"
                      : ""
                  } px-4 py-3`}
                  onClick={() => setIsActive("recruiter-management")}
                >
                  <FaUserTie
                    size={22}
                    className={`${
                      isActive === "recruiter-management"
                        ? "text-blue-600"
                        : "text-[#4b5563]"
                    }`}
                  />
                  Quản lý nhà tuyển dụng
                </div>
              </Link>
              <Link href="/admin/job-management">
                <div
                  className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md ${
                    isActive === "job-management"
                      ? "bg-[#5750f112] text-blue-600"
                      : ""
                  } px-4 py-3`}
                  onClick={() => setIsActive("job-management")}
                >
                  <FaBriefcase
                    size={22}
                    className={`${
                      isActive === "job-management"
                        ? "text-blue-600"
                        : "text-[#4b5563]"
                    }`}
                  />
                  Quản lý tin tuyển dụng
                </div>
              </Link>
              <Link href="/admin/post-management">
                <div
                  className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md  ${
                    isActive === "post-management"
                      ? "bg-[#5750f112] text-blue-600"
                      : ""
                  } px-4 py-3`}
                  onClick={() => setIsActive("post-management")}
                >
                  <FaFileAlt
                    size={22}
                    className={`${
                      isActive === "post-management"
                        ? "text-blue-600"
                        : "text-[#4b5563]"
                    }`}
                  />
                  Quản lý bài viết
                </div>
              </Link>
              <Link href="/admin/reports">
                <div
                  className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md  ${
                    isActive === "reports" ? "bg-[#5750f112] text-blue-600" : ""
                  } px-4 py-3`}
                  onClick={() => setIsActive("reports")}
                >
                  <FaChartBar
                    size={22}
                    className={`${
                      isActive === "reports"
                        ? "text-blue-600"
                        : "text-[#4b5563]"
                    }`}
                  />
                  Báo cáo thống kê
                </div>
              </Link>
              <Link href="/admin/system-management">
                <div
                  className={`cursor-pointer ease-in-out duration-300 hover:bg-[#F7F8Fa] flex gap-3 items-center rounded-md  ${
                    isActive === "system-management"
                      ? "bg-[#5750f112] text-blue-600"
                      : ""
                  } px-4 py-3`}
                  onClick={() => setIsActive("system-management")}
                >
                  <FaCogs
                    size={22}
                    className={`${
                      isActive === "system-management"
                        ? "text-blue-600"
                        : "text-[#4b5563]"
                    }`}
                  />
                  Quản lý hệ thống
                </div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="uppercase">Khác</p>
            <ul className="flex list-none flex-col gap-2">
              <li
                className={`flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 duration-300 ease-in-out hover:bg-[#F7F8Fa]`}
                onClick={() => {}}
              >
                <LuLogOut size={22} />
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
