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
import Select from 'react-select';

export interface JwtPayload {
  userid: string;
  email: string;
  fullName: string;
  role: string;
}
const Profile = () => {
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
    companyIndustries: "",
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
  const benefitoptions = [
    { id: 0, name: "Vui lòng chọn", placeholder: "Nhập chi tiết phúc lợi" },
    { id: 1, name: "Thưởng", placeholder: "Ví dụ: Lương tháng 13" },
    {
      id: 2,
      name: "Chăm sóc sức khỏe",
      placeholder:
        "Ví dụ: Chương trình chăm sóc sức khỏe cao cấp dành cho bạn và gia đình",
    },
    {
      id: 3,
      name: "Nghỉ phép có lương",
      placeholder: "Ví dụ: 20 ngày nghỉ phép có lương trong năm",
    },
    { id: 4, name: "Đào tạo", placeholder: "Ví dụ: Cơ hội đào tạo nước ngoài" },
    {
      id: 5,
      name: "Giải thưởng",
      placeholder: "Ví dụ: Giải thưởng hằng tháng dành cho nhân viên xuất sắc",
    },
    {
      id: 6,
      name: "Thư viện",
      placeholder:
        "Ví dụ: Thư viện online với 20.000 đầu sách và không giới hạn truy cập",
    },
    {
      id: 7,
      name: "Máy tính xách tay",
      placeholder: "Ví dụ: Macbook mới cho mỗi nhân viên",
    },
    {
      id: 8,
      name: "Điện thoại",
      placeholder: "Ví dụ: Iphone cho mỗi nhân viên, với phụ cấp phi 20$/tháng",
    },
    {
      id: 9,
      name: "Cơ hội du lịch",
      placeholder:
        "Ví dụ: 2-3 chuyến du lịch trong năm để làm việc tại trụ sở chính",
    },
    {
      id: 10,
      name: "Hoạt động nhóm",
      placeholder:
        "Ví dụ: Chương trình 'Innovation Time Off' xuyên suốt cả năm",
    },
    {
      id: 11,
      name: "Xe đưa đón",
      placeholder: "Ví dụ: Công ty có xe đưa đón dành cho các tất cả nhân viên",
    },
    {
      id: 12,
      name: "Căn-tin",
      placeholder: "Ví dụ: Bữa trưa và thức ăn nhẹ không giới hạn",
    },
    {
      id: 13,
      name: "Phiếu giảm giá",
      placeholder: "Ví dụ: Phiếu giảm giá 100$ dùng được tại hơn 100 cửa hàng",
    },
    {
      id: 14,
      name: "Nhà trẻ",
      placeholder:
        "Ví dụ: Phụ cấp phí nhà trẻ 200$ mỗi tháng cho mỗi bé dưới 5 tuổi",
    },
    {
      id: 15,
      name: "Khác",
      placeholder: "Ví dụ: Cấp Misfix cho mỗi nhân viên",
    },
  ];
  const [benefits, setBenefits] = useState([{ id: 0, name: "Thưởng" }]);
  const [benefitId, setBenefitId] = useState(1);
  const handleAddBenefit = () => {
    if (benefits.length < 3) {
      setBenefits((prevBenefits) => [
        ...prevBenefits,
        {
          id: benefitId,
          name: "",
        },
      ]);
      setBenefitId((prevId) => prevId + 1);
    }
  };

  const handleRemoveBenefit = (idToRemove: any) => {
    setBenefits((prevBenefits) =>
      prevBenefits.filter((benefit) => benefit.id !== idToRemove)
    );
    setFormData((prevFormData) => {
      const { companyBenefits } = prevFormData;
      delete companyBenefits[idToRemove];
      return {
        ...prevFormData,
        companyBenefits,
      };
    });
  };
  const usedBenefits = Object.values(formData?.companyBenefits).map(
    (benefit) => benefit.benefitId
  );
  const optionsIndustry = [{ value: "Bán lẻ/Bán sỉ", label: "Bán lẻ/Bán sỉ" },
  { value: "Bao bì/In ấn/Dán nhãn", label: "Bao bì/In ấn/Dán nhãn" },
  { value: "Bảo hiểm", label: "Bảo hiểm" },
  { value: "Bất Động Sản/Cho thuê", label: "Bất Động Sản/Cho thuê" },
  { value: "Chính phủ & NGO", label: "Chính phủ & NGO" },
  { value: "Chứng khoán", label: "Chứng khoán" },
  { value: "Chuỗi cung ứng", label: "Chuỗi cung ứng" },
  { value: "Cơ khí/Máy móc/Thiết bị công nghiệp", label: "Cơ khí/Máy móc/Thiết bị công nghiệp" },
  { value: "Cung cấp nhân lực", label: "Cung cấp nhân lực" },
  { value: "Dệt may/May mặc/Giày dép", label: "Dệt may/May mặc/Giày dép" },
  { value: "Dịch vụ kho bãi", label: "Dịch vụ kho bãi" },
  { value: "Dịch vụ lưu trú/Nhà hàng/Khách sạn/Du lịch", label: "Dịch vụ lưu trú/Nhà hàng/Khách sạn/Du lịch" },
  { value: "Dịch vụ môi trường/Chất thải", label: "Dịch vụ môi trường/Chất thải" },
  { value: "Dịch vụ Y tế/Chăm sóc sức khỏe", label: "Dịch vụ Y tế/Chăm sóc sức khỏe" },
  { value: "Điện/Điện tử", label: "Điện/Điện tử" },
  { value: "Dược phẩm", label: "Dược phẩm" },
  { value: "Giáo dục/Đào Tạo", label: "Giáo dục/Đào Tạo" },
  { value: "Hàng tiêu dùng", label: "Hàng tiêu dùng" },
  { value: "Hậu cần/Giao nhận", label: "Hậu cần/Giao nhận" },
  { value: "Hệ thống CNTT & Thiết bị", label: "Hệ thống CNTT & Thiết bị" },
  { value: "Hoá chất/Hoá sinh", label: "Hoá chất/Hoá sinh" },
  { value: "Kế toán", label: "Kế toán" },
  { value: "Khai khoáng/Dầu khí", label: "Khai khoáng/Dầu khí" },
  { value: "Kiến trúc/Thiết kế nội thất", label: "Kiến trúc/Thiết kế nội thất" },
  { value: "Kỹ thuật xây dựng/Cơ sở hạ tầng", label: "Kỹ thuật xây dựng/Cơ sở hạ tầng" },
  { value: "Làm đẹp (Mỹ phẩm) & Chăm sóc cá nhân", label: "Làm đẹp (Mỹ phẩm) & Chăm sóc cá nhân" },
  { value: "Luật/Dịch vụ pháp lý", label: "Luật/Dịch vụ pháp lý" },
  { value: "Ngân hàng", label: "Ngân hàng" },
  { value: "Nghệ thuật/Giải trí", label: "Nghệ thuật/Giải trí" },
  { value: "Nghiên cứu", label: "Nghiên cứu" },
  { value: "Nhập khẩu/Xuất khẩu", label: "Nhập khẩu/Xuất khẩu" },
  { value: "Nhựa & Cao su", label: "Nhựa & Cao su" },
  { value: "Nội thất/Gỗ", label: "Nội thất/Gỗ" },
  { value: "Nông nghiệp/Lâm nghiệp/Nuôi trồng thủy sản", label: "Nông nghiệp/Lâm nghiệp/Nuôi trồng thủy sản" },
  { value: "Ô tô", label: "Ô tô" },
  { value: "Phần Mềm CNTT/Dịch vụ Phần mềm", label: "Phần Mềm CNTT/Dịch vụ Phần mềm" },
  { value: "Sản xuất", label: "Sản xuất" },
  { value: "Sản xuất và Phân phối Điện/Khí đốt/Nước", label: "Sản xuất và Phân phối Điện/Khí đốt/Nước" },
  { value: "Tài Chính", label: "Tài Chính" },
  { value: "Thiết bị y tế", label: "Thiết bị y tế" },
  { value: "Thời trang/Trang sức", label: "Thời trang/Trang sức" },
  { value: "Thú y", label: "Thú y" },
  { value: "Thương mại điện tử", label: "Thương mại điện tử" },
  { value: "Truyền thông/Báo chí/Quảng cáo", label: "Truyền thông/Báo chí/Quảng cáo" },
  { value: "Tự động hoá", label: "Tự động hoá" },
  { value: "Vận tải", label: "Vận tải" },
  { value: "Vật liệu xây dựng", label: "Vật liệu xây dựng" },
  { value: "Viễn thông", label: "Viễn thông" },
  { value: "Khác", label: "Khác" }]
  const handleChangeIndustry = (selectedOption: any) => {
    setFormData({
      ...formData,
      companyIndustries: selectedOption.value,
    });
    console.log(selectedOption.value);
    console.log(formData.companyIndustries)
  };
  const filterOption = (option: any, inputValue: any) => {
    return (
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toLowerCase().includes(inputValue.toLowerCase())

    );
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
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <RecruiterSidebar />
            </div>
            <div className="col-span-3 flex flex-col gap-5">
              <div className="m-4 space-y-6">
                <h3 className="mb-4 flex items-center text-2xl font-semibold">
                  <span>Thông tin công ty</span>
                </h3>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companyName"
                  >
                    Tên công ty <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData?.companyName}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        companyName: e.target.value,
                      });
                    }}
                    id="companyName"
                    type="text"
                    placeholder="Ví dụ: CtuWorks"
                    className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-gray-700">
                      Người liên hệ<span className="text-red-500">*</span>
                    </label>
                    <input
                      value={formData?.staffName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,

                          staffName: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder="Ví du: Nguyen Van A"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Địa chỉ email nhận hồ sơ
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={formData?.email}
                      onChange={(e) => {
                        setFormData({
                          ...formData,

                          email: e.target.value,
                        });
                      }}
                      type="email"
                      placeholder="Ví du: ctuworks@gmail.com"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-sky-400"
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companyAddress"
                  >
                    Lĩnh vực công ty
                  </label>
                  <Select
                    value={formData.companyIndustries ? { value: formData.companyIndustries, label: formData.companyIndustries } : null}
                    onChange={handleChangeIndustry}
                    options={optionsIndustry}
                    filterOption={filterOption}
                    placeholder="Vui lòng chọn..."
                  >
                  </Select>
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companyAddress"
                  >
                    Địa chỉ công ty
                  </label>
                  <input
                    value={formData?.companyAddress}
                    onChange={(e) => {
                      setFormData({
                        ...formData,

                        companyAddress: e.target.value,
                      });
                    }}
                    id="companyAddress"
                    type="text"
                    placeholder="Ví dụ: 130 Suong Nguyet Anh, Ben Thanh Ward, District 1"
                    className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companySize"
                  >
                    Quy mô công ty
                  </label>
                  <select
                    value={formData?.companyScale}
                    onChange={(e) => {
                      setFormData({
                        ...formData,

                        companyScale: e.target.value,
                      });
                    }}
                    id="companySize"
                    className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                  >
                    <option>Vui lòng chọn</option>
                    <option>Ít hơn 10</option>
                    <option>10 - 24</option>
                    <option>25 - 99</option>
                    <option>100 - 499</option>
                    <option>500 - 999</option>
                    <option>1000 - 4999</option>
                    <option>5000 - 9999</option>
                    <option>10000 - 19999</option>
                    <option>20000 - 49999</option>
                    <option>Hơn 50000</option>
                  </select>
                </div>
                {/* <div className="mb-6">
                                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="companyInfo">
                                            Thông tin công ty *
                                        </label>
                                        <textarea
                                            value={formData?.companyInfo.companyInfo}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    companyInfo: { ...formData?.companyInfo, companyInfo: e.target.value }
                                                });
                                            }}
                                            id="companyInfo"
                                            placeholder="Thông tin"
                                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                            rows={4}
                                        ></textarea>
                                        <div className="text-right text-xs text-gray-500">(999/10000 ký tự)</div>
                                    </div> */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Phúc lợi từ công ty <span className="text-red-500">*</span>
                  </label>
                  {benefits.map((benefit) => (
                    <div key={benefit.id} className="mb-2 flex space-x-4">
                      <select
                        onChange={(e) => {
                          setFormData({
                            ...formData,

                            companyBenefits: {
                              ...formData?.companyBenefits,
                              [benefit.id]: {
                                ...formData?.companyBenefits[benefit.id],
                                benefitId: e.target.value,
                                benefitDescription:
                                  formData?.companyBenefits[benefit.id]
                                    ?.benefitDescription,
                              },
                            },
                          });
                        }}
                        id="companyBenefits"
                        className="h-1/2 w-1/2 appearance-none rounded border border-black px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:border-sky-400 focus:shadow-none focus:outline-none"
                      >
                        {/* {benefitoptions.map((item) => ( */}
                        {benefitoptions.map((item) => (
                          <option
                            key={item.name}
                            value={item.name}
                            disabled={
                              usedBenefits.includes(item.name) &&
                              item.name !==
                              formData?.companyBenefits[benefit.id]?.benefitId
                            }
                          >
                            {item.name}{" "}
                            {usedBenefits.includes(item.name) ? "\u2713" : ""}
                          </option>
                        ))}
                      </select>
                      <textarea
                        value={
                          formData?.companyBenefits[benefit.id]
                            ?.benefitDescription
                        }
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            companyBenefits: {
                              ...formData?.companyBenefits,
                              [benefit.id]: {
                                benefitId:
                                  formData?.companyBenefits[benefit.id]
                                    ?.benefitId,
                                benefitDescription: e.target.value,
                              },
                            },
                          });
                        }}
                        className="w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-sky-400"
                        placeholder={
                          benefitoptions.find(
                            (option) =>
                              option.name ===
                              formData?.companyBenefits[benefit.id]?.benefitId
                          )?.placeholder || "Nhập chi tiết phúc lợi"
                        }
                      ></textarea>
                      {benefits.length > 1 && (
                        <button onClick={() => handleRemoveBenefit(benefit.id)}>
                          <FaTrash className="h-12 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {benefits.length < 3 && (
                    <button
                      className="mt-2 text-blue-500"
                      onClick={handleAddBenefit}
                    >
                      + Thêm phúc lợi
                    </button>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="companyLogo"
                  >
                    Logo công ty
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                    <input
                      onChange={(e) => {
                        setFormData({
                          ...formData,

                          companyLogo: e.target.value,
                        });
                      }}
                      id="companyLogo"
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      max-size="5242880"
                    />
                    <p className="text-xs text-gray-500">
                      (Tập tin với phần mở rộng .jpg, .jpeg, .png, .gif và kích
                      thước &lt;5MB)
                    </p>
                  </div>
                </div>
                <div className="flex h-20 w-full justify-center bg-gray-100">
                  <button
                    onClick={handleSubmit}
                    className="mt-4 h-12 rounded bg-orange-500 px-4 py-2 text-white"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
