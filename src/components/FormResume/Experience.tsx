import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience({ setEnabledNext }: any) {
  const [experinceList, setExperinceList] = useState<any[]>([formField]);
  const [isSkipped, setIsSkipped] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: isSkipped ? [] : experinceList,
    });
  }, [experinceList, isSkipped]);

  const handleChange = (index: any, event: any) => {
    setEnabledNext(false);
    const newEntries = [...experinceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };

  const handleRichTextEditor = (value: string, index: number) => {
    setEnabledNext(false);
    const newEntries = [...experinceList];
    newEntries[index].workSummery = value;
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([...experinceList, { ...formField }]);
  };

  const RemoveExperience = () => {
    setExperinceList((prev) => prev.slice(0, -1));
  };

  const onSave = (e: any) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      setEnabledNext(true);
      toast.success("Lưu thành công");
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
  };

  const handleSkip = () => {
    setIsSkipped(true);
    setEnabledNext(true);
  };

  const handleAddExperience = () => {
    setIsSkipped(false);
    setEnabledNext(false);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = ["bold", "italic", "underline", "list"];

  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="text-lg font-bold">Kinh nghiệm làm việc</h2>
      <p>
        {isSkipped
          ? "Bạn đã bỏ qua phần này. Nếu muốn thêm, hãy bật lại!"
          : "Hãy thêm kinh nghiệm làm việc của bạn hoặc bỏ qua nếu chưa có."}
      </p>

      {isSkipped ? (
        <Button
          variant="outline"
          className="mt-4"
          onClick={handleAddExperience}
        >
          + Thêm Kinh Nghiệm
        </Button>
      ) : (
        <form onSubmit={onSave}>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    required
                    onChange={(event) => handleChange(index, event)}
                    value={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    required
                    onChange={(event) => handleChange(index, event)}
                    value={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    required
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                    value={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    required
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                    value={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    required
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                    value={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    required
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                    value={item?.endDate}
                  />
                </div>
                <ReactQuill
                  theme="snow"
                  value={item?.workSummery}
                  onChange={(value) => handleRichTextEditor(value, index)}
                  defaultValue={item?.workSummery}
                  modules={modules}
                  formats={formats}
                  className="col-span-2 mt-1 w-full rounded-lg border p-2"
                />
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={AddNewExperience}>
                + Thêm Kinh Nghiệm
              </Button>
              {experinceList.length > 1 && (
                <Button variant="outline" onClick={RemoveExperience}>
                  - Xóa Kinh Nghiệm
                </Button>
              )}
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Lưu"}
            </Button>
          </div>
        </form>
      )}
      {!isSkipped && (
        <Button
          variant="ghost"
          className="ml-4 mt-4 text-red-500"
          onClick={handleSkip}
        >
          Bỏ Qua Phần Này
        </Button>
      )}
    </div>
  );
}

export default Experience;
