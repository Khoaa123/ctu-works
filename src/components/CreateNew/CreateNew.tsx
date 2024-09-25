"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type Post = {
  id?: string;
  title: string;
  author: string;
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

const CreateEditPost: React.FC<CreateEditPostProps> = ({
  post,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(post?.title || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [category, setCategory] = useState(post?.category || "");
  const [content, setContent] = useState(post?.content || "");
  const [status, setStatus] = useState<"published" | "draft">(
    post?.status || "draft"
  );
  const [publishDate, setPublishDate] = useState(
    post?.publishDate || new Date()
  );

  const router = useRouter();

  const handleSave = () => {
    const updatedPost: Post = {
      id: post?.id,
      title,
      author,
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
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {post ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
      </h1>
      <div className="mb-4">
        <Label htmlFor="title">Tiêu đề</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="author">Tác giả</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="category">Danh mục</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
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
      <div className="mb-6">
        <Label htmlFor="status">Trạng thái</Label>
        <Select
          value={status}
          onValueChange={(value: "published" | "draft") => setStatus(value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Đã xuất bản</SelectItem>
            <SelectItem value="draft">Bản nháp</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={handleSave}>Lưu</Button>
      </div>
    </div>
  );
};

export default CreateEditPost;
