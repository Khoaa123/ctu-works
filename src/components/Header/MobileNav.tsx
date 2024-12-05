import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavItem {
  title: string;
  href?: string;
  items?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Việc làm",
    items: [
      { title: "Tìm việc làm", href: "/job-search/keyword=all" },
      { title: "Việc làm phù hợp", href: "#" },
    ],
  },
  {
    title: "Việc của tôi",
    items: [
      { title: "Việc đã lưu", href: "/profile/my-job" },
      { title: "Việc đã ứng tuyển", href: "/profile/my-job" },
      { title: "Việc dành cho bạn", href: "#" },
    ],
  },
  { title: "Công ty", href: "/company-search" },
  {
    title: "Công cụ",
    items: [
      { title: "Tính lương GROSS - NET", href: "/salary-calculator" },
      { title: "Tạo CV", href: "/cv/edit-cv" },
    ],
  },
  {
    title: "Cẩm nang nghề nghiệp",
    items: [
      {
        title: "Các câu hỏi phỏng vấn thường gặp",
        href: "/interview-questions",
      },
      { title: "Lộ trình sự nghiệp", href: "/career-path" },
      { title: "Kiến thức chuyên ngành", href: "/blog/knowledge" },
      { title: "Bí kíp tìm việc", href: "#" },
      { title: "Chế độ lương thưởng", href: "#" },
      { title: "Hành trang nghề nghiệp", href: "#" },
      { title: "Thị trường và xu hướng tuyển dụng", href: "#" },
    ],
  },
  {
    title: "Blog",
    items: [
      { title: "Option 1", href: "#" },
      { title: "Option 2", href: "#" },
      { title: "Option 3", href: "#" },
    ],
  },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
      </div>
      <nav className="px-4 py-2">
        <Accordion type="single" collapsible>
          {navItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              {item.items ? (
                <>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-4 space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="list-none">
                          <Link
                            href={subItem.href}
                            className="block py-2"
                            onClick={onClose}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="block py-2"
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </div>
  );
}
