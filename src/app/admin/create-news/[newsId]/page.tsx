"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditNews = () => {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      if (params.newsId) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/news/get-detail-news/${params.newsId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch news data");
          }

          const news = await response.json();

          setTitle(news.data.title);
          setSummary(news.data.summary);
          setContent(news.data.content);
        } catch (error) {
          console.error("Failed to fetch news data", error);
        }
      }
    };

    fetchNews();
  }, [params.newsId]);

  const handleSave = async () => {
    const newsId = params.newsId;
    const newNews = {
      title,
      summary,
      content,
    };

    try {
      setIsLoading(true);

      const response = await fetch(
        params.newsId
          ? `http://localhost:3001/api/news/update-news/${newsId}`
          : `http://localhost:3001/api/news/create-news`,
        {
          method: params.newId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: params.newsId, title, summary, content }),
        }
      );

      if (response.ok) {
        router.push("/admin/post-management");
      } else {
        console.error("Failed to save news");
      }
    } catch (error) {
      console.error("Failed to save news", error);
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
        <h1 className="mb-6 text-2xl font-bold text-indigo-700">
          {params.newsId ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
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
          <Label htmlFor="summary">Tóm tắt</Label>
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
