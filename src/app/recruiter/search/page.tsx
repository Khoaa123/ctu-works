"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaBriefcase, FaCheck, FaGlasses, FaMagnifyingGlass, FaSackDollar, FaSearchengin, FaSliders, } from "react-icons/fa6";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { FaMapMarkerAlt, FaSearch, FaTh } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";





const Search = () => {
    const [userData, setUserData] = useState([{
        _id: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        seekJobMode: false,
        dateOfBirth: '',
        createdAt: '',
        jobTitle: '',
        address: '',
        MSSV: '',
        gender: '',
        currentDegree: '',
        currentIndustries: '',
        currentJobFunction: '',
        yearsExperience: '',
        currentSalary: '',
        highestDegree: '',
        country: '',
        city: '',
        district: '',
        maritalStatusId: '',
        avatar: "",
        workingPreferences: {
            locations: [""],
            jobFunction: "",
            companyIndustries: [""],
            salary: "",
            desiredJobLevel: "",
            isRelocate: 1,
            benefits: [],
        },
    }]);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Tất cả");
    const [selectedProfile, setSelectedProfile] = useState(userData[1]);
    const options = ["Tất cả", "Công ty", "Chức vụ", "Kỹ năng", "Tên"];
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchApplyJob();
            setUserData(data.data);
            setSelectedProfile(data.data[0])
        };
        fetchData();
    }, []);
    const fetchApplyJob = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getAll`,
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
            <div className="max-h-auto">
                <HeaderRecruiter />
                <div className="p-4 mr-[10%] ml-[10%]">
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="w-full p-2 pl-10 border rounded bg-gray-100"
                            />
                            <FaSearch className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                        <div className="relative w-56 inline-block text-left">
                            <div>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {selectedOption}
                                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} ml-2`}></i>
                                </button>
                            </div>
                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {options.map(option => (
                                            <a
                                                key={option}
                                                href="#"
                                                onClick={() => {
                                                    setSelectedOption(option);
                                                    setIsOpen(false);
                                                }}
                                                className={`block px-4 py-2 text-sm text-gray-700 ${selectedOption === option ? 'bg-blue-100' : ''}`}
                                                role="menuitem"
                                            >
                                                {option}
                                                {selectedOption === option && <FaCheck className="fas fa-check ml-2" />}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="flex items-center p-2 border rounded bg-gray-100">
                            <FaSliders className="fas fa-sliders-h mr-1" />
                            Bộ lọc
                            <span className="ml-1 px-2 py-1 bg-white border rounded"></span>
                        </button>
                        <button className="p-2 bg-orange-500 text-white rounded">Tìm kiếm</button>
                    </div>
                    <div className="mt-4 flex ">
                        <p>14376 kết quả tìm kiếm</p>
                        <div className="flex items-center">
                            <button className="p-2 border rounded bg-gray-100">
                                <FaBars className="fas fa-bars"></FaBars>
                            </button>
                            <button className="p-2 border rounded bg-blue-100 ml-2">
                                <FaTh className="fas fa-th"></FaTh>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex ml-[10%] h-screen">
                    <div className="w-1/4 border-r border-gray-200 p-4">
                        {userData.map((profile, index) => (
                            <div onClick={() => setSelectedProfile(profile)} key={index}
                                className="mb-4 p-2 border border-gray-200 rounded hover:bg-gray-100 cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-blue-600">{profile.fullName}</div>
                                        <div className="text-gray-500">{profile.jobTitle}</div>
                                    </div>
                                    {profile.seekJobMode && <div className="text-blue-500 text-sm">{profile.seekJobMode}</div>}
                                </div>
                                <div className="text-gray-400 text-sm">Cập nhật gần nhất: Vừa cập nhật</div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-4">
                            <button className="p-2 border border-gray-300 rounded">1</button>
                            <button className="p-2 border border-gray-300 rounded">2</button>
                            <button className="p-2 border border-gray-300 rounded">3</button>
                            <button className="p-2 border border-gray-300 rounded">...</button>
                            <button className="p-2 border border-gray-300 rounded">719</button>
                        </div>
                    </div>
                    <div className="w-3/4 p-4">
                        {selectedProfile ? (
                            <>
                                <div className="border border-gray-200 rounded p-4 mb-4">
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4">
                                            <Image src={selectedProfile?.avatar || "https://employer.vietnamworks.com/v3/candidate/search/static/media/Avatars.9db75fc247bf6e9dd55b92ddcc723670.svg"} alt="" height={100} width={100} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-xl">{selectedProfile?.fullName}</div>
                                            <div className="text-gray-500">{selectedProfile?.jobTitle}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4">

                                        <div className="flex items-center mb-2">
                                            <FaBriefcase className="fas fa-briefcase mr-1" />
                                            <span className="mr-4">{selectedProfile?.yearsExperience} năm</span>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <FaSackDollar className="fas fa-dollar-sign mr-1" />
                                            <span className="mr-4">$ {selectedProfile?.currentSalary}</span>
                                        </div>
                                        <div className="flex items-center mb-2">

                                            <FaMapMarkerAlt className="fas fa-map-marker-alt mr-1" />
                                            <span>{selectedProfile?.address}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <Link href={`/profileuser/${selectedProfile._id}`}>
                                            <button className="p-2 bg-orange-500 text-white rounded mr-4" >Xem chi tiết hồ sơ</button>
                                        </Link>
                                        <button className="p-2 bg-gray-200 text-gray-500 rounded">Gửi lời mời online</button>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded p-4 mb-4">
                                    <div className="font-bold text-lg mb-4">Thông tin chung</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-2"><span className="font-bold">Vị trí hiện tại:</span> {selectedProfile?.currentJobFunction}</div>
                                            <div className="mb-2"><span className="font-bold">Cấp bậc hiện tại:</span> {selectedProfile?.currentDegree}</div>
                                            <div className="mb-2"><span className="font-bold">Ngành nghề:</span>{selectedProfile?.currentJobFunction}</div>
                                            <div className="mb-2"><span className="font-bold">Lĩnh Vực:</span>{selectedProfile?.currentIndustries}</div>
                                            <div className="mb-2"><span className="font-bold">Cấp bậc mong muốn:</span> {selectedProfile?.workingPreferences.desiredJobLevel || "--"}</div>
                                            <div className="mb-2"><span className="font-bold">Mức lương mong muốn:</span> {selectedProfile?.workingPreferences.salary || "--"} USD</div>
                                        </div>
                                        <div>
                                            <div className="mb-2"><span className="font-bold">Ngày sinh:</span>{selectedProfile?.dateOfBirth}</div>
                                            <div className="mb-2"><span className="font-bold">Giới tính:</span> {selectedProfile?.gender}</div>
                                            <div className="mb-2"><span className="font-bold">Tình trạng hôn nhân:</span> {selectedProfile?.maritalStatusId}</div>
                                            <div className="mb-2"><span className="font-bold">Địa chỉ:</span>{selectedProfile?.address}</div>
                                            <div className="mb-2"><span className="font-bold">Nơi làm việc mong muốn:</span>{selectedProfile?.workingPreferences.locations || "--"}</div>
                                            <div className="mb-2"><span className="font-bold">Bằng cấp:</span>{selectedProfile?.highestDegree}</div>
                                            {/* <div className="mb-2"><span className="font-bold">Ngôn ngữ:</span> English - Cao cấp</div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded p-4">
                                    <div className="font-bold text-lg mb-4">Hồ sơ đính kèm</div>
                                    <div className="bg-gray-100 p-4 rounded">

                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded p-4 mt-4">
                                    <div className="font-bold text-lg mb-4">Hồ sơ đính kèm</div>
                                    <div className="bg-gray-100 p-4 rounded">
                                        <span>CV ở đây</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-500">Select a profile to view details</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
