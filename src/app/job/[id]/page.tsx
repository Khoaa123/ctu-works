"use client";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { HiMiniUserGroup } from "react-icons/hi2";
import {
  FaLocationDot,
  FaClock,
  FaRegPaperPlane,
  FaRegHeart,
  FaBriefcase,
  FaLaptop,
  FaLaptopCode,
  FaUserClock,
  FaGraduationCap,
  FaUsers,
  FaUserTie,
  FaLanguage,
  FaFlag,
  FaVenus,
  FaVenusMars,
  FaDollarSign,
  FaBed,
  FaPlane,
  FaBookOpen,
  FaTrophy,
  FaPhone,
  FaBus,
  FaUtensils,
  FaPercent,
  FaChild,
  FaRegClock,
} from "react-icons/fa6";
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaCogs,
  FaEllipsisH,
  FaHeart,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import nexon from "@images/nexon.png";
import Image from "next/image";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButotn";
import { PhoneCall } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
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
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import MultipleSelector from "@/components/ui/multiple-selector";
import { toast } from "react-toastify";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "next/navigation";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ScreenLoading from "@/components/ScreenLoading/ScreenLoading";

type FormData = {
  email: string;
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
  skillName: string[];
  workingPreferences: WorkingPreferences;
};
type WorkingPreferences = {
  locations: string[];
  jobFunction: string;
  companyIndustries: string[];
  salary: string;
  desiredJobLevel: string;
  isRelocate: 1 | 2;
  benefits: string[];
};

