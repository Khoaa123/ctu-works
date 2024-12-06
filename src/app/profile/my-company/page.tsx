"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaFolderOpen, FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

const tabs = [
  { id: "profileViews", label: "Nhà tuyển dụng xem hồ sơ của bạn" },
  { id: "followCompany", label: "Theo dõi công ty" },
];

const MyCompany = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [following, setFollowing] = useState([
    {
      companyName: "",
      companyLogo: "",
      companyId: "",
      companyIndustries: "",
      companyJob: 0,
      companyFollowing: 0,
      jobPostId: "",
      recruiterId: "",
      _id: "",
    },
  ]);
  const [profileViews, setProfileViews] = useState([
    {
      companyName: "",
      companyLogo: "",
      companyIndustries: "",
      companyJob: 0,
      follower: [],
      jobPostId: "",
      recruiterId: "",
      _id: "",
    },
  ]);
  const [activeTab, setActiveTab] = useState("profileViews");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);

      // const data = await fetchFollowing();
      // const dataProfileViews = await fecthGetHistory();
      // setProfileViews(dataProfileViews.data);
      // console.log(data.data);
      // setFollowing(data.data);

      setIsLoading(true);
      try {
        const data = await fetchFollowing();
        const dataProfileViews = await fecthGetHistory();
        setProfileViews(dataProfileViews.data);
        setFollowing(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchFollowing = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `http://localhost:3001/api/follow/get-my-follow/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const unFollow = async (id: string) => {
    const userId = decodedToken?.userid;
    try {
      const res = await fetch(
        `http://localhost:3001/api/follow/delete-follow/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      if (res.ok) {
        setFollowing((prevFollowing) =>
          prevFollowing.filter((company) => company._id !== id)
        );
      } else {
        console.error("Failed to unfollow company");
      }
    } catch (error) {
      console.error("Error unfollowing company:", error);
    }
  };

  const fecthGetHistory = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `http://localhost:3001/api/history-view-user/get/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const CompanySkeleton = () => (
    <div className="flex flex-grow items-center gap-6">
      <Skeleton width={60} height={60} />
      <div className="max-w-[calc(100%-200px)] flex-grow">
        <Skeleton width={200} height={24} />
        <Skeleton width={150} height={20} />
        <Skeleton width={100} height={20} />
      </div>
    </div>
  );

  return (
    <div className="">
      <h1 className="mb-3 rounded-md border bg-white p-4 font-bold">
        Công ty của tôi
      </h1>
      <div className="rounded-md border bg-white">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-3 text-sm  ${
                activeTab === tab.id
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 font-medium"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          {activeTab === "profileViews" && (
            <div className="space-y-4">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, index) => <CompanySkeleton key={index} />)
              ) : profileViews.length > 0 ? (
                profileViews.map((company) => (
                  <Link href={`/company/${company?._id}`} key={company._id}>
                    <div className="flex flex-grow items-center gap-6">
                      <Image
                        src={company?.companyLogo}
                        alt={`logo`}
                        className="rounded-lg"
                        width={60}
                        height={60}
                      />
                      <div className="max-w-[calc(100%-200px)] flex-grow">
                        <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                          {company?.companyName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <FaFolderOpen size={15} color="gray" />
                          <p className="truncate text-gray-600">
                            {company?.companyIndustries || "Chưa cập nhật"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUsers size={15} color="gray" />
                          <span className="truncate text-gray-600">
                            {company?.follower.length || 0} lượt theo dõi
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">
                    Chưa có nhà tuyển dụng nào xem hồ sơ của bạn.
                  </p>
                </div>
              )}
            </div>
          )}
          {activeTab === "followCompany" && (
            <div className="space-y-4">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, index) => <CompanySkeleton key={index} />)
              ) : following.length > 0 ? (
                following.map((company) => (
                  <div
                    key={company._id}
                    className="group flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 hover:bg-[#f9fcff]"
                  >
                    <div className="flex flex-grow items-center gap-6">
                      <Image
                        src={company.companyLogo}
                        alt={`${company.companyName} logo`}
                        className="rounded-lg"
                        width={60}
                        height={60}
                      />
                      <div className="max-w-[calc(100%-200px)] flex-grow">
                        <Link href={`/company/${company.companyId}`}>
                          <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                            {company.companyName}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <FaFolderOpen size={15} color="gray" />
                          <p className="truncate text-gray-600">
                            {company.companyIndustries || "Chưa cập nhật"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUsers size={15} color="gray" />
                          <span className="truncate text-gray-600">
                            {company.companyFollowing} lượt theo dõi
                          </span>
                          <FaBriefcase size={15} color="gray" />
                          <span className="truncate text-gray-600">
                            {company.companyJob} việc làm
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center space-x-4">
                      <button
                        className="whitespace-nowrap rounded-lg bg-orange-400 px-4 py-2 text-white transition-colors hover:bg-orange-500"
                        onClick={() => unFollow(company._id)}
                      >
                        Hủy theo dõi
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">
                    Bạn chưa theo dõi công ty nào.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCompany;
