"use client";
import React, { useState } from "react";
import Link from "next/link";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    phoneNumber: "",
    website: "",
    facebook: "",
    description: "",
    businessLicense: null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      businessLicense: e.target.files[0],
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="font-[sans-serif]">
      <div className="bg-custom-gradient min-h-[160px] p-4 text-center sm:p-6">
        <h4 className="text-2xl font-bold text-white sm:text-3xl">
          Đăng ký tài khoản nhà tuyển dụng{" "}
          <Link href="/">
            <span className="text-sky-400">CTU-Works</span>
          </Link>
        </h4>
      </div>

      <div className="mx-4 -mt-16 mb-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-4xl rounded-md bg-white p-4 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Tên công ty
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập tên công ty"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Email công ty
              </label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập email công ty"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Địa chỉ công ty
              </label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập địa chỉ công ty"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Số điện thoại liên hệ
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Website công ty (nếu có)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập link website"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Facebook công ty (nếu có)
              </label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập link Facebook"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Mô tả công ty
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập mô tả công ty"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Giấy phép kinh doanh
              </label>
              <input
                type="file"
                name="businessLicense"
                onChange={handleFileChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-sm bg-blue-500 px-6 py-3 text-sm font-semibold tracking-wider text-white hover:bg-blue-600 focus:outline-none"
            >
              Đăng ký
            </button>
          </div>

          <div className="my-5 text-center">
            <span className="text-gray-500">
              Bạn đã có tài khoản CTU-Works?
            </span>
            <button className="ml-2 font-semibold text-blue-600">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegister;
