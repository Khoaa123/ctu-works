"use client";

import React, { useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

type Post = {
  id?: string;
  title: string;
  summary: string;
  category: string;
  content: string;
  status: "published" | "draft";
  publishDate: Date;
};

type CreateEditPostProps = {
  post?: Post;
  onSave: (post: Post) => void;
  onCancel: () => void;
};

const CreateNews: React.FC<CreateEditPostProps> = ({
  post,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(post?.title || "");
  const [summary, setSummary] = useState(post?.summary || "");
  const [category, setCategory] = useState(post?.category || "");
  const [content, setContent] = useState(post?.content || "");
  const [status, setStatus] = useState<"published" | "draft">(
    post?.status || "draft"
  );
  const [publishDate, setPublishDate] = useState(
    post?.publishDate || new Date()
  );

  const handleSave = () => {
    const updatedPost: Post = {
      id: post?.id,
      title,
      summary,
      category,
      content,
      status,
      publishDate,
    };
    onSave(updatedPost);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="p-6">
      <div className="bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">
          {post ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
        </h1>
        <div className="mb-4">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 shadow-none focus:border-sky-400 focus-visible:ring-0"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="summary">Đoạn tóm tắt</Label>
          <Input
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mt-1 shadow-none focus:border-sky-400 focus-visible:ring-0"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="category">Danh mục</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 shadow-none focus:border-sky-400 focus-visible:ring-0"
          />
        </div>
        <div className="create-post-editor mb-4">
          <Label htmlFor="content">Nội dung</Label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="mt-1"
          />
        </div>
        {/* <div className="mb-6">
          <Label htmlFor="status">Trạng thái</Label>
          <Select
            value={status}
            onValueChange={(value: "published" | "draft") => setStatus(value)}
          >
            <SelectTrigger className="mt-1 data-[state=open]:border-sky-400">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Đã đăng</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/post-management">
            <Button variant="outline" onClick={onCancel}>
              Hủy
            </Button>
          </Link>
          <Button onClick={handleSave}>Lưu</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNews;
