"use client";

import React, { useState, useMemo, useLayoutEffect } from "react";
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
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-toastify";

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
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const fetchAllNews = async (): Promise<News[]> => {
    const res = await fetch(`http://localhost:3001/api/news/get-all-news`);
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery<News[]>({
    queryKey: ["news"],
    queryFn: fetchAllNews,
  });

  const filteredData = useMemo(() => {
    return (data || []).filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (isLoading) return <div className="p-8">Đang tải...</div>;
  if (isError)
    return <div className="p-8">Lỗi khi tải bài viết: {error?.message}</div>;

  const fetchDeletePost = async (postId: string) => {
    const res = await fetch(`http://localhost:3001/api/news/delete/${postId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete post");
    }
    return res.json();
  };
  const handleDeletePost = async (id: any) => {
    const res = await fetchDeletePost(id);
    if(res.status == "OK"){
      toast.success("Xoá bài viết thành công")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }else{
      toast.error("Xoá bài viết thất bại")
    }
  }
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
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
          {paginatedData.map((item) => (
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
                <Button variant="ghost" size="icon" onClick={() => handleDeletePost(item._id)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
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

export default PostManagement;
