import UserSidebar from "@/components/UserSidebar/UserSidebar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <div className="bg-[#F7F8FA]">
        <div className="container py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <UserSidebar />
            </div>
            <div className="col-span-3 flex flex-col gap-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
