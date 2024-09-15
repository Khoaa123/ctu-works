"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "../Header/Header";

const HeaderWrapper = () => {
  const pathname = usePathname();
  const isHiddenPage =
    pathname === "/register" ||
    pathname === "/employer/register" ||
    pathname === "/recruiter" ||
    pathname.startsWith("/admin");

  if (isHiddenPage) {
    return null;
  }

  return <Header />;
};

export default HeaderWrapper;
