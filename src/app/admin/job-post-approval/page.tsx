"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/FormatDate";
import { Input } from "@/components/ui/input";
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
import { Search, FileText, CheckCircle, XCircle } from "lucide-react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

type JobPostData = {
  _id: string;
  title: string;
  companyName: string;
  industry: string;
  location: string;
  salary: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  logo: string;
};

const mockJobPosts: JobPostData[] = [
  {
    _id: "1",
    title: "Frontend Developer",
    companyName: "Tech Innovators",
    industry: "Công nghệ thông tin",
    location: "Hồ Chí Minh",
    salary: "15-20 triệu",
    status: "pending",
    createdAt: "2023-06-15T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-01.svg",
  },
  {
    _id: "2",
    title: "Marketing Manager",
    companyName: "Global Logistics",
    industry: "Vận tải và Logistics",
    location: "Hà Nội",
    salary: "25-30 triệu",
    status: "pending",
    createdAt: "2023-06-20T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-03.svg",
  },
  {
    _id: "3",
    title: "Data Scientist",
    companyName: "HealthTech Solutions",
    industry: "Y tế và Công nghệ",
    location: "Đà Nẵng",
    salary: "20-25 triệu",
    status: "pending",
    createdAt: "2023-06-25T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-04.svg",
  },
  {
    _id: "4",
    title: "Sales Representative",
    companyName: "Green Energy Solutions",
    industry: "Năng lượng tái tạo",
    location: "Cần Thơ",
    salary: "12-18 triệu",
    status: "pending",
    createdAt: "2023-06-30T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-02.svg",
  },
  {
    _id: "5",
    title: "Online Tutor",
    companyName: "EduLearn Platform",
    industry: "Giáo dục trực tuyến",
    location: "Remote",
    salary: "15-22 triệu",
    status: "pending",
    createdAt: "2023-07-05T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-05.svg",
  },
];

const JobPostApproval = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobPosts, setJobPosts] = useState(mockJobPosts);
  const itemsPerPage = 10;

  const filteredJobPosts = useMemo(() => {
    return jobPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobPosts, searchTerm]);

  const paginatedJobPosts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredJobPosts.slice(start, end);
  }, [filteredJobPosts, page]);

  const totalPages = Math.ceil(filteredJobPosts.length / itemsPerPage);

  const handleApprove = (id: string) => {
    setJobPosts((posts) =>
      posts.map((post) =>
        post._id === id ? { ...post, status: "approved" } : post
      )
    );
  };

  const handleReject = (id: string) => {
    setJobPosts((posts) =>
      posts.map((post) =>
        post._id === id ? { ...post, status: "rejected" } : post
      )
    );
  };

  const router = useRouter();

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
        {/* <Button className="bg-[#00b14f] hover:bg-[#3ba769]">
          <FileText className="mr-2 h-4 w-4" /> Xem tất cả bài tuyển dụng
        </Button> */}
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Tiêu đề</TableHead>
            <TableHead>Công ty</TableHead>
            <TableHead>Ngành nghề</TableHead>
            <TableHead>Địa điểm</TableHead>
            <TableHead>Mức lương</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Ngày đăng</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {paginatedJobPosts.map((post) => (
            <TableRow onClick={() => handleClick(post._id)} key={post._id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Image
                    src={post.logo}
                    alt="logo"
                    height={30}
                    width={30}
                    className="mr-2 rounded-full"
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {post.title}
                  </span>
                </div>
              </TableCell>
              <TableCell>{post.companyName}</TableCell>
              <TableCell>{post.industry}</TableCell>
              <TableCell>{post.location}</TableCell>
              <TableCell>{post.salary}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    post.status === "approved"
                      ? "default"
                      : post.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {post.status === "approved"
                    ? "Đã duyệt"
                    : post.status === "rejected"
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
                    onClick={() => handleApprove(post._id)}
                    disabled={post.status !== "pending"}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Duyệt
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(post._id)}
                    disabled={post.status !== "pending"}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Từ chối
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
    </div>
  );
};

export default JobPostApproval;
