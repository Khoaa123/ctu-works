"use client";
import React, { useEffect, useState } from "react";
import {
  FaCircleUser,
  FaClipboardCheck,
  FaBell,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa6";
import { RiFileUserFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

const RecruiterSidebar = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [formData, setFormData] = useState({
    companyAddress: "",
    companyDescription: "",
    companyFacebook: "",
    companyId: "",
    companyLogo: "",
    companyName: "",
    companyWebsite: "",
    createdAt: "",
    email: "",
    follower: [],
    following: 0,
    fullName: "",
    phoneNumber: "",
    role: "",
    updatedAt: "",
    _id: "",
    staffName: "",
    companyScale: "",
    companyBenefits: [
      {
        benefitId: "",
        benefitDescription: "",
      },
    ],

  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRecruiterInfo();
      const data = res.data;
      setFormData(data);
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
      <div className="flex flex-col gap-[6px]">
        <div className="flex flex-col gap-4 rounded-md bg-[#4a80f8] p-4">
          <div className="flex items-center gap-4">
            <Image src={formData?.companyLogo} alt="logo"
              height={60}
              width={60}
              className="mr-2 rounded-full" />
            <span className="text-white">
              {decodedToken?.fullName}
            </span>
          </div>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <Link href="/recruiter/profile">
            <div className="flex items-center gap-3">
              <RiFileUserFill color="grey" size={20} />
              <p>Hồ sơ của tôi</p>
            </div>
          </Link>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <Link href="/recruiter/location">
            <div className="flex items-center gap-3">
              <FaBuilding color="grey" size={20} />
              <p>Địa điểm làm việc</p>
            </div>
          </Link>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <Link href="/profile/my-job">
            <div className="flex items-center gap-3">
              <FaBriefcase color="grey" size={20} />
              <p>Các ứng viên đã xem gần đây</p>
            </div>
          </Link>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <div className="flex items-center gap-3">
            <FaBell color="grey" size={20} />
            <p>Cài đặt thông báo việc làm</p>
          </div>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <div className="flex items-center gap-3"
            onClick={() => {
              cookies.remove("accessTokenRecruiter");
              window.location.href = "/recruiter/login";
            }}
          >
            <BiLogOut color="grey" size={20} />
            <p>Đăng xuất</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterSidebar;
