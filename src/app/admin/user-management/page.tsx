"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

type UserData = {
  _id: string;
  role: string;
  email: string;
  seekJobMode: boolean;
  isVerified: boolean;
  lastOnline: string;
  createdAt: string;
};

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const fetchAllUsers = async (): Promise<UserData[]> => {
    const res = await fetch(
      `http://localhost:3001/api/user/getAll?page=${page}&limit=${itemsPerPage}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError } = useQuery<UserData[]>({
    queryKey: ["getAllUsers", page, searchTerm],
    queryFn: fetchAllUsers,
  });

  const filteredData = data?.filter((user) =>
    user?.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        Quản lý người dùng
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Input
            placeholder="Tìm kiếm theo email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 max-w-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button variant="outline" onClick={() => setPage(1)}>
            <Search className="mr-2 h-4 w-4" /> Tìm kiếm
          </Button>
        </div>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          <UserPlus className="mr-2 h-4 w-4" /> Thêm người dùng
        </Button>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Tìm việc</TableHead>
            <TableHead>Xác thực</TableHead>
            <TableHead>Lần cuối trực tuyến</TableHead>
            <TableHead className="text-right">Ngày tham gia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user?.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.seekJobMode
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.seekJobMode ? "Đang tìm việc" : "Không tìm việc"}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.isVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                </span>
              </TableCell>
              <TableCell>
                {new Date(user.lastOnline).toLocaleString("vi-VN")}
              </TableCell>
              <TableCell className="text-right">
                {new Date(user.createdAt).toLocaleString("vi-VN")}
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

export default UserManagement;
