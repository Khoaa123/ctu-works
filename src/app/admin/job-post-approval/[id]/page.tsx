"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Banknote,
  Clock,
  GraduationCap,
  Briefcase,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Globe,
  Mail,
  Phone,
  Flag,
  User,
  Layers,
  Target,
} from "lucide-react";
import Image from "next/image";
import logo from "@images/nexon.png";

type JobPostingProps = {
  jobPosting: {
    id: string;
    title: string;
    company: {
      name: string;
      logo: string;
      website: string;
      email: string;
      phone: string;
      description: string;
    };
    location: string;
    salary: string;
    jobType: string;
    experienceLevel: string;
    educationLevel: string;
    industry: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    skills: string[];
    benefits: string[];
    applicationDeadline: string;
    postedDate: string;
    status: "pending" | "approved" | "rejected";
    numberOfVacancies: number;
    level: string;
    gender: string;
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onClose: () => void;
};

const mockJobPosting = {
  id: "1",
  title: "Software Engineer",
  company: {
    name: "Google",
    logo: logo,
    website: "https://google.com",
    email: "jobs@google.com",
    phone: "+1-650-253-0000",
    description: "A global technology leader...",
  },
  location: "Hanoi, Vietnam",
  salary: "$100,000 - $150,000",
  jobType: "Full-time",
  experienceLevel: "Mid-level",
  educationLevel: "Bachelor's degree",
  industry: "Technology",
  description: "We are looking for a talented...",
  responsibilities: [
    "Design and develop...",
    "Collaborate with...",
    "Write clean...",
  ],
  requirements: [
    "3+ years of experience...",
    "Strong knowledge of...",
    "Excellent communication...",
  ],
  skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  benefits: [
    "Competitive salary",
    "Comprehensive health...",
    "Paid time off",
    "Stock options",
  ],
  applicationDeadline: "2024-03-15",
  postedDate: "2024-02-15",
  status: "pending",
  numberOfVacancies: 2,
  level: "Senior",
  gender: "All",
};

const DetailedJobPosting = () => {
  return (
    <div className="px-1 py-8">
      <Card className="mx-auto w-full max-w-4xl rounded-md border-none shadow-md">
        <CardHeader className="">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={mockJobPosting.company.logo}
                alt={mockJobPosting.company.name}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <CardTitle className="text-2xl font-bold">
                  {mockJobPosting.title}
                </CardTitle>
                <p className="text-xl text-gray-700">
                  {mockJobPosting.company.name}
                </p>
              </div>
            </div>
            <Badge
              variant={
                mockJobPosting.status === "approved"
                  ? "default"
                  : mockJobPosting.status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
              className="text-sm"
            >
              {mockJobPosting.status === "approved"
                ? "Đã duyệt"
                : mockJobPosting.status === "rejected"
                ? "Đã từ chối"
                : "Đang chờ duyệt"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{mockJobPosting.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Banknote className="h-5 w-5 text-gray-500" />
              <span>{mockJobPosting.salary}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span>{mockJobPosting.jobType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-gray-500" />
              <span>{mockJobPosting.experienceLevel}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-gray-500" />
              <span>{mockJobPosting.educationLevel}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <span>{mockJobPosting.industry}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-500" />
              <span>Cấp bậc: {mockJobPosting.level}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span>Giới tính: {mockJobPosting.gender}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-gray-500" />
              <span>Số lượng tuyển: {mockJobPosting.numberOfVacancies}</span>
            </div>
          </div>

          {/* <Separator /> */}

          <div>
            <h3 className="mb-2 text-lg font-semibold">Mô tả công việc</h3>
            <p className="whitespace-pre-line text-gray-700">
              {mockJobPosting.description}
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Yêu cầu công việc</h3>
            <ul className="list-disc space-y-1 pl-5">
              {mockJobPosting.requirements.map((requirement, index) => (
                <li key={index} className="text-gray-700">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Kỹ năng yêu cầu</h3>
            <div className="flex flex-wrap gap-2">
              {mockJobPosting.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Quyền lợi</h3>
            <ul className="list-disc space-y-1 pl-5">
              {mockJobPosting.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* <Separator /> */}

          <div>
            <h3 className="mb-2 text-lg font-semibold">Thông tin công ty</h3>
            <p className="mb-4 text-gray-700">
              {mockJobPosting.company.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-500" />
                <a
                  href={mockJobPosting.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {mockJobPosting.company.website}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <a
                  href={`mailto:${mockJobPosting.company.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {mockJobPosting.company.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <a
                  href={`tel:${mockJobPosting.company.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {mockJobPosting.company.phone}
                </a>
              </div>
            </div>
          </div>

          {/* <Separator /> */}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Ngày đăng: {mockJobPosting.postedDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flag className="h-5 w-5" />
              <span>Hạn nộp hồ sơ: {mockJobPosting.applicationDeadline}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {/* <Button variant="outline">Đóng</Button> */}
          <div className="space-x-2">
            <Button
              variant="destructive"
              disabled={mockJobPosting.status !== "pending"}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Từ chối
            </Button>
            <Button
              variant="default"
              disabled={mockJobPosting.status !== "pending"}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Duyệt
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailedJobPosting;
