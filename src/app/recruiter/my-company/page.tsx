"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaFolder, FaFolderOpen, FaHeart, FaList, FaUser, FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { FaCloudUploadAlt, FaInfoCircle, FaSearch, FaThLarge } from "react-icons/fa";

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
    const accessToken = cookies.get("accessTokenRecruiter");
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
        // {
        //     companyLogo: "",
        //     companyName: "",
        //     jobSalary: "",
        //     jobTitle: "",
        //     jobLocation: [],
        //     jobPostId: '',
        //     jobPostTitle: '',
        //     status: '',
        //     fullName: '',
        //     email: '',
        //     address: '',
        //     phoneNumber: '',
        //     _id: "",
        // },
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
            jobInformation: {
                datePosted: ''
            },
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/get-my-apply/${id}`,
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
    const [activeTab, setActiveTab] = useState("profileViews");

    function areObjectsEqual(obj1: any, obj2: any) {
        if (Object.keys(obj1)?.length !== Object.keys(obj2)?.length) {
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
    const [applySelect, setApplySelect] = useState(0)
    const handleSelectJob = (job: any) => {
        setApplySelect(job)
    }
    return (
        <div>
            <HeaderRecruiter />
            <div className="p-4">
                <div className="p-4">
                    <div className="flex items-center justify-between border-b pb-2 mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span>Việc làm</span>
                                <div className="relative">
                                    <select
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                                        onChange={(e) => handleSelectJob(e.target.value)}
                                    >
                                        {myJobpost && myJobpost.map((job, index) => (
                                            <option key={index} value={index}>{job.jobTitle}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* <span>•</span>
                            <button className="bg-gray-200 rounded px-2 py-1">Xem báo cáo</button> */}
                        </div>
                        <div className="flex items-center space-x-4">
                            <input type="text" placeholder="Tìm kiếm theo email, tên hoặc số điện thoại" className="border rounded px-2 py-1" />
                            <FaSearch className="fas fa-search" />
                            <div className="flex items-center space-x-2">
                                <FaThLarge className="fas fa-th-large" />
                                <FaList className="fas fa-list" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="border rounded px-4 py-2 bg-blue-100">Tất cả</button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                {/* Dropdown items */}
                            </div>
                        </div>
                        <div className="relative">
                            <button className="border rounded px-4 py-2">Kinh nghiệm</button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                {/* Dropdown items */}
                            </div>
                        </div>
                        <div className="relative">
                            <button className="border rounded px-4 py-2">Mức lương</button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                {/* Dropdown items */}
                            </div>
                        </div>
                        <button className="bg-gray-200 rounded px-4 py-2">Tất cả bộ lọc</button>
                    </div>
                </div>
                <div className="flex w-full space-x-2">
                    <div className="flex-1 flex justify-between items-center bg-white border border-gray-300 rounded p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">1. Nhận hồ sơ</span>
                            <span className="bg-red-500 text-white rounded-full px-2">0</span>
                        </div>
                        <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
                    </div>
                    <div className="flex-1 flex justify-between items-center bg-white border border-gray-300 rounded p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">2. Duyệt hồ sơ</span>
                            <span className="bg-red-500 text-white rounded-full px-2">0</span>
                        </div>
                        <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
                    </div>
                    <div className="flex-1 flex justify-between items-center bg-white border border-gray-300 rounded p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">3. Đề nghị nhận việc</span>
                            <span className="bg-red-500 text-white rounded-full px-2">0</span>
                        </div>
                        <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
                    </div>
                    <div className="flex-1 flex justify-between items-center bg-white border border-gray-300 rounded p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">4. Đã tuyển</span>
                            <span className="bg-red-500 text-white rounded-full px-2">0</span>
                        </div>
                        <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
                    </div>
                    <div className="flex-1 flex justify-between items-center bg-white border border-gray-300 rounded p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">5. Không đạt</span>
                            <span className="bg-red-500 text-white rounded-full px-2">0</span>
                        </div>
                        <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
                    </div>
                    <div className="flex-1 flex justify-between items-center bg-white border border-gray-300 rounded p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">6. Ứng viên từ chối</span>
                            <span className="bg-red-500 text-white rounded-full px-2">0</span>
                        </div>
                        <FaCloudUploadAlt className="fas fa-cloud-upload-alt text-gray-500" />
                    </div>
                </div>
                <div className="flex flex-col min-h-80 bg-white border border-gray-300 rounded p-2 overflow-y-auto">
                    {applyJob[applySelect]?.length > 0 ? (
                        applyJob[applySelect].map((job: any) => (
                            <Link
                                key={job.userId}
                                href={`/profileuser/${job.userId}`}
                                className="group flex cursor-pointer w-full border-blue-400 items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 hover:bg-[#f9fcff]"
                            >{applyJob[applySelect].length}
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
                                        <p className="text-sm text-gray-500">{job?.address}</p>
                                        <p className="text-sm text-[#ff7d55]">{job.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex flex-shrink-0 items-center space-x-4">
                                    <button disabled className="whitespace-nowrap rounded-lg bg-orange-400 px-4 py-2 text-white transition-colors hover:bg-orange-500">
                                        {job.status}
                                    </button>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="flex flex-col items-center min-h-60">
                            <img src="https://employer.vietnamworks.com/v2/img/none-of-candidate.svg" alt="No candidates illustration" className="mb-4" />
                            <span className="text-gray-700">Không có ứng viên nào cho việc làm này</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 p-4 rounded mt-4">
                    <FaInfoCircle className="fas fa-info-circle" />
                    <span>Hồ sơ sẽ được lưu trữ tại trang Quản Lý Tuyển Dụng lên tới 24 tháng.</span>
                </div>
            </div>
        </div>

    );
};

export default MyCompany;
