"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Search from "../Search/Search";

const SearchWrapper = () => {
  const pathname = usePathname();
  const isHiddenPage =
    pathname === "/blog/knowledge" ||
    pathname === "/career-path" ||
    pathname === "/salary-calculator" ||
    pathname === "/interview-questions" ||
    pathname === "/login" ||
    pathname === "/company-search" ||
    pathname.startsWith("/career-path/") ||
    pathname.startsWith("/job-search/") ||
    pathname.startsWith("/admin") ||
    pathname === "/recruiter" ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/cv") ||
    pathname.startsWith("/best-jobs") ||
    pathname.startsWith("/new-jobs") ||
    pathname.startsWith("/news");

  if (isHiddenPage) {
    return null;
  }
  return <Search />;
};

export default SearchWrapper;
