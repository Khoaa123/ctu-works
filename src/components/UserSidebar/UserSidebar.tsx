"use client";

import React from "react";
import { FaBriefcase, FaBuilding } from "react-icons/fa6";
import { RiFileUserFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const UserSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-[6px]">
      <div
        className={`cursor-pointer rounded-md border  p-4 transition duration-300 hover:border-sky-200 ${
          pathname === "/profile"
            ? "bg-[#ebf2ff]"
            : "hover:bg-[#ebf2ff] bg-white"
        }`}
      >
        <Link href="/profile">
          <div className="flex items-center gap-3">
            <RiFileUserFill color="grey" size={20} />
            <p>Hồ sơ của tôi</p>
          </div>
        </Link>
      </div>
      <div
        className={`cursor-pointer rounded-md border  p-4 transition duration-300 hover:border-sky-200 ${
          pathname === "/profile/my-company"
            ? "bg-[#ebf2ff]"
            : "hover:bg-[#ebf2ff] bg-white"
        }`}
      >
        <Link href="/profile/my-company">
          <div className="flex items-center gap-3">
            <FaBuilding color="grey" size={20} />
            <p>Công ty của tôi</p>
          </div>
        </Link>
      </div>
      <div
        className={`cursor-pointer rounded-md border  p-4 transition duration-300 hover:border-sky-200 ${
          pathname === "/profile/my-job"
            ? "bg-[#ebf2ff]"
            : "hover:bg-[#ebf2ff] bg-white"
        }`}
      >
        <Link href="/profile/my-job">
          <div className="flex items-center gap-3">
            <FaBriefcase color="grey" size={20} />
            <p>Việc làm của tôi</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserSidebar;
