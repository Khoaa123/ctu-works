"use client";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBriefcase,
  FaCheck,
  FaGlasses,
  FaMagnifyingGlass,
  FaSackDollar,
  FaSearchengin,
  FaSliders,
} from "react-icons/fa6";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { FaMapMarkerAlt, FaSearch, FaTh } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react";
import { toast } from "react-toastify";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

const Search = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [userData, setUserData] = useState([
    {
      _id: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      seekJobMode: false,
      dateOfBirth: "",
      createdAt: "",
      jobTitle: "",
      address: "",
      MSSV: "",
      gender: "",
      currentDegree: "",
      currentIndustries: "",
      currentJobFunction: "",
      yearsExperience: "",
      currentSalary: "",
      highestDegree: "",
      country: "",
      city: "",
      district: "",
      maritalStatusId: "",
      avatar: "",
      workingPreferences: {
        locations: [""],
        jobFunction: "",
        companyIndustries: [""],
        salary: "",
        desiredJobLevel: "",
        isRelocate: 1,
        benefits: [],
      },
    },
  ]);

  const [jobPosts, setJobPosts] = useState<
    Array<{ _id: string; title: string }>
  >([]);
  const [selectedJobPost, setSelectedJobPost] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Tất cả");
  const [selectedProfile, setSelectedProfile] = useState(userData[0]);
  const options = ["Tất cả", "Công ty", "Chức vụ", "Kỹ năng", "Tên"];
  const [showJobPostModal, setShowJobPostModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetUsers();
      setUserData(data.data);
      setSelectedProfile(data.data[0]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchJobPosts = async () => {
      const data = await fetchGetJobPosts();
      setJobPosts(data.data);
    };
    fetchJobPosts();
  }, []);

  const fetchGetUsers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getAll`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const fetchGetJobPosts = async () => {
    const recruiterId = decodedToken?.userid;
    const res = await fetch(
      `http://localhost:3001/api/jobpost/get-my-jobpost/${recruiterId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const handleCreateHistoryViewUser = (id: any) => {
    const recruiterId = decodedToken?.userid;
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/history-view-user/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          recruiterId: recruiterId,
        }),
      }
    );
  };

  const handleSendInvitation = async (jobPostId: string) => {
    const recruiterId = decodedToken?.userid;
    const res = await fetch(`http://localhost:3001/api/send-invite/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recruiterId: recruiterId,
        userId: selectedProfile._id,
        jobId: jobPostId,
      }),
    });

    const result = await res.json();
    if (result.status === "OK") {
      toast.success("Lời mời đã được gửi thành công");
    } else {
      toast.error("Gửi lời mời thất bại: " + result.message);
    }
    setShowJobPostModal(false);
  };

  const handleSelectJobPost = (jobPostId: string) => {
    setSelectedJobPost(jobPostId);
  };

  return (
    <>
      <div className="max-h-auto">
        <HeaderRecruiter />
        <div className="ml-[10%] mr-[10%] p-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full rounded border bg-gray-100 p-2 pl-10"
              />
              <FaSearch className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
            </div>
            <div className="relative inline-block w-56 text-left">
              <div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {selectedOption}
                  <i
                    className={`fas fa-chevron-${isOpen ? "up" : "down"} ml-2`}
                  ></i>
                </button>
              </div>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option) => (
                      <a
                        key={option}
                        href="#"
                        onClick={() => {
                          setSelectedOption(option);
                          setIsOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          selectedOption === option ? "bg-blue-100" : ""
                        }`}
                        role="menuitem"
                      >
                        {option}
                        {selectedOption === option && (
                          <FaCheck className="fas fa-check ml-2" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="flex items-center rounded border bg-gray-100 p-2">
              <FaSliders className="fas fa-sliders-h mr-1" />
              Bộ lọc
              <span className="ml-1 rounded border bg-white px-2 py-1"></span>
            </button>
            <button className="rounded bg-orange-500 p-2 text-white">
              Tìm kiếm
            </button>
          </div>
          <div className="mt-4 flex">
            <p>14376 kết quả tìm kiếm</p>
            <div className="flex items-center">
              <button className="rounded border bg-gray-100 p-2">
                <FaBars className="fas fa-bars"></FaBars>
              </button>
              <button className="ml-2 rounded border bg-blue-100 p-2">
                <FaTh className="fas fa-th"></FaTh>
              </button>
            </div>
          </div>
        </div>
        <div className="ml-[10%] flex h-screen">
          <div className="w-1/4 border-r border-gray-200 p-4">
            {userData.map((profile, index) => (
              <div
                onClick={() => setSelectedProfile(profile)}
                key={index}
                className="mb-4 cursor-pointer rounded border border-gray-200 p-2 hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-blue-600">
                      {profile?.fullName}
                    </div>
                    <div className="text-gray-500">{profile?.jobTitle}</div>
                  </div>
                  {profile?.seekJobMode && (
                    <div className="text-sm text-blue-500">
                      {profile?.seekJobMode}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  Cập nhật gần nhất: Vừa cập nhật
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-center">
              <button className="rounded border border-gray-300 p-2">1</button>
              <button className="rounded border border-gray-300 p-2">2</button>
              <button className="rounded border border-gray-300 p-2">3</button>
              <button className="rounded border border-gray-300 p-2">
                ...
              </button>
              <button className="rounded border border-gray-300 p-2">
                719
              </button>
            </div>
          </div>
          <div className="w-3/4 p-4">
            {selectedProfile ? (
              <>
                <div className="mb-4 rounded border border-gray-200 p-4">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 h-16 w-16 rounded-full bg-gray-200">
                      <Image
                        src={
                          selectedProfile?.avatar ||
                          "https://employer.vietnamworks.com/v3/candidate/search/static/media/Avatars.9db75fc247bf6e9dd55b92ddcc723670.svg"
                        }
                        alt=""
                        height={100}
                        width={100}
                      />
                    </div>
                    <div>
                      <div className="text-xl font-bold">
                        {selectedProfile?.fullName}
                      </div>
                      <div className="text-gray-500">
                        {selectedProfile?.jobTitle}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <div className="mb-2 flex items-center">
                      <FaBriefcase className="fas fa-briefcase mr-1" />
                      <span className="mr-4">
                        {selectedProfile?.yearsExperience} năm
                      </span>
                    </div>
                    <div className="mb-2 flex items-center">
                      <FaSackDollar className="fas fa-dollar-sign mr-1" />
                      <span className="mr-4">
                        $ {selectedProfile?.currentSalary}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center">
                      <FaMapMarkerAlt className="fas fa-map-marker-alt mr-1" />
                      <span>{selectedProfile?.address}</span>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <Link href={`/profileuser/${selectedProfile._id}`}>
                      <button
                        onClick={() =>
                          handleCreateHistoryViewUser(selectedProfile._id)
                        }
                        className="mr-2 rounded bg-orange-500 p-2 text-white"
                      >
                        Xem chi tiết hồ sơ
                      </button>
                    </Link>

                    <button
                      onClick={() => setShowJobPostModal(true)}
                      className="rounded bg-blue-500 p-2 text-white"
                    >
                      Gửi lời mời online
                    </button>
                  </div>
                </div>
                <div className="mb-4 rounded border border-gray-200 p-4">
                  <div className="mb-4 text-lg font-bold">Thông tin chung</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-2">
                        <span className="font-bold">Vị trí hiện tại:</span>{" "}
                        {selectedProfile?.currentJobFunction}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Cấp bậc hiện tại:</span>{" "}
                        {selectedProfile?.currentDegree}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Ngành nghề:</span>
                        {selectedProfile?.currentJobFunction}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Lĩnh Vực:</span>
                        {selectedProfile?.currentIndustries}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Cấp bậc mong muốn:</span>{" "}
                        {selectedProfile?.workingPreferences.desiredJobLevel ||
                          "--"}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Mức lương mong muốn:</span>{" "}
                        {selectedProfile?.workingPreferences.salary || "--"} USD
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="font-bold">Ngày sinh:</span>
                        {selectedProfile?.dateOfBirth}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Giới tính:</span>{" "}
                        {selectedProfile?.gender}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Tình trạng hôn nhân:</span>{" "}
                        {selectedProfile?.maritalStatusId}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Địa chỉ:</span>
                        {selectedProfile?.address}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">
                          Nơi làm việc mong muốn:
                        </span>
                        {selectedProfile?.workingPreferences.locations || "--"}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Bằng cấp:</span>
                        {selectedProfile?.highestDegree}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded border border-gray-200 p-4">
                  <div className="mb-4 text-lg font-bold">Hồ sơ đính kèm</div>
                  <div className="rounded bg-gray-100 p-4"></div>
                </div>
                <div className="mt-4 rounded border border-gray-200 p-4">
                  <div className="mb-4 text-lg font-bold">Hồ sơ đính kèm</div>
                  <div className="rounded bg-gray-100 p-4">
                    <span>CV ở đây</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                Select a profile to view details
              </div>
            )}
          </div>
        </div>
      </div>

      {showJobPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Chọn tin tuyển dụng</h2>
            <ScrollArea className="h-[400px] pr-4">
              {jobPosts.map((jobPost: any) => (
                <Card
                  key={jobPost._id}
                  className={`mb-4 cursor-pointer transition-all ${
                    selectedJobPost === jobPost._id
                      ? "border-blue-500 shadow-md"
                      : ""
                  }`}
                  onClick={() => handleSelectJobPost(jobPost._id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{jobPost.jobTitle}</span>
                      <Badge
                        variant={
                          jobPost.jobType === "Toàn thời gian"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {jobPost.jobType}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>{jobPost.companyName}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{jobPost.companyAddress}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>
                          {jobPost.minSalary} - {jobPost.maxSalary} USD
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>
                          Hết hạn:{" "}
                          {new Date(jobPost.expirationDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{jobPost.jobLevel}</Badge>
                      <Badge variant="outline">{jobPost.jobIndustry}</Badge>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowJobPostModal(false)}
                className="rounded bg-gray-300 px-4 py-2"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  if (selectedJobPost) {
                    handleSendInvitation(selectedJobPost);
                  }
                }}
                className="rounded bg-blue-500 px-4 py-2 text-white"
                disabled={!selectedJobPost}
              >
                Gửi lời mời
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
