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
import { Search, Building2 } from "lucide-react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

type EmployerData = {
  _id: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  industry: string;
  isVerified: boolean;
  createdAt: string;
  logo: string;
};

const mockEmployers: EmployerData[] = [
  {
    _id: "1",
    companyName: "Tech Innovators",
    email: "contact@techinnovators.com",
    phoneNumber: "0123456789",
    industry: "Công nghệ thông tin",
    isVerified: true,
    createdAt: "2023-01-15T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-01.svg",
  },
  {
    _id: "2",
    companyName: "Green Energy Solutions",
    email: "info@greenenergy.com",
    phoneNumber: "0987654321",
    industry: "Năng lượng tái tạo",
    isVerified: false,
    createdAt: "2023-02-20T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-02.svg",
  },
  {
    _id: "3",
    companyName: "Global Logistics",
    email: "support@globallogistics.com",
    phoneNumber: "0369852147",
    industry: "Vận tải và Logistics",
    isVerified: true,
    createdAt: "2023-03-10T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-03.svg",
  },
  {
    _id: "4",
    companyName: "HealthTech Solutions",
    email: "info@healthtech.com",
    phoneNumber: "0741852963",
    industry: "Y tế và Công nghệ",
    isVerified: true,
    createdAt: "2023-04-05T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-04.svg",
  },
  {
    _id: "5",
    companyName: "EduLearn Platform",
    email: "contact@edulearn.com",
    phoneNumber: "0258963147",
    industry: "Giáo dục trực tuyến",
    isVerified: false,
    createdAt: "2023-05-12T00:00:00.000Z",
    logo: "https://demo.nextadmin.co/images/brand/brand-05.svg",
  },
];

const EmployerManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredEmployers = useMemo(() => {
    return mockEmployers.filter((employer) =>
      employer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedEmployers = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredEmployers.slice(start, end);
  }, [filteredEmployers, page]);

  const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage);

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Quản lý nhà tuyển dụng</h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Input
            placeholder="Tìm kiếm công ty..."
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
        <Button className="bg-[#00b14f] hover:bg-[#3ba769]">
          <Building2 className="mr-2 h-4 w-4" /> Thêm nhà tuyển dụng
        </Button>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Tên công ty</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Ngành nghề</TableHead>
            <TableHead>Xác thực</TableHead>
            <TableHead className="text-right">Ngày tham gia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEmployers.map((employer) => (
            <TableRow key={employer._id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Image
                    src={employer.logo}
                    alt="logo"
                    height={30}
                    width={30}
                    className="mr-2 rounded-full"
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {employer.companyName}
                  </span>
                </div>
              </TableCell>
              <TableCell>{employer.email}</TableCell>
              <TableCell>{employer.phoneNumber}</TableCell>
              <TableCell>{employer.industry}</TableCell>
              <TableCell>
                <Badge
                  variant={employer.isVerified ? "default" : "destructive"}
                >
                  {employer.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {formatDate(employer.createdAt)}
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

export default EmployerManagement;
