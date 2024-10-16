import UserSidebar from "@/components/UserSidebar/UserSidebar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <div className="bg-[#F7F8FA]">
        <div className="container py-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="w-full lg:col-span-1">
              <UserSidebar />
            </div>
            <div className="flex flex-col gap-5 lg:col-span-3">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
