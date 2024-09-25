"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter, useParams } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  status: "published" | "draft";
  publishDate: Date;
};

const EditNews = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [publishDate, setPublishDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/posts/${id}`);
          const post = await response.json();

          setTitle(post.title);
          setAuthor(post.author);
          setCategory(post.category);
          setContent(post.content);
          setStatus(post.status);
          setPublishDate(new Date(post.publishDate));
        } catch (error) {
          console.error("Failed to fetch post data", error);
        }
      }
    };

    fetchPostData();
  }, [id]);

  const handleSave = async () => {
    if (typeof id !== "string") {
      console.error("Invalid post ID");
      return;
    }

    const updatedPost: Post = {
      id,
      title,
      author,
      category,
      content,
      status,
      publishDate,
    };

    try {
      setIsLoading(true);

      const requestOptions = {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      };

      const response = await fetch(`/api/posts/${id ?? ""}`, requestOptions);

      if (response.ok) {
        router.push("/admin/post-management");
      } else {
        console.error("Failed to save post");
      }
    } catch (error) {
      console.error("Failed to save post", error);
    } finally {
      setIsLoading(false);
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
          {id ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
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
          <Label htmlFor="author">Tác giả</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 shadow-none focus:border-sky-400 focus-visible:ring-0"
          />
        </div>
        {/* <div className="mb-4">
          <Label htmlFor="category">Danh mục</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 shadow-none focus:border-sky-400 focus-visible:ring-0"
          />
        </div> */}
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
            <Button variant="outline">Hủy</Button>
          </Link>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
