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
import { toast } from "react-toastify";

export default function RecruiterRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
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
    // businessLicense: "",
    companyScale: "",
    companyIndustries: "",
  });
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
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
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Đăng ký thất bại");
      }

      const data = await res.json();
      if (data.status === "OK") {
        toast.success(
          "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản."
        );
        router.push("/recruiter/login");
      } else {
        toast.error(
          data.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
        );
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      toast.error("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-grow items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Đăng ký nhà tuyển dụng</CardTitle>
            <CardDescription>
              Hoàn thành các bước để tạo tài khoản
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= s ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="grid w-full items-center gap-4">
                    {["fullName", "email", "password", "confirmPassword"].map(
                      (field) => (
                        <div key={field} className="flex flex-col space-y-1.5">
                          <Label htmlFor={field}>
                            {field === "fullName"
                              ? "Họ và tên"
                              : field === "confirmPassword"
                              ? "Xác nhận mật khẩu"
                              : field}
                          </Label>
                          <Input
                            id={field}
                            name={field}
                            type={
                              field.includes("password")
                                ? "password"
                                : field === "email"
                                ? "email"
                                : "text"
                            }
                            value={formData[field]}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          />
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="grid w-full items-center gap-4">
                    {[
                      "companyName",
                      "companyWebsite",
                      "companyFacebook",
                      "phoneNumber",
                      "companyScale",
                      // "companyIndustries",
                    ].map((field) => (
                      <div key={field} className="flex flex-col space-y-1.5">
                        <Label htmlFor={field}>
                          {field
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </Label>
                        <Input
                          id={field}
                          name={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                        />
                      </div>
                    ))}
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
