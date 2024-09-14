"use client";
import UserSidebar from "@/components/UserSidebar/UserSidebar";
import React, { useEffect, useState } from "react";
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
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
import {
  FaAward,
  FaHandHoldingUsd,
  FaUtensils,
  FaBaby,
  FaMobileAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import Image from "next/image";
const Education = dynamic(() => import("@/components/Profile/Education"), {
  ssr: false,
});
const WorkHistory = dynamic(() => import("@/components/Profile/WorkHistory"), {
  ssr: false,
});
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
  // workingHistories: WorkingHistories[];
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
  // workingPreferences: WorkingPreferences;
  // workingHistories: WorkingHistories;
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

// interface WorkingHistoryRequest {
//   jobTitle: string;
//   companyName: string;
//   companyLogo: string;
//   fromDate: string;
//   toDate: string;
//   description: string;
//   isCurrent: number;
// }

// type WorkingHistories = WorkingHistoryRequest & { _id: string };

const Profile = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = React.useState<Date>();
  // const [fromDate, setFromDate] = useState<Date>();
  // const [toDate, setToDate] = useState<Date>();
  // const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const [skillName, setSkillName] = useState<string>("");
  const [proficiency, setProficiency] = useState<ProficiencyLevel | "">("");
  const [skills, setSkills] = useState<Record<ProficiencyLevel, string[]>>({
    "thanh-thao": [],
    "trung-binh": [],
    "moi-bat-dau": [],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<number[]>([]);

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
    // workingPreferences: {
    //   locations: [""],
    //   jobFunction: "",
    //   companyIndustries: [""],
    //   salary: "",
    //   desiredJobLevel: "",
    //   isRelocate: 1,
    //   benefits: [],
    // },
    // workingHistories: {
    //   jobTitle: "",
    //   companyName: "",
    //   companyLogo: "",
    //   fromDate: "",
    //   toDate: "",
    //   description: "",
    //   isCurrent: 1,
    // },
  });

  const [workingPreferences, setWorkingPreferences] =
    useState<WorkingPreferences>({
      locations: [""],
      jobFunction: "",
      companyIndustries: [""],
      salary: "",
      desiredJobLevel: "",
      isRelocate: 1,
      benefits: [],
    });

  // const [workingHistories, setWorkingHistories] =
  //   useState<WorkingHistoryRequest>({
  //     jobTitle: "",
  //     companyName: "",
  //     companyLogo: "",
  //     fromDate: "",
  //     toDate: "",
  //     description: "",
  //     isCurrent: 1,
  //   });

  // const [allWorkingHistories, setAllWorkingHistories] = useState<
  //   WorkingHistories[]
  // >([]);

  const handleAddSkill = () => {
    if (skillName && proficiency) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [proficiency]: [...prevSkills[proficiency], skillName],
      }));
      setSkillName("");
      setProficiency("");
    }
  };

  const handleProficiencyChange = (value: string) => {
    setProficiency(value as ProficiencyLevel);
  };

  const handleRemoveSkill = (level: ProficiencyLevel, index: number) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [level]: prevSkills[level].filter((_, i) => i !== index),
    }));
  };

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

  // const updateWorkingHistories = async (
  //   updatedHistories: WorkingHistoryRequest
  // ) => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-working-histories/${decodedToken?.userid}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedHistories),
  //     }
  //   );
  //   return res.json();
  // };

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

  // const historiesMutation = useMutation({
  //   mutationFn: updateWorkingHistories,
  //   onSuccess: (data) => {
  //     if (data.status === "OK") {
  //       toast.success("Cập nhật kinh nghiệm làm việc thành công ");
  //       queryClient.invalidateQueries({ queryKey: ["getUser"] });
  //     } else {
  //       toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Lỗi khi cập nhật:", error);
  //     toast.error("Cập nhật thất bại");
  //   },
  // });

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

  // const updatedHistories = () => {
  //   historiesMutation.mutate(workingHistories);
  // };

  useEffect(() => {
    if (data) {
      setFormData(data);
      setSelectedBenefits(data.workingPreferences.benefits || []);
      setWorkingPreferences(data.workingPreferences);
      // setAllWorkingHistories(data.workingHistories);
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

  // useEffect(() => {
  //   if (fromDate) {
  //     setWorkingHistories((prev) => ({
  //       ...prev,
  //       fromDate: format(fromDate, "MM/yyyy"),
  //     }));
  //   }
  // }, [fromDate]);

  // useEffect(() => {
  //   if (toDate) {
  //     setWorkingHistories((prev) => ({
  //       ...prev,
  //       toDate: format(toDate, "MM/yyyy"),
  //     }));
  //   }
  // }, [toDate]);

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
    setWorkingPreferences((prev) => ({
      ...prev,
      companyIndustries: newIndustries.map((industry: any) => industry.value),
    }));
  };

  const handleBenefitClick = (benefitId: number) => {
    setSelectedBenefits((prevBenefits) => {
      if (prevBenefits.includes(benefitId)) {
        return prevBenefits.filter((id) => id !== benefitId);
      } else {
        return [...prevBenefits, benefitId];
      }
    });
  };

  // const handleIsCurrentChange = () => {
  //   setIsCurrent(!isCurrent);
  //   if (!isCurrent) {
  //     setToDate(undefined);
  //   }
  // };

  const OPTIONS = [
    { label: "Công Nghệ Thông Tin", value: "Công Nghệ Thông Tin" },
    { label: "Ngân Hàng", value: "Ngân Hàng" },
    { label: "Kinh Tế", value: "Kinh Tế" },
    { label: "Cơ Khí", value: "Cơ Khí" },
  ];

  return (
    <>
      <div className="bg-[#F7F8FA]">
        <div className="container py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <UserSidebar />
            </div>
            <div className="col-span-3 flex flex-col gap-5">
              <div className="flex flex-col gap-4 rounded-md bg-[#f1f2f4] p-4">
                <div className="flex items-center gap-6 rounded-md bg-white p-4">
                  <FaUser color="#EEEEEE" size={80} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xl font-bold">{data?.fullName}</p>
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
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
                                      <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                        *
                                      </span>
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
                                  <input
                                    type="text"
                                    value={formData.currentDegree}
                                    className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        currentDegree: e.target.value,
                                      })
                                    }
                                  />
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
                                  <input
                                    type="text"
                                    value={formData.currentIndustries}
                                    className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        currentIndustries: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="col-span-1 flex flex-col gap-1">
                                  <label htmlFor="" className="text-sm">
                                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                      *
                                    </span>
                                    Ngành nghề hiện tại
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.currentJobFunction}
                                    className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        currentJobFunction: e.target.value,
                                      })
                                    }
                                  />
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
                                      value={formData.currentSalary}
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
                                      <SelectItem value="Đại học">
                                        Đại học
                                      </SelectItem>
                                      <SelectItem value="Thạc sĩ">
                                        Thạc sĩ
                                      </SelectItem>
                                      <SelectItem value="Tiến sĩ">
                                        Tiến sĩ
                                      </SelectItem>
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
                                      <SelectItem value="1">
                                        Độc thân
                                      </SelectItem>
                                      <SelectItem value="2">
                                        Đã kết hôn
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
                                      <SelectItem value="Cần Thơ">
                                        Cần Thơ
                                      </SelectItem>
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
                                      <SelectItem value="Cần Thơ">
                                        Cần Thơ
                                      </SelectItem>
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
                              data?.dateOfBirth
                                ? "text-[#414042] font-medium"
                                : ""
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
                              data?.phoneNumber
                                ? "text-[#414042] font-medium"
                                : ""
                            }`}
                          >
                            {data?.phoneNumber
                              ? data.phoneNumber
                              : "Số điện thoại"}
                          </p>
                        </div>
                        <div className="my-1 flex items-center gap-2 text-gray-400">
                          <FiUser />
                          <p
                            className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                              data?.gender ? "text-[#414042] font-medium" : ""
                            }`}
                          >
                            {data?.gender === "1"
                              ? "Nam"
                              : data?.gender === "2"
                              ? "Nữ"
                              : "Giới tính"}
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
                        <FaRegPenToSquare
                          color="#ed1b2f"
                          className="cursor-pointer"
                        />
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
                                        <div
                                          key={index}
                                          className="flex items-center"
                                        >
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
                                              <SelectItem value="Hồ Chí Minh">
                                                Hồ Chí Minh
                                              </SelectItem>
                                              <SelectItem value="Cần Thơ">
                                                Cần Thơ
                                              </SelectItem>
                                              <SelectItem value="Đà Nẵng">
                                                Đà Nẵng
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                          {workingPreferences.locations.length >
                                            1 && (
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
                                  <GoPlusCircle
                                    className="text-blue-600"
                                    size={20}
                                  />
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
                                    checked={
                                      workingPreferences.isRelocate === 2
                                    }
                                    onChange={(e) =>
                                      setWorkingPreferences((prev) => ({
                                        ...prev,
                                        isRelocate: e.target.checked ? 2 : 1,
                                      }))
                                    }
                                  />
                                  <label htmlFor="">
                                    Có thể thay đổi nên làm việc
                                  </label>
                                </div>
                              </div>
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Ngành nghề
                                </label>
                                <input
                                  type="text"
                                  placeholder="VNĐ/Tháng"
                                  className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                                  value={workingPreferences.jobFunction}
                                  onChange={(e) =>
                                    setWorkingPreferences((prev) => ({
                                      ...prev,
                                      jobFunction: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Lĩnh vực
                                </label>
                                <MultipleSelector
                                  defaultOptions={OPTIONS}
                                  placeholder="Vui lòng chọn..."
                                  onChange={handleCompanyIndustriesChange}
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
                                  Mức lương mong muốn
                                </label>
                                <input
                                  type="number"
                                  placeholder="VNĐ/Tháng"
                                  className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                                  value={workingPreferences.salary}
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
                                    <SelectItem value="Nhân viên">
                                      Nhân viên
                                    </SelectItem>
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
                                      id: 1,
                                      icon: <FaAward size={22} />,
                                      label: "Giải thưởng",
                                    },
                                    {
                                      id: 2,
                                      icon: <FaHandHoldingUsd size={22} />,
                                      label: "Thưởng",
                                    },
                                    {
                                      id: 3,
                                      icon: <FaUtensils size={22} />,
                                      label: "Căn-tin",
                                    },
                                    {
                                      id: 4,
                                      icon: <FaUserDoctor size={22} />,
                                      label: "Khám sức khỏe",
                                    },
                                    {
                                      id: 5,
                                      icon: <FaBaby size={22} />,
                                      label: "Trông trẻ",
                                    },
                                    {
                                      id: 6,
                                      icon: <FaMobileAlt size={22} />,
                                      label: "Điện thoại",
                                    },
                                    {
                                      id: 7,
                                      icon: <FaFileInvoiceDollar size={22} />,
                                      label: "Nghỉ phép",
                                    },
                                  ].map((benefit) => (
                                    <button
                                      key={benefit.id}
                                      onClick={() =>
                                        handleBenefitClick(benefit.id)
                                      }
                                      className={`flex flex-col items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100   ${
                                        selectedBenefits.includes(benefit.id)
                                          ? "border-blue-400"
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
                      <p className="min-w-64 font-normal text-gray-400">
                        Nơi làm việc
                      </p>
                      <p className="flex-1">
                        {" "}
                        {data?.workingPreferences.locations.join(", ") ||
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
                          "Thêm mức lương mong muốn"}
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
                        <span className="font-semibold text-[#FF9119]">
                          Tip:
                        </span>{" "}
                        Tóm tắt kinh nghiệm chuyên môn, chú ý làm nổi bật các kỹ
                        năng và điểm mạnh.
                      </p>
                      <div className="overflow-hidden rounded-md border border-gray-300">
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <p className="mt-2 text-start text-sm text-gray-500">
                        0/2000 từ
                      </p>
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

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Mục Tiêu Nghề Nghiệp</p>
                <p className="my-3 text-xs font-normal italic">
                  Giới thiệu bản thân và mục tiêu nghề nghiệp của bạn
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
                      <DialogTitle>Mục Tiêu Nghề Nghiệp</DialogTitle>
                    </DialogHeader>
                    <div className="px-6">
                      <div className="overflow-hidden rounded-md border border-gray-300">
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <p className="mt-2 text-start text-sm text-gray-500">
                        0/2000 từ
                      </p>
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

              <WorkHistory data={data} />

              <Education data={data} />

              {/* <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Kinh Nghiệm Làm Việc</p>
                <p className="my-3 text-xs font-normal italic">
                  Mô tả kinh nghiệm làm việc của bạn càng chi tiết càng tốt,
                  điều đó giúp bạn có cơ hội hiển thị nhiều hơn trong kết quả
                  tìm kiếm
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2">
                      <GoPlusCircle className="text-blue-600" size={24} />
                      <span className="text-sm font-bold text-blue-600">
                        Thêm Kinh Nghiệm Làm Việc
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0">
                    <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                      <DialogTitle>Kinh Nghiệm Làm Việc</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 px-6">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Tên Dự Án
                          </label>
                          <input
                            type="text"
                            className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                            value={workingHistories.jobTitle}
                            onChange={(e) =>
                              setWorkingHistories((prev) => ({
                                ...prev,
                                jobTitle: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Công Ty
                          </label>
                          <input
                            type="text"
                            className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                            value={workingHistories.companyName}
                            onChange={(e) =>
                              setWorkingHistories((prev) => ({
                                ...prev,
                                companyName: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Từ Tháng
                          </label>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                  !fromDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {fromDate ? (
                                  format(fromDate, "dd/MM/yyyy")
                                ) : (
                                  <span>Ngày/Tháng/Năm</span>
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
                                selected={fromDate}
                                onSelect={setFromDate}
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Đến Tháng
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                  !toDate && "text-muted-foreground"
                                )}
                                disabled={isCurrent}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {toDate ? (
                                  format(toDate, "dd/MM/yyyy")
                                ) : (
                                  <span>Ngày/Tháng/Năm</span>
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
                                selected={toDate}
                                onSelect={setToDate}
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="col-span-1 flex items-center gap-1">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="h-4 w-4"
                            checked={isCurrent}
                            onChange={handleIsCurrentChange}
                          />
                          <label htmlFor="">Công việc hiện tại</label>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-md border border-gray-300">
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          value={workingHistories.description}
                          onChange={(value) =>
                            setWorkingHistories((prev) => ({
                              ...prev,
                              description: value,
                            }))
                          }
                        />
                      </div>
                      <p className="mt-2 text-start text-sm text-gray-500">
                        0/2000 từ
                      </p>
                    </div>
                    <DialogFooter className="border-t border-gray-300 px-6 py-4">
                      <DialogClose asChild>
                        <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                          Hủy
                        </Button>
                      </DialogClose>
                      <Button
                        className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                        onClick={updatedHistories}
                      >
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {allWorkingHistories.map((history: WorkingHistories) => (
                  <div key={history._id} className="my-4">
                    <div className="mb-2 flex items-center gap-4">
                      <Image
                        src={history.companyLogo}
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div className="flex flex-1 justify-between">
                        <div>
                          <h3 className="font-medium">{history.jobTitle}</h3>
                          <p className="text-sm text-gray-500">
                            {history.companyName}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {history.fromDate && (
                              <span>{history.fromDate}</span>
                            )}
                            {history.fromDate && history.toDate && (
                              <span> - </span>
                            )}
                            {history.toDate && <span>{history.toDate}</span>}
                          </div>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: history.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}

              {/* <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Học Vấn</p>
                <p className="my-3 text-xs font-normal italic">
                  Mô tả toàn bộ quá trình học vấn của bạn, cũng như các bằng cấp
                  bạn đã được và các khóa huấn luyện bạn đã tham gia
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2">
                      <GoPlusCircle className="text-blue-600" size={24} />
                      <span className="text-sm font-bold text-blue-600">
                        Thêm Học Vấn
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0">
                    <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                      <DialogTitle>Học vấn</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 px-6">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Trường
                        </label>
                        <input
                          type="text"
                          className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Chuyên Ngành
                          </label>
                          <input
                            type="text"
                            className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                          />
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Ngày sinh
                          </label>
                          <Select>
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn trình độ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trung-hoc">
                                Trung học
                              </SelectItem>
                              <SelectItem value="trung-cap">
                                Trung cấp
                              </SelectItem>
                              <SelectItem value="cao-dang">Cao đẳng</SelectItem>
                              <SelectItem value="cu-nhan">Cử nhân</SelectItem>
                              <SelectItem value="thac-si">Thạc sĩ</SelectItem>
                              <SelectItem value="tien-si">Tiến sĩ</SelectItem>
                              <SelectItem value="khac">Khác</SelectItem>
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
                            Từ lúc
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
                                  <span>Ngày/Tháng/Năm</span>
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
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Đến lúc
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
                                  <span>Ngày/Tháng/Năm</span>
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
              </div> */}

              {/* <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Dự Án</p>
                <p className="my-3 text-xs font-normal italic">
                  Mô tả các dự án nổi bật của bạn nhằm thu hút nhà tuyển dụng
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2">
                      <GoPlusCircle className="text-blue-600" size={24} />
                      <span className="text-sm font-bold text-blue-600">
                        Thêm Dự Án
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0">
                    <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                      <DialogTitle>Dự Án</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 px-6">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Trường
                        </label>
                        <input
                          type="text"
                          className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Từ lúc
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
                                  <span>Ngày/Tháng/Năm</span>
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
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Đến lúc
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
                                  <span>Ngày/Tháng/Năm</span>
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
                      <div className="overflow-hidden rounded-md border border-gray-300">
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <p className="text-start text-sm text-gray-500">
                        0/5000 từ
                      </p>
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
              </div> */}

              {/* <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Kỹ Năng</p>
                <p className="my-3 text-xs font-normal italic">
                  Trong phần này, bạn nên liệt kê các kỹ năng phù hợp với vị trí
                  hoặc lĩnh vực nghề nghiệp mà bạn quan tâm.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2">
                      <GoPlusCircle className="text-blue-600" size={24} />
                      <span className="text-sm font-bold text-blue-600">
                        Thêm Kỹ Năng
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0">
                    <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                      <DialogTitle>Kỹ Năng</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 px-6">
                      <div className="grid grid-cols-5 gap-5">
                        <div className="col-span-2 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Tên Kỹ Năng
                          </label>
                          <input
                            type="text"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                          />
                        </div>
                        <div className="col-span-2 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Mức Độ Thành Thạo
                          </label>
                          <Select
                            value={proficiency}
                            onValueChange={handleProficiencyChange}
                          >
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn trình độ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="moi-bat-dau">
                                Mới bắt đầu
                              </SelectItem>
                              <SelectItem value="trung-binh">
                                Trung bình
                              </SelectItem>
                              <SelectItem value="thanh-thao">
                                Thành thạo
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex flex-1 flex-col justify-end gap-1">
                          <Button
                            onClick={handleAddSkill}
                            className="h-10 border border-solid border-orange-400 bg-white text-orange-400 shadow-none hover:bg-orange-50"
                          >
                            Thêm
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 px-6">
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">
                          Thành thạo (hơn 3 năm kinh nghiệm)
                        </p>
                        <div className="flex gap-2">
                          {skills["thanh-thao"].length > 0 ? (
                            skills["thanh-thao"].map((skill, index) => (
                              <button
                                key={index}
                                className="flex w-fit items-center gap-1 rounded-md border border-solid border-orange-500 bg-white px-3 py-2 text-sm text-amber-500"
                                onClick={() =>
                                  handleRemoveSkill("thanh-thao", index)
                                }
                              >
                                {skill} <IoClose size={20} />
                              </button>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              Chưa thêm kỹ năng nào
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">
                          Trung bình (1 - 3 kinh nghiệm)
                        </p>
                        <div className="flex gap-2">
                          {skills["trung-binh"].length > 0 ? (
                            skills["trung-binh"].map((skill, index) => (
                              <button
                                key={index}
                                className="flex w-fit items-center gap-1 rounded-md border border-solid border-orange-500 bg-white px-3 py-2 text-sm text-amber-500"
                                onClick={() =>
                                  handleRemoveSkill("trung-binh", index)
                                }
                              >
                                {skill} <IoClose size={20} />
                              </button>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              Chưa thêm kỹ năng nào
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">
                          Mới bắt đầu (ít hơn 1 năm kinh nghiệm)
                        </p>
                        <div className="flex gap-2">
                          {skills["moi-bat-dau"].length > 0 ? (
                            skills["moi-bat-dau"].map((skill, index) => (
                              <button
                                key={index}
                                className="flex w-fit items-center gap-1 rounded-md border border-solid border-orange-500 bg-white px-3 py-2 text-sm text-amber-500"
                                onClick={() =>
                                  handleRemoveSkill("moi-bat-dau", index)
                                }
                              >
                                {skill} <IoClose size={20} />
                              </button>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              Chưa thêm kỹ năng nào
                            </span>
                          )}
                        </div>
                      </div>
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
              </div> */}

              {/* <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Ngoại Ngữ</p>
                <p className="my-3 text-xs font-normal italic">
                  Cập nhật thông tin ngoại ngữ, điều này sẽ giúp tăng triển vọng
                  tìm kiếm công việc.
                </p>
                <button className="flex items-center gap-2">
                  <GoPlusCircle className="text-blue-600" size={24} />
                  <span className="text-sm font-bold text-blue-600">
                    Thêm Ngoại Ngữ
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
