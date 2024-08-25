"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "../Header/Header";

const HeaderWrapper = () => {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/register" ||
    pathname === "/login" ||
    pathname === "/employer/register";

  if (isAuthPage) {
    return null;
  }

  return <Header />;
};

export default HeaderWrapper;
