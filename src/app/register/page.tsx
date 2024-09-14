"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type WorkingPreferences = {
  companyIndustries: string[];
};

type FormData = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phoneNumber: string;
  jobTitle: string;
  currentDegree: string;
  currentIndustries: string;
  currentJobFunction: string;
  yearsExperience: string;
  currentSalary: string;
  highestDegree: string;
  country: string;
  city: string;
  district: string;
  address: string;
  gender: string;
  maritalStatusId: string;
  MSSV: string;
  skillName: string[];
  workingPreferences: WorkingPreferences;
};

const Register = () => {
  const [date, setDate] = React.useState<Date>();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    phoneNumber: "",
    jobTitle: "",
    currentDegree: "",
    currentIndustries: "",
    currentJobFunction: "",
    yearsExperience: "",
    currentSalary: "",
    highestDegree: "",
    country: "",
    city: "",
    district: "",
    address: "",
    gender: "",
    maritalStatusId: "",
    MSSV: "",
    skillName: [],
    workingPreferences: {
      companyIndustries: [],
    },
  });

  const industries = [
    { id: 1, name: "Công nghệ thông tin" },
    { id: 2, name: "Kinh doanh / Bán hàng" },
    { id: 3, name: "Kế toán / Kiểm toán" },
    { id: 4, name: "Hành chính / Thư ký" },
    { id: 5, name: "Marketing / Truyền thông" },
    { id: 6, name: "Du lịch / Nhà hàng / Khách sạn" },
    { id: 7, name: "Xây dựng / Kiến trúc" },
    { id: 8, name: "Giáo dục / Đào tạo" },
    { id: 9, name: "Y tế / Dược phẩm" },
  ];
  const [selectedIndustries, setSelectedIndustries] = useState<number[]>([]);

  const handleIndustryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const industryId = Number(event.currentTarget.value);
    setSelectedIndustries((prevIndustries) => {
      if (prevIndustries.includes(industryId)) {
        return prevIndustries.filter((id) => id !== industryId);
      } else {
        return [...prevIndustries, industryId];
      }
    });
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            phoneNumber: Number(data.phoneNumber),
            yearsExperience: Number(data.yearsExperience),
            currentSalary: Number(data.currentSalary),
            gender: Number(data.gender),
            maritalStatusId: Number(data.maritalStatusId),
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Đăng ký thất bại");
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Đăng ký thành công");
        router.push("/");
      } else {
        toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi đăng ký:", error);
      toast.error("Đăng ký thất bại");
    },
  });

  const register = () => {
    mutation.mutate(formData);
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      workingPreferences: {
        ...prevFormData.workingPreferences,
        companyIndustries: selectedIndustries.map(
          (id) => industries.find((industry) => industry.id === id)?.name || ""
        ),
      },
    }));
  }, [selectedIndustries]);

  useEffect(() => {
    if (date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: format(date, "dd/MM/yyyy"),
      }));
    }
  }, [date]);
  return (
    <>
      <div>
        <div className="bg-custom-gradient min-h-[160px] p-4 text-center sm:p-6">
          <h4 className="text-2xl font-bold text-white sm:text-3xl">
            Đăng ký tài khoản nhà tuyển dụng
            <Link href="/">
              <span className="text-sky-400"> CTU-Works</span>
            </Link>
          </h4>
        </div>

        <div className="mx-4 -mt-16 mb-4">
          <form className="mx-auto max-w-4xl rounded-md bg-white p-4 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border-none bg-gray-100 px-6 py-3 text-sm font-semibold tracking-wider text-gray-800 outline-none hover:bg-gray-200"
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
                className="flex w-full items-center justify-center rounded-md border-none bg-gray-100 px-6 py-3 text-sm font-semibold tracking-wider text-gray-800 outline-none hover:bg-gray-200"
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

            <div className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 text-center">Or</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Mật khẩu
                </label>
                <input
                  name="password"
                  type="password"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Nhập lại mật khẩu
                </label>
                <input
                  name="cpassword"
                  type="password"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Năm sinh
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "shadow-none w-full border-gray-300 rounded-sm h-10  justify-start text-left hover:bg-transparent  font-normal data-[state=open]:border-sky-400",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "dd/MM/yyyy")
                      ) : (
                        <span>Ngày/Tháng/Năm</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={date}
                      onSelect={setDate}
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập số điện thoại"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Chức Danh
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập chức danh"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Cấp bậc hiện tại
                </label>
                <Select
                  value={formData.currentDegree}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      currentDegree: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 rounded-sm border-gray-300 bg-white shadow-none focus:ring-0 data-[state=open]:border-sky-400">
                    <SelectValue placeholder="Vui lòng chọn cấp bậc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thực tập sinh/Sinh viên">
                      Thực tập sinh/Sinh viên
                    </SelectItem>
                    <SelectItem value="Mới tốt nghiệp">
                      Mới tốt nghiệp
                    </SelectItem>
                    <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                    <SelectItem value="Trưởng phòng">
                      Trưởng phòng
                    </SelectItem>{" "}
                    <SelectItem value="Trưởng phòng">
                      Giám đốc và Cấp Cao Hơn
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Lĩnh vực hiện tại
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập tên ngành"
                  value={formData.currentIndustries}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentIndustries: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Ngành
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập chức danh"
                  value={formData.currentJobFunction}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentJobFunction: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Số năm kinh nghiệm
                </label>
                <input
                  type="number"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập số năm kinh nghiệm"
                  min={0}
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsExperience: e.target.value,
                    })
                  }
                />
              </div>{" "}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Mức lương hiện tại
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập chức danh"
                  value={formData.currentSalary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentSalary: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Bằng cấp cao nhất
                </label>
                <Select
                  value={formData.highestDegree}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      highestDegree: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 rounded-sm border-gray-300 bg-white shadow-none focus:ring-0 data-[state=open]:border-sky-400">
                    <SelectValue placeholder="Vui lòng chọn bằng cấp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đại học">Đại học</SelectItem>
                    <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                    <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Quốc tịch
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập chức danh"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Thành phố
                </label>
                <Select
                  value={formData.city}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      city: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 rounded-sm border-gray-300 bg-white shadow-none focus:ring-0 data-[state=open]:border-sky-400">
                    <SelectValue placeholder="Vui lòng chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hồ Chính Minh">Hồ Chí Minh</SelectItem>
                    <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Quận/Huyện
                </label>
                <Select
                  value={formData.district}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      district: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 rounded-sm border-gray-300 bg-white shadow-none focus:ring-0 data-[state=open]:border-sky-400">
                    <SelectValue placeholder="Vui lòng chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quận 1">Quận 1</SelectItem>
                    <SelectItem value="Ninh Kiều">Ninh Kiều</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập tên ngành"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Giới tính
                </label>
                <Select
                  value={formData.gender.toString()}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      gender: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 rounded-sm border-gray-300 bg-white shadow-none focus:ring-0 data-[state=open]:border-sky-400">
                    <SelectValue placeholder="Vui lòng chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Nam</SelectItem>
                    <SelectItem value="2">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Tình trạng hôn nhân
                </label>
                <Select
                  value={formData.maritalStatusId.toString()}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      maritalStatusId: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 rounded-sm border-gray-300 bg-white shadow-none focus:ring-0 data-[state=open]:border-sky-400">
                    <SelectValue placeholder="Vui lòng chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Độc thân</SelectItem>
                    <SelectItem value="2">Đã kết hôn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  MSSV
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                  placeholder="Nhập mã số sinh viên"
                  value={formData.MSSV}
                  onChange={(e) =>
                    setFormData({ ...formData, MSSV: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Kỹ năng
                </label>
                <div className="flex flex-wrap items-center gap-2 rounded-sm border border-solid border-gray-300 p-2">
                  {formData.skillName.map((skill, index) => (
                    <button
                      key={index}
                      className="rounded-md bg-blue-500 px-2 py-1 text-white"
                      onClick={() => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          skillName: prevFormData.skillName.filter(
                            (_, i) => i !== index
                          ),
                        }));
                      }}
                    >
                      {skill} &times;
                    </button>
                  ))}
                  <input
                    type="text"
                    className="h-fit flex-grow border-none text-sm text-gray-800 outline-none"
                    placeholder="Nhập tên kỹ năng và nhấn Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const target = e.target as HTMLInputElement;
                        if (target.value.trim()) {
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            skillName: [
                              ...prevFormData.skillName,
                              target.value.trim(),
                            ],
                          }));
                          target.value = "";
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="h-10 w-full rounded-sm bg-blue-500 px-6 py-3 text-sm font-semibold tracking-wider text-white hover:bg-blue-600 focus:outline-none"
                  >
                    Tiếp tục
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0">
                  <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                    <DialogTitle>Công việc muốn tìm</DialogTitle>
                  </DialogHeader>
                  <div className="px-6">
                    <p className="mb-2 font-medium">
                      <span className="font-semibold text-[#FF9119]">Tip:</span>{" "}
                      Hãy chọn các công việc bạn muốn tìm việc
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 px-6">
                    {industries.map((industry) => (
                      <button
                        key={industry.id}
                        className={`flex w-fit items-center gap-1 rounded-md border border-solid px-3 py-2 text-sm ${
                          selectedIndustries.includes(industry.id)
                            ? "bg-[#00b14f] text-white"
                            : "bg-white text-gray-400"
                        } hover:bg-[#00b14f] hover:text-white`}
                        value={industry.id.toString()}
                        onClick={handleIndustryClick}
                      >
                        {industry.name}
                      </button>
                    ))}
                  </div>
                  <DialogFooter className="border-t border-gray-300 px-6 py-4">
                    <DialogClose asChild>
                      <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                        Hủy
                      </Button>
                    </DialogClose>
                    <Button
                      className="bg-[#00b14f] text-white shadow-none hover:bg-green-700"
                      onClick={register}
                    >
                      {mutation.isPending ? <ScreenLoading /> : "Đăng ký"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="my-5 text-center">
              <span className="text-gray-500">
                Bạn đã có tài khoản CTU-Works?{" "}
              </span>
              <button className="ml-2 font-semibold text-blue-600">
                Đăng nhập
              </button>
            </div>
            <div className="my-6 h-[1px] w-full bg-teal-100"></div>
            <div className="text-center">
              <span className="text-gray-500">
                Nếu bạn có nhu cầu tuyển dụng, vui lòng đăng ký tại{" "}
              </span>
              <Link href="/employer/register">
                <button className="text-blue-600">đây</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
