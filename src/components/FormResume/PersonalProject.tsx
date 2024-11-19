import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const formField = {
  title: "",
  description: "",
  technologies: [""],
  link: "",
};

function PersonalProject({ setEnabledNext }: any) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [projectList, setProjectList] = useState<any[]>(
    resumeInfo.personalProjects || [formField]
  );
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      personalProjects: isSkipped ? [] : projectList,
    });
    checkIfFormIsValid(projectList);
  }, [projectList, isSkipped]);

  const handleChange = (index: any, event: any) => {
    const newEntries = [...projectList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
    checkIfFormIsValid(newEntries);
  };

  const handleTechnologyChange = (
    projectIndex: any,
    techIndex: any,
    event: any
  ) => {
    const newEntries = [...projectList];
    newEntries[projectIndex].technologies[techIndex] = event.target.value;
    setProjectList(newEntries);
    checkIfFormIsValid(newEntries);
  };

  const handleRichTextEditor = (value: string, index: number) => {
    const newEntries = [...projectList];
    newEntries[index].description = value;
    setProjectList(newEntries);
    checkIfFormIsValid(newEntries);
  };

  const checkIfFormIsValid = (list: any[]) => {
    const isValid = list.every(
      (item) =>
        item.title &&
        item.description &&
        item.technologies.length > 0 &&
        item.link
    );
    setEnabledNext(isValid);
  };

  const AddNewProject = () => {
    setProjectList([...projectList, { ...formField }]);
  };

  const RemoveProject = () => {
    const newEntries = projectList.slice(0, -1);
    setProjectList(newEntries);
    checkIfFormIsValid(newEntries);
  };

  const AddTechnology = (projectIndex: any) => {
    const newEntries = [...projectList];
    newEntries[projectIndex].technologies.push("");
    setProjectList(newEntries);
  };

  const RemoveTechnology = (projectIndex: any, techIndex: any) => {
    const newEntries = [...projectList];
    newEntries[projectIndex].technologies.splice(techIndex, 1);
    setProjectList(newEntries);
    checkIfFormIsValid(newEntries);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    setEnabledNext(true);
  };

  const handleAddProject = () => {
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
      <h2 className="text-lg font-bold">Dự Án Cá Nhân</h2>
      <p>
        {isSkipped
          ? "Bạn đã bỏ qua phần này. Nếu muốn thêm, hãy bật lại!"
          : "Thêm các dự án cá nhân của bạn hoặc bỏ qua nếu không có."}
      </p>

      {isSkipped ? (
        <Button variant="outline" className="mt-4" onClick={handleAddProject}>
          + Thêm Dự Án
        </Button>
      ) : (
        <form>
          {projectList.map((item, projectIndex) => (
            <div key={projectIndex}>
              <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
                <div className="col-span-2">
                  <label className="text-xs">Tên Dự Án</label>
                  <Input
                    name="title"
                    required
                    onChange={(event) => handleChange(projectIndex, event)}
                    value={item?.title}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs">Công Nghệ</label>
                  {item.technologies.map((tech: string, techIndex: number) => (
                    <div
                      key={techIndex}
                      className="mb-2 flex items-center gap-2"
                    >
                      <Input
                        name="technologies"
                        required
                        onChange={(event) =>
                          handleTechnologyChange(projectIndex, techIndex, event)
                        }
                        value={tech}
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          RemoveTechnology(projectIndex, techIndex)
                        }
                      >
                        - Xóa
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => AddTechnology(projectIndex)}
                  >
                    + Thêm Công Nghệ
                  </Button>
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Mô Tả</label>
                  <ReactQuill
                    theme="snow"
                    value={item?.description}
                    onChange={(value) =>
                      handleRichTextEditor(value, projectIndex)
                    }
                    modules={modules}
                    formats={formats}
                    className="mt-1 w-full rounded-lg border p-2"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Liên Kết</label>
                  <Input
                    name="link"
                    required
                    onChange={(event) => handleChange(projectIndex, event)}
                    value={item?.link}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={AddNewProject}>
                + Thêm Dự Án
              </Button>
              {projectList.length > 1 && (
                <Button variant="outline" onClick={RemoveProject}>
                  - Xóa Dự Án
                </Button>
              )}
            </div>
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

export default PersonalProject;
