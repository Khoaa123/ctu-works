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
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
import SelectReact from "react-select";
import MultipleSelector from "@/components/ui/multiple-selector";

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
  currentIndustries: string[];
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
    currentIndustries: [],
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
  const optionsFeild = [
    { value: "Quản Lý Cửa Hàng", label: "Quản Lý Cửa Hàng" },
    { value: "Quản Lý Khu Vực", label: "Quản Lý Khu Vực" },
    { value: "Thu Mua", label: "Thu Mua" },
    { value: "Trợ Lý Bán Lẻ", label: "Trợ Lý Bán Lẻ" },
    { value: "Bao Tiêu/Bảo Lãnh", label: "Bao Tiêu/Bảo Lãnh" },
    { value: "Bồi Thường Bảo Hiểm", label: "Bồi Thường Bảo Hiểm" },
    { value: "Định Phí Bảo Hiểm", label: "Định Phí Bảo Hiểm" },
    { value: "Tư Vấn Rủi Ro", label: "Tư Vấn Rủi Ro" },
    { value: "Cho Thuê & Quản Lý Căn Hộ", label: "Cho Thuê & Quản Lý Căn Hộ" },
    { value: "Định Giá", label: "Định Giá" },
    {
      value: "Kinh Doanh Thương Mại, Cho Thuê & Quản Lý Tài Sản",
      label: "Kinh Doanh Thương Mại, Cho Thuê & Quản Lý Tài Sản",
    },
    {
      value: "Phân Tích Dự Án Bất Động Sản",
      label: "Phân Tích Dự Án Bất Động Sản",
    },
    { value: "Phát Triển Bất Động Sản", label: "Phát Triển Bất Động Sản" },
    { value: "Quản Lý Cơ Sở Vật Chất", label: "Quản Lý Cơ Sở Vật Chất" },
    { value: "CEO", label: "CEO" },
    { value: "Quản Lý Cấp Cao", label: "Quản Lý Cấp Cao" },
    {
      value: "Chính sách, Quy hoạch & Quy định",
      label: "Chính sách, Quy hoạch & Quy định",
    },
    { value: "NGO/Phi Lợi Nhuận", label: "NGO/Phi Lợi Nhuận" },
    {
      value: "Bảo Mật Công Nghệ Thông Tin",
      label: "Bảo Mật Công Nghệ Thông Tin",
    },
    { value: "Chuyển Đổi Số", label: "Chuyển Đổi Số" },
    { value: "IT Support/Help Desk", label: "IT Support/Help Desk" },
    { value: "Phần Cứng Máy Tính", label: "Phần Cứng Máy Tính" },
    { value: "Phần Mềm Máy Tính", label: "Phần Mềm Máy Tính" },
    {
      value: "Phân Tích Kinh Doanh/Phân Tích Hệ Thống",
      label: "Phân Tích Kinh Doanh/Phân Tích Hệ Thống",
    },
    { value: "QA/QC/Software Testing", label: "QA/QC/Software Testing" },
    {
      value: "Quản Lý Công Nghệ Thông Tin",
      label: "Quản Lý Công Nghệ Thông Tin",
    },
    { value: "Quản Lý Dự Án Công Nghệ", label: "Quản Lý Dự Án Công Nghệ" },
    { value: "Quản Trị Cơ Sở Dữ Liệu", label: "Quản Trị Cơ Sở Dữ Liệu" },
    {
      value: "System/Cloud/DevOps Engineer",
      label: "System/Cloud/DevOps Engineer",
    },
    { value: "Viễn Thông", label: "Viễn Thông" },
    {
      value: "Phát Triển Sản Phẩm May Mặc",
      label: "Phát Triển Sản Phẩm May Mặc",
    },
    { value: "Đầu Bếp", label: "Đầu Bếp" },
    { value: "Quản Lý F&B", label: "Quản Lý F&B" },
    {
      value: "Data Engineer/Data Analyst/AI",
      label: "Data Engineer/Data Analyst/AI",
    },
    { value: "UX/UI Design", label: "UX/UI Design" },
    { value: "Quản Lý Đơn Hàng", label: "Quản Lý Đơn Hàng" },
    { value: "Quầy Bar/Đồ Uống/Phục vụ", label: "Quầy Bar/Đồ Uống/Phục vụ" },
    { value: "Dịch Vụ Khách Hàng", label: "Dịch Vụ Khách Hàng" },
    {
      value: "Dịch Vụ Khách Hàng - Call Center",
      label: "Dịch Vụ Khách Hàng - Call Center",
    },
    {
      value: "Dịch Vụ Khách Hàng - Hướng Khách Hàng",
      label: "Dịch Vụ Khách Hàng - Hướng Khách Hàng",
    },
    { value: "Phân Phối Dược Phẩm", label: "Phân Phối Dược Phẩm" },
    {
      value: "Dịch Vụ Sinh Viên/Hỗ Trợ Học Viên",
      label: "Dịch Vụ Sinh Viên/Hỗ Trợ Học Viên",
    },
    { value: "Giảng Dạy/Đào Tạo", label: "Giảng Dạy/Đào Tạo" },
    { value: "Nghiên Cứu Học Thuật", label: "Nghiên Cứu Học Thuật" },
    { value: "Quản Lý Giáo Dục", label: "Quản Lý Giáo Dục" },
    { value: "Tư Vấn Giáo Dục", label: "Tư Vấn Giáo Dục" },
    { value: "Bảo Vệ", label: "Bảo Vệ" },
    { value: "Biên Phiên Dịch", label: "Biên Phiên Dịch" },
    { value: "Điều Phối", label: "Điều Phối" },
    { value: "Hành Chính", label: "Hành Chính" },
    { value: "Lễ Tân/Tiếp Tân", label: "Lễ Tân/Tiếp Tân" },
    { value: "Quản Lý Văn Phòng", label: "Quản Lý Văn Phòng" },
    { value: "Thư Ký", label: "Thư Ký" },
    { value: "Trợ Lý Kinh Doanh", label: "Trợ Lý Kinh Doanh" },
    { value: "Quản Lý Chuỗi Cung Ứng", label: "Quản Lý Chuỗi Cung Ứng" },
    { value: "Quản Lý Kho & Phân Phối", label: "Quản Lý Kho & Phân Phối" },
    { value: "Quản Lý Đội Xe", label: " Quản Lý Đội Xe" },
    {
      value: "Thu Mua & Quản Trị Hàng Tồn Kho",
      label: "Thu Mua & Quản Trị Hàng Tồn Kho",
    },
    {
      value: "Vận Tải/Giao Nhận Hàng Hóa",
      label: "Vận Tải / Giao Nhận Hàng Hóa ",
    },
    {
      value: "Xuất Nhập Khẩu & Thủ Tục Hải Quan",
      label: "Xuất Nhập Khẩu & Thủ Tục Hải Quan",
    },
    {
      value: "Kế hoạch/Tư Vấn Doanh Nghiệp",
      label: "Kế hoạch / Tư Vấn Doanh Nghiệp ",
    },
    { value: "Kế Toán Chi Phí", label: "Kế Toán Chi Phí" },
    { value: "Kế Toán Công Nợ", label: "Kế Toán Công Nợ" },
    { value: "Kế Toán Doanh Thu", label: "Kế Toán Doanh Thu" },
    { value: "Kế Toán Quản Trị", label: "Kế Toán Quản Trị" },
    { value: "Kế Toán Tài Chính", label: "Kế Toán Tài Chính" },
    { value: "Kế Toán Thanh Toán", label: "Kế Toán Thanh Toán" },
    { value: "Kế Toán Thuế", label: "Kế Toán Thuế" },
    { value: "Kế Toán Tổng Hợp", label: "Kế Toán Tổng Hợp" },
    { value: "Kiểm Soát Viên Tài Chính", label: "Kiểm Soát Viên Tài Chính" },
    { value: "Kiểm Toán", label: "Kiểm Toán" },
    { value: "Cơ Khí & Điện Lạnh", label: "Cơ Khí & Điện Lạnh" },
    { value: "Công Nghệ Sinh Học", label: "Công Nghệ Sinh Học" },
    { value: "Công Nghệ Thực Phẩm", label: "Công Nghệ Thực Phẩm" },
    { value: "Điện/Nước/Chất Thải", label: "Điện / Nước / Chất Thải" },
    { value: "Khai Thác Mỏ", label: "Khai Thác Mỏ" },
    { value: "Kỹ Thuật Hóa Học", label: "Kỹ Thuật Hóa Học" },
    { value: "Kỹ Thuật Môi Trường", label: "Kỹ Thuật Môi Trường" },
    { value: "Kỹ Thuật Ô Tô", label: "Kỹ Thuật Ô Tô" },
    { value: "Kỹ Thuật Điện/Điện Tử", label: "Kỹ Thuật Điện / Điện Tử" },
    { value: "An Toàn Lao Động", label: "An Toàn Lao Động" },
    {
      value: "Phát Triển Dự Án/Đấu Thầu",
      label: "Phát Triển Dự Án / Đấu Thầu",
    },
    { value: "Quản Lý Dự Án", label: "Quản Lý Dự Án" },
    {
      value: "Thiết Kế & Quy Hoạch Đô Thị",
      label: "Thiết Kế & Quy Hoạch Đô Thị",
    },
    {
      value: "Thiết Kế Kiến Trúc/Họa Viên Kiến Trúc",
      label: "Thiết Kế Kiến Trúc / Họa Viên Kiến Trúc",
    },
    { value: "Thiết Kế Nội Thất", label: "Thiết Kế Nội Thất" },
    { value: "Xây Dựng", label: "Xây Dựng" },
    { value: "Bán Hàng Kỹ Thuật", label: "Bán Hàng Kỹ Thuật" },
    { value: "Bán Hàng Qua Điện Thoại", label: "Bán Hàng Qua Điện Thoại" },
    {
      value: "Bán Hàng/Phát Triển Kinh Doanh",
      label: "Bán Hàng / Phát Triển Kinh Doanh",
    },
    { value: "Bảo trì/Bảo Dưỡng", label: "Bảo trì / Bảo Dưỡng" },
    { value: "Cơ Khí Tự Động Hoá", label: "Cơ Khí Tự Động Hoá" },
    { value: "In Ấn", label: "In Ấn" },
    { value: "Kỹ Thuật CNC", label: "Kỹ Thuật CNC" },
    { value: "Đầu Tư Tài Chính", label: "Đầu Tư Tài Chính" },
    { value: "Dịch Vụ Hỗ Trợ Khách Hàng", label: "Dịch Vụ Hỗ Trợ Khách Hàng" },
    {
      value: "Môi Giới & Giao Dịch Chứng Khoán",
      label: "Môi Giới & Giao Dịch Chứng Khoán",
    },
    {
      value: "Phân Tích & Báo Cáo Tài Chính",
      label: "Phân Tích & Báo Cáo Tài Chính",
    },
    {
      value: "Quản Lý Quan Hệ Khách Hàng",
      label: "Quản Lý Quan Hệ Khách Hàng",
    },
    { value: "Quản Lý Quỹ", label: "Quản Lý Quỹ" },
    { value: "Thu Hồi Nợ", label: "Thu Hồi Nợ" },
    { value: "Tín Dụng", label: "Tín Dụng" },
    {
      value: "Tuân Thủ & Kiểm Soát Rủi Ro",
      label: "Tuân Thủ & Kiểm Soát Rủi Ro",
    },
    {
      value: "Đạo Diễn Nghệ Thuật/Nhiếp Ảnh",
      label: "Đạo Diễn Nghệ Thuật / Nhiếp Ảnh",
    },
    { value: "In Ấn & Xuất Bản", label: "In Ấn & Xuất Bản" },
    { value: "Sản Xuất Chương Trình", label: "Sản Xuất Chương Trình" },
    {
      value: "Bộ Phận Tiền Sảnh & Dịch Vụ Khách Hàng",
      label: "Bộ Phận Tiền Sảnh & Dịch Vụ Khách Hàng",
    },
    {
      value: "Công Ty Kinh Doanh Lữ Hành",
      label: "Công Ty Kinh Doanh Lữ Hành",
    },
    { value: "Đại Lý Du Lịch", label: "Đại Lý Du Lịch" },
    { value: "Đặt Phòng Khách Sạn", label: "Đặt Phòng Khách Sạn" },
    { value: "Hướng Dẫn Viên Du Lịch", label: "Hướng Dẫn Viên Du Lịch" },
    { value: "Vệ Sinh Buồng Phòng", label: "Vệ Sinh Buồng Phòng" },
    { value: "Đào Tạo Và Phát Triển", label: "Đào Tạo Và Phát Triển" },
    { value: "Gắn Kết Nhân Viên", label: "Gắn Kết Nhân Viên" },
    { value: "Lương Thưởng & Phúc Lợi", label: "Lương Thưởng & Phúc Lợi" },
    { value: "Nhân Sự Tổng Hợp", label: "Nhân Sự Tổng Hợp" },
    {
      value: "Quản Trị Hiệu Suất & Sự Nghiệp",
      label: "Quản Trị Hiệu Suất & Sự Nghiệp",
    },
    { value: "Tuyển Dụng", label: "Tuyển Dụng" },
    { value: "Nông/Lâm/Ngư nghiệp", label: "Nông / Lâm / Ngư nghiệp" },
    { value: "Luật Lao động/Hưu Trí", label: "Luật Lao động / Hưu Trí" },
    { value: "Luật Sở Hữu Trí Tuệ", label: "Luật Sở Hữu Trí Tuệ" },
    {
      value: "Luật Tài Chính Ngân Hàng Thương mại",
      label: "Luật Tài Chính Ngân Hàng Thương mại",
    },
    { value: "Luật Thuế", label: "Luật Thuế" },
    { value: "Luật Xây Dựng", label: "Luật Xây Dựng" },
    {
      value: "Quản Lý Thi Hành Pháp Luật",
      label: "Quản Lý Thi Hành Pháp Luật",
    },
    { value: "Thư Ký Luật & Trợ Lý Luật", label: "Thư Ký Luật & Trợ Lý Luật" },
    { value: "Thư Ký Pháp Lý", label: "Thư Ký Pháp Lý" },
    { value: "Tư Vấn Pháp Lý", label: "Tư Vấn Pháp Lý" },
    {
      value: "Đảm Bảo Chất Lượng/Kiểm Soát Chất Lượng/Quản Lý Chất Lượng",
      label: "Đảm Bảo Chất Lượng / Kiểm Soát Chất Lượng / Quản Lý Chất Lượng",
    },
    {
      value: "Hoạch Định & Quản Lý Sản Xuất",
      label: "Hoạch Định & Quản Lý Sản Xuất",
    },
    { value: "Nghiên Cứu & Phát Triển", label: "Nghiên Cứu & Phát Triển" },
    { value: "Phân Tích Sản Xuất", label: "Phân Tích Sản Xuất" },
    { value: "Quy Trình & Lắp Ráp", label: "Quy Trình & Lắp Ráp" },
    { value: "Vận Hành Máy Móc", label: "Vận Hành Máy Móc" },
    { value: "Chỉnh Sửa Video", label: "Chỉnh Sửa Video" },
    {
      value: "Thiết Kế Công Nghiệp/Kỹ Thuật",
      label: "Thiết Kế Công Nghiệp / Kỹ Thuật",
    },
    {
      value: "Thiết Kế Thời Trang/Trang Sức",
      label: "Thiết Kế Thời Trang / Trang Sức",
    },
    { value: "Thiết Kế Đồ Họa", label: "Thiết Kế Đồ Họa" },
    {
      value: "Nghiên Cứu & Phân Tích Thị Trường",
      label: "Nghiên Cứu & Phân Tích Thị Trường",
    },
    { value: "Quan Hệ Công Chúng", label: "Quan Hệ Công Chúng" },
    {
      value: "Quản Lý & Phát Triển Sản Phẩm",
      label: "Quản Lý & Phát Triển Sản Phẩm",
    },
    { value: "Quản Lý Sự Kiện", label: "Quản Lý Sự Kiện" },
    {
      value: "Quản Lý Tài Khoản Khách Hàng",
      label: "Quản Lý Tài Khoản Khách Hàng",
    },
    { value: "Quản Lý Thương Hiệu", label: "Quản Lý Thương Hiệu" },
    { value: "Tiếp Thị", label: "Tiếp Thị" },
    { value: "Tiếp Thị Nội Dung", label: "Tiếp Thị Nội Dung" },
    { value: "Tiếp Thị Thương Mại", label: "Tiếp Thị Thương Mại" },
    { value: "Tiếp Thị Trực Tuyến", label: "Tiếp Thị Trực Tuyến" },
    { value: "Dịch Vụ Hàng Không", label: "Dịch Vụ Hàng Không" },
    { value: "Dịch Vụ Vận Tải Công Cộng", label: "Dịch Vụ Vận Tải Công Cộng" },
    { value: "Vận Tải Đường Bộ", label: "Vận Tải Đường Bộ" },
    {
      value: "Vận Tải Đường Sắt & Hàng Hải",
      label: "Vận Tải Đường Sắt & Hàng Hải",
    },
    {
      value: "Bác Sĩ/Điều Trị Đa Khoa/Điều Trị Nội Trú",
      label: "Bác Sĩ / Điều Trị Đa Khoa / Điều Trị Nội Trú",
    },
    { value: "Dược Sĩ", label: "Dược Sĩ" },
    { value: "Kỹ Thuật Viên Y Tế", label: "Kỹ Thuật Viên Y Tế" },
    {
      value: "Tư Vấn Tâm Lý & Công Tác Xã Hội",
      label: "Tư Vấn Tâm Lý & Công Tác Xã Hội",
    },
    { value: "Y Tá", label: "Y Tá" },
  ];
  const handleChangeJobFunction = (selectedOption: any) => {
    setFormData({
      ...formData,
      currentJobFunction: selectedOption.value,
    });
  };
  const filterOption = (option: any, inputValue: any) => {
    return (
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
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
  const optionsIndustry = [
    { value: "Bán lẻ/Bán sỉ", label: "Bán lẻ/Bán sỉ" },
    { value: "Bao bì/In ấn/Dán nhãn", label: "Bao bì/In ấn/Dán nhãn" },
    { value: "Bảo hiểm", label: "Bảo hiểm" },
    { value: "Bất Động Sản/Cho thuê", label: "Bất Động Sản/Cho thuê" },
    { value: "Chính phủ & NGO", label: "Chính phủ & NGO" },
    { value: "Chứng khoán", label: "Chứng khoán" },
    { value: "Chuỗi cung ứng", label: "Chuỗi cung ứng" },
    {
      value: "Cơ khí/Máy móc/Thiết bị công nghiệp",
      label: "Cơ khí/Máy móc/Thiết bị công nghiệp",
    },
    { value: "Cung cấp nhân lực", label: "Cung cấp nhân lực" },
    { value: "Dệt may/May mặc/Giày dép", label: "Dệt may/May mặc/Giày dép" },
    { value: "Dịch vụ kho bãi", label: "Dịch vụ kho bãi" },
    {
      value: "Dịch vụ lưu trú/Nhà hàng/Khách sạn/Du lịch",
      label: "Dịch vụ lưu trú/Nhà hàng/Khách sạn/Du lịch",
    },
    {
      value: "Dịch vụ môi trường/Chất thải",
      label: "Dịch vụ môi trường/Chất thải",
    },
    {
      value: "Dịch vụ Y tế/Chăm sóc sức khỏe",
      label: "Dịch vụ Y tế/Chăm sóc sức khỏe",
    },
    { value: "Điện/Điện tử", label: "Điện/Điện tử" },
    { value: "Dược phẩm", label: "Dược phẩm" },
    { value: "Giáo dục/Đào Tạo", label: "Giáo dục/Đào Tạo" },
    { value: "Hàng tiêu dùng", label: "Hàng tiêu dùng" },
    { value: "Hậu cần/Giao nhận", label: "Hậu cần/Giao nhận" },
    { value: "Hệ thống CNTT & Thiết bị", label: "Hệ thống CNTT & Thiết bị" },
    { value: "Hoá chất/Hoá sinh", label: "Hoá chất/Hoá sinh" },
    { value: "Kế toán", label: "Kế toán" },
    { value: "Khai khoáng/Dầu khí", label: "Khai khoáng/Dầu khí" },
    {
      value: "Kiến trúc/Thiết kế nội thất",
      label: "Kiến trúc/Thiết kế nội thất",
    },
    {
      value: "Kỹ thuật xây dựng/Cơ sở hạ tầng",
      label: "Kỹ thuật xây dựng/Cơ sở hạ tầng",
    },
    {
      value: "Làm đẹp (Mỹ phẩm) & Chăm sóc cá nhân",
      label: "Làm đẹp (Mỹ phẩm) & Chăm sóc cá nhân",
    },
    { value: "Luật/Dịch vụ pháp lý", label: "Luật/Dịch vụ pháp lý" },
    { value: "Ngân hàng", label: "Ngân hàng" },
    { value: "Nghệ thuật/Giải trí", label: "Nghệ thuật/Giải trí" },
    { value: "Nghiên cứu", label: "Nghiên cứu" },
    { value: "Nhập khẩu/Xuất khẩu", label: "Nhập khẩu/Xuất khẩu" },
    { value: "Nhựa & Cao su", label: "Nhựa & Cao su" },
    { value: "Nội thất/Gỗ", label: "Nội thất/Gỗ" },
    {
      value: "Nông nghiệp/Lâm nghiệp/Nuôi trồng thủy sản",
      label: "Nông nghiệp/Lâm nghiệp/Nuôi trồng thủy sản",
    },
    { value: "Ô tô", label: "Ô tô" },
    {
      value: "Phần Mềm CNTT/Dịch vụ Phần mềm",
      label: "Phần Mềm CNTT/Dịch vụ Phần mềm",
    },
    { value: "Sản xuất", label: "Sản xuất" },
    {
      value: "Sản xuất và Phân phối Điện/Khí đốt/Nước",
      label: "Sản xuất và Phân phối Điện/Khí đốt/Nước",
    },
    { value: "Tài Chính", label: "Tài Chính" },
    { value: "Thiết bị y tế", label: "Thiết bị y tế" },
    { value: "Thời trang/Trang sức", label: "Thời trang/Trang sức" },
    { value: "Thú y", label: "Thú y" },
    { value: "Thương mại điện tử", label: "Thương mại điện tử" },
    {
      value: "Truyền thông/Báo chí/Quảng cáo",
      label: "Truyền thông/Báo chí/Quảng cáo",
    },
    { value: "Tự động hoá", label: "Tự động hoá" },
    { value: "Vận tải", label: "Vận tải" },
    { value: "Vật liệu xây dựng", label: "Vật liệu xây dựng" },
    { value: "Viễn thông", label: "Viễn thông" },
    { value: "Khác", label: "Khác" },
  ];
  const handleCompanyIndustriesChange = (newIndustries: any) => {
    if (newIndustries.length < 4) {
      // setFormData({
      //   ...formData,
      //   currentIndustries: e.target.value,
      // })
      setFormData((prev) => ({
        ...prev,
        currentIndustries: newIndustries.map(
          (industry: { value: string }) => industry.value
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        companyIndustries: prev.currentIndustries.slice(0, 3),
      }));
    }
  };
  return (
    <>
      <div>
        <div className="bg-custom-gradient min-h-[160px] p-4 text-center sm:p-6">
          <h4 className="text-2xl font-bold text-white sm:text-3xl">
            Đăng ký tài khoản người tìm việc
            <Link href="/">
              <span className="text-sky-400"> CTU-Works</span>
            </Link>
          </h4>
        </div>

        <div className="mx-4 -mt-16 mb-4">
          <form className="mx-auto max-w-4xl rounded-md bg-white p-4 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8">
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
                  Lĩnh vực hiện tại ( Tối đa 3 )
                </label>
                <MultipleSelector
                  defaultOptions={optionsIndustry}
                  placeholder="Vui lòng chọn..."
                  onChange={handleCompanyIndustriesChange}
                  // disabled={workingPreferences.companyIndustries.length >= 3}
                  value={formData.currentIndustries.map((industry) => ({
                    label: industry,
                    value: industry,
                  }))}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Ngành nghề hiện tại
                </label>
                <SelectReact
                  value={
                    formData.currentJobFunction
                      ? {
                        value: formData.currentJobFunction,
                        label: formData.currentJobFunction,
                      }
                      : null
                  }
                  onChange={handleChangeJobFunction}
                  options={optionsFeild}
                  filterOption={filterOption}
                  placeholder="Tìm kiếm lĩnh vực nghề nghiệp..."
                ></SelectReact>
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
                  placeholder="Vui lòng nhập"
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
                    <SelectItem value="Trung học">Trung học</SelectItem>
                    <SelectItem value="Trung cấp">Trung cấp</SelectItem>
                    <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
                    <SelectItem value="Cử nhân">Cử nhân</SelectItem>
                    <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                    <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Quốc tịch
                </label>
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      country: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                    <SelectValue placeholder="Vui lòng chọn..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Việt Nam">Người Việt Nam</SelectItem>
                    <SelectItem value="Nước ngoài">Người nước ngoài</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectValue placeholder="Vui lòng chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                    <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                    <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
                    <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                    <SelectItem value="An Giang">An Giang</SelectItem>
                    <SelectItem value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</SelectItem>
                    <SelectItem value="Bạc Liêu">Bạc Liêu</SelectItem>
                    <SelectItem value="Bắc Giang">Bắc Giang</SelectItem>
                    <SelectItem value="Bắc Kạn">Bắc Kạn</SelectItem>
                    <SelectItem value="Bắc Ninh">Bắc Ninh</SelectItem>
                    <SelectItem value="Bến Tre">Bến Tre</SelectItem>
                    <SelectItem value="Bình Dương">Bình Dương</SelectItem>
                    <SelectItem value="Bình Định">Bình Định</SelectItem>
                    <SelectItem value="Bình Phước">Bình Phước</SelectItem>
                    <SelectItem value="Bình Thuận">Bình Thuận</SelectItem>
                    <SelectItem value="Cà Mau">Cà Mau</SelectItem>
                    <SelectItem value="Cao Bằng">Cao Bằng</SelectItem>
                    <SelectItem value="Đắk Lắk">Đắk Lắk</SelectItem>
                    <SelectItem value="Đắk Nông">Đắk Nông</SelectItem>
                    <SelectItem value="Điện Biên">Điện Biên</SelectItem>
                    <SelectItem value="Đồng Nai">Đồng Nai</SelectItem>
                    <SelectItem value="Đồng Tháp">Đồng Tháp</SelectItem>
                    <SelectItem value="Gia Lai">Gia Lai</SelectItem>
                    <SelectItem value="Hà Giang">Hà Giang</SelectItem>
                    <SelectItem value="Hà Nam">Hà Nam</SelectItem>
                    <SelectItem value="Hà Tĩnh">Hà Tĩnh</SelectItem>
                    <SelectItem value="Hậu Giang">Hậu Giang</SelectItem>
                    <SelectItem value="Hòa Bình">Hòa Bình</SelectItem>
                    <SelectItem value="Hưng Yên">Hưng Yên</SelectItem>
                    <SelectItem value="Khánh Hòa">Khánh Hòa</SelectItem>
                    <SelectItem value="Kiên Giang">Kiên Giang</SelectItem>
                    <SelectItem value="Kon Tum">Kon Tum</SelectItem>
                    <SelectItem value="Lai Châu">Lai Châu</SelectItem>
                    <SelectItem value="Lâm Đồng">Lâm Đồng</SelectItem>
                    <SelectItem value="Lạng Sơn">Lạng Sơn</SelectItem>
                    <SelectItem value="Lào Cai">Lào Cai</SelectItem>
                    <SelectItem value="Long An">Long An</SelectItem>
                    <SelectItem value="Nam Định">Nam Định</SelectItem>
                    <SelectItem value="Nghệ An">Nghệ An</SelectItem>
                    <SelectItem value="Ninh Bình">Ninh Bình</SelectItem>
                    <SelectItem value="Ninh Thuận">Ninh Thuận</SelectItem>
                    <SelectItem value="Phú Thọ">Phú Thọ</SelectItem>
                    <SelectItem value="Phú Yên">Phú Yên</SelectItem>
                    <SelectItem value="Quảng Bình">Quảng Bình</SelectItem>
                    <SelectItem value="Quảng Nam">Quảng Nam</SelectItem>
                    <SelectItem value="Quảng Ngãi">Quảng Ngãi</SelectItem>
                    <SelectItem value="Quảng Ninh">Quảng Ninh</SelectItem>
                    <SelectItem value="Quảng Trị">Quảng Trị</SelectItem>
                    <SelectItem value="Sóc Trăng">Sóc Trăng</SelectItem>
                    <SelectItem value="Sơn La">Sơn La</SelectItem>
                    <SelectItem value="Tây Ninh">Tây Ninh</SelectItem>
                    <SelectItem value="Thái Bình">Thái Bình</SelectItem>
                    <SelectItem value="Thái Nguyên">Thái Nguyên</SelectItem>
                    <SelectItem value="Thanh Hóa">Thanh Hóa</SelectItem>
                    <SelectItem value="Thừa Thiên Huế">Thừa Thiên Huế</SelectItem>
                    <SelectItem value="Tiền Giang">Tiền Giang</SelectItem>
                    <SelectItem value="Trà Vinh">Trà Vinh</SelectItem>
                    <SelectItem value="Tuyên Quang">Tuyên Quang</SelectItem>
                    <SelectItem value="Vĩnh Long">Vĩnh Long</SelectItem>
                    <SelectItem value="Vĩnh Phúc">Vĩnh Phúc</SelectItem>
                    <SelectItem value="Yên Bái">Yên Bái</SelectItem>
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
                    <SelectItem value="Ninh Kiều">Ninh Kiều</SelectItem>
                    <SelectItem value="Bình Thủy">Bình Thủy</SelectItem>
                    <SelectItem value="Cái Răng">Cái Răng</SelectItem>
                    <SelectItem value="Ô Môn">Ô Môn</SelectItem>
                    <SelectItem value="Thốt Nốt">Thốt Nốt</SelectItem>
                    <SelectItem value="Quận 1">Quận 1</SelectItem>
                    <SelectItem value="Quận 3">Quận 3</SelectItem>
                    <SelectItem value="Quận 5">Quận 5</SelectItem>
                    <SelectItem value="Quận 10">Quận 10</SelectItem>
                    <SelectItem value="Quận Phú Nhuận">Quận Phú Nhuận</SelectItem>
                    <SelectItem value="Quận Bình Thạnh">Quận Bình Thạnh</SelectItem>
                    <SelectItem value="Quận Tân Bình">Quận Tân Bình</SelectItem>
                    <SelectItem value="Quận Gò Vấp">Quận Gò Vấp</SelectItem>
                    <SelectItem value="Quận Thủ Đức">Quận Thủ Đức</SelectItem>
                    <SelectItem value="Quận Ba Đình">Quận Ba Đình</SelectItem>
                    <SelectItem value="Quận Hoàn Kiếm">Quận Hoàn Kiếm</SelectItem>
                    <SelectItem value="Quận Tây Hồ">Quận Tây Hồ</SelectItem>
                    <SelectItem value="Quận Cầu Giấy">Quận Cầu Giấy</SelectItem>
                    <SelectItem value="Quận Đống Đa">Quận Đống Đa</SelectItem>
                    <SelectItem value="Quận Hai Bà Trưng">Quận Hai Bà Trưng</SelectItem>
                    <SelectItem value="Quận Thanh Xuân">Quận Thanh Xuân</SelectItem>
                    <SelectItem value="Huyện Sóc Sơn">Huyện Sóc Sơn</SelectItem>
                    <SelectItem value="Quận Hải Châu">Quận Hải Châu</SelectItem>
                    <SelectItem value="Quận Thanh Khê">Quận Thanh Khê</SelectItem>
                    <SelectItem value="Quận Sơn Trà">Quận Sơn Trà</SelectItem>
                    <SelectItem value="Quận Ngũ Hành Sơn">Quận Ngũ Hành Sơn</SelectItem>
                    <SelectItem value="Quận Liên Chiểu">Quận Liên Chiểu</SelectItem>
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
                  placeholder="Vui lòng nhập"
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
                    <SelectValue placeholder="Vui lòng chọn" />
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
                    <SelectValue placeholder="Vui lòng chọn" />
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
                  Kỹ năng ( Tối đa 5 )
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
                        if (
                          target.value.trim() &&
                          formData.skillName.length < 5
                        ) {
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
                        className={`flex w-fit items-center gap-1 rounded-md border border-solid px-3 py-2 text-sm ${selectedIndustries.includes(industry.id)
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
              <Link href="/login">
                <button className="ml-2 font-semibold text-blue-600">
                  Đăng nhập
                </button>
              </Link>
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
