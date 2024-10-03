"use client";
import React, { useState } from "react";
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

  const Login = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/sign-in-recruiter`,
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

      console.log(res);

      if (!res.ok) {
        throw new Error("Đăng nhập thất bại");
      } else {
        const data = await res.json();
        if (data.status === "OK") {
          console.log("Đăng nhập thành công");
          cookies.set("accessToken", data.access_token);
          cookies.set("refreshToken", data.refresh_token);
          toast.success("Đăng nhập thành công");
          router.push("/recruiter");
        } else {
          console.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
        return data;
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
              Đăng nhập nhà tuyển dụng
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Duy trì đăng nhập
                  </Label>
                </div>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  href="#"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Button
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
                onClick={Login}
                type="button"
              >
                Đăng nhập
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Bạn chưa đăng ký?{" "}
              <Link className="text-blue-600 hover:underline" href="#">
                Đăng ký ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="flex justify-end p-4">
        <Button variant="ghost" className="text-sm text-gray-600">
          Trợ giúp
        </Button>
      </div>
    </div>
  );
};

export default Login;
