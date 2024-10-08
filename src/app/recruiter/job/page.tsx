"use client";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import RecruiterSidebar from "@/components/UserSidebar/RecruiterSidebar";

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
    const [formData, setFormData] = useState({
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

    });

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
            const res = await fetchRecruiterInfo();
            const data = res.data;
            setFormData(data);
        };
        fetchData();
    }, []);
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
    return (
        <>
            <div className="bg-[#F7F8FA]">
                <HeaderRecruiter />
                <div className="container py-6">
            
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex space-x-4">
                                <span className="text-gray-500">Đang Hiển Thị (0)</span>
                                <span className="text-gray-500">Đang Ẩn (0)</span>
                                <span className="text-gray-500">Sắp Hết Hạn Trong 7 Ngày (0)</span>
                                <span className="text-gray-500">Đã Hết Hạn</span>
                                <span className="text-gray-500">Nháp (0)</span>
                                <span className="text-blue-500 border-b-2 border-blue-500">Việc Làm Ảo (2)</span>
                            </div>
                            <div className="flex space-x-2">
                                <button className="border border-gray-300 px-4 py-2 rounded">Xuất ra Excel</button>
                                <button className="border border-gray-300 px-4 py-2 rounded"><i className="fas fa-sliders-h"></i></button>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="border border-gray-300 p-2 rounded">
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                        <div className="border-t border-gray-300">
                            <div className="grid grid-cols-3 py-2">
                                <div className="font-semibold">Chức danh</div>
                                <div className="font-semibold">Hồ sơ ứng tuyển</div>
                                <div className="font-semibold">Hành động</div>
                            </div>
                            <div className="border-t border-gray-300 py-4">
                                <div className="grid grid-cols-3">
                                    <div>
                                        <div className="text-blue-500 font-semibold">Fresh Developer</div>
                                        <div className="text-gray-500">1826428</div>
                                        <div className="text-gray-500">Hà Nội</div>
                                        <div className="text-gray-500">Đăng bởi chuongvo281@gmail.com</div>
                                        <div className="flex space-x-2 mt-2">
                                            <i className="fas fa-pencil-alt"></i>
                                            <i className="fas fa-copy"></i>
                                            <i className="fas fa-eye"></i>
                                            <i className="fas fa-trash"></i>
                                            <i className="fas fa-users"></i>
                                        </div>
                                    </div>
                                    <div className="text-blue-500">0/0</div>
                                    <div>
                                        <button className="border border-red-500 text-red-500 px-4 py-2 rounded">Chuyển đổi công việc này</button>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-300 py-4">
                                <div className="grid grid-cols-3">
                                    <div>
                                        <div className="text-blue-500 font-semibold">Fresh Developer</div>
                                        <div className="text-gray-500">1821987</div>
                                        <div className="text-gray-500">Hà Nội</div>
                                        <div className="text-gray-500">Đăng bởi chuongvo281@gmail.com</div>
                                        <div className="flex space-x-2 mt-2">
                                            <i className="fas fa-pencil-alt"></i>
                                            <i className="fas fa-copy"></i>
                                            <i className="fas fa-eye"></i>
                                            <i className="fas fa-trash"></i>
                                            <i className="fas fa-users"></i>
                                        </div>
                                    </div>
                                    <div className="text-blue-500">0/0</div>
                                    <div>
                                        <button className="border border-red-500 text-red-500 px-4 py-2 rounded">Chuyển đổi công việc này</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </>
    );
};

export default jobPage;
