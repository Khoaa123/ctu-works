"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Plus } from "lucide-react";

type Recruiter = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  jobPostings: number;
  avatarUrl: string;
};

const mockRecruiters: Recruiter[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    company: "Công ty ABC",
    email: "nguyenvana@abc.com",
    phone: "0123456789",
    status: "Active",
    jobPostings: 5,
    avatarUrl: "https://demo.nextadmin.co/images/brand/brand-03.svg",
  },
  {
    id: "2",
    name: "Trần Thị B",
    company: "Tập đoàn XYZ",
    email: "tranthib@xyz.com",
    phone: "0987654321",
    status: "Inactive",
    jobPostings: 0,
    avatarUrl: "https://demo.nextadmin.co/images/brand/brand-03.svg",
  },
  {
    id: "3",
    name: "Lê Văn C",
    company: "Công ty 123",
    email: "levanc@123.com",
    phone: "0369852147",
    status: "Pending",
    jobPostings: 2,
    avatarUrl: "https://demo.nextadmin.co/images/brand/brand-03.svg",
  },
];

const RecruiterManagement = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>(mockRecruiters);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecruiters = recruiters.filter(
    (recruiter) =>
      recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recruiter.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recruiter.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (
    id: string,
    newStatus: "Active" | "Inactive" | "Pending"
  ) => {
    setRecruiters(
      recruiters.map((recruiter) =>
        recruiter.id === id ? { ...recruiter, status: newStatus } : recruiter
      )
    );
  };

  return (
    <div className="px-4 py-2">
      <div className="w-full">
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white">
          <div className="mb-4 flex items-center justify-between px-6 py-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nhà tuyển dụng"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-8 outline-none focus:border-sky-400 focus-visible:ring-0"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Thêm nhà tuyển dụng
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm nhà tuyển dụng mới</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Tên
                    </label>
                    <Input
                      id="name"
                      className="col-span-3 focus:border-sky-400 focus-visible:ring-0"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="company" className="text-right">
                      Công ty
                    </label>
                    <Input
                      id="company"
                      className="col-span-3 focus:border-sky-400 focus-visible:ring-0"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-3 focus:border-sky-400 focus-visible:ring-0"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="phone" className="text-right">
                      Số điện thoại
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      className="col-span-3 focus:border-sky-400 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <Button className="w-full">Thêm nhà tuyển dụng</Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse items-center bg-transparent">
              <thead>
                <tr>
                  <th className="w-48 whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Tên
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Công ty
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Email
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Số điện thoại
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Trạng thái
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Tin tuyển dụng
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-right align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecruiters.map((recruiter) => (
                  <tr
                    key={recruiter.id}
                    className="transition-colors duration-200 ease-in-out hover:bg-gray-50"
                  >
                    <th className="flex w-48 items-center gap-2 border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs text-black">
                      <Image
                        src={recruiter.avatarUrl}
                        alt="avatar"
                        height={30}
                        width={30}
                      />
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {recruiter.name}
                      </p>
                    </th>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {recruiter.company}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {recruiter.email}
                    </td>
                    <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                      {recruiter.phone}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          recruiter.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : recruiter.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {recruiter.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {recruiter.jobPostings}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(recruiter.id, "Active")
                            }
                          >
                            Kích hoạt
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(recruiter.id, "Inactive")
                            }
                          >
                            Vô hiệu hóa
                          </DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem>Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterManagement;
