"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/FormatDate"; //Make sure this file exists and exports the function
import { Input } from "@/components/ui/input"; //Replace with your actual component imports
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { FaChevronRight, FaChevronLeft, FaEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type JobPostData = {
  _id: string;
  jobTitle: string;
  companyName: string;
  jobIndustry: string;
  location: string;
  minSalary: string;
  statusApproval: boolean;
  statusSeeking: boolean;
  createdAt: string;
  logo?: string;
};

const JobPostApproval = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const itemsPerPage = 10;

  const fetchAllNews = async () => {
    const res = await fetch(`http://localhost:3001/api/jobpost/get-all-jobpost-admin`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response format.  Check your backend.");
    }
    console.log(data.data)
    return data.data;
  };

  const { data: jobPostsData, isLoading, isError, error } = useQuery({
    queryKey: ["jobPosts"],
    queryFn: fetchAllNews,
  });


  const filteredJobPosts = useMemo(() => {
    return (jobPostsData || []).filter((post: any) =>
      post.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobPostsData, searchTerm]);

  const paginatedJobPosts = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobPosts.slice(startIndex, endIndex);
  }, [filteredJobPosts, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredJobPosts.length / itemsPerPage);

  const handleClick = (postId: string) => {
    router.push(`/admin/job-post-approval/${postId}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Duyệt bài tuyển dụng</h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Input
            placeholder="Tìm kiếm bài tuyển dụng..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="mr-2 max-w-sm shadow-none focus:border-sky-400 focus:bg-white focus-visible:ring-0"
          />
          <Button variant="outline" onClick={() => setPage(1)}>
            <Search className="mr-2 h-4 w-4" /> Tìm kiếm
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="p-8">Đang tải...</div>
      ) : isError ? (
        <div className="p-8">Lỗi khi tải bài viết: {error?.message}</div>
      ) : (
        <>
          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Tiêu đề</TableHead>
                <TableHead>Công ty</TableHead>
                <TableHead>Ngành nghề</TableHead>
                {/* <TableHead>Địa điểm</TableHead> */}
                {/* <TableHead>Mức lương</TableHead> */}
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Ngày đăng</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="cursor-pointer">
              {paginatedJobPosts.map((post: JobPostData) => (
                <TableRow
                  onClick={() => handleClick(post._id)}
                  key={post._id}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {post.logo && (
                        <Image
                          src={post.logo}
                          alt="logo"
                          height={30}
                          width={30}
                          className="mr-2 rounded-full"
                        />
                      )}
                      <span className=" text-ellipsis whitespace-wrap">
                        {post.jobTitle}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell >{post.companyName}</TableCell>
                  <TableCell>{post.jobIndustry}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.statusApproval === true && post.statusSeeking === true
                          ? "default"
                          : post.statusApproval === false && post.statusSeeking === false
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {post.statusApproval === true && post.statusSeeking === true
                        ? "Đã duyệt"
                        : post.statusApproval === false && post.statusSeeking === false
                          ? "Đã từ chối"
                          : "Đang chờ"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDate(post.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                      >
                        <FaEye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-5 flex justify-center">
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
        </>
      )}
    </div>
  );
};

export default JobPostApproval;