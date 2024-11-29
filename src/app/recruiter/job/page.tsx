"use client";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FaDownload, FaEye, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import Link from "next/link";
import html2pdf from "html2pdf.js"
import { AiOutlineDollarCircle } from "react-icons/ai";
import { HiMiniUserGroup } from "react-icons/hi2";
export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
import {
  FaLocationDot,
  FaClock,
  FaBriefcase,
  FaLaptop,
  FaLaptopCode,
  FaUserClock,
  FaGraduationCap,
  FaUsers,
  FaUserTie,
  FaLanguage,
  FaFlag,
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
} from "react-icons/fa6";
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaCogs,
  FaEllipsisH,
  FaHeart,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const jobPage = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [formData, setFormData] = useState([
    {
      companyAddress: "",
      companyDescription: "",
      companyFacebook: "",
      companyId: "",
      jobTitle: "",
      companyLogo: "",
      companyName: "",
      companyWebsite: "",
      createdAt: "",
      email: "",
      follower: [],
      following: 0,
      fullName: "",
      phoneNumber: "",
      role: "",
      updatedAt: "",
      _id: "",
      staffName: "",
      companyScale: "",
      statusApproval: false,
      statusSeeking: false,
      companyBenefits: [
        {
          benefitId: "",
          benefitDescription: "",
        },
      ],
    },
  ]);
  const calculateDaysRemaining = (expirationDate: any) => {
    const expirationDateObj = new Date(expirationDate);
    const today = new Date();
    const diffInMs = expirationDateObj.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };
  const updateCompanyInfo = async (formData: any) => {
    const id = decodedToken?.userid;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/update-recruiter/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      }
    );

    return res.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchGetJob();
      const data = res.data;
      console.log(data);
      setFormData(data);
    };
    fetchData();
  }, []);
  const fetchGetJob = async () => {
    const id = decodedToken?.userid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/get-my-jobpost/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  const handleDelete = async (jobId: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/delete/${jobId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  const handleDeleteJob = (jobId: any) => {
    handleDelete(jobId)
      .then((response) => {
        if (response.status === "OK") {
          toast.success("Xóa việc làm thành công!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Xóa việc làm thất bại");
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  };
  const cancelJobpost = async (jobId: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/cancel-jobpost/${jobId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };
  const handleCancel = (jobId: any) => {
    cancelJobpost(jobId)
      .then((response) => {
        if (response.status === "OK") {
          toast.success("Cập nhật thành công!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Cập nhật thất bại");
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  };

  async function handelToPdf(id: string) {
    try {
      await setShowJobDetails({ ...showJobDetails, [id]: true });
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with ID "${id}" not found`);
        return;
      }
      const opt = {
        margin: 1,
        filename: `${id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      setShowJobDetails({ ...showJobDetails, [id]: false });
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }
  const [showJobDetails, setShowJobDetails] = React.useState<{ [key: string]: boolean }>({});

  const handleShowDetails = (jobId: string) => {
    setShowJobDetails({ ...showJobDetails, [jobId]: !showJobDetails[jobId] });
  };
  const [filteredApplies, setFilteredApplies] = useState([{}]);

  useEffect(() => {
    setFilteredApplies(formData);
  }, [formData]);

  const setFillter = (statusSeeking: any, statusApproval: any) => {
    if (statusSeeking === "all" || statusApproval === "all") {
      setFilteredApplies(formData)
    } else {
      const filtered = formData.filter(
        (apply) => apply.statusSeeking === statusSeeking && apply.statusApproval === statusApproval
      );
      setFilteredApplies(filtered);
    }
  }
  const countStatus = (statusSeeking: any, statusApproval: any) => {
    if (statusSeeking === "all" || statusApproval === "all") {
      return formData.length;
    } else {
      return formData.filter((apply) => apply.statusSeeking === statusSeeking && apply.statusApproval === statusApproval).length;
    }
  };

  const handleSearch = (e: any) => {
    const filtered = formData.filter((apply) => apply.jobTitle.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredApplies(filtered)
  }
  return (
    <>
      <div className="bg-[#F7F8FA]">
        <HeaderRecruiter />
        <div className="container py-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="text-gray-500" onClick={() => setFillter("all", "all")}>Tất cả công việc ({countStatus("all", "all")})</button>
              <button className="text-gray-500" onClick={() => setFillter(true, false)}>Đang chờ duyệt ({countStatus(true, false)})</button>
              <button className="text-gray-500" onClick={() => setFillter(true, true)}>Đang hiển Thị ({countStatus(true, true)})</button>
              <button className="text-gray-500" onClick={() => setFillter(false, false)}>Đã hủy ({countStatus(false, false)})</button>
              <button className="text-gray-500" onClick={() => setFillter(false, true)}>Đã Hết Hạn ({countStatus(false, true)})</button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaSearch className="fas fa-search" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên việc làm"
              onChange={(e) => handleSearch(e)}
              className="rounded border px-2 py-1"
            />
          </div>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-4 py-2">
              <div className="font-semibold">Công việc</div>
              <div className="font-semibold">Ngày hết hạn</div>
              <div className="font-semibold">Trạng thái duyệt</div>
              <div className="font-semibold">Hành động</div>
            </div>
            {filteredApplies?.map((job: any) => (
              <div className="border-t border-gray-300 py-4">
                <div className="grid grid-cols-4">
                  <div>
                    <div className="font-semibold text-blue-500">
                      {job?.jobTitle}
                    </div>
                    {/* <div className="text-gray-500">{job?._id}</div> */}
                    <div className="text-gray-500">{job?.jobLocation}</div>
                    <div className="text-gray-500">
                      Đăng vào{" "}
                      {new Date(job?.datePosted).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Link href={`/recruiter/edit-job/${job?._id}`}>
                        <FaPencilAlt className="fas fa-pencil-alt cursor-pointer" />
                      </Link>
                      <i className="fas fa-copy" />
                      <FaEye onClick={() => handleShowDetails(job._id?.toString())}
                        className="fas fa-eye cursor-pointer" />
                      <i className="fas fa-users" />
                      <FaTrash
                        onClick={() => handleDeleteJob(job?._id)}
                        className="fas fa-trash cursor-pointer"
                      />
                      <FaDownload onClick={() => handelToPdf(job?._id?.toString())}
                        className="cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <div className="">
                      {new Date(job?.expirationDate).toLocaleDateString(
                        "vi-VN",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                  <div className="text-blue-500">
                    {/* {job?.statusApproval && job?.statusSeeking ? "Đã duyệt" : "Chờ duyệt"} */}
                    {job.statusApproval === true && job.statusSeeking === true
                      ? "Đã duyệt"
                      : job.statusApproval === false && job.statusSeeking === false
                        ? "Đã hủy"
                        : job.statusApproval === true && job.statusSeeking === false
                          ? "Đã hết hạn"
                          : "Đang chờ duyệt"}
                  </div>

                  <div>
                    {job?.statusSeeking ? (
                      <button
                        className="cursor-pointer rounded border border-red-500 px-4 py-2 text-red-500"
                        onClick={() => handleCancel(job?._id)}
                      >
                        Ngưng nhận hồ sơ
                      </button>
                    ) : (
                      <button
                        disabled
                        className="cursor-pointer rounded border border-gray-500 px-4 py-2 text-gray-500"
                        onClick={() => handleCancel(job?._id)}
                      >
                        Ngưng nhận hồ sơ
                      </button>
                    )}
                  </div>
                </div>
                {showJobDetails[job._id?.toString()] &&
                  <div id={job?._id} className="col-span-3">
                    <div className="rounded-md bg-white p-6">
                      <div className="rounded-md bg-[#F8F9FA] p-3">
                        <p className="mb-1 line-clamp-1 text-xl font-bold">
                          {job?.jobTitle}
                        </p>
                        <div className="mt-6 flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-[#f1f2f4] p-2">
                              <FaClock color="grey" size={14} />
                            </div>
                            <span className="text-sm text-[#ff7d55]">
                              {new Date(
                                job?.expirationDate
                              ).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              {` (Hết hạn trong ${calculateDaysRemaining(
                                job?.expirationDate
                              )} ngày)`}
                            </span>
                          </div>
                          <div className="flex gap-6">
                            <div className="flex items-center gap-2 md:min-w-36">
                              <div className="rounded-full bg-[#f1f2f4] p-2">
                                <AiOutlineDollarCircle color="grey" size={14} />
                              </div>
                              {job?.canDeal === true ? (
                                <span className="text-sm text-orange-500">
                                  Thương lượng
                                </span>
                              ) : (
                                <span className="text-sm">
                                  {job?.minSalary}$ {" - "}
                                  {job?.maxSalary}$
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 md:min-w-36">
                              <div className="rounded-full bg-[#f1f2f4] p-2">
                                <HiMiniUserGroup color="grey" size={14} />
                              </div>
                              <span className="text-sm">
                                {job?.postViews} lượt xem
                              </span>
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                              <div className="rounded-full bg-[#f1f2f4] p-2">
                                <FaLocationDot color="grey" size={14} />
                              </div>
                              <span className="line-clamp-1 text-sm">
                                {job?.location?.map(
                                  (loc: string, locIndex: any) => {
                                    const locationName = loc.split(":")[1]?.trim();

                                    const locationWithoutCountry = locationName
                                      ?.replace(", Việt Nam", "")
                                      ?.trim();
                                    return (
                                      <span key={locIndex}>
                                        {locationWithoutCountry}
                                        {locIndex <
                                          job?.location.length - 1
                                          ? ", "
                                          : ""}
                                      </span>
                                    );
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        <p className="text-lg font-bold">Mô tả công việc</p>
                        <div
                          className="mt-3"
                          dangerouslySetInnerHTML={{
                            __html: job?.jobDescription ?? "",
                          }}
                        ></div>
                        <p className="text-lg font-bold">Yêu cầu công việc</p>
                        <div
                          className="mt-3"
                          dangerouslySetInnerHTML={{
                            __html: job?.jobRequirements ?? "",
                          }}
                        ></div>
                      </div>

                      <div className="mt-8">
                        <h1 className="mb-4 text-xl font-semibold">
                          Các phúc lợi dành cho bạn
                        </h1>
                        <div className="space-y-4">
                          {job?.companyBenefits?.map((item: any) => (
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
                                <span className="font-semibold">{item.title}</span>
                              </div>
                              <p>{item.content}</p>
                            </div>
                          ))}
                        </div>
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
                                job?.datePosted
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
                              {job?.jobField}
                            </div>

                            <div className="mb-2 flex items-center">
                              <FaUserClock className="fas fa-user-clock mr-2"></FaUserClock>
                              <span className="text-[#939393]">
                                SỐ NĂM KINH NGHIỆM TỐI THIỂU
                              </span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.minExperience}
                            </div>

                            <div className="mb-2 flex items-center">
                              <FaGraduationCap className="fas fa-graduation-cap mr-2"></FaGraduationCap>
                              <span className="text-[#939393]">
                                TRÌNH ĐỘ HỌC VẤN TỐI THIỂU
                              </span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.educationLevel}
                            </div>

                            <div className="mb-2 flex items-center">
                              <FaBirthdayCake className="fas fa-birthday-cake mr-2"></FaBirthdayCake>
                              <span className="text-[#939393]">
                                ĐỘ TUỔI MONG MUỐN
                              </span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.minAge || "Không hiển thị"}-
                              {job?.maxAge || "Không hiển thị"}{" "}
                            </div>

                            <div className="mb-2 flex items-center">
                              <FaUsers className="fas fa-users mr-2"></FaUsers>
                              <span className="text-[#939393]">
                                SỐ LƯỢNG TUYỂN DỤNG
                              </span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.numberOfPositions ||
                                "Không hiển thị"}
                            </div>
                          </div>
                          <div>
                            <div className="mb-2 flex items-center">
                              <FaUserTie className="fas fa-user-tie mr-2"></FaUserTie>
                              <span className="text-[#939393]">CẤP BẬC</span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.jobLevel || "Không hiển thị"}
                            </div>

                            <div className="mb-2 flex items-center">
                              <FaCogs className="fas fa-cogs mr-2"></FaCogs>
                              <span className="text-[#939393]">KỸ NĂNG</span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.keywords?.map((skill: any, index: any) => (
                                <span key={index} className="mr-1">
                                  {skill}
                                  {index < job?.keywords.length - 1
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
                              {job?.language || "Không hiển thị"}
                            </div>

                            <div className="mb-2 flex items-center">
                              <FaFlag className="fas fa-flag mr-2"></FaFlag>
                              <span className="text-[#939393]">QUỐC TỊCH</span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.nationality === "1"
                                ? "Người Việt"
                                : job?.nationality === "2"
                                  ? "Người nước ngoài"
                                  : "Bất kỳ"}
                            </div>

                            <div className="mb-2 flex items-center">
                              <FaVenusMars className="fas fa-venus-mars mr-2"></FaVenusMars>
                              <span className="text-[#939393]">GIỚI TÍNH</span>
                            </div>
                            <div className="mb-4 ml-6">
                              {job?.gender === "1"
                                ? "Nam"
                                : job?.gender === "2"
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
                              {job?.maritalStatus === "1"
                                ? "Chưa kết hôn"
                                : job?.maritalStatus === "2"
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
                            {job?.companyAddress || "Chưa cập nhật"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default jobPage;
