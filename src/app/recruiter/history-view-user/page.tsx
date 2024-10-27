"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaFolder, FaFolderOpen, FaHeart, FaUser, FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import RecruiterSidebar from "@/components/UserSidebar/RecruiterSidebar";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";

export interface JwtPayload {
    userid: string;
    email: string;
    fullName: string;
    role: string;
}

const tabs = [
    { id: "profileViews", label: "Nhà tuyển dụng xem hồ sơ" },
    { id: "followCompany", label: "Theo dõi công ty" },
];

const HistoryViewUser = () => {
    const cookies = useCookies();
    const accessToken = cookies.get("accessTokenRecruiter");
    const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
    const [historyViews, setHistoryViews] = useState([
        {
            fullName: "",
            avatar: "",
            currentIndustries: "",
            currentJobFunction: "",
            highestDegree: "",
            _id: "",
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fecthGetHistory();
            setHistoryViews(data.data);
            console.log(data.data)
        };
        fetchData();
    }, []);
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
        <>
            <HeaderRecruiter />
            <div className="bg-[#F7F8FA]">
                <div className="container py-6">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                            <RecruiterSidebar />
                        </div>
                        <div className="col-span-3 flex flex-col gap-5">
                            <h1 className="mb-3 rounded-md border bg-white p-4 font-bold">
                                Những ứng viên đã xem gần đây
                            </h1>
                            <div className="rounded-md border bg-white">
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {historyViews.map((item) => (
                                            <Link href={`/profileuser/${item?._id}`}
                                                className="group flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 hover:bg-[#f9fcff]"
                                            >
                                                <div className="flex flex-grow items-center gap-6">
                                                    <Image
                                                        src={item?.avatar}
                                                        alt={`avatar`}
                                                        className="rounded-lg"
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <div className="max-w-[calc(100%-200px)] flex-grow">
                                                        <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                                                            {item?.fullName}
                                                        </h3>
                                                        <div className="flex items-center gap-2">
                                                            <FaFolderOpen size={15} color="gray" />
                                                            <p className="truncate text-gray-600">{item?.currentIndustries}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaUsers size={15} color="gray" />
                                                            <span className="truncate text-gray-600">{item?.currentJobFunction}</span>
                                                            <FaBriefcase size={15} color="gray" />
                                                            <span className="truncate text-gray-600">{item?.highestDegree}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryViewUser;
