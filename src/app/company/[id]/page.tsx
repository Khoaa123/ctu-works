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
import { toast } from "react-toastify";

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}

const CompanyDetail = () => {
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

  const [detailsCompany, setDetailsCompany] = useState({
    companyLogo: "",
    companyName: "",
    companyScale: "",
    companyIndustries: "",
    fullName: "",
    companyAddress: "",
    companyDescription: "",
    following: -1,
    follower: [],
  });

  const [jobPostCompany, setJobPostCompany] = useState([
    {
      companyLogo: "",
      companyName: "",
      salary: "",
      jobTitle: "",
      location: [],
      _id: "",
    },
  ]);

  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetailsCompany();
      setDetailsCompany(data.data);
      const jobData = await fetchJobPostCompany();
      setJobPostCompany(jobData.data);
    };
    fetchData();
  }, []);

  const fetchDetailsCompany = async () => {
    const id = location.pathname.split("/company/")[1];
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

  const fetchJobPostCompany = async () => {
    const id = location.pathname.split("/company/")[1];
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

  const addFollow = async () => {
    try {
      if (!accessToken) {
        router.push("/login");
      } else {
        const res = await handleAddFollow();
        if (res.status === "OK") {
          toast.success("Theo dõi công ty thành công");
          setDetailsCompany((prev) => ({
            ...prev,
            following: prev.following + 1,
            follower: [...prev.follower, decodedToken?.userid],
          }));
        } else {
          toast.error("Bạn đã Theo dõi công ty này rồi");
        }
      }
    } catch (error) {
      toast.error("Cập nhật thất bại. Vui lòng thử lại sau.");
    }
  };

  const handleAddFollow = async () => {
    if (!accessToken) {
      router.push("/login");
    } else {
      const id = location.pathname.split("/company/")[1];
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
    }
  };

  const unFollow = async () => {
    try {
      const res = await HandleUnFollow();
      if (res.status === "OK") {
        toast.success("Hủy theo dõi công ty thành công");
        setDetailsCompany((prev) => ({
          ...prev,
          following: prev.following - 1,
          follower: prev.follower.filter((id) => id !== decodedToken?.userid),
        }));
      } else {
        toast.error("Lỗi, vui lòng kiểm tra lại.");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại. Vui lòng thử lại sau.");
    }
  };

  const HandleUnFollow = async () => {
    const id = location.pathname.split("/company/")[1];
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

  const navigate = (id: string) => {
    router.push(`/job/${id}`);
  };

  return (
    <>
      <div className="bg-[#F1F2F4]">
        <div className="container">
          <div className="pt-5">
            <div className="cursor-pointer rounded-md bg-white px-12 py-6">
              <div className="flex justify-between gap-3">
                <Image
                  src={detailsCompany?.companyLogo || logo}
                  alt="company-logo"
                  height={100}
                  width={100}
                />
                <div className="ml-2 flex-1">
                  <p className="text-xl font-semibold">
                    {detailsCompany?.companyName}
                  </p>
                  <p className="text-sm">
                    {detailsCompany?.following || 0} lượt theo dõi
                  </p>
                </div>
                <div>
                  {detailsCompany?.follower?.some(
                    (item) => item === decodedToken?.userid
                  ) ? (
                    <button
                      className="flex flex-1 items-center justify-center rounded-lg bg-[#ff7d55] px-4 py-2 text-sm text-white transition hover:bg-[#fd916f]"
                      onClick={unFollow}
                    >
                      Đang theo dõi
                    </button>
                  ) : (
                    <button
                      className="flex flex-1 items-center justify-center rounded-lg bg-[#ff7d55] px-4 py-2 text-sm text-white transition hover:bg-[#fd916f]"
                      onClick={addFollow}
                    >
                      Theo dõi
                    </button>
                  )}
                </div>
              </div>
              <div className="my-10">
                <div className="flex items-center gap-5">
                  <p className="border-2 border-l-0 border-r-0 border-t-0 border-b-blue-500 pb-3 text-sm font-semibold text-blue-500">
                    Về chúng tôi
                  </p>
                  <p
                    className="cursor-pointer pb-3 text-sm text-teal-600 hover:text-blue-500"
                    onClick={scrollToJobSection}
                  >
                    Về vị trí đang tuyển dụng
                  </p>
                </div>
              </div>
              <div>
                <p className="my-6 text-xl font-semibold">Về chúng tôi</p>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Quy mô</p>
                  <p>{detailsCompany?.companyScale || 0} người</p>
                </div>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Lĩnh vực</p>
                  <p>{detailsCompany?.companyIndustries}</p>
                </div>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Liên hệ</p>
                  <p>{detailsCompany?.fullName}</p>
                </div>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Địa chỉ</p>
                  <p>{detailsCompany?.companyAddress}</p>
                </div>
                {/* <div
                  className={`transition-all duration-400 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[1000px]" : "max-h-[170px]"
                  }`}
                >
                  <div className="my-4">
                    <p className="text-sm">
                      {detailsCompany?.companyDescription}
                    </p>
                  </div>
                </div> */}

                <button
                  className="text-sm text-blue-500"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </button>
                <div ref={jobSectionRef} className="my-6">
                  <p className="text-xl font-semibold">
                    Vị trí đang tuyển dụng
                  </p>

                  <div className="mt-2 flex flex-col gap-4">
                    {jobPostCompany?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]"
                      >
                        <div>
                          <h1
                            className="mb-1 line-clamp-1 text-xl font-bold"
                            onClick={() => navigate(item?._id)}
                          >
                            {item?.jobTitle}
                          </h1>
                          <p>{item?.companyName}</p>
                          <p className="my-1 text-sm text-amber-600">
                            {item?.salary ?? "Thương lượng"}
                          </p>
                          <p className="text-sm">
                            {item?.location?.map((loc, locIndex) => (
                              <span key={locIndex}>
                                {loc}
                                {locIndex < item.location.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default CompanyDetail;
