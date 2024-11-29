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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react";
import { toast } from "react-toastify";
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
  const accessTokenRecruiter = cookies.get("accessTokenRecruiter");
  const decodedTokenRecruiter = accessTokenRecruiter ? jwtDecode<JwtPayload>(accessTokenRecruiter) : null;
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
  const [showJobPostModal, setShowJobPostModal] = useState(false);
  const [selectedJobPost, setSelectedJobPost] = useState<any>(null);
  const [jobPosts, setJobPosts] = useState<
    Array<{ _id: string; title: string }>
  >([]);
  useEffect(() => {
    const fetchJobPosts = async () => {
      const data = await fetchGetJobPosts();
      setJobPosts(data.data);
    };
    fetchJobPosts();
  }, []);

  const fetchGetJobPosts = async () => {
    const recruiterId = decodedTokenRecruiter?.userid;
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
  const handleSelectJobPost = (jobPostId: string) => {
    setSelectedJobPost(jobPostId);
  };
  const handleSendInvitation = async (jobPostId: string) => {
    const recruiterId = decodedTokenRecruiter?.userid;
    const userId = location.pathname.split("/profileuser/")[1];
    const res = await fetch(`http://localhost:3001/api/send-invite/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recruiterId: recruiterId,
        userId: userId,
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
            <button
              onClick={() => setShowJobPostModal(true)}
              className="rounded bg-blue-500 p-2 text-white"
            >
              Gửi lời mời online
            </button>
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
        {showJobPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 rounded-lg bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">Chọn tin tuyển dụng</h2>
              <ScrollArea className="h-[400px] pr-4">
                {jobPosts.map((jobPost: any) => (
                  <Card
                    key={jobPost._id}
                    className={`mb-4 cursor-pointer transition-all ${selectedJobPost === jobPost._id
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
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default CompanyDetail;
