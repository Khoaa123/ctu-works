"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "@images/logo.png";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { GoSearch } from "react-icons/go";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButotn";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export interface JwtPayload {
    userid: string;
    email: string;
    fullName: string;
    role: string;
}
const CompanySearch = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const jobSectionRef = useRef<HTMLDivElement>(null);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const scrollToJobSection = () => {
        if (jobSectionRef.current) {
            jobSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const [detailsCompany, setDetailsCompany] = useState([{
        companyLogo: "",
        companyName: "",
        companyScale: "",
        companyIndustries: "",
        fullName: "",
        companyAddress: "",
        companyDescription: "",
        following: -1,
        follower: [],
        recruiterId: "",
        _id: "",
    }]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDetailsCompany();
            setDetailsCompany(data.data);
            fetchDataJobPost(data.data)
        };
        fetchData();
    }, []);

    const fetchDetailsCompany = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/get-all-company`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    };
    const [jobPostCompany, setJobPostCompany] = useState([
        [{
            companyLogo: "",
            companyName: "",
            salary: "",
            jobTitle: "",
            location: [],
            _id: "",
        },]
    ]);


    const fetchDataJobPost = async (companies: any[]) => {
        const jobPosts = [];
        for (const company of companies) {
            try {
                const data = await fetchJobPostCompany(company.recruiterId);
                jobPosts.push(data.data);
            } catch (error) {
                console.error("Error fetching job posts for company:", company._id, error);
            }
        }
        setJobPostCompany(jobPosts);
    };

    const fetchJobPostCompany = async (id: any) => {
        try {
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
        } catch (error) {
            console.error("Error fetching job posts:", error);
            throw error; // Re-throw the error to be handled by the caller
        }
    };
    const cookies = useCookies();
    const accessToken = cookies.get("accessToken");
    const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

    const handleAddFollow = async (id: any) => {
        const userId = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/follow/create-follow/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                }),
            }
        );
        return res.json();
    };
    const addFollow = async (id: any) => {
        try {
            if (!accessToken) {
                router.push('/login')
            } else {
                const res = await handleAddFollow(id);
                if (res.status === "OK") {
                    toast.success("Theo dõi công ty thành công");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    toast.error("Bạn đã Theo dõi công ty này rồi");
                }
            }
        } catch (error) {
            toast.error("Cập nhật thất bại. Vui lòng thử lại sau.");
        }
    };
    const HandleUnFollow = async (id: any) => {
        const userId = decodedToken?.userid;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/follow/delete-follow/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recruiterId: id,
                    userId: userId,
                }),
            }
        );
        return res.json();
    };
    const unFollow = async (id: any) => {
        try {
            const res = await HandleUnFollow(id);
            if (res.status === "OK") {
                toast.success("Hủy theo dõi công ty thành công");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error("Lỗi, vui lòng kiểm tra lại.");
            }
        } catch (error) {
            toast.error("Cập nhật thất bại. Vui lòng thử lại sau.");
        }
    };
    const router = useRouter();

    const navigate = (id: string) => {
        router.push(`/job/${id}`);
    };
    return (
        <>
            <div className="container mx-auto p-4">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-900">Khám Phá Văn Hoá Công Ty</h1>
                    <p className="text-lg text-gray-600">Tìm hiểu văn hoá công ty và chọn cho bạn nơi làm việc phù hợp nhất.</p>
                    <div className="mt-4 flex justify-center">
                        <input type="text" placeholder="Nhập tên công ty" className="border border-gray-300 rounded-l-lg p-2 w-1/2" />
                        <button className="bg-orange-500 text-white px-4 rounded-r-lg">Tìm</button>
                    </div>
                </header>
                <main>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Công ty nổi bật <span className="text-gray-500">({detailsCompany?.length})</span></h2>
                        <button className="border border-gray-300 rounded-lg px-4 py-2">Tất cả lĩnh vực <i className="fas fa-chevron-down"></i></button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {detailsCompany?.map((com, index) => (
                            <div className="bg-white rounded-lg shadow p-4 ">
                                <img src={com.companyLogo || "https://images.vietnamworks.com/img/company-default-logo.svg"} alt="Company 1" className="w-full h-32 object-cover rounded-lg mb-4" />
                                <Link href={`/company/${com.recruiterId}`}>
                                    <h3 className="text-lg font-semibold min-h-16 hover:text-sky-700">{com?.companyName}</h3>
                                </Link>
                                <p className="text-gray-500 mb-2">{com?.following} lượt theo dõi</p>
                                <div className="text-right">
                                    {detailsCompany[index]?.follower?.some(
                                        (item) => item === decodedToken?.userid
                                    ) ? (
                                        <button
                                            className="text-blue-500 mb-4 p-4"
                                            onClick={() => unFollow(com.recruiterId)}
                                        >
                                            Hủy theo dõi
                                        </button>
                                    ) : (
                                        <button
                                            className="text-blue-500 mb-4 p-4"
                                            onClick={() => addFollow(com.recruiterId)}
                                        >
                                            + Theo dõi
                                        </button>
                                    )}
                                </div>
                                <div className="mb-2">
                                    {jobPostCompany[index] && (
                                        <>
                                            {jobPostCompany[index].slice(0, 2).map((company, companyIndex) => (
                                                <>
                                                    <Link href={`/job/${company?._id}`}>
                                                        <p key={companyIndex} className="truncate mb-1 text-sm font-medium hover:text-sky-700">
                                                            {company?.jobTitle}
                                                        </p>
                                                    </Link>
                                                    <p key={companyIndex} className="truncate mb-4 text-sm text-red-500">
                                                        {company?.location || 'Location Not Available'}
                                                    </p>
                                                </>
                                            ))}


                                        </>
                                    )}
                                </div>
                                <Link href={`/company/${com.recruiterId}`}>
                                    <button className="bg-white-500 text-blue-500 border-blue-500 border-2 px-4 w-full py-2 rounded-lg">Xem công ty</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            <ScrollToTopButton />
        </>
    );
};

export default CompanySearch;
