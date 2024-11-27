"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { toast } from "react-toastify";
export interface JwtPayload {
    userid: string;
    email: string;
    fullName: string;
    role: string;
}

export interface MyInvite {
    _id: string;
    status: string;
    userId: string;
    jobPostId: string;
    recrutierId: string;
    dayEnd: string;
    sendDate: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    jobTitle: string;
    userAvatar: string;
}

const MyInviteCandidate = () => {
    const cookies = useCookies();
    const accessToken = cookies.get("accessTokenRecruiter");
    const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
    const [myInvite, setMyInvite] = useState<MyInvite>([{}]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const invitations = await fetchMyInvitation();
                if (invitations?.data) {
                    const invitationPromises = invitations.data.map(async (item: any) => {
                        const user = await fetchDetailsUser(item.userId);
                        const job = await fetchDetailJob(item.jobPostId);
                        return {
                            ...item,
                            userName: user.data.fullName,
                            userEmail: user.data.email,
                            userPhone: user.data.phoneNumber,
                            userAvatar: user.data.avatar,
                            jobTitle: job.data.jobTitle,
                        };
                    });

                    const updatedInvitations = await Promise.all(invitationPromises);
                    setMyInvite(updatedInvitations);
                    setFilteredApplies(updatedInvitations)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const fetchDetailJob = async (id: any) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/get-details-jobpost/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    };

    const fetchDetailsUser = async (id: any) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get-details/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    };

    const fetchMyInvitation = async () => {
        const id = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/send-invite/get-all-invite/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    };

    const [filteredApplies, setFilteredApplies] = useState<MyInvite>([{}]);
    const handleSearch = (e: any) => {
        const filtered = myInvite.filter((apply) => apply.userName.toLowerCase().includes(e.target.value.toLowerCase()) || apply.userEmail.toLowerCase().includes(e.target.value.toLowerCase()) || apply.userPhone.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))
        setFilteredApplies(filtered)
    }
    const setFillter = (status: any) => {
        if (status === "all") {
            setFilteredApplies(myInvite)
            setFilter(status)
        } else {
            const filtered = myInvite.filter(
                (item) => item.status === status
            );
            setFilteredApplies(filtered);
            setFilter(status)
        }
    }
    const [filter, setFilter] = useState('all'); // Initialize filter to 'all'

    const buttonStyles = (status) => {
      return filter === status 
             ? "px-4 py-2 bg-blue-100 text-blue-700 rounded-t-lg border-b-2 border-blue-500"
             : "px-4 py-2 text-gray-600";
    };
    return (
        <div>
            <HeaderRecruiter />
            <div className="p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-2">Lời mời ứng tuyển</h1>
                    <p className="text-gray-600 mb-4">Quản lý tất cả hồ sơ ứng viên đã được gửi lời mời ứng tuyển.</p>
                    <div className="border-b border-gray-200 mb-4">
                        <div className="flex space-x-4">
                            <button onClick={() => setFillter("all")} className={buttonStyles("all")}>Tất cả trạng thái</button>
                            <button onClick={() => setFillter("Chờ phản hồi")} className={buttonStyles("Chờ phản hồi")}>Chờ phản hồi</button>
                            <button onClick={() => setFillter("Đã chấp nhận")} className={buttonStyles("Đã chấp nhận")}>Đã chấp nhận</button>
                            <button onClick={() => setFillter("Đã từ chối")} className={buttonStyles("Đã từ chối")}>Đã từ chối</button>
                            <button onClick={() => setFillter("Đã hết hạn")} className={buttonStyles("Đã hết hạn")}>Đã hết hạn</button>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <input type="text"
                            placeholder="Tìm kiếm theo tên ứng viên hoặc chức danh"
                            className="flex-grow px-4 py-2 border rounded-lg"
                            onChange={(e) => handleSearch(e)}
                        />
                        <i className="fas fa-search text-gray-500 ml-2"></i>
                    </div>
                    <div className="overflow-x-auto relative">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Ứng viên <i className="fas fa-sort-down"></i></th>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Công việc <i className="fas fa-filter"></i></th>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Ngày gửi lời mời <i className="fas fa-sort-down"></i></th>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myInvite && myInvite.length > 0 ? (
                                    filteredApplies.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center space-x-4">
                                                    <img src={item.userAvatar || "https://cdn-icons-png.flaticon.com/128/149/149071.png"} alt="Candidate avatar" className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <h3 className="text-lg font-medium">{item.userName}</h3>
                                                        <p className="text-gray-600">{item.userEmail}</p>
                                                        <p className="text-gray-600">{item.userPhone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">{item.jobTitle}</td>
                                            <td className="px-4 py-2">
                                                {new Date(item.sendDate).toLocaleDateString("vi-VN", {
                                                    year: "numeric",
                                                    month: "numeric",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-4 py-2">{item.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8"> {/* Correct colSpan */}
                                            <div className="flex flex-col items-center">
                                                <img src="https://employer.vietnamworks.com/v2/candidate/manage-by-folders-and-tags/static/media/empty-state.cb5e9abb7fb062c980d12e05452221ef.svg" alt="No records found illustration" className="mb-4 w-32" /> {/* Added width */}
                                                <p className="text-gray-600">Không tìm thấy hồ sơ trong thư mục này</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyInviteCandidate;
