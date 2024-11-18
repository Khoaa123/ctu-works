"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import mammoth from "mammoth";

interface Template {
  _id: string;
  templateName: string;
  fileUrl: string;
  imageUrl: string;
}

export default function Component() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/cv/list")
      .then((res) => res.json())
      .then((data) => {
        console.log("Templates fetched:", data.templates);
        setTemplates(data.templates);
        if (data.templates.length > 0) {
          setSelectedTemplate(data.templates[0]._id);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
        setError("Không thể tải danh sách mẫu CV. Vui lòng thử lại sau.");
        setIsLoading(false);
      });
  }, []);

  const loadDocContent = async (fileUrl: string) => {
    try {
      console.log("Fetching file from URL:", fileUrl);
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      console.log("File size (bytes):", arrayBuffer.byteLength);

      mammoth
        .convertToHtml({ arrayBuffer })
        .then((result) => {
          console.log("Conversion result:", result);
          setHtmlContent(result.value || "Tài liệu không có nội dung.");
        })
        .catch((error) => {
          console.error("Error converting document:", error);
          setError("Không thể chuyển đổi tài liệu. Vui lòng thử lại sau.");
        });
    } catch (error) {
      console.error("Error loading or converting document:", error);
      setError("Lỗi khi tải hoặc chuyển đổi tài liệu. Vui lòng kiểm tra file.");
    }
  };

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find((t) => t._id === selectedTemplate);
      if (template) {
        loadDocContent(template.fileUrl);
      }
    }
  }, [selectedTemplate, templates]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Template Selection */}
      <div className="w-1/2 border-r bg-gray-50 p-6">
        <h2 className="mb-6 text-2xl font-bold">Chọn mẫu CV</h2>
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card
              key={template._id}
              className={cn(
                "relative cursor-pointer transition-all hover:shadow-lg",
                selectedTemplate === template._id && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedTemplate(template._id)}
            >
              <CardContent className="p-3">
                <div className="relative mb-3 aspect-[3/4]">
                  <img
                    src={template.imageUrl}
                    alt={template.templateName}
                    className="h-full w-full rounded-sm object-cover"
                  />
                  {selectedTemplate === template._id && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="rounded-full bg-green-500 p-4">
                        <Check className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold">
                  {template.templateName}
                </h3>
                <Button
                  variant="secondary"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  size="sm"
                >
                  Xem mẫu
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Side - CV Preview */}
      <div className="w-1/2 p-6">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : htmlContent ? (
            <div
              className="prose prose-sm max-w-none"
              contentEditable
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <p className="text-gray-500">Không có nội dung để hiển thị.</p>
          )}
        </div>
      </div>
    </div>
  );
}