type Notification = {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const JobDetail = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  const [isSaved, setIsSaved] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [relatedJobs, setRelatedJobs] = useState<any>([]);
  const [jobInfoId, setJobInfoId] = useState("");

  const router = useRouter();

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [saveJobDetails, setsaveJobDetails] = useState({
    _id: "",
  });
  const [loading, setLoading] = useState(true);
  const [isLoadingApply, setisLoadingApply] = useState(false);

  const saveJob = async () => {
    const id = location.pathname?.split("/job/")[1];
    const res = await fetch(`http://localhost:3001/api/savejob/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: decodedToken?.userid,
        jobPostId: id,
      }),
    });
    return res.json();
  };

  const unSaveJob = async () => {
    const id = saveJobDetails._id;
    const res = await fetch(`http://localhost:3001/api/savejob/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  useEffect(() => {
    const checkSaveJob = async () => {
      const id = location.pathname?.split("/job/")[1];
      if (id == "undefined") {
        router.push("/");
      }
      const res = await fetch(`http://localhost:3001/api/savejob/check-save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: decodedToken?.userid,
          jobPostId: id,
        }),
      });
      const data = await res.json();
      if (data.status === "OK") {
        setIsSaved(true);
        setsaveJobDetails(data.data);
      }
    };
    checkSaveJob();
  }, []);
  const handleSaveClick = async () => {
    if (!accessToken) {
      router.push("/login");
    } else {
      if (!isSaved) {
        const save = await saveJob();
        setsaveJobDetails({ _id: save?.data._id });
      } else {
        const unSave = await unSaveJob();
      }
      setIsSaved(!isSaved);
      toast.success(
        isSaved ? (
          "Đã bỏ lưu công việc"
        ) : (
          <p>
            Bạn đã lưu việc làm thành công, xem
            <Link href="/profile/my-job">
              <span className="text-blue-500 hover:text-[#ff7d55]">
                {" "}
                Việc làm của tôi
              </span>
            </Link>
          </p>
        )
      );
    }
  };

  const [jobPostDetails, setJobPostDetails] = useState({
    companyAddress: "",
    companyBenefits: [
      {
        title: "",
        content: "",
      },
    ],
    companyEmail: "",
    companyLogo: "",
    companyName: "",
    companySize: "",
    companyStaffName: "",
    statusSeeking: true,
    jobDescription: "",
    jobRequirements: "",
    expirationDate: "",
    jobTitle: "",
    minSalary: 0,
    maxSalary: 0,
    canDeal: false,
    postViews: 0,
    location: [],
    recruiterId: "",
    datePosted: "",
    educationLevel: "",
    gender: "",
    jobField: "",
    jobIndustry: "",
    jobLevel: "",
    keywords: [],
    language: "",
    maritalStatus: "",
    minExperience: 0,
    nationality: "",
    minAge: 0,
    maxAge: 0,
    numberOfPositions: 0,
    _id: "",
  });
  let run = 0;

  useEffect(() => {
    if (run < 1) {
      const fetchData = async () => {
        const data = await fetchJobPostDetails();
        setJobPostDetails(data.data);
        setJobInfoId(data.data?.jobInfoId);
        console.log("đasadsa", data.data);

        setLoading(false);
      };
      run = 1;
      fetchData();
    }
  }, []);

  const fetchJobPostDetails = async () => {
    const id = location.pathname?.split("/job/")[1];

    const res = await fetch(
      `http://localhost:3001/api/jobpost/get-details-jobpost/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const [date, setDate] = React.useState<Date>();
  const [workingPreferences, setWorkingPreferences] =
    useState<WorkingPreferences>({
      locations: [],
      jobFunction: "",
      companyIndustries: [],
      salary: "",
      desiredJobLevel: "",
      isRelocate: 1,
      benefits: [],
    });

  const [formData, setFormData] = useState<FormData>({
    email: "",
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
    skillName: [],
    workingPreferences: workingPreferences,
  });

  useEffect(() => {
    if (date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: format(date, "dd/MM/yyyy"),
      }));
    }
  }, [date]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetailsUser();
      setFormData(data.data);
      setWorkingPreferences(data.data?.workingPreferences);
    };
    fetchData();
  }, []);
  // let startTime = Date.now();
  // const API_ENDPOINT = `http://localhost:3001/api/job-views-history/create`;
  // let hasRunBeforeunload = false;
  // useEffect(() => {
  //   window.addEventListener("beforeunload", (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     event.timeStamp;
  //     // Kiểm tra xem hàm đã chạy chưa
  //     if (!hasRunBeforeunload) {
  //       hasRunBeforeunload = true;
  //       let endTime = Date.now();
  //       let timeSpent = endTime - startTime;
  //       const userId = decodedToken?.userid;
  //       const jobPostId = location.pathname.split("/job/")[1];

  //       if (userId && jobPostId) {
  //         fetch(API_ENDPOINT, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             userId: userId,
  //             jobPostId: jobPostId,
  //             timeSpent: timeSpent,
  //           }),
  //         })
  //           .then((response) => {})
  //           .catch((error) => {});
  //       }
  //     }
  //   });

  //   return () => {
  //     window.removeEventListener("beforeunload", () => {});
  //   };
  // }, []);

  const API_ENDPOINT = `http://localhost:3001/api/job-views-history/create`;
  const startTime = Date.now();
  const userId = decodedToken?.userid;
  const jobPostId = location.pathname?.split("/job/")[1];

  useEffect(() => {
    if (userId && jobPostId) {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;

      fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          jobPostId: jobPostId,
          timeSpent: timeSpent,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Job view history created:", data);
        })
        .catch((error) => {
          console.error("Error creating job view history:", error);
        });
    }
  }, [userId, jobPostId]);

  const fetchDetailsUser = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `http://localhost:3001/api/user/get-details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const handleCompanyIndustriesChange = (newIndustries: any) => {
    setWorkingPreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        companyIndustries: newIndustries?.map(
          (industry: any) => industry.value
        ),
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        workingPreferences: updatedPreferences,
      }));

      return updatedPreferences;
    });
  };
  const handleCompanyBenefitsChange = (newBenefits: any) => {
    console.log(newBenefits);
    setWorkingPreferences((prev) => ({
      ...prev,
      benefits: newBenefits?.map((benefit: any) => benefit.value),
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      workingPreferences: workingPreferences,
    }));
  };
  const handleCompanySalaryChange = (newSalary: any) => {
    const updatedSalary = newSalary.target.value;
    setWorkingPreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        salary: updatedSalary,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        workingPreferences: updatedPreferences,
      }));

      return updatedPreferences;
    });
  };
  const handleCompanyLocationChange = (newLocations: any) => {
    setWorkingPreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        locations: newLocations?.map((location: any) => location.value),
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        workingPreferences: updatedPreferences,
      }));

      return updatedPreferences;
    });
  };
  const handleCompanyLevelChange = (value: any) => {
    // const updatedSalary = value.target.value;
    setWorkingPreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        desiredJobLevel: value,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        workingPreferences: updatedPreferences,
      }));

      return updatedPreferences;
    });
  };
  const handleCompanyJobFunctionChange = (newJobFun: any) => {
    const updatedJobFunction = newJobFun.target.value;
    setWorkingPreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        jobFunction: updatedJobFunction,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        workingPreferences: updatedPreferences,
      }));

      return updatedPreferences;
    });
  };
  const OPTIONS = [
    { label: "Công Nghệ Thông Tin", value: "Công Nghệ Thông Tin" },
    { label: "Ngân Hàng", value: "Ngân Hàng" },
    { label: "Kinh Tế", value: "Kinh Tế" },
    { label: "Cơ Khí", value: "Cơ Khí" },
  ];
  const OPTIONSBENEFIT = [
    { label: "Giải Thưởng", value: "Giải Thưởng" },
    { label: "Thưởng", value: "Thưởng" },
    { label: "Căn tin", value: "Căn tin" },
    { label: "Khám sức khỏe", value: "Khám sức khỏe" },
    { label: "Trông trẻ", value: "Trông trẻ" },
    { label: "Điện thoại", value: "Điện thoại" },
    { label: "Nghỉ phép", value: "Nghỉ phép" },
  ];
  const OPTIONSLOCATION = [
    { label: "Cần Thơ", value: "Cần Thơ" },
    { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
    { label: "Hà Nội", value: "Hà Nội" },
    { label: "Đà Nẵng", value: "Đà Nẵng" },
  ];

  const handleApplication = async (cvUrl: string) => {
    const id = location.pathname?.split("/job/")[1];

    const res = await fetch(`http://localhost:3001/api/apply/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        jobPostId: id,
        recruiterId: jobPostDetails?.recruiterId,
        cvUrl: cvUrl,
      }),
    });

    return res.json();
  };

  const uploadAndApply = async () => {
    if (!file) {
      toast.error("Vui lòng chọn một tệp để tải lên");
      return;
    }

    const formData = new FormData();
    formData.append("pdfs", file);
    setisLoadingApply(true);
    try {
      const uploadRes = await fetch("http://localhost:3001/api/upload/pdf", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (uploadData.success) {
        const cvUrl = uploadData.pdfUrls[0];

        const applyRes = await handleApplication(cvUrl);
        if (applyRes.status === "OK") {
          toast.success("Ứng tuyển công việc thành công");
        } else {
          toast.error("Bạn đã ứng tuyển công việc này rồi");
        }
      } else {
        toast.error("Lỗi khi tải lên tệp");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại. Vui lòng thử lại sau.");
    } finally {
      setisLoadingApply(false);
    }
  };

  const calculateDaysRemaining = (expirationDate: any) => {
    const expirationDateObj = new Date(expirationDate);
    const today = new Date();
    const diffInMs = expirationDateObj.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/job-info/related-jobs/${jobInfoId}`
        );
        const data = await res.json();
        setRelatedJobs(data.data);
      } catch (e) {
        console.error("Failed to fetch related jobs", e);
      }
    };

    fetchRelatedJobs();
  }, [jobInfoId]);

  console.log("jojo", relatedJobs);
  const handleCheckLogin = () => {
    if (!accessToken) {
      router.push("/login");
    }
  };
  const handleGoToApplyButton = () => {
    const dialogElement = document.getElementById("dialogtrigger");
    if (dialogElement) {
      dialogElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toDate = new Date();
  return (
    <>
      {isLoadingApply && <ScreenLoading />}
      <div className="bg-[#f9f9f9]">
        <div className="container">
          <div className="pt-5">
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-3">
                <div className="rounded-md bg-white p-6">
                  <div className="rounded-md bg-[#F8F9FA] p-3">
                    <p className="mb-1 line-clamp-1 text-xl font-bold">
                      {loading ? (
                        <Skeleton width={400} height={20} />
                      ) : (
                        jobPostDetails?.jobTitle
                      )}
                    </p>
                    <div className="mt-6 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-[#f1f2f4] p-2">
                          <FaClock color="grey" size={14} />
                        </div>
                        <span className="text-sm text-[#ff7d55]">
                          {loading ? (
                            <Skeleton width={150} />
                          ) : (
                            <>
                              {new Date(
                                jobPostDetails?.expirationDate
                              ).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              {` (Hết hạn trong ${calculateDaysRemaining(
                                jobPostDetails?.expirationDate
                              )} ngày)`}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2 md:min-w-36">
                          <div className="rounded-full bg-[#f1f2f4] p-2">
                            <AiOutlineDollarCircle color="grey" size={14} />
                          </div>
                          {loading ? (
                            <Skeleton width={100} />
                          ) : jobPostDetails?.canDeal === true ? (
                            <span className="text-sm text-orange-500">
                              Thương lượng
                            </span>
                          ) : (
                            <span className="text-sm">
                              {jobPostDetails?.minSalary}$ {" - "}{" "}
                              {jobPostDetails?.maxSalary}$
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 md:min-w-36">
                          <div className="rounded-full bg-[#f1f2f4] p-2">
                            <HiMiniUserGroup color="grey" size={14} />
                          </div>
                          <span className="text-sm">
                            {loading ? (
                              <Skeleton width={100} />
                            ) : (
                              <>{jobPostDetails?.postViews} lượt xem</>
                            )}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center gap-2">
                          <div className="rounded-full bg-[#f1f2f4] p-2">
                            <FaLocationDot color="grey" size={14} />
                          </div>
                          <span className="line-clamp-1 text-sm">
                            {loading ? (
                              <Skeleton width={300} />
                            ) : (
                              <>
                                {jobPostDetails?.location?.map(
                                  (loc: string, locIndex) => {
                                    const locationName = loc
                                      ?.split(":")[1]
                                      ?.trim();

                                    const locationWithoutCountry = locationName
                                      ?.replace(", Việt Nam", "")
                                      ?.trim();
                                    return (
                                      <span key={locIndex}>
                                        {locationWithoutCountry}
                                        {locIndex <
                                        jobPostDetails?.location.length - 1
                                          ? ", "
                                          : ""}
                                      </span>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <Dialog>
                          {new Date(jobPostDetails?.expirationDate) > toDate &&
                          jobPostDetails?.statusSeeking == true ? (
                            <DialogTrigger
                              id="dialogtrigger"
                              onClick={handleCheckLogin}
                              asChild
                            >
                              <button
                                className="flex w-3/4 items-center justify-center gap-3 rounded-lg bg-[#ff7d55] p-2 text-sm text-white transition hover:bg-[#fd916f]"
                                disabled={
                                  new Date(jobPostDetails?.expirationDate) <=
                                  toDate
                                }
                              >
                                <FaRegPaperPlane size={16} />
                                Ứng tuyển ngay
                              </button>
                            </DialogTrigger>
                          ) : (
                            <div className="flex w-3/4 items-center justify-center gap-3 rounded-lg bg-gray-400 p-2 text-sm text-white">
                              Ứng tuyển đã đóng
                            </div>
                          )}

                          <DialogContent className="max-w-5xl p-0">
                            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                              <DialogTitle>Ứng tuyển công việc</DialogTitle>
                            </DialogHeader>

                            <form className="mx-auto w-full rounded-md bg-white p-4 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8">
                              <div className="flex flex-col gap-1 px-6 py-4">
                                <Accordion
                                  type="single"
                                  defaultValue="item-1"
                                  collapsible
                                >
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      Hồ sơ của bạn
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="flex flex-col gap-1">
                                        <label htmlFor="cv" className="text-sm">
                                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                            *
                                          </span>
                                          Tải lên CV
                                        </label>
                                        <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                                          <svg
                                            className="mb-4 h-8 w-8 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                          </svg>
                                          <p className="mb-2 text-sm text-gray-500">
                                            Tải lên CV từ máy tính, chọn hoặc
                                            kéo thả
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            Hỗ trợ định dạng .doc, .docx, pdf có
                                            kích thước dưới 5MB
                                          </p>
                                          <label
                                            htmlFor="file-upload"
                                            className="mt-4 cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                                          >
                                            Chọn CV
                                            <input
                                              id="file-upload"
                                              name="file-upload"
                                              type="file"
                                              className="sr-only"
                                              onChange={handleFileChange}
                                              accept=".doc,.docx,.pdf"
                                            />
                                          </label>
                                        </div>
                                        {file && (
                                          <p className="mt-2 text-sm text-gray-500">
                                            File đã chọn: {file.name}
                                          </p>
                                        )}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                  <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                      Thông tin ứng tuyển
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="h-48 w-full gap-5 overflow-y-hidden overflow-y-scroll">
                                        <div className="h-30 grid gap-8 md:grid-cols-2">
                                          <div className="">
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Họ và tên
                                            </label>
                                            <input
                                              type="text"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập họ và tên"
                                              value={formData?.fullName}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  fullName: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Email
                                            </label>
                                            <input
                                              type="email"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập email"
                                              value={formData?.email}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  email: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Năm sinh
                                            </label>
                                            <Popover>
                                              <PopoverTrigger asChild>
                                                <Button
                                                  variant={"outline"}
                                                  className={cn(
                                                    "shadow-none w-full border-gray-300 rounded-sm h-10  justify-start text-left hover:bg-transparent  font-normal data-[state=open]:border-sky-400",
                                                    !date &&
                                                      "text-muted-foreground"
                                                  )}
                                                >
                                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                                  {date ? (
                                                    format(date, "dd/MM/yyyy")
                                                  ) : (
                                                    <span>
                                                      {formData?.dateOfBirth}
                                                    </span>
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
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Số điện thoại
                                            </label>
                                            <input
                                              type="tel"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập số điện thoại"
                                              value={formData?.phoneNumber}
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
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Chức Danh
                                            </label>
                                            <input
                                              type="text"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập chức danh"
                                              value={formData?.jobTitle}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  jobTitle: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Cấp bậc hiện tại
                                            </label>
                                            <Select
                                              value={formData?.currentDegree}
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
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Lĩnh vực hiện tại
                                            </label>
                                            <input
                                              type="text"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập tên ngành"
                                              value={
                                                formData?.currentIndustries
                                              }
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  currentIndustries:
                                                    e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Ngành
                                            </label>
                                            <input
                                              type="text"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập chức danh"
                                              value={
                                                formData?.currentJobFunction
                                              }
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  currentJobFunction:
                                                    e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Số năm kinh nghiệm
                                            </label>
                                            <input
                                              type="number"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập số năm kinh nghiệm"
                                              min={0}
                                              value={formData?.yearsExperience}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  yearsExperience:
                                                    e.target.value,
                                                })
                                              }
                                            />
                                          </div>{" "}
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Mức lương hiện tại
                                            </label>
                                            <input
                                              type="text"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập chức danh"
                                              value={formData?.currentSalary}
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
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Bằng cấp cao nhất
                                            </label>
                                            <Select
                                              value={formData?.highestDegree}
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
                                                <SelectItem value="Đại học">
                                                  Đại học
                                                </SelectItem>
                                                <SelectItem value="Thạc sĩ">
                                                  Thạc sĩ
                                                </SelectItem>
                                                <SelectItem value="Tiến sĩ">
                                                  Tiến sĩ
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Quốc tịch
                                            </label>
                                            <input
                                              type="text"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập chức danh"
                                              value={formData?.country}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  country: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Thành phố
                                            </label>
                                            <Select
                                              value={formData?.city}
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
                                                <SelectItem value="Hồ Chính Minh">
                                                  Hồ Chí Minh
                                                </SelectItem>
                                                <SelectItem value="Cần Thơ">
                                                  Cần Thơ
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Quận/Huyện
                                            </label>
                                            <Select
                                              value={formData?.district}
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
                                                <SelectItem value="Quận 1">
                                                  Quận 1
                                                </SelectItem>
                                                <SelectItem value="Ninh Kiều">
                                                  Ninh Kiều
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Giới tính
                                            </label>
                                            <Select
                                              value={formData?.gender.toString()}
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
                                                <SelectItem value="1">
                                                  Nam
                                                </SelectItem>
                                                <SelectItem value="2">
                                                  Nữ
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                *
                                              </span>
                                              Tình trạng hôn nhân
                                            </label>
                                            <Select
                                              value={formData?.maritalStatusId.toString()}
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
                                                <SelectItem value="1">
                                                  Độc thân
                                                </SelectItem>
                                                <SelectItem value="2">
                                                  Đã kết hôn
                                                </SelectItem>
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
                                              value={formData?.MSSV}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  MSSV: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                              Địa chỉ
                                            </label>
                                            <input
                                              type="text"
                                              className="h-10 w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition-all focus:border-sky-400 focus:bg-transparent"
                                              placeholder="Nhập địa chỉ"
                                              value={formData?.address}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...formData,
                                                  address: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                  <AccordionItem value="item-3">
                                    <AccordionTrigger>
                                      Công việc mong muốn
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <ScrollArea className="h-50 w-full">
                                        <div className="flex flex-col items-center gap-6 px-6">
                                          <div className="h-30 flex grid w-full flex-1 flex-col gap-6 gap-8 md:grid-cols-2">
                                            <div className="gap-5">
                                              <div className="col-span-1 flex flex-col gap-1">
                                                <label
                                                  htmlFor=""
                                                  className="text-sm"
                                                >
                                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                    *
                                                  </span>
                                                  Nơi làm việc mong muốn
                                                </label>
                                                <MultipleSelector
                                                  defaultOptions={
                                                    OPTIONSLOCATION
                                                  }
                                                  placeholder="Vui lòng chọn..."
                                                  onChange={
                                                    handleCompanyLocationChange
                                                  }
                                                  value={workingPreferences?.locations?.map(
                                                    (location) => ({
                                                      label: location,
                                                      value: location,
                                                    })
                                                  )}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-1">
                                              <label
                                                htmlFor=""
                                                className="text-sm"
                                              >
                                                <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                  *
                                                </span>
                                                Ngành nghề mong muốn
                                              </label>
                                              <input
                                                type="text"
                                                placeholder="Nhập ngành nghề mong muốn"
                                                className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                                                value={
                                                  workingPreferences?.jobFunction
                                                }
                                                onChange={
                                                  handleCompanyJobFunctionChange
                                                }
                                                // onChange={(e) => {
                                                //   setWorkingPreferences((prev) => ({
                                                //     ...prev,
                                                //     jobFunction: e.target.value,
                                                //   }));
                                                //   setFormData((prevFormData) => ({
                                                //     ...prevFormData,
                                                //     workingPreferences: workingPreferences,
                                                //   }))
                                                // }}
                                              />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-1">
                                              <label
                                                htmlFor=""
                                                className="text-sm"
                                              >
                                                <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                  *
                                                </span>
                                                Lĩnh vực mong muốn
                                              </label>
                                              <MultipleSelector
                                                defaultOptions={OPTIONS}
                                                placeholder="Vui lòng chọn..."
                                                onChange={
                                                  handleCompanyIndustriesChange
                                                }
                                                value={workingPreferences?.companyIndustries?.map(
                                                  (industry) => ({
                                                    label: industry,
                                                    value: industry,
                                                  })
                                                )}
                                              />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-1">
                                              <label
                                                htmlFor=""
                                                className="text-sm"
                                              >
                                                <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                  *
                                                </span>
                                                5 phúc lợi mong muốn
                                              </label>
                                              <MultipleSelector
                                                defaultOptions={OPTIONSBENEFIT}
                                                placeholder="Vui lòng chọn..."
                                                onChange={
                                                  handleCompanyBenefitsChange
                                                }
                                                value={workingPreferences?.benefits?.map(
                                                  (industry) => ({
                                                    label: industry,
                                                    value: industry,
                                                  })
                                                )}
                                              />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-1">
                                              <label
                                                htmlFor=""
                                                className="text-sm"
                                              >
                                                <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                  *
                                                </span>
                                                Mức lương mong muốn
                                              </label>
                                              <input
                                                type="number"
                                                placeholder="VNĐ/Tháng"
                                                className="h-10 rounded-md border border-solid px-3 text-sm outline-none focus:border-sky-400"
                                                value={
                                                  workingPreferences?.salary
                                                }
                                                onChange={
                                                  handleCompanySalaryChange
                                                }
                                                // onChange={(e) => {
                                                //   setWorkingPreferences((prev) => ({
                                                //     ...prev,
                                                //     salary: e.target.value,

                                                //   }))
                                                // }}
                                              />
                                            </div>

                                            <div className="col-span-1 flex flex-col gap-1">
                                              <label
                                                htmlFor=""
                                                className="text-sm"
                                              >
                                                <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                                  *
                                                </span>
                                                Cấp bậc mong muốn
                                              </label>
                                              <Select
                                                value={
                                                  workingPreferences?.desiredJobLevel
                                                }
                                                onValueChange={(value) =>
                                                  handleCompanyLevelChange(
                                                    value
                                                  )
                                                }
                                                // onValueChange={(value) =>
                                                //   setWorkingPreferences((prev) => ({
                                                //     ...prev,
                                                //     desiredJobLevel: value,
                                                //   }))
                                                // }
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
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            </form>

                            <DialogFooter className="px-6 py-4">
                              <DialogClose>
                                <Button
                                  onClick={uploadAndApply}
                                  className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                                >
                                  Ứng tuyển
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <button
                          className={`flex flex-1 justify-center items-center gap-3 rounded-lg border px-4 py-2 transition ${
                            isSaved
                              ? "border-[#005aff] text-[#005aff] hover:bg-[#347bff26] "
                              : "border-gray-300 "
                          }`}
                          onClick={handleSaveClick}
                        >
                          {isSaved ? (
                            <FaHeart color="#005aff" />
                          ) : (
                            <FaRegHeart />
                          )}
                          {isSaved ? "Đã lưu" : "Lưu công việc"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg font-bold">Mô tả công việc</p>
                    <div className="mt-3">
                      {loading ? (
                        <div className="space-y-3">
                          <Skeleton count={2} height={20} width="100%" />
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: jobPostDetails?.jobDescription ?? "",
                          }}
                        ></div>
                      )}
                    </div>
                    <p className="mt-8 text-lg font-bold">Yêu cầu công việc</p>
                    {loading ? (
                      <div className="space-y-3">
                        <Skeleton count={3} height={20} width="100%" />
                      </div>
                    ) : (
                      <div
                        className="mt-3"
                        dangerouslySetInnerHTML={{
                          __html: jobPostDetails?.jobRequirements ?? "",
                        }}
                      ></div>
                    )}
                  </div>

                  <div className="mt-8">
                    <h1 className="mb-4 text-xl font-semibold">
                      Các phúc lợi dành cho bạn
                    </h1>
                    {loading ? (
                      <div className="space-y-3">
                        <Skeleton count={2} height={20} width="20%" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {jobPostDetails?.companyBenefits?.map((item) => (
                          <div className="rounded-lg border bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center">
                              {item.title === "Thưởng" && (
                                <FaDollarSign className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Chăm sóc sức khỏe" && (
                                <FaBed className="fas fa-bed mr-2 text-blue-500" />
                              )}
                              {item.title === "Nghỉ phép có lương" && (
                                <FaMoneyCheckAlt className="fas fa-book-open mr-2 text-blue-500" />
                              )}
                              {item.title === "Đào tạo" && (
                                <FaChalkboardTeacher className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Giải thưởng" && (
                                <FaTrophy className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Thư viện" && (
                                <FaBookOpen className="fas fa-book-open mr-2 text-blue-500" />
                              )}
                              {item.title === "Máy tính xách tay" && (
                                <FaLaptop className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Điện thoại" && (
                                <FaPhone className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Cơ hội du lịch" && (
                                <FaPlane className="fas fa-plane mr-2 text-blue-500" />
                              )}
                              {item.title === "Hoạt động nhóm" && (
                                <FaUsers className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Xe đưa đón" && (
                                <FaBus className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Căn-tin" && (
                                <FaUtensils className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Phiếu giảm giá" && (
                                <FaPercent className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Nhà trẻ" && (
                                <FaChild className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              {item.title === "Khác" && (
                                <FaEllipsisH className="fas fa-dollar-sign mr-2 text-blue-500" />
                              )}
                              <span className="font-semibold">
                                {item.title}
                              </span>
                            </div>
                            <p>{item.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
                    <p className="text-lg font-bold">Thông tin việc làm</p>
                    <h2 className="mb-4 text-xl font-bold"></h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <FaCalendarAlt className="fas fa-calendar-alt mr-2"></FaCalendarAlt>
                          <span className="text-[#939393]">NGÀY ĐĂNG</span>
                        </div>
                        <div className="mb-4 ml-6">
                          {new Date(
                            jobPostDetails?.datePosted
                          ).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaBriefcase className="fas fa-briefcase mr-2"></FaBriefcase>
                          <span className="text-[#939393]">NGÀNH NGHỀ</span>
                        </div>
                        <div className="mb-4 ml-6">
                          Công Nghệ Thông Tin/Viễn Thông {">"} Phần Mềm Máy Tính
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaLaptopCode className="fas fa-laptop-code mr-2"></FaLaptopCode>
                          <span className="text-[#939393]">LĨNH VỰC</span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.jobField}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaUserClock className="fas fa-user-clock mr-2"></FaUserClock>
                          <span className="text-[#939393]">
                            SỐ NĂM KINH NGHIỆM TỐI THIỂU
                          </span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.minExperience}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaGraduationCap className="fas fa-graduation-cap mr-2"></FaGraduationCap>
                          <span className="text-[#939393]">
                            TRÌNH ĐỘ HỌC VẤN TỐI THIỂU
                          </span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.educationLevel}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaBirthdayCake className="fas fa-birthday-cake mr-2"></FaBirthdayCake>
                          <span className="text-[#939393]">
                            ĐỘ TUỔI MONG MUỐN
                          </span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.minAge || "Không hiển thị"}-
                          {jobPostDetails?.maxAge || "Không hiển thị"}{" "}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaUsers className="fas fa-users mr-2"></FaUsers>
                          <span className="text-[#939393]">
                            SỐ LƯỢNG TUYỂN DỤNG
                          </span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.numberOfPositions ||
                            "Không hiển thị"}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center">
                          <FaUserTie className="fas fa-user-tie mr-2"></FaUserTie>
                          <span className="text-[#939393]">CẤP BẬC</span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.jobLevel || "Không hiển thị"}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaCogs className="fas fa-cogs mr-2"></FaCogs>
                          <span className="text-[#939393]">KỸ NĂNG</span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.keywords?.map((skill, index) => (
                            <span key={index} className="mr-1">
                              {skill}
                              {index < jobPostDetails?.keywords.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaLanguage className="fas fa-language mr-2"></FaLanguage>
                          <span className="text-[#939393]">
                            NGÔN NGỮ TRÌNH BÀY HỒ SƠ
                          </span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.language || "Không hiển thị"}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaFlag className="fas fa-flag mr-2"></FaFlag>
                          <span className="text-[#939393]">QUỐC TỊCH</span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.nationality === "1"
                            ? "Người Việt"
                            : jobPostDetails?.nationality === "2"
                            ? "Người nước ngoài"
                            : "Bất kỳ"}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaVenusMars className="fas fa-venus-mars mr-2"></FaVenusMars>
                          <span className="text-[#939393]">GIỚI TÍNH</span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.gender === "1"
                            ? "Nam"
                            : jobPostDetails?.gender === "2"
                            ? "Nữ"
                            : "Bất kỳ"}
                        </div>

                        <div className="mb-2 flex items-center">
                          <FaHeart className="fas fa-heart mr-2"></FaHeart>
                          <span className="text-[#939393]">
                            TÌNH TRẠNG HÔN NHÂN
                          </span>
                        </div>
                        <div className="mb-4 ml-6">
                          {jobPostDetails?.maritalStatus === "1"
                            ? "Chưa kết hôn"
                            : jobPostDetails?.maritalStatus === "2"
                            ? "Đã kết hôn"
                            : "Bất kỳ"}
                        </div>
                      </div>
                    </div>
                    <h2 className="mb-4 mt-6 text-xl font-bold">
                      Địa điểm làm việc
                    </h2>
                    <div className="flex items-center">
                      <FaLocationDot className="fas fa-map-marker-alt mr-2"></FaLocationDot>
                      <span>
                        {jobPostDetails?.companyAddress || "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                </div>
                {showButton && (
                  <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          alt="Company logo"
                          className="h-12 w-12 rounded-full"
                          height="50"
                          src={
                            jobPostDetails?.companyLogo ||
                            "https://images.vietnamworks.com/img/company-default-logo.svg"
                          }
                          width="50"
                        />
                        <div className="ml-4">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {jobPostDetails?.jobTitle}
                          </h2>
                          <div className="text-black-500 flex items-center text-sm">
                            {jobPostDetails?.canDeal === true ? (
                              <span className="text-red-500">Thương lượng</span>
                            ) : (
                              <span className="text-red-500">
                                {jobPostDetails?.minSalary}$ {" - "}
                                {jobPostDetails?.maxSalary}$
                              </span>
                            )}
                            <span className="mx-2">|</span>
                            <FaRegClock className="fas fa-clock text-gray-500" />
                            <span className="ml-1">
                              {new Date(
                                jobPostDetails?.expirationDate
                              ).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              {` (Hết hạn trong ${calculateDaysRemaining(
                                jobPostDetails?.expirationDate
                              )} ngày)`}
                            </span>
                            <span className="mx-2">|</span>
                            <FaMapMarkerAlt className="fas fa-map-marker-alt text-gray-500" />
                            <span className="ml-1">
                              {jobPostDetails?.location?.map(
                                (loc: string, locIndex) => {
                                  const locationName = loc
                                    ?.split(":")[1]
                                    .trim();

                                  const locationWithoutCountry = locationName
                                    ?.replace("Việt Nam", "")
                                    ?.trim();
                                  return (
                                    <span key={locIndex}>
                                      {locationWithoutCountry}
                                      {locIndex <
                                      jobPostDetails?.location.length - 1
                                        ? " "
                                        : ""}
                                    </span>
                                  );
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mr-[10%] flex items-center">
                        <button
                          onClick={handleGoToApplyButton}
                          className="rounded-md bg-orange-500 px-4 py-2 text-white"
                        >
                          Nộp đơn
                        </button>
                        <button className="ml-4 rounded-md border border-gray-300 p-2">
                          {isSaved ? (
                            <FaHeart
                              onClick={handleSaveClick}
                              color="#005aff"
                            />
                          ) : (
                            <FaRegHeart onClick={handleSaveClick} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-4 rounded-md bg-white p-6">
                  <p className="mb-4 text-xl font-bold">Việc làm liên quan</p>

                  <div className="mt-2 flex flex-col gap-4">
                    {relatedJobs?.map((job: any, index: any) => (
                      <Link
                        href={`/job/${job._id}`}
                        className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]"
                        key={index}
                      >
                        <div>
                          <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                            {job.jobTitle}
                          </h1>
                          {job?.canDeal === true ? (
                            <p className="my-1 text-sm text-amber-600">
                              Thương lượng
                            </p>
                          ) : (
                            <p className="my-1 text-sm text-amber-600">
                              {job.minSalary}$ {" - "} {job.maxSalary}$
                            </p>
                          )}
                          <p className="text-sm">Vị trí: {job.jobLevel}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col rounded-md bg-white px-8 py-4">
                  <div className="flex items-center justify-center">
                    <Image
                      src={jobPostDetails?.companyLogo}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="flex flex-col">
                    {loading ? (
                      <Skeleton
                        width="100%"
                        height={20}
                        className="mx-auto my-3"
                      />
                    ) : (
                      <Link href={`/company/${jobPostDetails?.recruiterId}`}>
                        <p className="my-3 cursor-pointer text-center font-medium hover:text-[#ff7d55]">
                          {jobPostDetails?.companyName}
                        </p>
                      </Link>
                    )}
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-[#f1f2f4] p-1">
                          <FaLocationDot color="grey" size={14} />
                        </div>
                        <span className="text-sm">
                          {loading ? (
                            <Skeleton width={200} />
                          ) : (
                            jobPostDetails?.companyAddress
                          )}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-[#f1f2f4] p-1">
                          <HiMiniUserGroup color="grey" size={14} />
                        </div>
                        <span className="text-sm">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            jobPostDetails?.companySize
                          )}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-[#f1f2f4] p-1">
                          <PhoneCall color="grey" size={14} />
                        </div>
                        <span className="text-sm">
                          {loading ? (
                            <Skeleton width={150} />
                          ) : (
                            jobPostDetails?.companyStaffName
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <ScrollToTopButton />
    </>
  );
};

export default JobDetail;
