"use client";

import React, { useState } from "react";
import Image from "next/image";
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
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus } from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

type UserData = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  seekJobMode: boolean;
  isVerified: boolean;
  createdAt: string;
  avatar: string;
};

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllUsers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getAll?page=${page}&search=${searchTerm}`
    );
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError } = useQuery<UserData[]>({
    queryKey: ["getAllUsers", page, searchTerm],
    queryFn: fetchAllUsers,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        Error loading data
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Quản lý người tìm việc</h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 max-w-sm shadow-none focus:border-sky-400 focus:bg-white focus-visible:ring-0"
          />
          <Button variant="outline" onClick={() => setPage(1)}>
            <Search className="mr-2 h-4 w-4" /> Tìm kiếm
          </Button>
        </div>
        <Button className="bg-[#00b14f] hover:bg-[#3ba769]">
          <UserPlus className="mr-2 h-4 w-4" /> Thêm người dùng
        </Button>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Tìm việc</TableHead>
            <TableHead>Xác thực</TableHead>
            <TableHead className="text-right">Ngày tham gia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Image
                      src={
                        user.avatar ||
                        "https://demo.nextadmin.co/images/brand/brand-03.svg"
                      }
                      alt="avatar"
                      height={30}
                      width={30}
                      className="mr-2 rounded-full"
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {user.fullName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <Badge variant={user.seekJobMode ? "default" : "secondary"}>
                    {user.seekJobMode ? "Đang tìm việc" : "Không tìm việc"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isVerified ? "default" : "destructive"}>
                    {user.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatDate(user.createdAt)}
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
