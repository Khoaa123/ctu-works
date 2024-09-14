"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/FormatDate";

type UserData = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  seekJobMode: boolean;
  isVerified: boolean;
  createdAt: string;
};

const UserManagement = () => {
  const fetchAllUser = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getAll`
    );
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError } = useQuery<UserData[]>({
    queryKey: ["getAll"],
    queryFn: fetchAllUser,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  return (
    <>
      <div className="px-4 py-2">
        <div className="w-full">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white">
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center bg-transparent">
                <thead className="">
                  <tr>
                    <th className="w-48 whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                      Tên
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                      Email
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                      Số điện thoại
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                      Tìm việc
                    </th>{" "}
                    {/* <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-[#64748b]">
                      Xác thực
                    </th> */}
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-[#f1f5f9] px-6 py-3 text-end align-middle text-xs font-semibold uppercase text-[#64748b]">
                      Ngày tham gia
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data &&
                    data.map((user) => (
                      <tr key={user._id}>
                        <th className="flex w-48 items-center gap-2 border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs text-black">
                          <Image
                            src="https://demo.nextadmin.co/images/brand/brand-03.svg"
                            alt="avatar"
                            height={30}
                            width={30}
                          />{" "}
                          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {user.fullName}
                          </p>
                        </th>
                        <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                          {user.email}
                        </td>
                        <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                          {user.phoneNumber}
                        </td>
                        <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                          {user.seekJobMode ? "Đã bật" : "Chưa bật"}{" "}
                        </td>{" "}
                        {/* <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                          <i className="fas fa-arrow-down mr-4 text-red-500"></i>
                          {user.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                        </td> */}
                        <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-end align-middle text-xs">
                          <i className="fas fa-arrow-down mr-4 text-red-500"></i>
                          {formatDate(user.createdAt)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
