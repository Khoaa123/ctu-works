import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "react-toastify";

function PersonalDetail({ setEnabledNext }: any) {
  //   const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("---", resumeInfo);
  }, []);

  const handleInputChange = (e: any) => {
    setEnabledNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e: any) => {
    e.preventDefault();
    setEnabledNext(true);
    toast.success("Lưu thành công");
  };
  return (
    <div className="mt-6 rounded-lg border-t-4 border-t-sky-300 p-5 shadow-lg">
      <h2 className="text-lg font-bold">Thông tin chi tiết</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
