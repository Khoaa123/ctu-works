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

type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  status: "Pending" | "Approved" | "Rejected";
  applicants: number;
  views: number;
};

const mockJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Tech Solutions Inc.",
    location: "Ho Chi Minh City",
    salary: "$1000 - $2000",
    postedDate: "2023-05-15",
    status: "Approved",
    applicants: 25,
    views: 500,
  },
  {
    id: "2",
    title: "Marketing Manager",
    company: "Global Marketing Co.",
    location: "Hanoi",
    salary: "$1500 - $2500",
    postedDate: "2023-05-16",
    status: "Pending",
    applicants: 10,
    views: 300,
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "Data Insights Ltd.",
    location: "Da Nang",
    salary: "$800 - $1500",
    postedDate: "2023-05-17",
    status: "Rejected",
    applicants: 5,
    views: 150,
  },
];

const JobPostingManagement = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobPostings = jobPostings.filter(
    (posting) =>
      posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      posting.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (
    id: string,
    newStatus: "Pending" | "Approved" | "Rejected"
  ) => {
    setJobPostings(
      jobPostings.map((posting) =>
        posting.id === id ? { ...posting, status: newStatus } : posting
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
                placeholder="Tìm kiếm tin tuyển dụng"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-8 focus:border-sky-400 focus-visible:ring-0"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Thêm tin tuyển dụng
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse items-center bg-transparent">
              <thead>
                <tr>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Tiêu đề
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Công ty
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Địa điểm
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Mức lương
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Ngày đăng
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Trạng thái
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Ứng viên
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Lượt xem
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-right align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredJobPostings.map((posting) => (
                  <tr key={posting.id}>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {posting.title}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {posting.company}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {posting.location}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {posting.salary}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {posting.postedDate}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          posting.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : posting.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {posting.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {posting.applicants}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                      {posting.views}
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
                              handleStatusChange(posting.id, "Approved")
                            }
                          >
                            Phê duyệt
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(posting.id, "Rejected")
                            }
                          >
                            Từ chối
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

export default JobPostingManagement;
