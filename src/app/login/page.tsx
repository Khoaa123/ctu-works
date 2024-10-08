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
  })
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
              <button
                type="button"
                className="flex h-fit w-full items-center justify-center rounded-md border-none bg-gray-100 py-2 text-sm font-semibold tracking-wider text-gray-800 outline-none hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  className="mr-3"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>{" "}
                Đăng ký với Google
              </button>
              <button
                type="button"
                className="flex h-fit w-full items-center justify-center rounded-md border-none bg-gray-100 py-2 text-sm font-semibold tracking-wider text-gray-800 outline-none hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  className="mr-3"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#039be5"
                    d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                  ></path>
                </svg>
                Đăng ký với Facebook
              </button>
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
