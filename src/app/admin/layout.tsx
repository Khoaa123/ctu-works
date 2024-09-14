import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <div className="flex h-lvh">
        <div className="w-1/5 bg-white">
          <Sidebar />
        </div>
        <div className="flex-1 bg-[#F7F8FA]">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
