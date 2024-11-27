"use client";
import UserSidebar from "@/components/UserSidebar/UserSidebar";
import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FaUser, FaRegPenToSquare, FaPen } from "react-icons/fa6";
import { FiPhone, FiGift, FiUser } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineLocationOn, MdMailOutline } from "react-icons/md";
import { GoPlusCircle, GoTrash } from "react-icons/go";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import MultipleSelector from "@/components/ui/multiple-selector";
import SelectReact from "react-select";
import {
  FaAward,
  FaHandHoldingUsd,
  FaUtensils,
  FaBaby,
  FaMobileAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Project = dynamic(() => import("@/components/Profile/Project"), {
  ssr: false,
});
const Education = dynamic(() => import("@/components/Profile/Education"), {
  ssr: false,
});
const WorkHistory = dynamic(() => import("@/components/Profile/WorkHistory"), {
  ssr: false,
});
const Skill = dynamic(() => import("@/components/Profile/Skill"), {
  ssr: false,
});
const Introduce = dynamic(() => import("@/components/Profile/Introduce"), {
  ssr: false,
});
const Language = dynamic(() => import("@/components/Profile/Language"), {
  ssr: false,
});
const Certification = dynamic(
  () => import("@/components/Profile/Certification"),
  {
    ssr: false,
  }
);
type ProficiencyLevel = "thanh-thao" | "trung-binh" | "moi-bat-dau";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

type UserData = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  seekJobMode: boolean;
  dateOfBirth: string;
  createdAt: string;
  jobTitle: string;
  address: string;
  MSSV: string;
  gender: string;
  currentDegree: string;
  currentIndustries: string;
  currentJobFunction: string;
  yearsExperience: string;
  currentSalary: string;
  highestDegree: string;
  country: string;
  city: string;
  district: string;
  maritalStatusId: string;
  avatar: "";
  workingPreferences: WorkingPreferences;
};

type FormData = {
  fullName: string;
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
  avatar: string;
};

type WorkingPreferences = {
  locations: string[];
  jobFunction: string;
  companyIndustries: string[];
  salary: string;
  desiredJobLevel: string;
  isRelocate: 1 | 2;
  benefits: number[];
};

