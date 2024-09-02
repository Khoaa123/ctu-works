"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "../Footer/Footer";

const FooterWrapper = () => {
  const pathname = usePathname();
  const isHiddenPage =
    pathname === "/register" ||
    pathname === "/login" ||
    pathname === "/employer/register";

  if (isHiddenPage) {
    return null;
  }

  return <Footer />;
};

export default FooterWrapper;