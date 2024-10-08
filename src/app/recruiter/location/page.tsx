"use client";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import RecruiterSidebar from "@/components/UserSidebar/RecruiterSidebar";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { FaEdit } from "react-icons/fa";

export interface JwtPayload {
    userid: string;
    email: string;
    fullName: string;
    role: string;
}
const Location = () => {
    const cookies = useCookies();
    const accessToken = cookies.get("accessTokenRecruiter");
    const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
    const [formData, setFormData] = useState({
        locationCompanyId: []
    });
    const [Location, setLocation] = useState([{ _id: "", title: "", description: "" }]);
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
    const updateLocation = async (currentOffice: any) => {
        const id = currentOffice?._id;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/location-company/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: currentOffice.title,
                    description: currentOffice.description,
                }),
            }
        );

        return res.json();
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (isEditMode) {
            updateLocation(currentOffice)
                .then((response) => {
                    if (response.status === "OK") {
                        toast.success("Cập nhật thông tin thành công!");
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                        setIsModalOpen(false)
                    } else {
                        toast.error("Cập nhật thông tin thất bại");
                    }
                })
                .catch((error) => {
                    console.log("Error!", error);
                });
        } else {
            createLocation(currentOffice)
                .then((response) => {
                    if (response.status === "OK") {
                        toast.success("Thêm địa điểm làm việc thành công!");
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                        setIsModalOpen(false)
                    } else {
                        toast.error("Thêm địa điểm làm việc thất bại");
                    }
                })
                .catch((error) => {
                    console.log("Error!", error);
                });
        }
    };
    function areObjectsEqual(obj1: any, obj2: any) {
        try {
            if (Object.keys(obj1)?.length !== Object.keys(obj2)?.length) {
                return false;
            }
            for (const key in obj1) {
                if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
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
            console.log(error)
        }
    }
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetchRecruiterInfo();
                const data = res.data;
                data?.locationCompanyId.map(async (data: any) => {
                    const dataLocation = await getLocationCompany(data)
                    const LocationData = dataLocation.data[0]
                    if (LocationData !== null) {
                        Location.push(LocationData);
                        const uniqueArray = Location.filter((obj, index, self) => {
                            return self.findIndex((otherObj) => areObjectsEqual(obj, otherObj)) === index;
                        });
                        uniqueArray.splice(0, 1)
                        setLocation(uniqueArray)
                    }

                })
            };
            fetchData();
        } catch (error) {
            console.log(error)
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
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [currentOffice, setCurrentOffice] = useState({
        title: "",
        description: "",
    });

    const openModal = (office = null) => {
        // setCurrentOffice(office);
        setIsEditMode(!!office);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        // setCurrentOffice(null);
    };
    const handleEdit = (location: any) => {
        setCurrentOffice(location)
        openModal(location)
    }

    const handleDelete = async (id: any) => {
        const res = await deleteLocation(id);
        if (res.status === "OK") {
            toast.success("Xóa địa điểm làm việc thành công!");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            toast.error("Xóa địa điểm làm việc thất bại");
        }
    }
    const deleteLocation = async (id: any) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/location-company/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    }
    return (
        <>
            <HeaderRecruiter />
            <div className="bg-[#F7F8FA]">
                <div className="container py-6">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                            <RecruiterSidebar />
                        </div>
                        <div className="col-span-3 flex flex-col gap-5">
                            <div className="space-y-6 m-4 col-2">
                                <h3 className="mb-4 flex items-center text-2xl font-semibold">
                                    <span>Địa điểm làm việc</span>
                                </h3>
                                <button onClick={() => openModal()} className="text-blue-500 flex items-center mb-4">
                                    <FaPlus className="fas fa-plus mr-2"></FaPlus>
                                    Tạo địa điểm làm việc
                                </button>
                                {isModalOpen && (
                                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                                        <div className="bg-white p-6 rounded-lg shadow-lg relative">
                                            <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Chỉnh sửa địa điểm làm việc' : 'Tạo địa điểm làm việc'}</h2>
                                            <form className="w-96">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700">Tên Văn Phòng</label>
                                                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 mt-1" defaultValue={currentOffice ? currentOffice.title : ''}
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
                                                    <input type="text"
                                                        className="w-full border border-gray-300 rounded-lg p-2 mt-1" defaultValue={currentOffice ? currentOffice.description : ''}
                                                        onChange={(e) => {
                                                            setCurrentOffice({
                                                                ...currentOffice,
                                                                description: e.target.value,
                                                            });
                                                        }}
                                                    />

                                                </div>
                                                <div className="flex justify-end">
                                                    <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-2">Hủy</button>
                                                    <button onClick={handleSubmit} className="bg-orange-500 text-white px-4 py-2 rounded-lg">{isEditMode ? 'Lưu' : 'Tạo'}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                <table className="w-full mt-6">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="text-left p-2">Tên văn phòng</th>
                                            <th className="text-left p-2">Địa chỉ</th>
                                            <th className="text-left p-2">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Location.length > 0 ? (
                                            Location.map((location, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="p-2">{location.title}</td>
                                                    <td className="p-2">{location.description}</td>
                                                    <td className="p-2 flex">
                                                        <FaEdit className="fas fa-edit text-gray-500 mr-2 cursor-pointer" onClick={() => handleEdit(location)}></FaEdit>
                                                        <FaTrash onClick={() => handleDelete(location._id)} className="fas fa-trash text-gray-500 cursor-pointer"></FaTrash>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="text-center p-2">Không có dữ liệu</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Location;
