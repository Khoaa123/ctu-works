"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import vinfast from "@images/vinfast.png";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

const tabs = [
  { id: "applied", label: "Việc đã ứng tuyển" },
  { id: "saved", label: "Việc đã lưu" },
  { id: "viewed", label: "Việc làm đã xem" },
  { id: "invited", label: "Thư mời ứng tuyển" },
];

const MyJob = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [saveJob, setSaveJob] = useState([
    {
      companyLogo: "",
      companyName: "",
      jobSalary: "",
      jobTitle: "",
      jobLocation: [],
      jobPostId: '',
      _id: "",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSaveJob();
      setSaveJob(data.data);
    };
    fetchData();
  }, []);
  const fetchSaveJob = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/savejob/get-my-savejob/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

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
      _id: "",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApplyJob();
      setApplyJob(data.data);
    };
    fetchData();
  }, []);
  const fetchApplyJob = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/get-my-apply/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const test = () => {
    console.log(saveJob)
  }

  const [activeTab, setActiveTab] = useState("saved");
  return (
    <div className="">
      <button onClick={test}>SAdea</button>
      <h1 className="mb-3 rounded-md border bg-white p-4 font-bold">
        Việc Làm Của Tôi
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
          {activeTab === "saved" && (
            <div className="space-y-4">
              {saveJob.map((job) => (
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
                        {job.jobTitle}
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
        </div>}
        {<div className="p-4">
          {activeTab === "applied" && (
            <div className="space-y-4">
              {applyJob.map((job) => (
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
              ))}
            </div>
          )}
        </div>}
      </div>
    </div>
  );
};

export default MyJob;
