"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type JobPost = {
  _id: string;
  title: string;
  companyLogo: string;
  companyName: string;
  jobTitle: string;
  minSalary: number;
  maxSalary: number;
  location: string;
  jobInfoId: string;
  jobLevel: string;
  canDeal: boolean;
};

function JobCard({ job }: { job: JobPost }) {
  return (
    <div className="cursor-pointer rounded-lg border bg-white p-4 transition-all hover:border-sky-200 hover:bg-[#F9FBFF]">
      <Link href={`/job/${job._id}`}>
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
              width={100}
              height={100}
              className="rounded-lg border"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-medium text-blue-900">
                  {job.jobTitle}
                </h3>
                <p className="text-gray-600">{job.companyName}</p>
              </div>
              <div className="shrink-0 text-right">
                {job?.canDeal ? (
                  <p className="my-1 text-sm text-amber-600">Thương lượng</p>
                ) : (
                  <p className="my-1 text-sm text-amber-600">
                    ${job?.minSalary} - {job?.maxSalary} /tháng
                  </p>
                )}
              </div>
            </div>
            <p className="mt-1 text-gray-600">{job.location}</p>
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <span>Chức vụ: {job.jobLevel}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function SkeletonJobCard() {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center gap-4">
        <Skeleton width={100} height={100} className="rounded-lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Skeleton width={200} height={24} />
              <Skeleton width={150} height={20} />
            </div>
            <Skeleton width={100} height={20} />
          </div>
          <Skeleton width={180} height={20} className="mt-1" />
          <Skeleton width={120} height={16} className="mt-1" />
        </div>
      </div>
    </div>
  );
}

export default function JobListings() {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return jobPosts?.slice(startIndex, endIndex);
  }, [jobPosts, page, itemsPerPage]);

  const totalPages = Math.ceil(jobPosts?.length / itemsPerPage);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/jobpost/get-all-jobpost?days=7`
        );
        const data = await res.json();
        if (data.status === "OK") {
          setJobPosts(data.data);
          setLoadingJobs(false);
        } else {
          console.error("Failed to fetch job posts");
          setLoadingJobs(false);
        }
      } catch (error) {
        console.error("Error fetching job posts:", error);
        setLoadingJobs(false);
      }
    };

    fetchJobPosts();
  }, []);

  return (
    <div className="bg-[#f9f9f9]">
      <div className="mx-auto max-w-5xl p-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              Việc Làm Mới Nhất
            </h1>
            <p className="mt-2 text-gray-600">
              Khám phá các cơ hội việc làm mới nhất được cập nhật hàng ngày,
              mang đến cho bạn những lựa chọn công việc hấp dẫn và phù hợp nhất.
            </p>
          </div>
          <div className="text-gray-600">
            {loadingJobs ? (
              <Skeleton width={100} />
            ) : (
              <>
                <span className="font-medium text-red-500">
                  {jobPosts.length}
                </span>{" "}
                việc làm đang tuyển dụng
              </>
            )}
          </div>
          <div className="space-y-4">
            {loadingJobs
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonJobCard key={index} />
                ))
              : paginatedData.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
        </div>
      </div>

      <div className="my-5 flex justify-center">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <FaChevronLeft />
        </Button>
        <span className="mx-4 flex items-center">
          Trang {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
}
