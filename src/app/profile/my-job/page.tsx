"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import vinfast from "@images/vinfast.png";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary?: string;
  logo: string;
};

const tabs = [
  { id: "applied", label: "Việc đã ứng tuyển" },
  { id: "saved", label: "Việc đã lưu" },
  { id: "viewed", label: "Việc làm đã xem" },
  { id: "invited", label: "Thư mời ứng tuyển" },
];

const jobs: Job[] = [
  {
    id: 1,
    title:
      "Chuyên Viên Nghiệp Vụ Quản Lý Chất Lượng Dịch Vụ & Dự Án CNTT (PQA) Chuyên Viên Nghiệp Vụ Quản Lý Chất Lượng Dịch Vụ & Dự Án CNTT (PQA)",
    company: "Công Ty Cổ Phần Liên Doanh Ô Tô Hyundai Thành Công Việt Nam",
    location: "Hà Nội",
    salary: "Thương lượng",
    logo: vinfast.src,
  },
  {
    id: 2,
    title: "Project Manager - Offer Up to $3500",
    company: "FPT Software",
    location: "Hà Nội",
    salary: "$ 3,000-3,500 /tháng",
    logo: vinfast.src,
  },
  {
    id: 3,
    title: "Chuyên Viên Quản Lý Chương Trình",
    company: "Công Ty Cổ Phần Tập Đoàn Hòa Phát",
    location: "Hà Nội",
    salary: "Thương lượng",
    logo: vinfast.src,
  },
];

const MyJob = () => {
  const [activeTab, setActiveTab] = useState("saved");
  return (
    <div className="">
      <h1 className="mb-3 rounded-md border bg-white p-4 font-bold">
        Việc Làm Của Tôi
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
          {activeTab === "saved" && (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link
                  href={`/job/${job.id}`}
                  key={job.id}
                  className="group flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 hover:bg-[#f9fcff]"
                >
                  <div className="flex flex-grow items-center gap-6">
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="rounded-lg"
                      width={60}
                      height={60}
                    />
                    <div className="max-w-[calc(100%-200px)] flex-grow">
                      <h3 className="line-clamp-2 text-lg font-medium duration-300 group-hover:text-[#ff7d55] group-hover:transition-all">
                        {job.title}
                      </h3>
                      <p className="truncate text-gray-600">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      {job.salary && (
                        <p className="text-sm text-[#ff7d55]">{job.salary}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center space-x-4">
                    <button className="text-blue-500 hover:text-blue-600">
                      <FaHeart size={20} />
                    </button>
                    <button className="whitespace-nowrap rounded-lg bg-orange-400 px-4 py-2 text-white transition-colors hover:bg-orange-500">
                      Ứng tuyển
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJob;
