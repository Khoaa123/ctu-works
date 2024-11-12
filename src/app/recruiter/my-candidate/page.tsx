"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaFolder,
  FaFolderOpen,
  FaHeart,
  FaList,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import {
  FaCloudUploadAlt,
  FaInfoCircle,
  FaSearch,
  FaThLarge,
} from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

const tabs = [
  { id: "profileViews", label: "Đã xem gần đây" },
  { id: "application", label: "Lời mời ứng tuyển" },
];

const MyCandidate = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [following, setFollowing] = useState([
    {
      companyName: "",
      companyLogo: "",
      companyIndustries: "",
      companyJob: 0,
      companyFollowing: 0,
      jobPostId: "",
      recruiterId: "",
      _id: "",
    },
  ]);

  const [applyJob, setApplyJob] = useState([
    [
      {
        status: "",
        _id: "",
      },
    ],
  ]);
  const [myJobpost, setMyJobpost] = useState([
    {
      companyLogo: "",
      companyName: "",
      salary: "",
      jobTitle: "",
      location: [],
      jobPostId: "",
      jobPostTitle: "",
      jobInformation: {
        datePosted: "",
      },
      status: "",
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      _id: "",
      applyJob: applyJob,
    },
  ]);
  const [userApplyDetail, setUserApplyDetail] = useState([
    [
      {
        fullName: "",
        email: "",
        address: "",
        phoneNumber: "",
        _id: "",
      },
    ],
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetMyJob();
      setMyJobpost(data.data);
      if (data?.data) {
        const dataApply = await Promise.all(
          data.data.map(async (item: any) => {
            const res = await fetchApplyJob(item._id);
            return res.data;
          })
        );
        const userInfo = await Promise.all(
          dataApply?.map(async (item: any) => {
            const dataUser = await Promise.all(
              item.map(async (item: any) => {
                const id = item.userId;
                const res = await fetchDetailsUser(id);
                return res.data;
              })
            );
            return dataUser;
          })
        );
        setApplyJob(dataApply);
        setUserApplyDetail(userInfo);
      }
    };
    fetchData();
  }, []);

  const fetchDetailsUser = async (id: any) => {
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

  const fetchApplyJob = async (jobpostId: any) => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/get-my-apply/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobpostId: jobpostId,
        }),
      }
    );
    return res.json();
  };

  const fetchGetMyJob = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/get-my-jobpost/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const updateApply = async (id: any, status: any) => {
    const res = await handleUpdateApply(id, status);
    if (res.status === "OK") {
      toast.success("Cập nhật thành công");
      setApplyJob((prevApplyJob) =>
        prevApplyJob.map((jobs, jobIndex) =>
          jobs.map((job) => (job._id === id ? { ...job, status: status } : job))
        )
      );
    } else {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleUpdateApply = async (id: any, status: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: status,
        }),
      }
    );
    return res.json();
  };

  const [activeTab, setActiveTab] = useState("profileViews");

  function areObjectsEqual(obj1: any, obj2: any) {
    if (Object.keys(obj1)?.length !== Object.keys(obj2)?.length) {
      return false;
    }
    for (const key in obj1) {
      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        if (!areObjectsEqual(obj1[key], obj2[key])) {
          return false;
        }
      } else {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
    return true;
  }

  const [applySelect, setApplySelect] = useState(0);
  const handleSelectJob = (job: any) => {
    setApplySelect(job);
  };

  const Test = () => {
    console.log(applyJob, applySelect);
  };

  return (
    <div>
      <HeaderRecruiter />
      <div className="p-4">
        <div className="p-4">
          <button onClick={Test}>Test</button>
          <div className="mb-4 flex items-center justify-between border-b pb-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span>Việc làm</span>
                <div className="relative">
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                    onChange={(e) => handleSelectJob(e.target.value)}
                  >
                    {myJobpost &&
                      myJobpost.map((job, index) => (
                        <option key={index} value={index}>
                          {job.jobTitle}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Tìm kiếm theo email, tên hoặc số điện thoại"
                className="rounded border px-2 py-1"
              />
              <FaSearch className="fas fa-search" />
              <div className="flex items-center space-x-2">
                <FaThLarge className="fas fa-th-large" />
                <FaList className="fas fa-list" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="rounded border bg-blue-100 px-4 py-2">
                Tất cả
              </button>
            </div>
            <div className="relative">
              <button className="rounded border px-4 py-2">Kinh nghiệm</button>
            </div>
            <div className="relative">
              <button className="rounded border px-4 py-2">Mức lương</button>
            </div>
            <button className="rounded bg-gray-200 px-4 py-2">
              Tất cả bộ lọc
            </button>
          </div>
        </div>
        <div className="flex w-full space-x-2">
          <div className="mb-4 flex flex-1 items-center justify-between rounded border border-gray-300 bg-white p-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">1. Nhận hồ sơ</span>
              <span className="rounded-full bg-red-500 px-2 text-white">0</span>
            </div>
            <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
          </div>
          <div className="mb-4 flex flex-1 items-center justify-between rounded border border-gray-300 bg-white p-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">2. Duyệt hồ sơ</span>
              <span className="rounded-full bg-red-500 px-2 text-white">0</span>
            </div>
            <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
          </div>
          <div className="mb-4 flex flex-1 items-center justify-between rounded border border-gray-300 bg-white p-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">3. Đề nghị nhận việc</span>
              <span className="rounded-full bg-red-500 px-2 text-white">0</span>
            </div>
            <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
          </div>
          <div className="mb-4 flex flex-1 items-center justify-between rounded border border-gray-300 bg-white p-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">4. Đã tuyển</span>
              <span className="rounded-full bg-red-500 px-2 text-white">0</span>
            </div>
            <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
          </div>
          <div className="mb-4 flex flex-1 items-center justify-between rounded border border-gray-300 bg-white p-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">5. Không đạt</span>
              <span className="rounded-full bg-red-500 px-2 text-white">0</span>
            </div>
            <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
          </div>
          <div className="mb-4 flex flex-1 items-center justify-between rounded border border-gray-300 bg-white p-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">6. Ứng viên từ chối</span>
              <span className="rounded-full bg-red-500 px-2 text-white">0</span>
            </div>
            <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
          </div>
        </div>
        <div className="flex min-h-80 flex-col gap-4 overflow-y-auto rounded border border-gray-300 bg-white p-2">
          {applyJob[applySelect]?.length > 0 ? (
            userApplyDetail[applySelect].map((job: any, index: any) => (
              <Link
                key={job.userId}
                href={`/profileuser/${job._id}`}
                className="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-blue-400 bg-white p-4 transition-all duration-300 hover:bg-[#f9fcff]"
              >
                <div className="flex flex-grow items-center gap-6">
                  <Image
                    src={myJobpost[applySelect].companyLogo}
                    alt={`companylogo`}
                    className="rounded-lg"
                    width={60}
                    height={60}
                  />
                  <div className="max-w-[calc(100%-200px)] flex-grow">
                    <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                      {job?.fullName}
                    </h3>
                    <p className="truncate text-gray-600">{job?.email}</p>
                    <p className="text-sm text-gray-500">{job?.address}</p>
                    <p className="text-sm text-[#ff7d55]">{job?.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center space-x-4">
                  <Select
                    value={applyJob[applySelect][index].status}
                    onValueChange={(value) =>
                      updateApply(applyJob[applySelect][index]._id, value)
                    }
                  >
                    <SelectTrigger
                      className={`whitespace-nowrap rounded-lg px-4 py-2 text-white transition-colors hover:bg-orange-500 
                                            ${
                                              applyJob[applySelect][index]
                                                .status === "Chờ phản hồi"
                                                ? "bg-yellow-600"
                                                : ""
                                            } 
                                            ${
                                              applyJob[applySelect][index]
                                                .status === "Mời phỏng vấn"
                                                ? "bg-sky-500"
                                                : ""
                                            } 
                                            ${
                                              applyJob[applySelect][index]
                                                .status === "Từ chối"
                                                ? "bg-red-500"
                                                : ""
                                            } 
                                            ${
                                              applyJob[applySelect][index]
                                                .status === "Chấp nhận"
                                                ? "bg-green-500"
                                                : ""
                                            }`}
                    >
                      <SelectValue placeholder="Vui lòng chọn..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-yellow-600"
                        value="Chờ phản hồi"
                      >
                        Chờ phản hồi
                      </SelectItem>
                      <SelectItem
                        className="text-sky-500"
                        value="Mời phỏng vấn"
                      >
                        Mời phỏng vấn
                      </SelectItem>
                      <SelectItem className="text-red-500" value="Từ chối">
                        Từ chối
                      </SelectItem>
                      <SelectItem className="text-green-500" value="Chấp nhận">
                        Chấp nhận
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex min-h-60 flex-col items-center">
              <img
                src="https://employer.vietnamworks.com/v2/img/none-of-candidate.svg"
                alt="No candidates illustration"
                className="mb-4"
              />
              <span className="text-gray-700">
                Không có ứng viên nào cho việc làm này
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center space-x-2 rounded bg-blue-100 p-4 text-blue-700">
          <FaInfoCircle className="fas fa-info-circle" />
          <span>
            Hồ sơ sẽ được lưu trữ tại trang Quản Lý Tuyển Dụng lên tới 24 tháng.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyCandidate;
