import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 flex-shrink-0 bg-white">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col bg-[#F7F8FA]">
        {/* <Navbar /> */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
