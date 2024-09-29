"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaFolder,
  FaFolderOpen,
  FaHeart,
  FaTrashCan,
  FaUser,
  FaUsers,
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
  FaPlus,
  FaTimes,
  FaTrash,
  FaUserFriends,
} from "react-icons/fa";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

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
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    jobRequirements: "",
    jobType: "",
    minSalary: 0,
    maxSalary: 0,
    jobInformation: {
      jobLevel: "",
      jobIndustry: "",
      keywords: ["Anh văn"],
      jobField: "",
      language: "",
      minExperience: 0,
      nationality: "",
      educationLevel: "",
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
          benefitId: "",
          benefitDescription: "",
        },
      ],
      companyEmail: "",
      companyInfo: "",
    },
  });

  const [tags, setTags] = useState(["Anh văn"]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    "ASDM",
    "Ideas Development",
    "Gas Detection",
    "SAS Data Analysis",
    "Midas Design+",
    "C#",
    "Java",
  ]);

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
    (benefit) => benefit.benefitId
  );
  const fetchApplyJob = async (formData: any) => {
    // const id = decodedToken?.userid;
    const id = "66e88fd0f696118a75d38ae0";
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
    console.log(item);
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
    fetchApplyJob(formData);
    // console.log(formData);
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

  return (
    <>
      <HeaderRecruiter />
      <div className="flex flex-col items-center py-10">
        <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                1
              </div>
              <span className="mt-2 text-blue-500">Thông tin công việc</span>
            </div>
            <div className="mb-5 flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-500">
                2
              </div>
              <span className="mt-2 text-gray-500">
                Thiết lập quy trình và đội ngũ
              </span>
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
                          <label className="block text-gray-700">
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
                          <label className="block text-gray-700">
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
                          <label className="block text-gray-700">
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
                          <label className="block text-gray-700">
                            Ngành nghề chi tiết (Chọn 1 ngành nghề)
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.jobInformation.jobIndustry}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                jobInformation: {
                                  ...formData.jobInformation,
                                  jobIndustry: e.target.value,
                                },
                              });
                            }}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          >
                            <option>Vui lòng chọn</option>
                            <option>CNTT</option>
                            <option>Kế toán</option>
                            <option>Khác</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700">
                          Lĩnh vực công việc
                        </label>
                        <select
                          value={formData.jobInformation.jobField}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              jobInformation: {
                                ...formData.jobInformation,
                                jobField: e.target.value,
                              },
                            });
                          }}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                        >
                          <option>Phần Mềm CNTT/Dịch vụ Phần mềm</option>
                          <option>CNTT</option>
                          <option>Kế toán</option>
                          <option>Khác</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700">
                          Địa điểm làm việc (Tối đa 3 địa điểm)
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex items-center space-x-2">
                          <select
                            value={formData.jobLocation}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                jobLocation: e.target.value,
                              });
                            }}
                            className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          >
                            <option>Chọn một địa điểm làm việc</option>
                            <option>Cần Thơ</option>
                            <option>Hồ Chí Minh</option>
                          </select>
                          <button className="text-gray-500">
                            <FaTrash className="fas fa-trash-alt h-6 w-6"></FaTrash>
                          </button>
                        </div>
                      </div>
                      <div>
                        <button className="text-blue-500">
                          + Thêm địa điểm làm việc
                        </button>
                      </div>
                      <div>
                        <label className="block text-gray-700">
                          Mô tả<span className="text-red-500">*</span>
                        </label>
                        {/* <textarea
                          value={formData.jobDescription}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              jobDescription: e.target.value,
                            });
                          }}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          rows={4}
                          placeholder="Nhập mô tả công việc"
                        ></textarea> */}
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
                        <label className="block text-gray-700">
                          Yêu cầu công việc
                          <span className="text-red-500">*</span>
                        </label>
                        {/* <textarea
                          value={formData.jobRequirements}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              jobRequirements: e.target.value,
                            });
                          }}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400 focus-visible:ring-0"
                          rows={4}
                          placeholder="Nhập yêu cầu công việc"
                        ></textarea> */}
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
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-gray-700">
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
                      {/* <div>
                                                <label className="block text-gray-700">Số lượng tuyển dụng</label>
                                                <div className="mt-1 flex items-center space-x-2">
                                                    <button className="text-gray-500"><FaMinus className="fas fa-minus" /></button>
                                                    <input
                                                        value={formData.jobDescription.maximumSalary}
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                jobDescription: { ...formData.jobDescription, maximumSalary: Number(e.target.value) }
                                                            });
                                                        }}
                                                        type="text" value="1" className="w-12 rounded-lg border border-gray-300 p-2 text-center" readOnly />
                                                    <button className="text-gray-500"><FaPlus className="fas fa-plus" /></button>
                                                </div>
                                            </div> */}
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
                          <label className="mb-2 block text-sm font-bold text-gray-700">
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
                              onChange={handleInputChange}
                              className="flex-grow p-2 outline-none"
                              placeholder={
                                tags.length > 0
                                  ? ""
                                  : "Ví dụ: Anh văn, Giao tiếp..."
                              }
                            />
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
                            <button className="rounded bg-gray-200 px-3 py-1 text-gray-700">
                              -
                            </button>
                            <input
                              value={
                                (formData.jobInformation.minExperience > 100
                                  ? 100
                                  : formData.jobInformation.minExperience) ||
                                (formData.jobInformation.minExperience < 1
                                  ? 1
                                  : formData.jobInformation.minExperience)
                              }
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  jobInformation: {
                                    ...formData.jobInformation,
                                    minExperience: Number(e.target.value),
                                  },
                                });
                              }}
                              type="text"
                              className="w-12 rounded border border-gray-300 px-2 py-1 text-center outline-none focus:border-sky-400"
                            />
                            <button className="rounded bg-gray-200 px-3 py-1 text-gray-700">
                              +
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
                            <label className="flex w-[25%] items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label>
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
                            <label className="flex w-[25%] items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label>
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
                            <label className="flex w-[25%] items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label>
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
                            <label className="ml-5 flex w-[25%] items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                              />
                              <span className="ml-2">
                                Hiển thị cho Ứng Viên
                              </span>
                            </label>
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
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Địa chỉ email nhận hồ sơ
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
                        placeholder="chuongvo900@gmail.com"
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400"
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
                  {/* <div className="mb-6">
                                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="companyInfo">
                                            Thông tin công ty *
                                        </label>
                                        <textarea
                                            value={formData.companyInfo.companyInfo}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    companyInfo: { ...formData.companyInfo, companyInfo: e.target.value }
                                                });
                                            }}
                                            id="companyInfo"
                                            placeholder="Thông tin"
                                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                            rows={4}
                                        ></textarea>
                                        <div className="text-right text-xs text-gray-500">(999/10000 ký tự)</div>
                                    </div> */}
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
                                    benefitId: e.target.value,
                                    benefitDescription:
                                      formData.companyInfo.companyBenefits[
                                        benefit.id
                                      ]?.benefitDescription,
                                  },
                                },
                              },
                            });
                          }}
                          id="companyBenefits"
                          className="h-1/2 w-1/2 appearance-none rounded border border-black px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                        >
                          {/* {benefitoptions.map((item) => ( */}
                          {benefitoptions.map((item) => (
                            <option
                              key={item.name}
                              value={item.name}
                              disabled={
                                usedBenefits.includes(item.name) &&
                                item.name !==
                                  formData.companyInfo.companyBenefits[
                                    benefit.id
                                  ]?.benefitId
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
                              ?.benefitDescription
                          }
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              companyInfo: {
                                ...formData.companyInfo,
                                companyBenefits: {
                                  ...formData.companyInfo.companyBenefits,
                                  [benefit.id]: {
                                    benefitId:
                                      formData.companyInfo.companyBenefits[
                                        benefit.id
                                      ]?.benefitId,
                                    benefitDescription: e.target.value,
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
                                  ?.benefitId
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
                        value={formData.companyInfo.companyLogo}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            companyInfo: {
                              ...formData.companyInfo,
                              companyLogo: e.target.value,
                            },
                          });
                        }}
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
                  {/* <div className="mb-6">
                                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="companyImages">
                                            Hình ảnh công ty
                                        </label>
                                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                                            <input
                                                value={formData.companyInfo.companyImages}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        companyInfo: { ...formData.companyInfo, companyImages: e.target.value }
                                                    });
                                                }}
                                                id="companyLogo"
                                                type="file"
                                                accept=".jpg, .jpeg, .png, .gif"
                                                max-size="5242880"
                                            />

                                            <p className="text-xs text-gray-500">(Tập tin với phần mở rộng .jpg, .jpeg, .png, .gif và kích thước &lt;5MB)</p>
                                        </div>
                                    </div> */}
                  {/* <div className="mb-6">
                                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="companyVideo">
                                            Video công ty
                                        </label>
                                        <input
                                            value={formData.companyInfo.companyVideo}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    companyInfo: { ...formData.companyInfo, companyVideo: e.target.value }
                                                });
                                            }}
                                            id="companyVideo"
                                            type="text"
                                            placeholder="Sao chép và dán từ liên kết Youtube của bạn vào đây"
                                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                        />
                                    </div> */}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="fixed bottom-0 flex h-20 w-full justify-center bg-gray-100">
          <button
            onClick={handleSubmit}
            className="mt-4 h-12 rounded bg-orange-500 px-4 py-2 text-white"
          >
            Lưu và Tiếp Tục
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateJobpost;
