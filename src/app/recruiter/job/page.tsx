"use client";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FaEye, FaSliders, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import RecruiterSidebar from "@/components/UserSidebar/RecruiterSidebar";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
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
      companyBenefits: [
        {
          benefitId: "",
          benefitDescription: "",
        },
      ],
    },
  ]);

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
  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateCompanyInfo(formData)
      .then((response) => {
        if (response.status === "OK") {
          toast.success("Cập nhật thông tin thành công!");
        } else {
          toast.error("Cập nhật thông tin thất bại");
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
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

  return (
    <>
      <div className="bg-[#F7F8FA]">
        <HeaderRecruiter />
        <div className="container py-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <span className="text-gray-500">Đang Hiển Thị (0)</span>
              {/* <span className="text-gray-500">Đang Ẩn (0)</span> */}
              <span className="text-gray-500">
                Sắp Hết Hạn Trong 7 Ngày (0)
              </span>
              <span className="text-gray-500">Đã Hết Hạn</span>
              {/* <span className="text-gray-500">Nháp (0)</span> */}
              {/* <span className="border-b-2 border-blue-500 text-blue-500">Việc Làm Ảo (2)</span> */}
            </div>
            <div className="flex space-x-2">
              <button className="rounded border border-gray-300 px-4 py-2">
                Xuất ra Excel
              </button>
              <button className="rounded border border-gray-300 px-4 py-2">
                <FaSliders className="fas fa-sliders-h" />
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <div className="rounded border border-gray-300 p-2">
              <i className="fas fa-search"></i>
            </div>
          </div>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-4 py-2">
              <div className="font-semibold">Công việc</div>
              <div className="font-semibold">Ngày hết hạn</div>
              <div className="font-semibold">Trạng thái duyệt</div>
              <div className="font-semibold">Hành động</div>
            </div>
            {formData?.map((job: any) => (
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
                      <Link href={`/job/${job?._id}`}>
                        <FaEye className="fas fa-eye cursor-pointer" />
                      </Link>
                      <i className="fas fa-users" />
                      <FaTrash
                        onClick={() => handleDeleteJob(job?._id)}
                        className="fas fa-trash cursor-pointer"
                      />
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
                    {job?.statusApproval ? "Đã duyệt" : "Chờ duyệt"}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default jobPage;
