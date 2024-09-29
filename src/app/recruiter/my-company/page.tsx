"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaFolder, FaFolderOpen, FaHeart, FaUser, FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";

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

    const [applyJob, setApplyJob] = useState([[
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
    ]]);
    const [myJobpost, setMyJobpost] = useState([
        {
            companyLogo: "",
            companyName: "",
            salary: "",
            jobTitle: "",
            location: [],
            jobPostId: '',
            jobPostTitle: '',
            status: '',
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            _id: "",
            applyJob: applyJob
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchGetMyJob();
            setMyJobpost(data.data);
            const dataTest = data.data
            data?.data?.map(async (data: any) => {
                const dataApply = await fetchApplyJob(data._id)
                // console.log(data._id)
                applyJob.push(dataApply.data)
                const uniqueArray = applyJob.filter((obj, index, self) => {
                    return self.findIndex((otherObj) => areObjectsEqual(obj, otherObj)) === index;
                });
                uniqueArray.splice(0, 1)
                setApplyJob(uniqueArray)
            })
        };
        fetchData();
    }, []);
    const fetchApplyJob = async (jobpostId: any) => {
        const id = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/get-my-apply/66e88fd0f696118a75d38ae0`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobpostId: jobpostId
                }),
            }
        );
        return res.json();
    };
    const fetchGetMyJob = async () => {
        const id = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/get-my-jobpost/66e88fd0f696118a75d38ae0`,
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

    function areObjectsEqual(obj1: any, obj2: any) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for (const key in obj1) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
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
    return (
        <div className="">
            <HeaderRecruiter />
            <h1 className="mb-3 rounded-md border bg-white p-4 font-bold">
                Hồ sơ ứng viên
            </h1>
            <div className="rounded-md border bg-white">
                <div className="flex border-b">
                    {tabs?.map((tab) => (
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
                            {myJobpost.map((job, index) => (
                                <Accordion
                                    type="single"
                                    defaultValue=""
                                    collapsible
                                >
                                    <Link
                                        href={`/job/${job._id}`}
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
                                                    {job.jobTitle}
                                                </h3>
                                                <p className="truncate text-gray-600">{job.companyName}</p>
                                                <p className="text-sm text-gray-500">
                                                    {job?.location?.map((loc, locIndex) => (
                                                        <span key={locIndex}>{loc}{locIndex < job.location.length - 1 ? ', ' : ''}</span>
                                                    ))}
                                                </p>
                                                <p className="text-sm text-[#ff7d55]">{job.salary}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Danh sách ứng viên ứng tuyển</AccordionTrigger>
                                        <AccordionContent>
                                            {applyJob[index].map((job: any) => (
                                                <Link
                                                    href={`/profileuser/${job.userId}`}
                                                    key={job.userId}
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
                                            ))}
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
