"use client";

import React, { useState } from "react";
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

type Post = {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  status: "Published" | "Draft" | "Archived";
  views: number;
};

const mockPosts: Post[] = [
  {
    id: "1",
    title: "10 Tips for Job Seekers in 2023",
    author: "Nguyễn Văn A",
    category: "Career Advice",
    publishDate: "2023-05-15",
    status: "Published",
    views: 1500,
  },
  {
    id: "2",
    title: "The Future of Remote Work",
    author: "Trần Thị B",
    category: "Workplace Trends",
    publishDate: "2023-05-16",
    status: "Draft",
    views: 0,
  },
  {
    id: "3",
    title: "How to Ace Your Job Interview",
    author: "Lê Văn C",
    category: "Interview Tips",
    publishDate: "2023-05-17",
    status: "Published",
    views: 2300,
  },
];

const PostManagement = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (
    id: string,
    newStatus: "Published" | "Draft" | "Archived"
  ) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
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
                placeholder="Tìm kiếm bài viết"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-8 focus:border-sky-400 focus-visible:ring-0"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Thêm bài viết
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm bài viết mới</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right">
                      Tiêu đề
                    </label>
                    <Input
                      id="title"
                      className="col-span-3 focus:border-sky-400 focus-visible:ring-0"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="author" className="text-right">
                      Tác giả
                    </label>
                    <Input
                      id="author"
                      className="col-span-3 focus:border-sky-400 focus-visible:ring-0"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="category" className="text-right">
                      Danh mục
                    </label>
                    <Input
                      id="category"
                      className="col-span-3 focus:border-sky-400 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <Button className="w-full">Thêm bài viết</Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse items-center bg-transparent">
              <thead>
                <tr>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Tiêu đề
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Tác giả
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Danh mục
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Ngày đăng
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Trạng thái
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Lượt xem
                  </th>
                  <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-4 py-3 text-right align-middle text-xs font-semibold uppercase text-[#64748b]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 align-middle text-xs">
                      {post.title}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 align-middle text-xs">
                      {post.author}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 align-middle text-xs">
                      {post.category}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 align-middle text-xs">
                      {post.publishDate}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 align-middle text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          post.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : post.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 align-middle text-xs">
                      {post.views}
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 text-right align-middle text-xs">
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
                              handleStatusChange(post.id, "Published")
                            }
                          >
                            Xuất bản
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(post.id, "Draft")}
                          >
                            Lưu nháp
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(post.id, "Archived")
                            }
                          >
                            Lưu trữ
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

export default PostManagement;
