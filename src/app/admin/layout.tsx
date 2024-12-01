"use client";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const router = useRouter();
  const cookies = useCookies();
  useLayoutEffect(() => {
    const accessTokenAdmin = cookies.get("accessTokenAdmin");
    if (!accessTokenAdmin) {
      router.replace("/admin/login");
    }
  }, [cookies, router]);
  return (
    <>
      <div className="flex h-lvh">
        {!isLoginPage && (
          <div className="w-1/5 bg-white">
            <Sidebar />
          </div>
        )}
        <div className="flex-1 bg-[#F7F8FA]">{children}</div>
      </div>
    </>
  );
};

export default Layout;
