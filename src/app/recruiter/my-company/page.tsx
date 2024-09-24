"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaFolder, FaFolderOpen, FaHeart, FaUser, FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

    const [applyJob, setApplyJob] = useState([
        {
            companyLogo: "",
            companyName: "",
            jobSalary: "",
            jobTitle: "",
            jobLocation: [],
            jobPostId: '',
            jobPostTitle: '',
            status: '',
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            _id: "",
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchApplyJob();
            setApplyJob(data.data);
            console.log(data.data)
        };
        fetchData();
    }, []);
    const fetchApplyJob = async () => {
        const id = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/get-my-apply/66e88fd0f696118a75d38ae0`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    };
    const [activeTab, setActiveTab] = useState("profileViews");
    return (
        <div className="">
            <h1 className="mb-3 rounded-md border bg-white p-4 font-bold">
                Hồ sơ ứng viên
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
                    {activeTab === "application" && (
                        <div className="space-y-4">
                            {applyJob.map((job) => (
                                <Accordion
                                    type="single"
                                    defaultValue="item-1"
                                    collapsible
                                >
                                    <Link
                                        href={`/job/${job.jobPostId}`}
                                        key={job.jobPostId}
                                        className="group flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 hover:bg-[#f9fcff]"
                                    >
                                        <div className="flex flex-grow items-center gap-6">
                                            <Image
                                                src={job.companyLogo}
                                                alt={`${job.companyName} logo`}
                                                className="rounded-lg"
                                                width={60}
                                                height={60}
                                            />
                                            <div className="max-w-[calc(100%-200px)] flex-grow">
                                                <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                                                    {job.jobPostTitle}
                                                </h3>
                                                <p className="truncate text-gray-600">{job.companyName}</p>
                                                <p className="text-sm text-gray-500">
                                                    {job?.jobLocation?.map((loc, locIndex) => (
                                                        <span key={locIndex}>{loc}{locIndex < job.jobLocation.length - 1 ? ', ' : ''}</span>
                                                    ))}
                                                </p>
                                                <p className="text-sm text-[#ff7d55]">{job.jobSalary}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink-0 items-center space-x-4">
                                            {/* <button className="text-blue-500 hover:text-blue-600">
                                        <FaHeart size={20} />
                                        </button> */}
                                            <button disabled className="whitespace-nowrap rounded-lg bg-orange-400 px-4 py-2 text-white transition-colors hover:bg-orange-500">
                                                {job.status}
                                            </button>
                                        </div>
                                    </Link>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Danh sách ứng viên ứng tuyển</AccordionTrigger>
                                        <AccordionContent>
                                            <Link
                                                href={`/job/${job.fullName}`}
                                                key={job.jobPostId}
                                                className="group flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 hover:bg-[#f9fcff]"
                                            >
                                                <div className="flex flex-grow items-center gap-6">
                                                    <Image
                                                        src={job.companyLogo}
                                                        alt={`${job.companyName} logo`}
                                                        className="rounded-lg"
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <div className="max-w-[calc(100%-200px)] flex-grow">
                                                        <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                                                            {job.fullName}
                                                        </h3>
                                                        <p className="truncate text-gray-600">{job.email}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {job?.address}
                                                        </p>
                                                        <p className="text-sm text-[#ff7d55]">{job.phoneNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-shrink-0 items-center space-x-4">
                                                    {/* <button className="text-blue-500 hover:text-blue-600">
                                        <FaHeart size={20} />
                                        </button> */}
                                                    <button disabled className="whitespace-nowrap rounded-lg bg-orange-400 px-4 py-2 text-white transition-colors hover:bg-orange-500">
                                                        {job.status}
                                                    </button>
                                                </div>
                                            </Link>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                            ))}
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

export default MyCompany;
