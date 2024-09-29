"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "@images/logo.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoSearch } from "react-icons/go";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButotn";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { FaPhoneAlt, FaBriefcase, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { FaHeart, FaPaperPlane, FaSackDollar } from "react-icons/fa6";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
const CompanyDetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const jobSectionRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollToJobSection = () => {
    if (jobSectionRef.current) {
      jobSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  const [detailsUser, setDetailsUser] = useState(
    {
      fullName: "",
      dateOfBirth: "",
      phoneNumber: "",
      jobTitle: "",
      currentDegree: "",
      currentIndustries: "",
      currentJobFunction: "",
      yearsExperience: "",
      currentSalary: "",
      highestDegree: "",
      country: "",
      city: "",
      district: "",
      address: "",
      gender: "",
      maritalStatusId: "",
      MSSV: "",
      avatar: "",
      updatedAt: "",
      workingPreferences: {
        locations: [""],
        jobFunction: "",
        companyIndustries: [""],
        salary: "",
        desiredJobLevel: "",
        isRelocate: 1,
        benefits: [],
      },
      _id: "",
    },
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetailsUser();
      setDetailsUser(data.data);
      // console.log(data.data);
    };
    fetchData();
  }, []);

  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const fetchDetailsUser = async () => {
    const id = location.pathname.split("/profileuser/")[1];
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get-details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  const router = useRouter();

  const navigate = (id: string) => {
    router.push(`/job/${id}`);
  };

  return (
    <>
      <HeaderRecruiter />
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center">
              <Image src={detailsUser?.avatar || "https://employer.vietnamworks.com/v3/candidate/search/static/media/Avatars.9db75fc247bf6e9dd55b92ddcc723670.svg"} alt="" height={100} width={100} />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold">{detailsUser?.fullName}</h1>
              <div className="flex items-center mb-2">
                <FaPhoneAlt className="fas fa-phone-alt mr-1"></FaPhoneAlt>
                <span className="mr-4">{detailsUser?.phoneNumber}</span>
              </div>
              <div className="flex items-center mb-4 text-gray-600">
                <div className="flex items-center mb-2">
                  <FaBriefcase className="fas fa-briefcase mr-1" />
                  <span className="mr-4">{detailsUser?.yearsExperience} năm</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaSackDollar className="fas fa-dollar-sign mr-1" />
                  <span className="mr-4">$ {detailsUser?.currentSalary}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="fas fa-map-marker-alt mr-1" />
                  <span>{detailsUser?.address}</span>
                </div>
              </div>
              <p className="text-gray-600 mr-1">Cập nhật gần nhất:
                {new Date(detailsUser?.updatedAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Xem thông tin liên hệ (~2 Điểm)</button>
            <input type="text" placeholder="Gửi lời mời ứng tuyển" className="border rounded px-4 py-2 ml-4" />
            <button className="ml-2"><FaPaperPlane className="fas fa-paper-plane"/></button>
            <button className="ml-2"><FaHeart className="fas fa-heart"/></button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-lg font-bold">Thông tin chung</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>Vị trí hiện tại</div><div>{detailsUser?.jobTitle || "--"}</div>
            <div>Cấp bậc hiện tại</div><div>{detailsUser?.currentDegree || "--"}</div>
            <div>Ngành nghề</div><div>{detailsUser?.currentJobFunction || "--"}</div>
            <div>Lĩnh Vực</div><div>{detailsUser?.currentIndustries || "--"}</div>
            <div>Cấp bậc mong muốn</div><div>{detailsUser?.workingPreferences?.desiredJobLevel || "--"}</div>
            <div>Mức lương mong muốn</div><div>{detailsUser?.workingPreferences?.salary || "--"} USD</div>
            <div>Ngày sinh</div><div>{detailsUser?.dateOfBirth || "--"}</div>
            <div>Giới tính</div><div>
              {(() => {
                switch (Number(detailsUser?.gender)) {
                  case 1:
                    return "Nam";
                  case 2:
                    return "Nữ";
                  default:
                    return "--";
                }
              })()}
            </div>
            <div>Tình trạng hôn nhân</div>
            <div>
              {(() => {
                switch (Number(detailsUser?.gender)) {
                  case 1:
                    return "Đã kết hôn";
                  case 2:
                    return "Chưa kết hôn";
                  default:
                    return "--";
                }
              })()}
            </div>
            <div>Địa chỉ</div><div>{detailsUser?.address || "--"}</div>
            <div>Nơi làm việc mong muốn</div>
            <div>
              {detailsUser?.workingPreferences?.locations?.map((loc, locIndex) => (
                <span key={locIndex}>{loc}{locIndex < detailsUser?.workingPreferences?.locations.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
            <div>Bằng cấp</div>
            <div>
              {detailsUser?.highestDegree || "--"}
            </div>
            <div>Ngôn ngữ</div><div>English - Cao cấp</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-lg font-bold">Hồ sơ đính kèm</h2>
          <div className="bg-gray-200 p-4 rounded mt-2">
            <div className="flex items-center">
              <i className="fas fa-file-pdf text-gray-600 text-2xl"></i>
              <span className="ml-2">managing partner</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span>1 / 3</span>
              <div>
                <button className="px-2"><i className="fas fa-minus"></i></button>
                <span>97%</span>
                <button className="px-2"><i className="fas fa-plus"></i></button>
              </div>
              <button className="px-2"><i className="fas fa-download"></i></button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-lg font-bold">Ứng viên phù hợp</h2>
          <div className="mt-2">
            {[
              { name: "Le Phan", title: "Legal Counsel", company: "Vietnam Satellite Digital Television Co Ltd", experience: "5 năm", salary: "$1200" },
              { name: "Huy Hoàng Đỗ", title: "Legal Counsel", company: "FPT software", experience: "3 năm", salary: "$1000" },
              { name: "My Nguyễn Thị", title: "Senior Legal Counsel", company: "VNTRAVEL., JSC. (a member of VNLIFE Group)", experience: "8 năm", salary: "$1000" },
              { name: "Lan Vũ Thị Minh", title: "Senior Legal Counsel", company: "Công ty TNHH LITEON Việt Nam", experience: "10 năm", salary: "$2000" },
              { name: "Giang Nguyen", title: "Group General Legal Counsel", company: "Thien Minh Group (TMG)", experience: "20 năm", salary: "Thương lượng" }
            ].map((candidate, index) => (
              <div key={index} className="flex items-center mt-2">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h3 className="font-bold">{candidate.name}</h3>
                  <p className="text-gray-600">{candidate.title}</p>
                  <p className="text-gray-600">{candidate.company}</p>
                  <p className="text-gray-600"><i className="fas fa-briefcase"></i> {candidate.experience} <i className="fas fa-dollar-sign"></i> {candidate.salary}</p>
                </div>
              </div>
            ))}
            <p className="text-blue-500 mt-2">Xem thêm</p>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default CompanyDetail;
