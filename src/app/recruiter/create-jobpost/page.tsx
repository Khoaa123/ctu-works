"use client";
import Image from "next/image";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaFolder,
  FaFolderOpen,
  FaHeart,
  FaTrashCan,
  FaUser,
  FaUsers,
  FaPlus,
} from "react-icons/fa6";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import {
  FaAddressCard,
  FaBuilding,
  FaMinus,
  FaTimes,
  FaTrash,
  FaUserFriends,
} from "react-icons/fa";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, setDefaultOptions } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { chatSession } from "../../ai/keyWordSuggest";
import { Switch } from "antd";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

const tabs = [
  { id: "profileViews", label: "Đã xem gần đây" },
  { id: "application", label: "Lời mời ứng tuyển" },
];

const CreateJobpost = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [date, setDate] = React.useState<Date>();
  const router = useRouter();
  interface JobInformation {
    jobLevel: string;
    jobIndustry: string;
    keywords: string[];
    jobField: string;
    language: string;
    minExperience: number;
    nationality: string;
    educationLevel: string;
    gender: string;
    minAge: number;
    maxAge: number;
    maritalStatus: string;
  }

  interface CompanyBenefit {
    title: string;
    content: string;
  }

  interface CompanyInfo {
    companyName: string;
    companyAddress: string;
    companySize: string;
    companyLogo: string;
    companyStaffName: string;
    companyBenefits: CompanyBenefit[];
    companyEmail: string;
    companyInfo: string;
  }

  interface FormData {
    jobTitle: string;
    expirationDate: string;
    location: object[];
    jobDescription: string;
    jobRequirements: string;
    jobType: string;
    minSalary: number;
    maxSalary: number;
    canDeal: boolean;
    numberOfPositions: number;
    jobInformation: JobInformation;
    companyInfo: CompanyInfo;
  }

  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    expirationDate: "",
    location: [],
    jobDescription: "",
    jobRequirements: "",
    jobType: "",
    minSalary: 0,
    maxSalary: 0,
    canDeal: false,
    numberOfPositions: 0,
    jobInformation: {
      jobLevel: "",
      jobIndustry: "",
      keywords: [],
      jobField: "",
      language: "Bất kỳ",
      minExperience: 1,
      nationality: "",
      educationLevel: "Bất kỳ",
      gender: "",
      minAge: 20,
      maxAge: 30,
      maritalStatus: "",
    },
    companyInfo: {
      companyName: "",
      companyAddress: "",
      companySize: "",
      companyLogo: "",
      companyStaffName: "",
      companyBenefits: [
        {
          title: "",
          content: "",
        },
      ],
      companyEmail: "",
      companyInfo: "",
    },
  });

  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([""]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleAddTag = (tag: string) => {
    if (tags.length < 5) {
      setTags([...tags, tag]);
      formData.jobInformation.keywords.push(tag);
      setInputValue("");
    }
  };
  const handleRemoveTag = (tagToRemove: any) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    formData.jobInformation.keywords = formData.jobInformation.keywords.filter(
      (tag) => tag !== tagToRemove
    );
  };

  const benefitoptions = [
    { id: 0, name: "Vui lòng chọn", placeholder: "Nhập chi tiết phúc lợi" },
    { id: 1, name: "Thưởng", placeholder: "Ví dụ: Lương tháng 13" },
    {
      id: 2,
      name: "Chăm sóc sức khỏe",
      placeholder:
        "Ví dụ: Chương trình chăm sóc sức khỏe cao cấp dành cho bạn và gia đình",
    },
    {
      id: 3,
      name: "Nghỉ phép có lương",
      placeholder: "Ví dụ: 20 ngày nghỉ phép có lương trong năm",
    },
    { id: 4, name: "Đào tạo", placeholder: "Ví dụ: Cơ hội đào tạo nước ngoài" },
    {
      id: 5,
      name: "Giải thưởng",
      placeholder: "Ví dụ: Giải thưởng hằng tháng dành cho nhân viên xuất sắc",
    },
    {
      id: 6,
      name: "Thư viện",
      placeholder:
        "Ví dụ: Thư viện online với 20.000 đầu sách và không giới hạn truy cập",
    },
    {
      id: 7,
      name: "Máy tính xách tay",
      placeholder: "Ví dụ: Macbook mới cho mỗi nhân viên",
    },
    {
      id: 8,
      name: "Điện thoại",
      placeholder: "Ví dụ: Iphone cho mỗi nhân viên, với phụ cấp phi 20$/tháng",
    },
    {
      id: 9,
      name: "Cơ hội du lịch",
      placeholder:
        "Ví dụ: 2-3 chuyến du lịch trong năm để làm việc tại trụ sở chính",
    },
    {
      id: 10,
      name: "Hoạt động nhóm",
      placeholder:
        "Ví dụ: Chương trình 'Innovation Time Off' xuyên suốt cả năm",
    },
    {
      id: 11,
      name: "Xe đưa đón",
      placeholder: "Ví dụ: Công ty có xe đưa đón dành cho các tất cả nhân viên",
    },
    {
      id: 12,
      name: "Căn-tin",
      placeholder: "Ví dụ: Bữa trưa và thức ăn nhẹ không giới hạn",
    },
    {
      id: 13,
      name: "Phiếu giảm giá",
      placeholder: "Ví dụ: Phiếu giảm giá 100$ dùng được tại hơn 100 cửa hàng",
    },
    {
      id: 14,
      name: "Nhà trẻ",
      placeholder:
        "Ví dụ: Phụ cấp phí nhà trẻ 200$ mỗi tháng cho mỗi bé dưới 5 tuổi",
    },
    {
      id: 15,
      name: "Khác",
      placeholder: "Ví dụ: Cấp Misfix cho mỗi nhân viên",
    },
  ];
  const [benefits, setBenefits] = useState([{ id: 0, name: "Thưởng" }]);
  const [benefitId, setBenefitId] = useState(1);
  const handleAddBenefit = () => {
    if (benefits.length < 3) {
      setBenefits((prevBenefits) => [
        ...prevBenefits,
        {
          id: benefitId,
          name: "",
        },
      ]);
      setBenefitId((prevId) => prevId + 1);
    }
  };

  const handleRemoveBenefit = (idToRemove: any) => {
    setBenefits((prevBenefits) =>
      prevBenefits.filter((benefit) => benefit.id !== idToRemove)
    );
    setFormData((prevFormData) => {
      const { companyInfo } = prevFormData;
      const { companyBenefits } = companyInfo;
      delete companyBenefits[idToRemove];
      return {
        ...prevFormData,
        companyInfo: { ...companyInfo, companyBenefits },
      };
    });
  };
  const usedBenefits = Object.values(formData.companyInfo.companyBenefits).map(
    (benefit) => benefit.title
  );

  const [locations, setLocations] = useState([{ id: 0, title: "" }]);
  const [locationId, setLocationId] = useState(1);

  const handleAddLocationCompany = () => {
    if (locations.length < 3) {
      setLocations((prevLocations) => [
        ...prevLocations,
        {
          id: locationId,
          title: "",
        },
      ]);
      setLocationId((prevId) => prevId + 1);
    }
  };
  const handleRemoveLocationCompany = (idToRemove: any) => {
    const use = locations
      .find((location) => location.id === idToRemove)
      ?.title.split(":")[0];
    const LocationRemove = Location.find((location) => location.title === use);
    if (LocationRemove) {
      LocationRemove.used = false;
    }
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== idToRemove)
    );

    setFormData((prevFormData) => {
      const { location } = prevFormData;
      delete location[idToRemove];
      return {
        ...prevFormData,
        location: [location],
      };
    });
  };
  const fetchApplyJob = async (formData: any) => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recruiterId: id,
          formData,
        }),
      }
    );

    return res.json();
  };
  const [activeItem, setActiveItem] = useState("item-1");
  const [expanded, setExpanded] = useState({});
  const handleContinueClick = (item: string) => {
    if (activeItem === item) {
      setActiveItem("");
    } else {
      setActiveItem(item);
    }
  };
  const handleAccordionChange = (value: string) => {
    setActiveItem(value);
    setExpanded((prevExpanded) => ({ ...prevExpanded, [value]: true }));
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const nullFields = [
      ...Object.entries(formData)
        .filter(([key, value]) => value === "")
        .map(([key]) => key),
      ...Object.entries(formData.companyInfo)
        .filter(([key, value]) => value === "")
        .map(([key]) => key),
      ...Object.entries(formData.jobInformation)
        .filter(([key, value]) => value === "")
        .map(([key]) => key),
    ];
    if (nullFields.length > 0) {
      const labels = nullFields.map((key) => {
        if (key !== "companyLogo") {
          let label = null;
          switch (key) {
            case "jobTitle":
              return "Chức danh";
            case "expirationDate":
              return "Ngày hết hạn";
            case "location":
              return "Địa điểm làm việc";
            case "jobDescription":
              return "Mô tả công việc";
            case "jobRequirements":
              return "Yêu cầu công việc";
            case "jobType":
              return "Loại công việc";
            case "minSalary":
              return "Mức lương tối thiểu";
            case "maxSalary":
              return "Mức lương tối đa";
            case "numberOfPositions":
              return "Số lượng vị trí";
            case "jobLevel":
              return "Cấp độ công việc";
            case "jobIndustry":
              return "Lĩnh vực công việc";
            case "keywords":
              return "Từ khóa";
            case "jobField":
              return "Ngành nghề chi tiết";
            case "language":
              return "Ngôn ngữ";
            case "minExperience":
              return "Kinh nghiệm tối thiểu";
            case "nationality":
              return "Quốc tịch";
            case "educationLevel":
              return "Bằng cấp tối thiểu";
            case "gender":
              return "Giới tính";
            case "minAge":
              return "Tuổi tối thiểu";
            case "maxAge":
              return "Tuổi tối đa";
            case "maritalStatus":
              return "Tình trạng hôn nhân";
            case "companyName":
              return "Tên công ty";
            case "companyAddress":
              return "Địa chỉ công ty";
            case "companySize":
              return "Quy mô công ty";
            case "companyStaffName":
              return "Tên nhân viên công ty";
            case "companyBenefits":
              return "Lợi ích công ty";
            case "companyEmail":
              return "Email công ty";
            case "companyInfo":
              return "Thông tin công ty";
            default:
              return key;
          }
        }
      });
      if (labels.length > 1) {
        toast.error(`Vui lòng không bỏ trống: ${labels.join(", ")}`);
      }
    }

    fetchApplyJob(formData)
      .then((response) => {
        if (response.status === "OK") {
          toast.success("Tạo bài đăng thành công!");
          router.push("/recruiter");
        } else {
          toast.error("Vui lòng không bỏ trống: Từ khóa hoặc phúc lợi.");
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["image"],
    ],
  };
  const [numberOfPositions, setNumberOfPositions] = useState(
    formData.numberOfPositions
  );
  const handleDecrement = () => {
    if (numberOfPositions > 0) {
      setNumberOfPositions(numberOfPositions - 1);
      setFormData({ ...formData, numberOfPositions: numberOfPositions - 1 });
    }
  };

  const handleIncrement = () => {
    setNumberOfPositions(numberOfPositions + 1);
    setFormData({ ...formData, numberOfPositions: numberOfPositions + 1 });
  };

  const [minExperience, setMinExperience] = useState(
    Math.max(Math.min(formData.jobInformation.minExperience, 100), 1)
  );

  const handleDecrementExperience = () => {
    if (minExperience > 1) {
      setMinExperience(minExperience - 1);
      setFormData({
        ...formData,
        jobInformation: {
          ...formData.jobInformation,
          minExperience: minExperience - 1,
        },
      });
    }
  };

  const handleIncrementExperience = () => {
    setMinExperience(minExperience + 1);
    setFormData({
      ...formData,
      jobInformation: {
        ...formData.jobInformation,
        minExperience: minExperience + 1,
      },
    });
  };

  const handleDateSelect = (e: any) => {
    setDate(e);
    setFormData((prevFormData) => ({ ...prevFormData, expirationDate: e }));
  };
  const [Location, setLocation] = useState([
    { _id: "", title: "", description: "", used: false },
  ]);
  function areObjectsEqual(obj1: any, obj2: any) {
    try {
      if (Object.keys(obj1)?.length !== Object.keys(obj2)?.length) {
        return false;
      }
      for (const key in obj1) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          if (!areObjectsEqual(obj1[key], obj2[key])) {
            return false;
          }
        } else {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetchRecruiterInfo();
        const data = res.data;
        data?.locationCompanyId.map(async (data: any) => {
          const dataLocation = await getLocationCompany(data);
          const LocationData = dataLocation.data[0];
          if (LocationData !== null) {
            Location.push(LocationData);

            const uniqueArray = Location.filter((obj, index, self) => {
              return (
                self.findIndex((otherObj) => areObjectsEqual(obj, otherObj)) ===
                index
              );
            });
            uniqueArray.splice(0, 1);
            setLocation(uniqueArray);
          }
        });
        setFormData((prevFormData) => ({
          ...prevFormData,
          companyInfo: {
            ...prevFormData.companyInfo,
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            companySize: data.companyScale,
            // companyLogo: data.companyLogo,
            companyStaffName: data.companyStaffName,
            // companyBenefits: data.companyBenefits,
            companyEmail: data.email,
            companyInfo: data.companyInfo,
          },
        }));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getLocationCompany = async (id: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/location-company/get-location-company/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  const fetchRecruiterInfo = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/get-details-recruiter/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [currentOffice, setCurrentOffice] = useState({
    title: "",
    description: "",
  });

  const createLocation = async (currentOffice: any) => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/location-company/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recruiterId: id,
          title: currentOffice.title,
          description: currentOffice.description,
        }),
      }
    );

    return res.json();
  };
  const handleAddLocation = () => {
    if (currentOffice.title !== "" && currentOffice.description !== "") {
      createLocation(currentOffice)
        .then((response) => {
          if (response.status === "OK") {
            toast.success("Thêm địa điểm làm việc thành công!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            setIsModalOpen(false);
          } else {
            toast.error("Thêm địa điểm làm việc thất bại");
          }
        })
        .catch((error) => {
          console.log("Error!", error);
        });
    }
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
    {
      value: "Data Engineer/Data Analyst/AI",
      label: "Data Engineer/Data Analyst/AI",
    },
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
    { value: "UX/UI Design", label: "UX/UI Design" },
    { value: "Viễn Thông", label: "Viễn Thông" },
    {
      value: "Phát Triển Sản Phẩm May Mặc",
      label: "Phát Triển Sản Phẩm May Mặc",
    },
    { value: "Quản Lý Đơn Hàng", label: "Quản Lý Đơn Hàng" },
    { value: "Đầu Bếp", label: "Đầu Bếp" },
    { value: "Quản Lý F&B", label: "Quản Lý F&B" },
    {
      value: "Bảo Mật Công Nghệ Thông Tin",
      label: "Bảo Mật Công Nghệ Thông Tin",
    },
    {
      value: "Data Engineer/Data Analyst/AI",
      label: "Data Engineer/Data Analyst/AI",
    },
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
    { value: "UX/UI Design", label: "UX/UI Design" },
    {
      value: "Phát Triển Sản Phẩm May Mặc",
      label: "Phát Triển Sản Phẩm May Mặc",
    },
    { value: "Quản Lý Đơn Hàng", label: "Quản Lý Đơn Hàng" },
    { value: "Đầu Bếp", label: "Đầu Bếp" },
    { value: "Quản Lý F&B", label: "Quản Lý F&B" },
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
    { value: "Thu Mua", label: "Thu Mua" },
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
      jobInformation: {
        ...formData.jobInformation,
        jobField: selectedOption.value,
      },
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
      jobInformation: {
        ...formData.jobInformation,
        jobIndustry: selectedOption.value,
      },
    });
  };

  let debounceTimeout: NodeJS.Timeout;

  const handleInputChangeKeyWord = async (e: any) => {
    setInputValue(e.target.value);
  };

  const sendMess = async () => {
    if (inputValue?.length > 1) {
      const message = `Gợi ý cho tôi 20 từ khóa về kỹ năng nghề nghiệp có chứa từ ${inputValue
        } thuộc lĩnh vực hoặc liên quan đến ${formData?.jobInformation?.jobField ||
        formData?.jobInformation?.jobIndustry ||
        ""
        } bằng tiếng việt`;
      try {
        const result = await chatSession.sendMessage(message);
        const data = result?.response?.text();
        let arr = JSON.parse(data);
        setSuggestions((prev) => [...prev, ...arr.keywords]);
      } catch (error) { }
    }
  }
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("images", file);

    try {
      const res = await fetch("http://localhost:3001/api/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error("Image upload failed on server");
      }

      return data.imageUrls[0];
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const [isLoadingUploadImg, setIsLoadingUploadImg] = useState(false);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsLoadingUploadImg(true)
        const imageUrl = await uploadImage(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          companyInfo: {
            ...formData.companyInfo,
            companyLogo: imageUrl,
          },
        }));
        setIsLoadingUploadImg(false)
        toast.success("Ảnh đã được tải lên thành công!");
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        setIsLoadingUploadImg(false)
        toast.error("Tải ảnh lên thất bại, vui lòng thử lại.");
      }
    }
  };
  return (
    <>
      <HeaderRecruiter />
      <div className="flex flex-col items-center py-10">
        <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex justify-center">
            <div className="flex flex-col items-center">
              <h1 className="mt-2 text-4xl text-blue-500">
                Thông tin công việc
              </h1>
            </div>
          </div>
          <Accordion
            type="single"
            value={activeItem}
            onChange={() => handleAccordionChange}
            collapsible
          >
            <AccordionItem value="item-1" className="text-gray-500">
              <AccordionTrigger onClick={() => handleContinueClick("item-1")}>
                <h3 className="mb-2 mb-4 flex items-center text-lg font-semibold">
                  <FaBriefcase className="mr-1" />
                  <span>Mô tả công việc</span>
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div className="rounded-lg border border-gray-300 p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label id="jobTitle" className="block text-gray-700">
                            Chức danh<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.jobTitle}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                jobTitle: e.target.value,
                              });
                            }}
                            placeholder="Eg. Senior UX Designer"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          />
                        </div>
                        <div>
                          <label id="jobType" className="block text-gray-700">
                            Loại việc làm
                          </label>
                          <select
                            value={formData.jobType}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                jobType: e.target.value,
                              });
                            }}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          >
                            <option>Vui lòng chọn</option>
                            <option>Toàn thời gian</option>
                            <option>Bán thời gian</option>
                            <option>Thực tập</option>
                            <option>Việc làm online</option>
                            <option>Nghề tự do</option>
                            <option>Hợp đồng thời vụ</option>
                            <option>Khác</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label id="jobLevel" className="block text-gray-700">
                            Cấp bậc<span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.jobInformation.jobLevel}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                jobInformation: {
                                  ...formData.jobInformation,
                                  jobLevel: e.target.value,
                                },
                              });
                            }}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          >
                            <option>Vui lòng chọn</option>
                            <option>Thực tập sinh/Sinh viên</option>
                            <option>Mới tốt nghiệp</option>
                            <option>Nhân viên</option>
                            <option>Trưởng phòng</option>
                            <option>Giám đốc và Cấp cao hơn</option>
                          </select>
                        </div>
                        <div>
                          <label
                            id="jobField"
                            className="mb-1 block text-gray-700"
                          >
                            Ngành nghề chi tiết (Chọn 1 ngành nghề)
                            <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={
                              formData.jobInformation.jobField
                                ? {
                                  value: formData.jobInformation.jobField,
                                  label: formData.jobInformation.jobField,
                                }
                                : null
                            }
                            onChange={handleChange}
                            options={optionsFeild}
                            filterOption={filterOption}
                            placeholder="Tìm kiếm lĩnh vực nghề nghiệp..."
                          ></Select>
                        </div>
                      </div>
                      <div>
                        <label id="jobIndustry" className="block text-gray-700">
                          Lĩnh vực công việc
                        </label>
                        <Select
                          value={
                            formData.jobInformation.jobIndustry
                              ? {
                                value: formData.jobInformation.jobIndustry,
                                label: formData.jobInformation.jobIndustry,
                              }
                              : null
                          }
                          onChange={handleChangeIndustry}
                          options={optionsIndustry}
                          filterOption={filterOption}
                          placeholder="Vui lòng chọn..."
                        ></Select>
                      </div>
                      <div>
                        <label id="location" className="block text-gray-700">
                          Địa điểm làm việc (Tối đa 3 địa điểm)
                          <span className="text-red-500">*</span>
                        </label>
                        {locations.map((loc) => (
                          <div
                            key={loc.id}
                            className="mt-1 flex items-center space-x-2"
                          >
                            <select
                              value={loc.title}
                              onChange={(e) => {
                                if (
                                  e.target.value === "+ Tạo địa điểm làm việc"
                                ) {
                                  openModal();
                                } else {
                                  const use = e.target.value.split(":");
                                  console.log(loc);
                                  if (loc.title.split(":")[0] !== use[0]) {
                                    const locationToUpdate = Location.find(
                                      (location) =>
                                        loc.title.split(":")[0] ===
                                        location.title
                                    );
                                    if (locationToUpdate) {
                                      locationToUpdate.used = false;
                                    }
                                  }
                                  const locationToUpdate = Location.find(
                                    (location) => use[0] === location.title
                                  );
                                  if (locationToUpdate) {
                                    locationToUpdate.used = true;
                                  }
                                  loc.title = e.target.value;
                                  setFormData({
                                    ...formData,
                                    location: locations,
                                  });
                                }
                              }}
                              className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                            >
                              <option>Chọn một địa điểm làm việc</option>
                              {Location?.map((Loca) => (
                                <option
                                  key={Loca._id}
                                  disabled={Loca.used}
                                  className="bg-green-100 disabled:bg-gray-100"
                                >
                                  {Loca.title}: {Loca.description}
                                </option>
                              ))}
                              <option
                                className="cursor-pointer text-blue-500"
                                key={""}
                              >
                                + Tạo địa điểm làm việc
                              </option>
                            </select>
                            {locations.length > 1 && (
                              <button
                                onClick={() =>
                                  handleRemoveLocationCompany(loc.id)
                                }
                              >
                                <FaTrash className="h-12 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <div>
                          {locations.length < 3 && (
                            <button
                              className="mt-2 text-blue-500"
                              onClick={handleAddLocationCompany}
                            >
                              + Thêm địa điểm làm việc
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          id="jobDescription"
                          className="block text-gray-700"
                        >
                          Mô tả<span className="text-red-500">*</span>
                        </label>
                        <div className="overflow-hidden rounded-md border border-gray-300">
                          <ReactQuill
                            modules={modules}
                            theme="snow"
                            value={formData.jobDescription}
                            onChange={(value) => {
                              setFormData({
                                ...formData,
                                jobDescription: value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <button className="text-blue-500">
                          Xem mô tả công việc mẫu
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4">
                    <div className="space-y-4">
                      <div>
                        <label
                          id="jobRequirements"
                          className="block text-gray-700"
                        >
                          Yêu cầu công việc
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="overflow-hidden rounded-md border border-gray-300">
                          <ReactQuill
                            modules={modules}
                            theme="snow"
                            value={formData.jobRequirements}
                            onChange={(value) => {
                              setFormData({
                                ...formData,
                                jobRequirements: value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <button className="text-blue-500">
                          Xem yêu cầu công việc mẫu
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-300 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label id="minSalary" className="block text-gray-700">
                          Mức lương (USD)<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex items-center space-x-2">
                          <input
                            value={formData.minSalary}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                minSalary: Number(e.target.value),
                              });
                            }}
                            type="text"
                            placeholder="Tối thiểu"
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          />
                          <input
                            value={formData.maxSalary}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                maxSalary: Number(e.target.value),
                              });
                            }}
                            type="text"
                            placeholder="Tối đa"
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <label
                          id="numberOfPositions"
                          className="block text-gray-700"
                        >
                          Lương có thể thương lượng
                        </label>
                        <Switch
                          className="mt-2"
                          value={formData.canDeal}
                          onChange={() => {
                            setFormData({
                              ...formData,
                              canDeal: !formData.canDeal,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <label
                          id="numberOfPositions"
                          className="block text-gray-700"
                        >
                          Số lượng tuyển dụng
                        </label>
                        <div className="mt-1 flex items-center space-x-2">
                          <button
                            className="text-gray-500"
                            onClick={handleDecrement}
                          >
                            <FaMinus className="fas fa-minus" />
                          </button>
                          <input
                            value={numberOfPositions}
                            onChange={(e) =>
                              setNumberOfPositions(Number(e.target.value))
                            }
                            type="text"
                            className="w-12 rounded-lg border border-gray-300 p-2 text-center"
                          />
                          <button
                            className="text-gray-500"
                            onClick={handleIncrement}
                          >
                            <FaPlus className="fas fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <label
                        id="expirationDate"
                        className="mb-2 mt-5 block text-gray-700"
                      >
                        Ngày ngưng nhập ứng tuyển
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
                            onSelect={handleDateSelect}
                            fromYear={1960}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="rounded bg-red-500 px-4 py-2 text-white"
                      onClick={() => handleContinueClick("item-2")}
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="text-gray-500">
              <AccordionTrigger onClick={() => handleContinueClick("item-2")}>
                <h3 className="mb-2 mb-4 flex items-center text-lg font-semibold">
                  <FaAddressCard className="mr-1" />
                  <span>Kỳ vọng về ứng viên</span>
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div className="rounded-lg border border-gray-300 p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="mb-4">
                          <label
                            id="keyWord"
                            className="mb-2 block text-sm font-bold text-gray-700"
                          >
                            Thẻ từ khóa{" "}
                            <span className="text-gray-500">
                              (Tối đa 5 thẻ)
                            </span>{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center rounded border border-gray-300 p-2">
                            {tags.map((tag, index) => (
                              <div
                                key={index}
                                className="mb-2 mr-2 flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700"
                              >
                                {tag}
                                <button
                                  onClick={() => handleRemoveTag(tag)}
                                  className="ml-2 text-blue-700"
                                >
                                  <FaTimes className="fas fa-times" />
                                </button>
                              </div>
                            ))}
                            <input
                              type="text"
                              value={inputValue}
                              onChange={handleInputChangeKeyWord}
                              className="flex-grow p-2 outline-none"
                              placeholder={
                                tags.length > 0
                                  ? ""
                                  : "Ví dụ: Anh văn, Giao tiếp..."
                              }
                            />
                            <button
                              className="text-blue-500"
                              onClick={sendMess}>
                              Gợi ý với AI
                            </button>
                          </div>
                          {inputValue && (
                            <div className="mt-2 max-h-40 overflow-y-auto rounded border border-gray-300">
                              {suggestions
                                .filter(
                                  (suggestion) => !tags.includes(suggestion)
                                )
                                .filter((suggestion) =>
                                  suggestion
                                    .toLowerCase()
                                    .includes(inputValue.toLowerCase())
                                )
                                .map((suggestion, index) => (
                                  <div
                                    key={index}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                    onClick={() => handleAddTag(suggestion)}
                                  >
                                    {suggestion}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="mb-4">
                          <label className="mb-2 block text-sm font-bold text-gray-700">
                            Năm kinh nghiệm tối thiểu
                          </label>
                          <div className="flex items-center space-x-2">
                            <button
                              className="rounded bg-gray-200 px-3 py-1 text-gray-700"
                              onClick={handleDecrementExperience}
                            >
                              <FaMinus className="fas fa-minus" />
                            </button>
                            <input
                              value={minExperience}
                              onChange={(e) => {
                                const newExperience = Math.max(
                                  Math.min(Number(e.target.value), 100),
                                  1
                                );
                                setMinExperience(newExperience);
                                setFormData({
                                  ...formData,
                                  jobInformation: {
                                    ...formData.jobInformation,
                                    minExperience: newExperience,
                                  },
                                });
                              }}
                              type="text"
                              className="w-12 rounded border border-gray-300 px-2 py-1 text-center outline-none focus:border-sky-400"
                            />
                            <button
                              className="rounded bg-gray-200 px-3 py-1 text-gray-700"
                              onClick={handleIncrementExperience}
                            >
                              <FaPlus className="fas fa-plus" />
                            </button>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="mb-2 block text-sm font-bold text-gray-700">
                            Bằng cấp tối thiểu
                          </label>
                          <select
                            value={formData.jobInformation.educationLevel}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                jobInformation: {
                                  ...formData.jobInformation,
                                  educationLevel: e.target.value,
                                },
                              });
                            }}
                            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-sky-400"
                          >
                            <option>Bất kỳ</option>
                            <option>Trung học</option>
                            <option>Trung cấp</option>
                            <option>Cao đẳng</option>
                            <option>Cử nhân</option>
                            <option>Thạc sĩ</option>
                            <option>Tiến sĩ</option>
                            <option>Khác</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center space-x-4">
                            <label className="mb-2 block w-[20%] text-sm font-bold text-gray-700">
                              Quốc tịch
                            </label>
                            <label className="flex w-[15%] items-center">
                              <input
                                value={"any"}
                                checked={
                                  formData.jobInformation.nationality === "any"
                                }
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      nationality: target.value,
                                    },
                                  });
                                }}
                                id="default-radio-1"
                                type="radio"
                                name="nationality"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Bất kỳ</span>
                            </label>
                            <label className="flex w-[20%] items-center">
                              <input
                                value={"1"}
                                checked={
                                  formData.jobInformation.nationality === "1"
                                }
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      nationality: target.value,
                                    },
                                  });
                                }}
                                id="default-radio-2"
                                type="radio"
                                name="nationality"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Người Việt Nam</span>
                            </label>
                            <label className="flex w-[20%] items-center">
                              <input
                                value={"2"}
                                checked={
                                  formData.jobInformation.nationality === "2"
                                }
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      nationality: target.value,
                                    },
                                  });
                                }}
                                id="default-radio-3"
                                type="radio"
                                name="nationality"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Người nước ngoài</span>
                            </label>
                            {/*<label className="flex w-[25%] items-center">
                               <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                                checked
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label> */}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center space-x-4">
                            <label className="mb-2 block w-[20%] text-sm font-bold text-gray-700">
                              Giới tính
                            </label>
                            <label className="flex w-[15%] items-center">
                              <input
                                value={"any"}
                                checked={
                                  formData.jobInformation.gender === "any"
                                }
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      gender: target.value,
                                    },
                                  });
                                }}
                                id="gender-radio-1"
                                type="radio"
                                name="gender"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Bất kỳ</span>
                            </label>
                            <label className="flex w-[20%] items-center">
                              <input
                                value={"1"}
                                checked={formData.jobInformation.gender === "1"}
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      gender: target.value,
                                    },
                                  });
                                }}
                                id="gender-radio-2"
                                type="radio"
                                name="gender"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Nam</span>
                            </label>
                            <label className="flex w-[20%] items-center">
                              <input
                                value={"2"}
                                checked={formData.jobInformation.gender === "2"}
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      gender: target.value,
                                    },
                                  });
                                }}
                                id="gender-radio-3"
                                type="radio"
                                name="gender"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Nữ</span>
                            </label>
                            {/* <label className="flex w-[25%] items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label> */}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center space-x-4">
                            <label className="mb-2 block w-[20%] text-sm font-bold text-gray-700">
                              Tình trạng hôn nhân
                            </label>
                            <label className="flex w-[15%] items-center">
                              <input
                                value={"any"}
                                checked={
                                  formData.jobInformation.maritalStatus ===
                                  "any"
                                }
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      maritalStatus: target.value,
                                    },
                                  });
                                }}
                                type="radio"
                                name="marital_status"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Bất kỳ</span>
                            </label>
                            <label className="flex w-[20%] items-center">
                              <input
                                value={"1"}
                                checked={
                                  formData.jobInformation.maritalStatus === "1"
                                }
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      maritalStatus: target.value,
                                    },
                                  });
                                }}
                                type="radio"
                                name="marital_status"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Độc thân</span>
                            </label>
                            <label className="flex w-[20%] items-center">
                              <input
                                value={"2"}
                                checked={
                                  formData.jobInformation.maritalStatus === "2"
                                }
                                onClick={(e) => {
                                  const target = e.target as HTMLInputElement;
                                  setFormData({
                                    ...formData,
                                    jobInformation: {
                                      ...formData.jobInformation,
                                      maritalStatus: target.value,
                                    },
                                  });
                                }}
                                type="radio"
                                name="marital_status"
                                className="form-radio text-blue-500"
                              />
                              <span className="ml-2">Đã kết hôn</span>
                            </label>
                            {/* <label className="flex w-[25%] items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label> */}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center space-x-2">
                            <label className="mb-2 block w-[20%] text-sm font-bold text-gray-700">
                              Độ tuổi mong muốn
                            </label>
                            <input
                              value={
                                formData.jobInformation.minAge < 1
                                  ? 1
                                  : formData.jobInformation.minAge
                              }
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  jobInformation: {
                                    ...formData.jobInformation,
                                    minAge: Number(e.target.value),
                                  },
                                });
                              }}
                              type="text"
                              className="w-12 w-[30%] rounded border border-gray-300 px-2 py-1 text-center outline-none focus:border-sky-400"
                            />
                            <input
                              value={
                                formData.jobInformation.maxAge > 100
                                  ? 100
                                  : formData.jobInformation.maxAge
                              }
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  jobInformation: {
                                    ...formData.jobInformation,
                                    maxAge: Number(e.target.value),
                                  },
                                });
                              }}
                              type="text"
                              className="w-12 w-[30%] rounded border border-gray-300 px-2 py-1 text-center outline-none focus:border-sky-400"
                            />
                            {/* <label className="ml-5 flex w-[25%] items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label> */}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <label className="mb-2 block text-sm font-bold text-gray-700">
                            Nhận hồ sơ bằng ngôn ngữ
                          </label>
                          <select
                            value={formData.jobInformation.language}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                jobInformation: {
                                  ...formData.jobInformation,
                                  language: e.target.value,
                                },
                              });
                            }}
                            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-sky-400"
                          >
                            <option>Bất kỳ</option>
                            <option>Tiếng Anh</option>
                            <option>Tiếng Việt</option>
                            <option>Tiếng Nhật</option>
                            <option>Tiếng Trung Quốc</option>
                            <option>Tiếng Hàn</option>
                            <option>Tiếng Pháp</option>
                            <option>Tiếng Tây Ban Nha</option>
                            <option>Tiếng Ý</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="rounded bg-red-500 px-4 py-2 text-white"
                            onClick={() => handleContinueClick("item-3")}
                          >
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="text-gray-500">
              <AccordionTrigger onClick={() => handleContinueClick("item-3")}>
                <h3 className="mb-4 flex items-center text-lg font-semibold">
                  <FaBuilding className="mr-1" />
                  <span>Thông tin công ty</span>
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div className="mb-6">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="companyName"
                    >
                      Tên công ty <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={formData.companyInfo.companyName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          companyInfo: {
                            ...formData.companyInfo,
                            companyName: e.target.value,
                          },
                        });
                      }}
                      id="companyName"
                      type="text"
                      placeholder="VNC Company"
                      className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-gray-700">
                        Người liên hệ<span className="text-red-500">*</span>
                      </label>
                      <input
                        value={formData.companyInfo.companyStaffName}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            companyInfo: {
                              ...formData.companyInfo,
                              companyStaffName: e.target.value,
                            },
                          });
                        }}
                        type="text"
                        placeholder="Mr.Chuong"
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Địa chỉ email
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={formData.companyInfo.companyEmail}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            companyInfo: {
                              ...formData.companyInfo,
                              companyEmail: e.target.value,
                            },
                          });
                        }}
                        type="email"
                        placeholder="Ví dụ: ctuwork@gmail.com"
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="companyAddress"
                    >
                      Địa chỉ công ty
                    </label>
                    <input
                      value={formData.companyInfo.companyAddress}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          companyInfo: {
                            ...formData.companyInfo,
                            companyAddress: e.target.value,
                          },
                        });
                      }}
                      id="companyAddress"
                      type="text"
                      placeholder="Ví dụ: 130 Suong Nguyet Anh, Ben Thanh Ward, District 1"
                      className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="companySize"
                    >
                      Quy mô công ty
                    </label>
                    <select
                      value={formData.companyInfo.companySize}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          companyInfo: {
                            ...formData.companyInfo,
                            companySize: e.target.value,
                          },
                        });
                      }}
                      id="companySize"
                      className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                    >
                      <option>Vui lòng chọn</option>
                      <option>Ít hơn 10</option>
                      <option>10 - 24</option>
                      <option>25 - 99</option>
                      <option>100 - 499</option>
                      <option>500 - 999</option>
                      <option>1000 - 4999</option>
                      <option>5000 - 9999</option>
                      <option>10000 - 19999</option>
                      <option>20000 - 49999</option>
                      <option>Hơn 50000</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Phúc lợi từ công ty{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    {benefits.map((benefit) => (
                      <div key={benefit.id} className="mb-2 flex space-x-4">
                        <select
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              companyInfo: {
                                ...formData.companyInfo,
                                companyBenefits: {
                                  ...formData.companyInfo.companyBenefits,
                                  [benefit.id]: {
                                    ...formData.companyInfo.companyBenefits[
                                    benefit.id
                                    ],
                                    title: e.target.value,
                                    content:
                                      formData.companyInfo.companyBenefits[
                                        benefit.id
                                      ]?.content,
                                  },
                                },
                              },
                            });
                          }}
                          id="companyBenefits"
                          className="h-1/2 w-1/2 appearance-none rounded border border-black px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                        >
                          {benefitoptions.map((item) => (
                            <option
                              key={item.name}
                              value={item.name}
                              disabled={
                                usedBenefits.includes(item.name) &&
                                item.name !==
                                formData.companyInfo.companyBenefits[
                                  benefit.id
                                ]?.title
                              }
                            >
                              {item.name}{" "}
                              {usedBenefits.includes(item.name) ? "\u2713" : ""}
                            </option>
                          ))}
                        </select>
                        <textarea
                          value={
                            formData.companyInfo.companyBenefits[benefit.id]
                              ?.content
                          }
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              companyInfo: {
                                ...formData.companyInfo,
                                companyBenefits: {
                                  ...formData.companyInfo.companyBenefits,
                                  [benefit.id]: {
                                    title:
                                      formData.companyInfo.companyBenefits[
                                        benefit.id
                                      ]?.title,
                                    content: e.target.value,
                                  },
                                },
                              },
                            });
                          }}
                          className="w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-sky-400"
                          placeholder={
                            benefitoptions.find(
                              (option) =>
                                option.name ===
                                formData.companyInfo.companyBenefits[benefit.id]
                                  ?.title
                            )?.placeholder || "Nhập chi tiết phúc lợi"
                          }
                        ></textarea>
                        {benefits.length > 1 && (
                          <button
                            onClick={() => handleRemoveBenefit(benefit.id)}
                          >
                            <FaTrash className="h-12 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    {benefits.length < 3 && (
                      <button
                        className="mt-2 text-blue-500"
                        onClick={handleAddBenefit}
                      >
                        + Thêm phúc lợi
                      </button>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="companyLogo"
                    >
                      Logo công ty
                    </label>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                      <input
                        onChange={(e) => handleFileChange(e)}
                        id="companyLogo"
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif"
                        max-size="5242880"

                      />
                      <p className="text-xs text-gray-500">
                        (Tập tin với phần mở rộng .jpg, .jpeg, .png, .gif và
                        kích thước &lt;5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="fixed bottom-0 flex h-20 w-full justify-center bg-gray-100">
          <button
            onClick={handleSubmit}
            className="mt-4 h-12 rounded bg-orange-500 px-4 py-2 text-white"
            disabled={isLoadingUploadImg}
          >
            Tạo
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="relative rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">
                Tạo địa điểm làm việc
              </h2>
              <form className="w-96">
                <div className="mb-4">
                  <label className="block text-gray-700">Tên Văn Phòng</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                    defaultValue={currentOffice ? currentOffice.title : ""}
                    onChange={(e) => {
                      setCurrentOffice({
                        ...currentOffice,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Địa Chỉ</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                    defaultValue={
                      currentOffice ? currentOffice.description : ""
                    }
                    onChange={(e) => {
                      setCurrentOffice({
                        ...currentOffice,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="rounded-lg bg-orange-500 px-4 py-2 text-white"
                  >
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateJobpost;
