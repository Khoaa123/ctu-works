"use client";

import React, { useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { toast } from "react-toastify";

type Post = {
  id?: string;
  title: string;
  summary: string;
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
  const [content, setContent] = useState(post?.content || "");
  const [status, setStatus] = useState<"published" | "draft">(
    post?.status || "draft"
  );
  const [publishDate, setPublishDate] = useState(
    post?.publishDate || new Date()
  );
  const fetchCreateNews = async (post: Post) => {
    const res = await fetch(`http://localhost:3001/api/news/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) {
      throw new Error("Failed to create news");
    }
    return res.json();
  };
  const handleSave = async () => {
    const updatedPost: Post = {
      id: post?.id,
      title,
      summary,
      content,
      status,
      publishDate,
    };
    const res = await fetchCreateNews(updatedPost);
    if(res.status == "OK"){
      toast.success("Tạo bài viết thành công");
      setTimeout(() => {
        window.location.href = "/admin/post-management";
      }, 1000);
    }else{
      toast.error("Tạo bài viết thất bại");
    }
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
