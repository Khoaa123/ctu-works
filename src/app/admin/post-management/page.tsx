"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type News = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  views: number;
  createdAt: string;
  updatedAt: string;
};

const PostManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllNews = async () => {
    const res = await fetch(`http://localhost:3001/api/news/get-all-news`);
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError } = useQuery<News[]>({
    queryKey: ["news"],
    queryFn: fetchAllNews,
  });

  if (isLoading) return <div className="p-8">Đang tải...</div>;
  if (isError) return <div className="p-8">Lỗi khi tải bài viết</div>;

  return (
    <div className="p-8">
      <h1 className="mb-5 border-b border-indigo-200 pb-2 text-2xl font-bold text-indigo-700">
        Quản lý bài viết
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Input
            placeholder="Tìm kiếm bài viết..."
            className="mr-2 max-w-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/create-news">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            <PlusIcon className="mr-2 h-4 w-4" /> Tạo bài viết mới
          </Button>
        </Link>
      </div>

      <Table className="bg-white">
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tóm tắt</TableHead>
            <TableHead>Lượt xem</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Ngày cập nhật</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item._id} className="hover:bg-white">
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.summary.substring(0, 50)}...</TableCell>
              <TableCell>{item.views}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/create-news/${item._id}`}>
                  <Button variant="ghost" size="icon">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostManagement;
