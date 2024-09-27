"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaBriefcase, FaSackDollar } from "react-icons/fa6";
import HeaderRecruiter from "@/components/HeaderRecruiter/HeaderRecruiter";
import { FaMapMarkerAlt, FaTh } from "react-icons/fa";

const Search = () => {
  const [userData, setUserData] = useState([
    {
      _id: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      seekJobMode: false,
      dateOfBirth: "",
      createdAt: "",
      jobTitle: "",
      address: "",
      MSSV: "",
      gender: "",
      currentDegree: "",
      currentIndustries: "",
      currentJobFunction: "",
      yearsExperience: "",
      currentSalary: "",
      highestDegree: "",
      country: "",
      city: "",
      district: "",
      maritalStatusId: "",
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
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Tất cả");
  const [selectedProfile, setSelectedProfile] = useState(userData[1]);
  const options = ["Tất cả", "Công ty", "Chức vụ", "Kỹ năng", "Tên"];
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApplyJob();
      setUserData(data.data);
      setSelectedProfile(data.data[0]);
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
      <div className="mb-6">
        <HeaderRecruiter />
        <div className="ml-[10%] mr-[10%] p-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full rounded border bg-gray-100 p-2 pl-10 outline-none focus:border-sky-400 focus-visible:ring-0"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"></i>
            </div>
            <div className="relative inline-block w-56 text-left">
              <div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {selectedOption}
                  <i
                    className={`fas fa-chevron-${isOpen ? "up" : "down"} ml-2`}
                  ></i>
                </button>
              </div>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option) => (
                      <a
                        key={option}
                        href="#"
                        onClick={() => {
                          setSelectedOption(option);
                          setIsOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          selectedOption === option ? "bg-blue-100" : ""
                        }`}
                        role="menuitem"
                      >
                        {option}
                        {selectedOption === option && (
                          <i className="fas fa-check ml-2"></i>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="flex items-center rounded border bg-gray-100 p-2">
              <i className="fas fa-sliders-h mr-1"></i>
              Bộ lọc
              <span className="ml-1 rounded border bg-white px-2 py-1"></span>
            </button>
            <button className="rounded bg-orange-500 p-2 text-white">
              Tìm kiếm
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p>14376 kết quả tìm kiếm</p>
            <div className="flex items-center">
              <button className="rounded border bg-gray-100 p-2">
                <FaBars className="fas fa-bars"></FaBars>
              </button>
              <button className="ml-2 rounded border bg-blue-100 p-2">
                <FaTh className="fas fa-th"></FaTh>
              </button>
            </div>
          </div>
        </div>
        <div className="ml-[10%] flex">
          <div className="w-1/4 border-r border-gray-200 p-4">
            {userData.map((profile, index) => (
              <div
                onClick={() => setSelectedProfile(profile)}
                key={index}
                className="mb-4 cursor-pointer rounded border border-gray-200 p-2 hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-blue-600">
                      {profile.fullName}
                    </div>
                    <div className="text-gray-500">{profile.jobTitle}</div>
                  </div>
                  {profile.seekJobMode && (
                    <div className="text-sm text-blue-500">
                      {profile.seekJobMode}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  Cập nhật gần nhất: Vừa cập nhật
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-center">
              <button className="rounded border border-gray-300 p-2">1</button>
              <button className="rounded border border-gray-300 p-2">2</button>
              <button className="rounded border border-gray-300 p-2">3</button>
              <button className="rounded border border-gray-300 p-2">
                ...
              </button>
              <button className="rounded border border-gray-300 p-2">
                719
              </button>
            </div>
          </div>
          <div className="w-3/4 p-4">
            {selectedProfile ? (
              <>
                <div className="mb-4 rounded border border-gray-200 p-4">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 h-16 w-16 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="text-xl font-bold">
                        {selectedProfile?.fullName}
                      </div>
                      <div className="text-gray-500">
                        {selectedProfile?.jobTitle}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <div className="mb-2 flex items-center">
                      <FaBriefcase className="fas fa-briefcase mr-1" />
                      <span className="mr-4">
                        {selectedProfile?.yearsExperience} năm
                      </span>
                    </div>
                    <div className="mb-2 flex items-center">
                      <FaSackDollar className="fas fa-dollar-sign mr-1" />
                      <span className="mr-4">
                        $ {selectedProfile?.currentSalary}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center">
                      <FaMapMarkerAlt className="fas fa-map-marker-alt mr-1" />
                      <span>{selectedProfile?.address}</span>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <button className="mr-4 rounded bg-orange-500 p-2 text-white">
                      Xem chi tiết hồ sơ
                    </button>
                    <button className="rounded bg-gray-200 p-2 text-gray-500">
                      Gửi lời mời online
                    </button>
                  </div>
                </div>
                <div className="mb-4 rounded border border-gray-200 p-4">
                  <div className="mb-4 text-lg font-bold">Thông tin chung</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-2">
                        <span className="font-bold">Vị trí hiện tại:</span>{" "}
                        {selectedProfile?.currentJobFunction}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Cấp bậc hiện tại:</span>{" "}
                        {selectedProfile?.currentDegree}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Ngành nghề:</span>
                        {selectedProfile?.currentJobFunction}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Lĩnh Vực:</span>
                        {selectedProfile?.currentIndustries}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Cấp bậc mong muốn:</span>{" "}
                        {selectedProfile?.workingPreferences.desiredJobLevel ||
                          "--"}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Mức lương mong muốn:</span>{" "}
                        {selectedProfile?.workingPreferences.salary || "--"} USD
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="font-bold">Ngày sinh:</span>
                        {selectedProfile?.dateOfBirth}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Giới tính:</span>{" "}
                        {selectedProfile?.gender}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Tình trạng hôn nhân:</span>{" "}
                        {selectedProfile?.maritalStatusId}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Địa chỉ:</span>
                        {selectedProfile?.address}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">
                          Nơi làm việc mong muốn:
                        </span>
                        {selectedProfile?.workingPreferences.locations || "--"}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Bằng cấp:</span>
                        {selectedProfile?.highestDegree}
                      </div>
                      {/* <div className="mb-2"><span className="font-bold">Ngôn ngữ:</span> English - Cao cấp</div> */}
                    </div>
                  </div>
                </div>
                <div className="rounded border border-gray-200 p-4">
                  <div className="mb-4 text-lg font-bold">Hồ sơ đính kèm</div>
                  <div className="rounded bg-gray-100 p-4"></div>
                </div>
                <div className="mt-4 rounded border border-gray-200 p-4">
                  <div className="mb-4 text-lg font-bold">Hồ sơ đính kèm</div>
                  <div className="rounded bg-gray-100 p-4">
                    <span>CV ở đây</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                Select a profile to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
