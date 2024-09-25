"use client";

import React from "react";
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

type Post = {
  id: string;
  title: string;
  // author: string;
  category: string;
  publishDate: string;
  status: "published" | "draft";
};

const PostManagement = () => {
  const fetchPosts = async (): Promise<Post[]> => {
    return [
      {
        id: "1",
        title: "Job Market Trends 2024",
        // author: "John Doe",
        category: "Career Advice",
        publishDate: "2024-01-15",
        status: "published",
      },
      {
        id: "2",
        title: "Interview Tips for Fresh Graduates",
        // author: "Jane Smith",
        category: "Tips",
        publishDate: "2024-01-20",
        status: "draft",
      },
    ];
  };

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
        <Link href="/admin/create-news">
          <Button className="bg-[#00b14f] hover:bg-[#3ba769]">
            <PlusIcon className="mr-2 h-4 w-4" /> Tạo bài viết mới
          </Button>
        </Link>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Tìm kiếm bài viết..."
          className="max-w-sm shadow-none focus:border-sky-400 focus:bg-white focus-visible:ring-0"
        />
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            {/* <TableHead>Tác giả</TableHead> */}
            <TableHead>Danh mục</TableHead>
            <TableHead>Ngày đăng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              {/* <TableCell>{post.author}</TableCell> */}
              <TableCell>{post.category}</TableCell>
              <TableCell>{post.publishDate}</TableCell>
              <TableCell>
                {post.status === "published" ? "Đã đăng" : "Bản nháp"}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/create-news/${post.id}`}>
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
