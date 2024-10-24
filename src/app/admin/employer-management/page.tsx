"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { Search, UserPlus } from "lucide-react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

type RecruiterData = {
  _id: string;
  fullName: string;
  email: string;
  companyId: string;
  isVerified: boolean;
  createdAt: string;
  lastOnline: string;
  following: number;
};

const EmployerManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const fetchAllRecruiters = async () => {
    const res = await fetch(
      `http://localhost:3001/api/recruiter/getAll-recruiter?page=${page}&limit=${itemsPerPage}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch recruiters");
    }
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError } = useQuery<RecruiterData[]>({
    queryKey: ["getAllRecruiters", page, searchTerm],
    queryFn: fetchAllRecruiters,
  });

  const filteredData = data?.filter(
    (recruiter) =>
      recruiter.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recruiter.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        Lỗi khi tải dữ liệu
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 border-b border-indigo-200 pb-2 text-2xl font-bold text-indigo-700">
        Quản lý nhà tuyển dụng
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Input
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="mr-2 max-w-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button variant="outline" onClick={() => setPage(1)}>
            <Search className="mr-2 h-4 w-4" /> Tìm kiếm
          </Button>
        </div>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          <UserPlus className="mr-2 h-4 w-4" /> Thêm nhà tuyển dụng
        </Button>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Họ tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Xác thực</TableHead>
            <TableHead>Lần cuối trực tuyến</TableHead>
            <TableHead>Số người theo dõi</TableHead>
            <TableHead className="text-right">Ngày tham gia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData &&
            filteredData.map((recruiter) => (
              <TableRow key={recruiter._id}>
                <TableCell className="font-medium">
                  {recruiter.fullName}
                </TableCell>
                <TableCell>{recruiter.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      recruiter.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {recruiter.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                  </span>
                </TableCell>
                <TableCell>{formatDate(recruiter.lastOnline)}</TableCell>
                <TableCell>{recruiter.following}</TableCell>
                <TableCell className="text-right">
                  {formatDate(recruiter.createdAt)}
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
        <span className="mx-4 flex items-center">Trang {page}</span>
        <Button variant="outline" onClick={() => setPage((prev) => prev + 1)}>
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default EmployerManagement;
