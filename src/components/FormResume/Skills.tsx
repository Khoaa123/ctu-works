import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

const formField = {
  name: "",
  rating: 0,
};

function Skills({ setEnabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState<any[]>(
    resumeInfo.skills || [formField]
  );
  const [isSkipped, setIsSkipped] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: isSkipped ? [] : skillsList,
    });
  }, [skillsList, isSkipped]);

  const handleChange = (index: any, event: any) => {
    setEnabledNext(false);
    const newEntries = [...skillsList];
    const { name, value } = event.target;
    newEntries[index][name] = name === "rating" ? parseInt(value) : value;
    setSkillsList(newEntries);
  };

  const AddNewSkill = () => {
    setSkillsList([...skillsList, { ...formField }]);
  };

  const RemoveSkill = (index: any) => {
    const newEntries = [...skillsList];
    newEntries.splice(index, 1);
    setSkillsList(newEntries);
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

  const handleAddSkill = () => {
    setIsSkipped(false);
    setEnabledNext(false);
  };

  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="text-lg font-bold">Kỹ Năng</h2>
      <p>
        {isSkipped
          ? "Bạn đã bỏ qua phần này. Nếu muốn thêm, hãy bật lại!"
          : "Thêm các kỹ năng của bạn hoặc bỏ qua nếu không có."}
      </p>

      {isSkipped ? (
        <Button variant="outline" className="mt-4" onClick={handleAddSkill}>
          + Thêm Kỹ Năng
        </Button>
      ) : (
        <form onSubmit={onSave}>
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3"
            >
              <div>
                <label className="text-xs">Tên Kỹ Năng</label>
                <Input
                  name="name"
                  required
                  onChange={(event) => handleChange(index, event)}
                  value={item?.name}
                />
              </div>
              <div>
                <label className="text-xs">Đánh Giá</label>
                <Input
                  name="rating"
                  type="number"
                  min="0"
                  max="100"
                  required
                  onChange={(event) => handleChange(index, event)}
                  value={item?.rating}
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <Button variant="outline" onClick={() => RemoveSkill(index)}>
                  - Xóa Kỹ Năng
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={AddNewSkill}>
                + Thêm Kỹ Năng
              </Button>
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

export default Skills;