const Profile = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = React.useState<Date>();
  const [value, setValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<any[]>([]);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
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
    avatar: "",
  });

  const [workingPreferences, setWorkingPreferences] =
    useState<WorkingPreferences>({
      locations: [""],
      jobFunction: "",
      companyIndustries: [""],
      salary: "1",
      desiredJobLevel: "",
      isRelocate: 1,
      benefits: [],
    });

  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const fetchUser = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get-details/${decodedToken?.userid}`
    );
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError } = useQuery<UserData>({
    queryKey: ["getUser"],
    queryFn: fetchUser,
  });

  const updateUser = async (updatedData: FormData) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-user/${decodedToken?.userid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedData,
          yearsExperience: Number(updatedData.yearsExperience),
          currentSalary: Number(updatedData.currentSalary),
          phoneNumber: Number(updatedData.phoneNumber),
        }),
      }
    );
    return res.json();
  };

  const updateWorkingPreferences = async (updatedPreferences: {
    workingPreferences: WorkingPreferences;
  }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-work-preferences/${decodedToken?.userid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPreferences),
      }
    );
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Cập nhật thành công");
        setIsDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Cập nhật thất bại");
    },
  });

  const preferencesMutation = useMutation({
    mutationFn: updateWorkingPreferences,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Cập nhật thành công");
        setIsPreferencesDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Cập nhật thất bại");
    },
  });

  const update = () => {
    mutation.mutate(formData);
  };

  const updatePreferences = () => {
    preferencesMutation.mutate({
      workingPreferences: {
        ...workingPreferences,
        benefits: selectedBenefits,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
      setSelectedBenefits(data.workingPreferences.benefits || []);
      setWorkingPreferences(data.workingPreferences);
    }
  }, [data]);

  useEffect(() => {
    if (date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: format(date, "dd/MM/yyyy"),
      }));
    }
  }, [date]);

  const handleAddWorkLocation = () => {
    setWorkingPreferences((prev) => ({
      ...prev,
      locations: [...prev.locations, ""],
    }));
  };

  const handleRemoveWorkLocation = (indexToRemove: number) => {
    setWorkingPreferences((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleCompanyIndustriesChange = (newIndustries: any) => {
    if (newIndustries.length < 4) {
      setWorkingPreferences((prev) => ({
        ...prev,
        companyIndustries: newIndustries.map(
          (industry: { value: string }) => industry.value
        ),
      }));
    } else {
      setWorkingPreferences((prev) => ({
        ...prev,
        companyIndustries: prev.companyIndustries.slice(0, 3),
      }));
    }
  };
  const handleBenefitClick = (benefitId: any) => {
    setSelectedBenefits((prevBenefits) => {
      if (prevBenefits.includes(benefitId)) {
        return prevBenefits.filter((id) => id !== benefitId);
      } else {
        return [...prevBenefits, benefitId];
      }
    });
  };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
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
  const handleChange = (selectedOption: any) => {
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
  const handleChangeIndustry = (selectedOption: any) => {
    setFormData({
      ...formData,
      currentIndustries: selectedOption.value,
    });
  };
  const handleChangeJobFunction = (selectedOption: any) => {
    setWorkingPreferences({
      ...workingPreferences,
      jobFunction: selectedOption.value,
    });
  };
  return (
    <>
      <div className="flex flex-col gap-4 rounded-md bg-[#f1f2f4] p-4">
        <div className="flex items-center gap-6 rounded-md bg-white p-4">
          <FaUser color="#EEEEEE" size={80} />
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-xl font-bold">{data?.fullName}</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <FaRegPenToSquare
                    color="#ed1b2f"
                    className="cursor-pointer"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0">
                  <DialogHeader className="border-b border-gray-300 px-6 py-4">
                    <DialogTitle className="text-xl">
                      Thông tin cá nhân
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-96 w-full">
                    <div className="flex items-center gap-6 px-6">
                      <div className="flex flex-col items-center gap-3">
                        <FaUser color="#EEEEEE" size={100} />
                        <button className="rounded-full p-3 outline-none transition duration-300 hover:bg-[#e9e9f2]">
                          <FaPen color="grey" />
                        </button>
                      </div>
                      <div className="flex flex-1 flex-col gap-6">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="col-span-1 flex flex-col gap-1">
                            <label htmlFor="" className="text-sm">
                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                *
                              </span>
                              Họ Tên
                            </label>
                            <input
                              type="text"
                              value={formData.fullName}
                              className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  fullName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-span-1 flex flex-col gap-1">
                            <label htmlFor="" className="text-sm">
                              MSSV
                            </label>
                            <input
                              type="text"
                              value={formData.MSSV}
                              className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  MSSV: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Chức Danh
                          </label>
                          <input
                            type="text"
                            value={formData.jobTitle}
                            className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                jobTitle: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
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
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Trung họ">
                                Thực tập sinh/Sinh viên
                              </SelectItem>
                              <SelectItem value="Trung cấp">
                                Mới tốt nghiệp
                              </SelectItem>
                              <SelectItem value="Cao đẳng">
                                Nhân viên
                              </SelectItem>
                              <SelectItem value="Cử nhân">
                                Trưởng phòng
                              </SelectItem>
                              <SelectItem value="Thạc sĩ">
                                Giám Đốc và Câp Cao Hơn
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            Địa chỉ email
                          </label>
                          <input
                            type="text"
                            value={data?.email}
                            className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-4 px-6">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Lĩnh vực hiện tại
                          </label>
                          <SelectReact
                            value={
                              formData.currentIndustries
                                ? {
                                    value: formData.currentIndustries,
                                    label: formData.currentIndustries,
                                  }
                                : null
                            }
                            onChange={handleChangeIndustry}
                            options={optionsIndustry}
                            filterOption={filterOption}
                            placeholder="Vui lòng chọn..."
                          ></SelectReact>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
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
                            onChange={handleChange}
                            options={optionsFeild}
                            filterOption={filterOption}
                            placeholder="Tìm kiếm lĩnh vực nghề nghiệp..."
                          ></SelectReact>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Số năm kinh nghiệm
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={formData.yearsExperience}
                            className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                yearsExperience: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <style>{`
                                    input[type="number"]::-webkit-inner-spin-button, 
                                    input[type="number"]::-webkit-outer-spin-button { 
                                      -webkit-appearance: none; 
                                      margin: 0; 
                                    }
                                    input[type="number"] {
                                      -moz-appearance: textfield;
                                    }
                                  `}</style>
                          <div className="col-span-1 flex flex-col gap-1">
                            <label htmlFor="" className="text-sm">
                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                *
                              </span>
                              Mức lương hiện tại
                            </label>
                            <input
                              type="number"
                              placeholder="VNĐ/Tháng"
                              value={formData?.currentSalary}
                              className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  currentSalary: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
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
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Trung học">
                                Trung học
                              </SelectItem>
                              <SelectItem value="Trung cấp">
                                Trung cấp
                              </SelectItem>
                              <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
                              <SelectItem value="Cử nhân">Cử nhân</SelectItem>
                              <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                              <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                              <SelectItem value="Khác">Khác</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
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
                              <SelectItem value="Việt Nam">
                                Người Việt Nam
                              </SelectItem>
                              <SelectItem value="Nước ngoài">
                                Người nước ngoài
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Số điện thoại
                          </label>
                          <input
                            type="text"
                            value={formData.phoneNumber}
                            className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phoneNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Ngày sinh
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "dd/MM/yyyy")
                                ) : (
                                  <span>Ngày sinh</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
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
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Nam</SelectItem>
                              <SelectItem value="2">Nữ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Trạng thái hôn nhân
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
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Tình trạng hôn nhân" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Độc thân</SelectItem>
                              <SelectItem value="2">Đã kết hôn</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Tỉnh thành
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
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hồ Chí Minh">
                                Hồ Chí Minh
                              </SelectItem>
                              <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                              <SelectItem value="Nhân viên">
                                Nhân viên
                              </SelectItem>
                              <SelectItem value="Trưởng phòng">
                                Trưởng phòng
                              </SelectItem>{" "}
                              <SelectItem value="Trưởng phòng">
                                Giám đốc và Cấp Cao Hơn
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Quận/Huyện
                          </label>
                          <Select defaultValue={data?.district}>
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hồ Chí Minh">
                                Hồ Chí Minh
                              </SelectItem>
                              <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                              <SelectItem value="Nhân viên">
                                Nhân viên
                              </SelectItem>
                              <SelectItem value="Trưởng phòng">
                                Trưởng phòng
                              </SelectItem>{" "}
                              <SelectItem value="Trưởng phòng">
                                Giám đốc và Cấp Cao Hơn
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="mt-2 text-start text-sm italic text-gray-500">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Thông tin bắt buộc
                        </p>
                      </div>
                      <div className="px-6"></div>
                    </div>
                  </ScrollArea>
                  <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <DialogClose asChild>
                      <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                        Hủy
                      </Button>
                    </DialogClose>
                    <Button
                      className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                      onClick={update}
                    >
                      Lưu
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="my-1">{data?.jobTitle}</p>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <div className="my-1 flex items-center gap-2 text-gray-400">
                  <MdMailOutline />
                  <p
                    className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                      data?.email ? "text-[#414042] font-medium" : ""
                    }`}
                  >
                    {data?.email ? data.email : "Email"}
                  </p>
                </div>
                <div className="my-1 flex items-center gap-2 text-gray-400">
                  <FiGift />
                  <p
                    className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                      data?.dateOfBirth ? "text-[#414042] font-medium" : ""
                    }`}
                  >
                    {data?.dateOfBirth ? data.dateOfBirth : "Ngày sinh"}
                  </p>
                </div>
                <div className="my-1 flex items-center gap-2 text-gray-400">
                  <MdOutlineLocationOn />
                  <p
                    className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                      data?.address ? "text-[#414042] font-medium" : ""
                    }`}
                  >
                    {data?.address ? data.address : "Địa chỉ"}
                  </p>
                </div>
              </div>

              <div>
                <div className="my-1 flex items-center gap-2 text-gray-400">
                  <FiPhone />
                  <p
                    className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                      data?.phoneNumber ? "text-[#414042] font-medium" : ""
                    }`}
                  >
                    {data?.phoneNumber ? data.phoneNumber : "Số điện thoại"}
                  </p>
                </div>
                <div className="my-1 flex items-center gap-2 text-gray-400">
                  <FiUser />
                  <p
                    className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                      data?.gender ? "text-[#414042] font-medium" : ""
                    }`}
                  >
                    {(() => {
                      switch (Number(data?.gender)) {
                        case 1:
                          return "Nam";
                        case 2:
                          return "Nữ";
                        default:
                          return "Giới tính";
                      }
                    })()}
                  </p>
                </div>
                <div className="my-1 flex items-center gap-2 text-gray-400">
                  <RiGraduationCapLine />
                  <p
                    className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                      data?.MSSV ? "text-[#414042] font-medium" : ""
                    }`}
                  >
                    {data?.MSSV ? data.MSSV : "Mã số sinh viên"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 rounded-md bg-white p-4">
          <div className="flex w-full items-center justify-between">
            {" "}
            <p className="text-xl font-bold">Công việc mong muốn</p>
            <Dialog
              open={isPreferencesDialogOpen}
              onOpenChange={setIsPreferencesDialogOpen}
            >
              <DialogTrigger asChild>
                <FaRegPenToSquare color="#ed1b2f" className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-0">
                <DialogHeader className="border-b border-gray-300 px-6 py-4">
                  <DialogTitle className="text-xl">
                    Chỉnh sửa công việc mong muốn
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96 w-full">
                  <div className="flex items-center gap-6 px-6">
                    <div className="flex flex-1 flex-col gap-6">
                      <div className="gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Nơi làm việc
                          </label>
                          <div className="flex flex-col gap-3">
                            {workingPreferences.locations.map(
                              (location, index) => (
                                <div key={index} className="flex items-center">
                                  <Select
                                    value={location}
                                    onValueChange={(value) => {
                                      setWorkingPreferences((prev) => {
                                        const newLocations = [
                                          ...prev.locations,
                                        ];
                                        newLocations[index] = value;
                                        return {
                                          ...prev,
                                          locations: newLocations,
                                        };
                                      });
                                    }}
                                  >
                                    <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                                      <SelectValue placeholder="Vui lòng chọn..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Quốc tế">
                                        Quốc tế
                                      </SelectItem>
                                      <SelectItem value="Hải Phòng">
                                        Hải Phòng
                                      </SelectItem>
                                      <SelectItem value="Đà Nẵng">
                                        Đà Nẵng
                                      </SelectItem>
                                      <SelectItem value="Cần Thơ">
                                        Cần Thơ
                                      </SelectItem>
                                      <SelectItem value="Bà Rịa - Vũng Tàu">
                                        Bà Rịa - Vũng Tàu
                                      </SelectItem>
                                      <SelectItem value="An Giang">
                                        An Giang
                                      </SelectItem>
                                      <SelectItem value="Bắc Kạn">
                                        Bắc Kạn
                                      </SelectItem>
                                      <SelectItem value="Bắc Giang">
                                        Bắc Giang
                                      </SelectItem>
                                      <SelectItem value="Bạc Liêu">
                                        Bạc Liêu
                                      </SelectItem>
                                      <SelectItem value="Bắc Ninh">
                                        Bắc Ninh
                                      </SelectItem>
                                      <SelectItem value="Bến Tre">
                                        Bến Tre
                                      </SelectItem>
                                      <SelectItem value="Bình Định">
                                        Bình Định
                                      </SelectItem>
                                      <SelectItem value="Bình Dương">
                                        Bình Dương
                                      </SelectItem>
                                      <SelectItem value="Bình Phước">
                                        Bình Phước
                                      </SelectItem>
                                      <SelectItem value="Bình Thuận">
                                        Bình Thuận
                                      </SelectItem>
                                      <SelectItem value="Cà Mau">
                                        Cà Mau
                                      </SelectItem>
                                      <SelectItem value="Cao Bằng">
                                        Cao Bằng
                                      </SelectItem>
                                      <SelectItem value="Đắk Nông">
                                        Đắk Nông
                                      </SelectItem>
                                      <SelectItem value="Đắk Lắk">
                                        Đắk Lắk
                                      </SelectItem>
                                      <SelectItem value="ĐBSCL">
                                        ĐBSCL
                                      </SelectItem>
                                      <SelectItem value="Điện Biên">
                                        Điện Biên
                                      </SelectItem>
                                      <SelectItem value="Đồng Nai">
                                        Đồng Nai
                                      </SelectItem>
                                      <SelectItem value="Đồng Tháp">
                                        Đồng Tháp
                                      </SelectItem>
                                      <SelectItem value="Gia Lai">
                                        Gia Lai
                                      </SelectItem>
                                      <SelectItem value="Hà Giang">
                                        Hà Giang
                                      </SelectItem>
                                      <SelectItem value="Hà Nam">
                                        Hà Nam
                                      </SelectItem>
                                      <SelectItem value="Hà Tĩnh">
                                        Hà Tĩnh
                                      </SelectItem>
                                      <SelectItem value="Hải Dương">
                                        Hải Dương
                                      </SelectItem>
                                      <SelectItem value="Hậu Giang">
                                        Hậu Giang
                                      </SelectItem>
                                      <SelectItem value="Hòa Bình">
                                        Hòa Bình
                                      </SelectItem>
                                      <SelectItem value="Hưng Yên">
                                        Hưng Yên
                                      </SelectItem>
                                      <SelectItem value="Khánh Hòa">
                                        Khánh Hòa
                                      </SelectItem>
                                      <SelectItem value="Kon Tum">
                                        Kon Tum
                                      </SelectItem>
                                      <SelectItem value="Lai Châu">
                                        Lai Châu
                                      </SelectItem>
                                      <SelectItem value="Lâm Đồng">
                                        Lâm Đồng
                                      </SelectItem>
                                      <SelectItem value="Lạng Sơn">
                                        Lạng Sơn
                                      </SelectItem>
                                      <SelectItem value="Lào Cai">
                                        Lào Cai
                                      </SelectItem>
                                      <SelectItem value="Long An">
                                        Long An
                                      </SelectItem>
                                      <SelectItem value="Nam Định">
                                        Nam Định
                                      </SelectItem>
                                      <SelectItem value="Nghệ An">
                                        Nghệ An
                                      </SelectItem>
                                      <SelectItem value="Ninh Bình">
                                        Ninh Bình
                                      </SelectItem>
                                      <SelectItem value="Ninh Thuận">
                                        Ninh Thuận
                                      </SelectItem>
                                      <SelectItem value="Phú Thọ">
                                        Phú Thọ
                                      </SelectItem>
                                      <SelectItem value="Phú Yên">
                                        Phú Yên
                                      </SelectItem>
                                      <SelectItem value="Quảng Bình">
                                        Quảng Bình
                                      </SelectItem>
                                      <SelectItem value="Quảng Nam">
                                        Quảng Nam
                                      </SelectItem>
                                      <SelectItem value="Quảng Ngãi">
                                        Quảng Ngãi
                                      </SelectItem>
                                      <SelectItem value="Quảng Ninh">
                                        Quảng Ninh
                                      </SelectItem>
                                      <SelectItem value="Quảng Trị">
                                        Quảng Trị
                                      </SelectItem>
                                      <SelectItem value="Sóc Trăng">
                                        Sóc Trăng
                                      </SelectItem>
                                      <SelectItem value="Sơn La">
                                        Sơn La
                                      </SelectItem>
                                      <SelectItem value="Tây Ninh">
                                        Tây Ninh
                                      </SelectItem>
                                      <SelectItem value="Thái Bình">
                                        Thái Bình
                                      </SelectItem>
                                      <SelectItem value="Thái Nguyên">
                                        Thái Nguyên
                                      </SelectItem>
                                      <SelectItem value="Thanh Hóa">
                                        Thanh Hóa
                                      </SelectItem>
                                      <SelectItem value="Thừa Thiên Huế">
                                        Thừa Thiên Huế
                                      </SelectItem>
                                      <SelectItem value="Tiền Giang">
                                        Tiền Giang
                                      </SelectItem>
                                      <SelectItem value="Trà Vinh">
                                        Trà Vinh
                                      </SelectItem>
                                      <SelectItem value="Tuyên Quang">
                                        Tuyên Quang
                                      </SelectItem>
                                      <SelectItem value="Kiên Giang">
                                        Kiên Giang
                                      </SelectItem>
                                      <SelectItem value="Vĩnh Long">
                                        Vĩnh Long
                                      </SelectItem>
                                      <SelectItem value="Vĩnh Phúc">
                                        Vĩnh Phúc
                                      </SelectItem>
                                      <SelectItem value="Yên Bái">
                                        Yên Bái
                                      </SelectItem>
                                      <SelectItem value="Khác">Khác</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {workingPreferences.locations.length > 1 && (
                                    <button
                                      onClick={() =>
                                        handleRemoveWorkLocation(index)
                                      }
                                    >
                                      <GoTrash
                                        className="ml-2 text-red-500"
                                        size={20}
                                      />
                                    </button>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <button
                          className="mt-2 flex items-center gap-2"
                          onClick={handleAddWorkLocation}
                        >
                          <GoPlusCircle className="text-blue-600" size={20} />
                          <span className="text-sm font-bold text-blue-600">
                            Thêm nơi làm việc
                          </span>
                        </button>
                        <div className="mt-4 flex items-center gap-2">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="h-4 w-4"
                            checked={workingPreferences.isRelocate === 2}
                            onChange={(e) =>
                              setWorkingPreferences((prev) => ({
                                ...prev,
                                isRelocate: e.target.checked ? 2 : 1,
                              }))
                            }
                          />
                          <label htmlFor="">Có thể thay đổi nơi làm việc</label>
                        </div>
                      </div>
                      <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Ngành nghề
                        </label>
                        <SelectReact
                          value={
                            workingPreferences.jobFunction
                              ? {
                                  value: workingPreferences.jobFunction,
                                  label: workingPreferences.jobFunction,
                                }
                              : null
                          }
                          onChange={handleChangeJobFunction}
                          options={optionsFeild}
                          filterOption={filterOption}
                          placeholder="Tìm kiếm lĩnh vực nghề nghiệp..."
                        ></SelectReact>
                      </div>
                      <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Lĩnh vực ( tối đa 3 lĩnh vực )
                        </label>
                        <MultipleSelector
                          defaultOptions={optionsIndustry}
                          placeholder="Vui lòng chọn..."
                          onChange={handleCompanyIndustriesChange}
                          // disabled={workingPreferences.companyIndustries.length >= 3}
                          value={workingPreferences.companyIndustries.map(
                            (industry) => ({
                              label: industry,
                              value: industry,
                            })
                          )}
                        />
                      </div>

                      <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Mức lương mong muốn ( USD )
                        </label>
                        <input
                          type="number"
                          placeholder="VNĐ/Tháng"
                          className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                          value={workingPreferences?.salary}
                          onChange={(e) =>
                            setWorkingPreferences((prev) => ({
                              ...prev,
                              salary: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Cấp bậc mong muốn
                        </label>
                        <Select
                          value={workingPreferences.desiredJobLevel}
                          onValueChange={(value) =>
                            setWorkingPreferences((prev) => ({
                              ...prev,
                              desiredJobLevel: value,
                            }))
                          }
                        >
                          <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                            <SelectValue placeholder="Vui lòng chọn..." />
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
                            <SelectItem value=" Giám đốc và Cấp Cao Hơn">
                              Giám đốc và Cấp Cao Hơn
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Top 7 phúc lợi mong muốn
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            {
                              id: "1",
                              icon: <FaAward size={22} />,
                              label: "Giải thưởng",
                            },
                            {
                              id: "2",
                              icon: <FaHandHoldingUsd size={22} />,
                              label: "Thưởng",
                            },
                            {
                              id: "3",
                              icon: <FaUtensils size={22} />,
                              label: "Căn-tin",
                            },
                            {
                              id: "4",
                              icon: <FaUserDoctor size={22} />,
                              label: "Khám sức khỏe",
                            },
                            {
                              id: "5",
                              icon: <FaBaby size={22} />,
                              label: "Trông trẻ",
                            },
                            {
                              id: "6",
                              icon: <FaMobileAlt size={22} />,
                              label: "Điện thoại",
                            },
                            {
                              id: "7",
                              icon: <FaFileInvoiceDollar size={22} />,
                              label: "Nghỉ phép",
                            },
                          ].map((benefit) => (
                            <button
                              key={benefit.id}
                              onClick={() => handleBenefitClick(benefit.id)}
                              className={`flex flex-col items-center justify-center gap-2 
                                rounded-md border border-gray-300 bg-white px-3 py-2 
                                text-sm hover:bg-gray-100   
                                ${
                                  selectedBenefits.includes(benefit.id)
                                    ? "text-blue-400"
                                    : ""
                                }`}
                            >
                              {benefit.icon}
                              {benefit.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                  <DialogClose asChild>
                    <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                      Hủy
                    </Button>
                  </DialogClose>
                  <Button
                    className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                    onClick={updatePreferences}
                  >
                    Lưu
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <div className="flex">
              <p className="min-w-64 font-normal text-gray-400">Nơi làm việc</p>
              <p className="flex-1">
                {" "}
                {data?.workingPreferences?.locations.join(", ") ||
                  "Thêm nơi làm việc"}
              </p>
            </div>
            <div className="flex">
              <p className="min-w-64 font-normal text-gray-400">
                Mức lương mong muốn
              </p>
              <p className="flex-1">
                {" "}
                {data?.workingPreferences.salary ||
                  "Thêm mức lương mong muốn"}{" "}
                (USD / tháng)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-white p-4">
        <p className="text-xl font-bold">Giới Thiệu Bản Thân</p>
        <p className="my-3 text-xs font-normal italic">
          Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn{" "}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2">
              <GoPlusCircle className="text-blue-600" size={24} />
              <span className="text-sm font-bold text-blue-600">
                Thêm Giới thiệu bản thân
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
              <DialogTitle>Giới thiệu bản thân</DialogTitle>
            </DialogHeader>
            <div className="px-6">
              <p className="mb-4 font-medium">
                <span className="font-semibold text-[#FF9119]">Tip:</span> Tóm
                tắt kinh nghiệm chuyên môn, chú ý làm nổi bật các kỹ năng và
                điểm mạnh.
              </p>
              <div className="overflow-hidden rounded-md border border-gray-300">
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={value}
                  onChange={setValue}
                />
              </div>
              <p className="mt-2 text-start text-sm text-gray-500">0/2000 từ</p>
            </div>
            <DialogFooter className="border-t border-gray-300 px-6 py-4">
              <DialogClose asChild>
                <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                  Hủy
                </Button>
              </DialogClose>
              <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                Lưu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Introduce data={data} />

      <WorkHistory data={data} />

      <Education data={data} />

      <Project data={data} />

      <Skill data={data} />

      <Language data={data} />

      <Certification data={data} />
    </>
  );
};

export default Profile;
