"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-toastify";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const cookies = useCookies();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const login = async () => {
    try {
      if (!formData.email || !formData.password) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!res.ok) {
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        throw new Error("Đăng nhập thất bại");
      } else {
        const data = await res.json();
        if (data.status === "OK") {
          cookies.set("accessTokenAdmin", data.access_token);
          cookies.set("refreshTokenAdmin", data.refresh_token);
          toast.success("Đăng nhập thành công");
          router.replace("/admin/user-management"); // Redirect to admin dashboard
        } else {
          if (data.message === "Account not verified") {
            toast.error(
              "Tài khoản chưa được xác thực. Vui lòng kiểm tra email để xác thực tài khoản"
            );
            return;
          }
          toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-grow items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Đăng nhập quản trị viên
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Tài khoản đăng nhập <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  placeholder="Nhập email của bạn"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Mật khẩu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Nhập mật khẩu của bạn"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-400 focus-visible:ring-0"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
                onClick={login}
                type="button"
              >
                Đăng nhập
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
