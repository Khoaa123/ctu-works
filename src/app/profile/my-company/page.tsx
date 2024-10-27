"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaFolder, FaFolderOpen, FaHeart, FaUser, FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";

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
            companyIndustries: "",
            companyJob: 0,
            companyFollowing: 0,
            jobPostId: '',
            recruiterId: '',
            _id: "",
        },
    ]);
    const [profileViews, setProfileViews] = useState([
        {
            companyName: "",
            companyLogo: "",
            companyIndustries: "",
            companyJob: 0,
            companyFollowing: 0,
            jobPostId: '',
            recruiterId: '',
            _id: "",
        },
    ])
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchFollowing();
            const dataProfileViews = await fecthGetHistory();
            setProfileViews(dataProfileViews.data)
            console.log(dataProfileViews.data)
            setFollowing(data.data);
        };
        fetchData();
    }, []);
    const fetchFollowing = async () => {
        const id = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/follow/get-my-follow/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    };
    const unFollow = async (id: any) => {
        const userId = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/follow/delete-follow/${id}`,
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
        window.location.reload()
        return res.json();
    };
    const [activeTab, setActiveTab] = useState("profileViews");
    const fecthGetHistory = async () => {
        const id = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/history-view-user/get/${id}`,
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
        <div className="">
            <h1 className="mb-3 rounded-md border bg-white p-4 font-bold">
                Công ty của tôi
            </h1>
            <div className="rounded-md border bg-white">
                <div className="flex border-b">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-3 text-sm  ${activeTab === tab.id
                                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                                : "text-gray-500 hover:text-gray-700 font-medium"
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {<div className="p-4">
                    {activeTab === "profileViews" && (
                        <div className="space-y-4">
                            {profileViews.map((company) => (
                                <Link href={`/company/${company?._id}`}>
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
                                                <p className="truncate text-gray-600">{company?.companyIndustries || "Chưa cập nhật"}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaUsers size={15} color="gray" />

                                                <span className="truncate text-gray-600">{company?.companyFollowing || 0} lượt theo dõi</span>
                                                <FaBriefcase size={15} color="gray" />

                                                <span className="truncate text-gray-600">{company?.companyJob || 0} việc làm</span>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>}
                {<div className="p-4">
                    {activeTab === "followCompany" && (
                        <div className="space-y-4">
                            {following.map((company) => (
                                <Link
                                    href={``}
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
                                            <Link href={`/company/${company.recruiterId}`}>
                                                <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                                                    {company.companyName}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                <FaFolderOpen size={15} color="gray" />
                                                <p className="truncate text-gray-600">{company.companyIndustries}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaUsers size={15} color="gray" />

                                                <span className="truncate text-gray-600">{company.companyFollowing} lượt theo dõi</span>
                                                <FaBriefcase size={15} color="gray" />

                                                <span className="truncate text-gray-600">{company.companyJob} việc làm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink-0 items-center space-x-4">
                                        <button className="whitespace-nowrap rounded-lg bg-orange-400 px-4 py-2 text-white transition-colors hover:bg-orange-500"
                                            onClick={() => unFollow(company._id)}>
                                            Hủy theo dõi
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

export default MyCompany;
