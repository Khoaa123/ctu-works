"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-toastify";

export default function EmployerRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyWebsite: "",
    companyFacebook: "",
    phoneNumber: "",
    companyDescription: "",
    companyAddress: "",
    businessLicense: "",
  });
  const router = useRouter();
  const cookies = useCookies();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/sign-up-recruiter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            fullName: formData.fullName,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            companyName: formData.companyName,
            companyWebsite: formData.companyWebsite,
            companyFacebook: formData.companyFacebook,
            phoneNumber: formData.phoneNumber,
            companyDescription: formData.companyDescription,
            companyAddress: formData.companyAddress,
            businessLicense: formData.businessLicense,
          }),
        }
      );

      console.log(res);

      if (!res.ok) {
        throw new Error("Đăng ký thất bại");
      } else {
        const data = await res.json();
        if (data.status === "OK") {
          console.log("Đăng ký thành công");
          toast.success("Đăng ký thành công");
          router.push("/recruiter/login");
        } else {
          console.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
        }
        return data;
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-grow items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Đăng ký</CardTitle>
            <CardDescription>Đăng ký tài khoản nhà tuyển dụng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="companyName">Tên công ty</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="companyWebsite">Website công ty</Label>
                      <Input
                        id="companyWebsite"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="companyFacebook">Facebook công ty</Label>
                      <Input
                        id="companyFacebook"
                        name="companyFacebook"
                        value={formData.companyFacebook}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="phoneNumber">Số điện thoại</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="companyDescription">Mô tả công ty</Label>
                      <Textarea
                        id="companyDescription"
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleInputChange}
                        className="focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="companyAddress">Địa chỉ công ty</Label>
                      <Input
                        id="companyAddress"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="businessLicense">
                        Giấy phép kinh doanh
                      </Label>
                      <Input
                        id="businessLicense"
                        name="businessLicense"
                        type="file"
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                Quay lại
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext}>Tiếp tục</Button>
            ) : (
              <Button onClick={handleSubmit}>Đăng ký</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
