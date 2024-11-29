import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function PersonalDetail({ setEnabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState<any>(resumeInfo || {});

  useEffect(() => {
    setFormData(resumeInfo);
    checkIfFormIsValid(resumeInfo);
  }, [resumeInfo]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    setResumeInfo(updatedFormData);
    checkIfFormIsValid(updatedFormData);
  };

  const checkIfFormIsValid = (data: any) => {
    const isValid =
      data.firstName &&
      data.lastName &&
      data.jobTitle &&
      data.address &&
      data.phone &&
      data.email;
    setEnabledNext(isValid);
  };

  return (
    <div className="mt-6 rounded-lg border p-5 shadow-lg">
      <h2 className="text-lg font-bold">Thông tin chi tiết</h2>

      <form>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Họ</label>
            <Input
              name="firstName"
              value={formData.firstName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Tên</label>
            <Input
              name="lastName"
              value={formData.lastName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Vị trí</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Địa chỉ</label>
            <Input
              name="address"
              value={formData.address || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Số điện thoại</label>
            <Input
              name="phone"
              value={formData.phone || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData.email || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
