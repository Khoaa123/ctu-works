"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Banknote,
  Clock,
  GraduationCap,
  Briefcase,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Globe,
  Mail,
  Phone,
  Flag,
  User,
  Layers,
  Target,
} from "lucide-react";
import {
  FaLocationDot,
  FaClock,
  FaBriefcase,
  FaLaptop,
  FaLaptopCode,
  FaUserClock,
  FaGraduationCap,
  FaUsers,
  FaUserTie,
  FaLanguage,
  FaFlag,
  FaVenusMars,
  FaDollarSign,
  FaBed,
  FaPlane,
  FaBookOpen,
  FaTrophy,
  FaPhone,
  FaBus,
  FaUtensils,
  FaPercent,
  FaChild,
} from "react-icons/fa6";
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaCogs,
  FaEllipsisH,
  FaHeart,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import Image from "next/image";
import logo from "@images/nexon.png";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { HiMiniUserGroup } from "react-icons/hi2";
import { toast } from "react-toastify";

type JobPostingProps = {
  jobPosting: {
    id: string;
    title: string;
    company: {
      name: string;
      logo: string;
      website: string;
      email: string;
      phone: string;
      description: string;
    };
    location: string;
    salary: string;
    jobType: string;
    experienceLevel: string;
    educationLevel: string;
    industry: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    skills: string[];
    benefits: string[];
    applicationDeadline: string;
    postedDate: string;
    status: "pending" | "approved" | "rejected";
    numberOfVacancies: number;
    level: string;
    gender: string;
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onClose: () => void;
};

const DetailedJobPosting = () => {
  const [formData, setFormData] = useState({
    companyAddress: "",
    companyDescription: "",
    companyFacebook: "",
    expirationDate: "",
    companyId: "",
    jobTitle: "",
    companyLogo: "",
    companyName: "",
    companyWebsite: "",
    createdAt: "",
    email: "",
    follower: [],
    postViews: 0,
    following: 0,
    keywords: [],
    fullName: "",
    language: "",
    datePosted: "",
    canDeal: false,
    minSalary: 1,
    jobDescription: "",
    jobField: "",
    nationality: "",
    jobRequirements: "",
    educationLevel: "",
    minAge: 18,
    maxAge: 30,
    jobLevel: "",
    gender: "",
    maritalStatus: "",
    numberOfPositions: 0,
    minExperience: "",
    maxSalary: 1,
    phoneNumber: "",
    location: [],
    role: "",
    updatedAt: "",
    _id: "",
    staffName: "",
    companyScale: "",
    statusApproval: false,
    statusSeeking: false,
    companyBenefits: [
      {
        benefitId: "",
        benefitDescription: "",
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchJobPostDetails();
      const data = res.data;
      console.log(data);
      setFormData(data);
    };
    fetchData();
  }, []);
  const fetchJobPostDetails = async () => {
    const id = location.pathname?.split("/job-post-approval/")[1];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/get-details-jobpost/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/jobpost/approve/${id}`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      toast.success("Đã duyệt tin tuyển dụng");
    } catch (error) {
      console.error("Error approving job post:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/jobpost/reject/${id}`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      toast.success("Đã từ chối tin tuyển dụng");
    } catch (error) {
      console.error("Error rejecting job post:", error);
    }
  };
  const calculateDaysRemaining = (expirationDate: any) => {
    const expirationDateObj = new Date(expirationDate);
    const today = new Date();
    const diffInMs = expirationDateObj.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };
  return (
    <div className="px-1 py-8">
      <div id={formData?._id} className="col-span-3">
        <div className="rounded-md bg-white p-6">
          <Badge
            variant={
              formData.statusApproval === true &&
              formData.statusSeeking === true
                ? "default"
                : formData.statusApproval === false &&
                  formData.statusSeeking === false
                ? "destructive"
                : "secondary"
            }
          >
            {formData.statusApproval === true && formData.statusSeeking === true
              ? "Đã duyệt"
              : formData.statusApproval === false &&
                formData.statusSeeking === false
              ? "Đã từ chối"
              : "Đang chờ duyệt"}
          </Badge>
          <div className="rounded-md bg-[#F8F9FA] p-3">
            <p className="mb-1 line-clamp-1 text-xl font-bold">
              {formData?.jobTitle}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#f1f2f4] p-2">
                  <FaClock color="grey" size={14} />
                </div>
                <span className="text-sm text-[#ff7d55]">
                  {new Date(formData?.expirationDate).toLocaleDateString(
                    "vi-VN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                  {` (Hết hạn trong ${calculateDaysRemaining(
                    formData?.expirationDate
                  )} ngày)`}
                </span>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2 md:min-w-36">
                  <div className="rounded-full bg-[#f1f2f4] p-2">
                    <AiOutlineDollarCircle color="grey" size={14} />
                  </div>
                  {formData?.canDeal === true ? (
                    <span className="text-sm text-orange-500">
                      Thương lượng
                    </span>
                  ) : (
                    <span className="text-sm">
                      {formData?.minSalary}$ {" - "}
                      {formData?.maxSalary}$
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 md:min-w-36">
                  <div className="rounded-full bg-[#f1f2f4] p-2">
                    <HiMiniUserGroup color="grey" size={14} />
                  </div>
                  <span className="text-sm">
                    {formData?.postViews} lượt xem
                  </span>
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <div className="rounded-full bg-[#f1f2f4] p-2">
                    <FaLocationDot color="grey" size={14} />
                  </div>
                  <span className="line-clamp-1 text-sm">
                    {formData?.location?.map((loc: string, locIndex: any) => {
                      const locationName = loc?.split(":")[1]?.trim();

                      const locationWithoutCountry = locationName
                        ?.replace(", Việt Nam", "")
                        ?.trim();
                      return (
                        <span key={locIndex}>
                          {locationWithoutCountry}
                          {locIndex < formData?.location.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4"></div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-bold">Mô tả công việc</p>
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{
                __html: formData?.jobDescription ?? "",
              }}
            ></div>
            <p className="text-lg font-bold">Yêu cầu công việc</p>
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{
                __html: formData?.jobRequirements ?? "",
              }}
            ></div>
          </div>

          <div className="mt-8">
            <h1 className="mb-4 text-xl font-semibold">
              Các phúc lợi dành cho bạn
            </h1>
            <div className="space-y-4">
              {formData?.companyBenefits?.map((item: any) => (
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center">
                    {item.title === "Thưởng" && (
                      <FaDollarSign className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Chăm sóc sức khỏe" && (
                      <FaBed className="fas fa-bed mr-2 text-blue-500" />
                    )}
                    {item.title === "Nghỉ phép có lương" && (
                      <FaMoneyCheckAlt className="fas fa-book-open mr-2 text-blue-500" />
                    )}
                    {item.title === "Đào tạo" && (
                      <FaChalkboardTeacher className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Giải thưởng" && (
                      <FaTrophy className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Thư viện" && (
                      <FaBookOpen className="fas fa-book-open mr-2 text-blue-500" />
                    )}
                    {item.title === "Máy tính xách tay" && (
                      <FaLaptop className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Điện thoại" && (
                      <FaPhone className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Cơ hội du lịch" && (
                      <FaPlane className="fas fa-plane mr-2 text-blue-500" />
                    )}
                    {item.title === "Hoạt động nhóm" && (
                      <FaUsers className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Xe đưa đón" && (
                      <FaBus className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Căn-tin" && (
                      <FaUtensils className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Phiếu giảm giá" && (
                      <FaPercent className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Nhà trẻ" && (
                      <FaChild className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    {item.title === "Khác" && (
                      <FaEllipsisH className="fas fa-dollar-sign mr-2 text-blue-500" />
                    )}
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-bold">Thông tin việc làm</p>
            <h2 className="mb-4 text-xl font-bold"></h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 flex items-center">
                  <FaCalendarAlt className="fas fa-calendar-alt mr-2"></FaCalendarAlt>
                  <span className="text-[#939393]">NGÀY ĐĂNG</span>
                </div>
                <div className="mb-4 ml-6">
                  {new Date(formData?.datePosted).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </div>

                <div className="mb-2 flex items-center">
                  <FaBriefcase className="fas fa-briefcase mr-2"></FaBriefcase>
                  <span className="text-[#939393]">NGÀNH NGHỀ</span>
                </div>
                <div className="mb-4 ml-6">
                  Công Nghệ Thông Tin/Viễn Thông {">"} Phần Mềm Máy Tính
                </div>

                <div className="mb-2 flex items-center">
                  <FaLaptopCode className="fas fa-laptop-code mr-2"></FaLaptopCode>
                  <span className="text-[#939393]">LĨNH VỰC</span>
                </div>
                <div className="mb-4 ml-6">{formData?.jobField}</div>

                <div className="mb-2 flex items-center">
                  <FaUserClock className="fas fa-user-clock mr-2"></FaUserClock>
                  <span className="text-[#939393]">
                    SỐ NĂM KINH NGHIỆM TỐI THIỂU
                  </span>
                </div>
                <div className="mb-4 ml-6">{formData?.minExperience}</div>

                <div className="mb-2 flex items-center">
                  <FaGraduationCap className="fas fa-graduation-cap mr-2"></FaGraduationCap>
                  <span className="text-[#939393]">
                    TRÌNH ĐỘ HỌC VẤN TỐI THIỂU
                  </span>
                </div>
                <div className="mb-4 ml-6">{formData?.educationLevel}</div>

                <div className="mb-2 flex items-center">
                  <FaBirthdayCake className="fas fa-birthday-cake mr-2"></FaBirthdayCake>
                  <span className="text-[#939393]">ĐỘ TUỔI MONG MUỐN</span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.minAge || "Không hiển thị"}-
                  {formData?.maxAge || "Không hiển thị"}{" "}
                </div>

                <div className="mb-2 flex items-center">
                  <FaUsers className="fas fa-users mr-2"></FaUsers>
                  <span className="text-[#939393]">SỐ LƯỢNG TUYỂN DỤNG</span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.numberOfPositions || "Không hiển thị"}
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center">
                  <FaUserTie className="fas fa-user-tie mr-2"></FaUserTie>
                  <span className="text-[#939393]">CẤP BẬC</span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.jobLevel || "Không hiển thị"}
                </div>

                <div className="mb-2 flex items-center">
                  <FaCogs className="fas fa-cogs mr-2"></FaCogs>
                  <span className="text-[#939393]">KỸ NĂNG</span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.keywords?.map((skill: any, index: any) => (
                    <span key={index} className="mr-1">
                      {skill}
                      {index < formData?.keywords.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <div className="mb-2 flex items-center">
                  <FaLanguage className="fas fa-language mr-2"></FaLanguage>
                  <span className="text-[#939393]">
                    NGÔN NGỮ TRÌNH BÀY HỒ SƠ
                  </span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.language || "Không hiển thị"}
                </div>

                <div className="mb-2 flex items-center">
                  <FaFlag className="fas fa-flag mr-2"></FaFlag>
                  <span className="text-[#939393]">QUỐC TỊCH</span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.nationality === "1"
                    ? "Người Việt"
                    : formData?.nationality === "2"
                    ? "Người nước ngoài"
                    : "Bất kỳ"}
                </div>

                <div className="mb-2 flex items-center">
                  <FaVenusMars className="fas fa-venus-mars mr-2"></FaVenusMars>
                  <span className="text-[#939393]">GIỚI TÍNH</span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.gender === "1"
                    ? "Nam"
                    : formData?.gender === "2"
                    ? "Nữ"
                    : "Bất kỳ"}
                </div>

                <div className="mb-2 flex items-center">
                  <FaHeart className="fas fa-heart mr-2"></FaHeart>
                  <span className="text-[#939393]">TÌNH TRẠNG HÔN NHÂN</span>
                </div>
                <div className="mb-4 ml-6">
                  {formData?.maritalStatus === "1"
                    ? "Chưa kết hôn"
                    : formData?.maritalStatus === "2"
                    ? "Đã kết hôn"
                    : "Bất kỳ"}
                </div>
              </div>
            </div>
            <h2 className="mb-4 mt-6 text-xl font-bold">Địa điểm làm việc</h2>
            <div className="flex items-center">
              <FaLocationDot className="fas fa-map-marker-alt mr-2"></FaLocationDot>
              <span>{formData?.companyAddress || "Chưa cập nhật"}</span>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <Button
            variant="destructive"
            onClick={() => handleReject(formData._id)}
            disabled={
              formData.statusSeeking == false &&
              formData.statusApproval == false
            }
          >
            <XCircle className="mr-2 h-4 w-4" />
            Từ chối
          </Button>
          <Button
            variant="outline"
            onClick={() => handleApprove(formData._id)}
            disabled={
              formData.statusSeeking == true && formData.statusApproval == true
            }
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Duyệt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedJobPosting;
