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
    pathname.startsWith("/career-path/") ||
    pathname.startsWith("/job-search/") ||
    pathname.startsWith("/profile");

  if (isHiddenPage) {
    return null;
  }
  return <Search />;
};

export default SearchWrapper;
