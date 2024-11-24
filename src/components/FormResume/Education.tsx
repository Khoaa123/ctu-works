import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const formField = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({
  setEnabledNext,
}: {
  setEnabledNext: (enabled: boolean) => void;
}) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState<(typeof formField)[]>(
    resumeInfo.education || [formField]
  );

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
    checkIfFormIsValid(educationalList);
  }, [educationalList]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;

    // Nếu là trường date, kiểm tra và định dạng lại nếu cần
    const formattedValue =
      name === "startDate" || name === "endDate"
        ? new Date(value).toISOString().split("T")[0] // Định dạng YYYY-MM-DD
        : value;

    const newEntries = [...educationalList];
    newEntries[index] = { ...newEntries[index], [name]: formattedValue };
    setEducationalList(newEntries);
    checkIfFormIsValid(newEntries);
  };

  const checkIfFormIsValid = (list: (typeof formField)[]) => {
    const isValid = list.every(
      (item) =>
        item.universityName &&
        item.degree &&
        item.major &&
        item.startDate &&
        item.endDate
    );
    setEnabledNext(isValid);
  };

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formField }]);
  };

  const RemoveEducation = () => {
    const newEntries = educationalList.slice(0, -1);
    setEducationalList(newEntries);
    checkIfFormIsValid(newEntries);
  };

  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="text-lg font-bold">Học vấn</h2>

      <form>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
              <div className="col-span-2">
                <label>Tên Trường</label>
                <Input
                  name="universityName"
                  required
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName}
                />
              </div>
              <div>
                <label>Bằng cấp</label>
                <Input
                  name="degree"
                  required
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree}
                />
              </div>
              <div>
                <label>Chuyên ngành</label>
                <Input
                  name="major"
                  required
                  onChange={(e) => handleChange(e, index)}
                  value={item.major}
                />
              </div>
              <div>
                <label>Ngày bắt đầu</label>
                <Input
                  type="date"
                  required
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.startDate}
                />
              </div>
              <div>
                <label>Ngày kết thúc</label>
                <Input
                  type="date"
                  required
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.endDate}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={AddNewEducation}
              className="text-primary"
            >
              + Thêm Học Vấn
            </Button>
            {educationalList.length > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={RemoveEducation}
                className="text-primary"
              >
                - Xóa Học Vấn
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Education;