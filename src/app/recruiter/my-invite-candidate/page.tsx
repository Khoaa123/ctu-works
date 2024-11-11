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

const tabs = [
    { id: "profileViews", label: "Đã xem gần đây" },
    { id: "application", label: "Lời mời ứng tuyển" },
];

const MyInviteCandidate = () => {
    const cookies = useCookies();
    const accessToken = cookies.get("accessTokenRecruiter");
    const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
    const [following, setFollowing] = useState([
        {
            companyName: "",
            companyLogo: "",
            companyIndustries: "",
            companyJob: 0,
            companyFollowing: 0,
            jobPostId: '',
            recruiterId: '',
            _id: "",
        },
    ]);

    const [applyJob, setApplyJob] = useState([[
        {
            status: '',
            _id: '',
        },
    ]]);
    const [myJobpost, setMyJobpost] = useState([
        {
            companyLogo: "",
            companyName: "",
            salary: "",
            jobTitle: "",
            location: [],
            jobPostId: '',
            jobPostTitle: '',
            jobInformation: {
                datePosted: ''
            },
            status: '',
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            _id: "",
            applyJob: applyJob
        },
    ]);
    const [userApplyDetail, setUserApplyDetail] = useState([[{
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        _id: "",
    }]])
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchGetMyJob();
            setMyJobpost(data.data);
            if (data?.data) {
                const dataApply = await Promise.all(
                    data.data.map(async (item: any) => {
                        const res = await fetchApplyJob(item._id);
                        return res.data
                    })
                );
                const userInfo = await Promise.all(
                    dataApply?.map(async (item: any) => {
                        const dataUser = await Promise.all(
                            item.map(async (item: any) => {
                                const id = item.userId
                                const res = await fetchDetailsUser(id)
                                return res.data
                            })
                        )
                        return dataUser
                    })
                )
                setApplyJob(dataApply);
                setUserApplyDetail(userInfo)
            }
        };
        fetchData();
    }, []);
    const fetchDetailsUser = async (id: any) => {
        // const id = decodedToken?.userid;
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
    const fetchApplyJob = async (jobpostId: any) => {
        const id = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/get-my-apply/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobpostId: jobpostId
                }),
            }
        );
        return res.json();
    };
    const fetchGetMyJob = async () => {
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
    const updateApply = async (id: any, status: any) => {
        const res = await handleUpdateApply(id, status)
        if (res.status === "OK") {
            toast.success("Cập nhật thành công");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            toast.error("Cập nhật thất bại");
        }
    }
    const handleUpdateApply = async (id: any, status: any) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/apply/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    status: status
                }),
            }
        );
        return res.json();
    };
    const [activeTab, setActiveTab] = useState("profileViews");

    function areObjectsEqual(obj1: any, obj2: any) {
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
    }
    const [applySelect, setApplySelect] = useState(0)
    const handleSelectJob = (job: any) => {
        setApplySelect(job)
    }
    const Test = () => {
        console.log(applyJob, applySelect)
    }
    return (
        <div>
            <HeaderRecruiter />
            <div className="p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-2">Lời mời ứng tuyển</h1>
                    <p className="text-gray-600 mb-4">Quản lý tất cả hồ sơ ứng viên đã được gửi lời mời ứng tuyển.</p>
                    <div className="border-b border-gray-200 mb-4">
                        <div className="flex space-x-4">
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-t-lg border-b-2 border-blue-500">Tất cả trạng thái</button>
                            <button className="px-4 py-2 text-gray-600">Đang chờ</button>
                            <button className="px-4 py-2 text-gray-600">Đã chấp nhận</button>
                            <button className="px-4 py-2 text-gray-600">Đã hết hạn</button>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <input type="text" placeholder="Tìm kiếm theo tên ứng viên hoặc chức danh" className="flex-grow px-4 py-2 border rounded-lg" />
                        <i className="fas fa-search text-gray-500 ml-2"></i>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Tên ứng viên <i className="fas fa-sort-down"></i></th>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Chức danh <i className="fas fa-filter"></i></th>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Ngày gửi lời mời <i className="fas fa-sort-down"></i></th>
                                    <th className="px-4 py-2 text-left text-gray-600 bg-gray-100">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="text-center py-8">
                                        <div className="flex flex-col items-center">
                                            <img src="https://employer.vietnamworks.com/v2/candidate/manage-by-folders-and-tags/static/media/empty-state.cb5e9abb7fb062c980d12e05452221ef.svg" alt="No records found illustration" className="mb-4" />
                                            <p className="text-gray-600">Không tìm thấy hồ sơ trong thư mục này</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyInviteCandidate;
