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
  description: "",
  technologies: [""],
  link: "",
};

function PersonalProject({ setEnabledNext }: any) {
  const [projectList, setProjectList] = useState<any[]>([formField]);
  const [isSkipped, setIsSkipped] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      personalProjects: isSkipped ? [] : projectList,
    });
  }, [projectList, isSkipped]);

  const handleChange = (index: any, event: any) => {
    setEnabledNext(false);
    const newEntries = [...projectList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  };

  const handleTechnologyChange = (
    projectIndex: any,
    techIndex: any,
    event: any
  ) => {
    setEnabledNext(false);
    const newEntries = [...projectList];
    newEntries[projectIndex].technologies[techIndex] = event.target.value;
    setProjectList(newEntries);
  };

  const handleRichTextEditor = (value: string, index: number) => {
    setEnabledNext(false);
    const newEntries = [...projectList];
    newEntries[index].description = value;
    setProjectList(newEntries);
  };

  const AddNewProject = () => {
    setProjectList([...projectList, { ...formField }]);
  };

  const RemoveProject = () => {
    setProjectList((prev) => prev.slice(0, -1));
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
      <h2 className="text-lg font-bold">Personal Projects</h2>
      <p>
        {isSkipped
          ? "You have skipped this section. If you want to add, please enable it!"
          : "Add your personal projects or skip if you don't have any."}
      </p>

      {isSkipped ? (
        <Button variant="outline" className="mt-4" onClick={handleAddProject}>
          + Add Project
        </Button>
      ) : (
        <form onSubmit={onSave}>
          {projectList.map((item, projectIndex) => (
            <div key={projectIndex}>
              <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
                <div className="col-span-2">
                  <label className="text-xs">Project Title</label>
                  <Input
                    name="title"
                    required
                    onChange={(event) => handleChange(projectIndex, event)}
                    value={item?.title}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs">Technologies</label>
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
                  <label className="text-xs">Description</label>
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
                  <label className="text-xs">Link</label>
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
                + Add Project
              </Button>
              {projectList.length > 1 && (
                <Button variant="outline" onClick={RemoveProject}>
                  - Remove Project
                </Button>
              )}
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      )}
      {/* {!isSkipped && (
        <Button
          variant="ghost"
          className="ml-4 mt-4 text-red-500"
          onClick={handleSkip}
        >
          Skip This Section
        </Button>
      )} */}
    </div>
  );
}

export default PersonalProject;
