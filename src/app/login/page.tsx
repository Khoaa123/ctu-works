"use client";
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();
  const cookies = useCookies();
  useEffect(() => {
    if (cookies.get("accessToken")) {
      router.push("/");
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Đăng nhập thất bại");
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data.status === "OK") {
        cookies.set("accessToken", data.access_token);
        cookies.set("refreshToken", data.refresh_token);
        toast.success("Đăng nhập thành công");
        router.push("/");
      } else {
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi đăng ký:", error);
      toast.error("Đăng nhập thất bại");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  const handleLoginSuccess = async (credentialResponse: any) => {
    const { credential } = credentialResponse;

    try {
      const res = await fetch(`http://localhost:3001/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      if (!res.ok) {
        throw new Error("Google login failed");
      }

      const data = await res.json();

      cookies.set("accessToken", data.access_token);
      cookies.set("refreshToken", data.refresh_token);

      toast.success("Đăng nhập thành công");
      router.push("/");
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <>
      {mutation.isPending && (
        <div>
          <ScreenLoading />
        </div>
      )}
      <div className="container my-12 px-6">
        <div className="grid grid-cols-2 gap-16">
          <div>
            <p className="text-xl font-bold">
              Chào mừng bạn đến với{" "}
              <span className="text-sky-400"> CTU-Works</span>
            </p>
            <p className="my-6">
              Bằng việc đăng nhập, bạn đồng ý với các{" "}
              <span className="text-blue-700">Điều khoản dịch vụ</span> và{" "}
              <span className="text-blue-700">Chính sách quyền riêng tư</span>{" "}
              của CTU-Works liên quan đến thông tin riêng tư của bạn.
            </p>
            <div className="flex flex-col gap-4">
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => console.log("Login Failed")}
                />
              </GoogleOAuthProvider>
            </div>
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 text-center">Hoặc</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    Email
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-300"
                    placeholder="Nhập email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-300"
                    placeholder="Nhập mật khẩu"
                    {...register("password")}
                  />{" "}
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button
                  className="h-10 bg-orange-400 text-white shadow-none hover:bg-orange-500"
                  type="submit"
                >
                  Đăng nhập
                </Button>
                <div className="text-center">
                  <span className="text-gray-500">
                    Bạn đã có tài khoản CTU-Works?{" "}
                  </span>
                  <Link href="/register">
                    <button className="ml-2 font-semibold text-blue-600">
                      Đăng nhập
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col py-12">
            <p className="text-2xl font-bold">
              Đăng nhập để truy cập ngay vào hàng ngàn đánh giá và dữ liệu lương
              thị trường IT
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <p className="flex items-center gap-4">
                <FaCheck color="red" /> Xem trước mức lương để có thể lợi thế
                khi thoả thuận lương
              </p>
              <p className="flex items-center gap-4">
                <FaCheck color="red" /> Tìm hiểu về phúc lợi, con người, văn hóa
                công ty qua các đánh giá chân thật
              </p>
              <p className="flex items-center gap-4">
                <FaCheck color="red" /> Dễ dàng ứng tuyển chỉ với một thao tác
              </p>{" "}
              <p className="flex items-center gap-4">
                <FaCheck color="red" /> Quản lý hồ sơ và quyền riêng tư của bạn
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
