"use client";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import RecruiterSidebar from "@/components/UserSidebar/RecruiterSidebar";
import Select from "react-select";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
const ChangePassword = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  })

  const updatePassword = async (formData: any) => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/change-password-recruiter`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          formData,
        }),
      }
    );

    return res.json();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    } else {
      updatePassword(formData)
        .then((response) => {
          if (response.status === "OK") {
            toast.success("Cập nhật mật khẩu thành công!");
            setTimeout(() => {
              window.location.href = "/recruiter/profile";
            }, 2000);
          } else {
            toast.error("Cập nhật mật khẩu thất bại. Vui lòng kiểm tra lại");
          }
        })
        .catch((error) => {
          console.log("Error!", error);
        });
    }

  };
  return (
    <>
      <div className="bg-[#F7F8FA]">
        <HeaderRecruiter />
        <div className="container py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <RecruiterSidebar />
            </div>
            <div className="col-span-3 flex flex-col gap-5">
              <div className="m-4 space-y-6">
                <h3 className="mb-4 flex items-center text-2xl font-semibold">
                  <span>Đổi mật khẩu</span>
                </h3>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companyName"
                  >
                    Mật khẩu hiện tại<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData?.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                    id="companyName"
                    type="text"
                    placeholder="Nhập vào mật khẩu truy cập hiện tại"
                    className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companyName"
                  >
                    Mật khẩu mới<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData?.newPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        newPassword: e.target.value,
                      });
                    }}
                    id="companyName"
                    type="text"
                    placeholder="Nhập mật khẩu truy cập mới"
                    className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companyName"
                  >
                    Xác nhận mật khẩu mới<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData?.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                    }}
                    id="companyName"
                    type="text"
                    placeholder="Nhập lại mật khẩu truy cập mới"
                    className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                  />
                </div>
                <div className="flex h-20 w-full justify-center bg-gray-100">
                  <button
                    onClick={handleSubmit}
                    className="mt-4 h-12 rounded bg-orange-500 px-4 py-2 text-white"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
