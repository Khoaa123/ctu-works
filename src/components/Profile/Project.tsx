"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { JwtPayload } from "@/utils/Types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { GoPencil, GoPlusCircle, GoTrash } from "react-icons/go";

type ProjectRequest = {
  projectName: string;
  companyName: string;
  yourRole: string;
  fromDate: string;
  toDate: string;
  description: string;
  projectLink: string;
};

type Projects = ProjectRequest & {
  _id: string;
  logo: string;
};

type updateProject = ProjectRequest & {
  projectId: string;
};

const Project = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [project, setProject] = useState<ProjectRequest>({
    projectName: "",
    companyName: "",
    yourRole: "",
    fromDate: "",
    toDate: "",
    description: "",
    projectLink: "",
  });
  const [allProject, setAllProject] = useState<Projects[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const addItem = async (item: ProjectRequest) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-project/${decodedToken?.userid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    return res.json();
  };

  const updateItem = async (item: updateProject) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-project/${decodedToken?.userid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    return res.json();
  };

  const deleteItem = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete-project/${decodedToken?.userid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: id }),
      }
    );
    return res.json();
  };

  const createMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Thêm dự án thành công ");
        setIsDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Cập nhật thất bại");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Cập nhật dự án thành công");
        setIsDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Cập nhật thất bại");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Xóa dự án thành công");
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi xóa:", error);
      toast.error("Xóa thất bại");
    },
  });

  useEffect(() => {
    if (fromDate) {
      setProject((prev) => ({
        ...prev,
        fromDate: format(fromDate, "MM/yyyy"),
      }));
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate) {
      setProject((prev) => ({
        ...prev,
        toDate: format(toDate, "MM/yyyy"),
      }));
    }
  }, [toDate]);

  useEffect(() => {
    if (data) {
      setAllProject(data.project);
    }
  }, [data]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const handleEdit = (item: Projects) => {
    setProject(item);
    setEditingProjectId(item._id);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    createMutation.mutate(project, {
      onSuccess: () => {
        setProject({
          projectName: "",
          companyName: "",
          yourRole: "",
          fromDate: "",
          toDate: "",
          description: "",
          projectLink: "",
        });
        setEditingProjectId(null);
      },
    });
  };

  const handleSave = () => {
    if (editingProjectId) {
      updateMutation.mutate({
        ...project,
        projectId: editingProjectId,
      });
    } else {
      handleAdd();
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  return (
    <>
      <div className="rounded-md bg-white p-4">
        <p className="text-xl font-bold">Dự Án</p>
        <p className="my-3 text-xs font-normal italic">
          Mô tả các dự án nổi bật của bạn nhằm thu hút nhà tuyển dụng
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2">
              <GoPlusCircle className="text-blue-600" size={24} />
              <span className="text-sm font-bold text-blue-600">
                Thêm Dự Án
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
              <DialogTitle>Dự Án</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 px-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                    *
                  </span>
                  Tên Dự Án
                </label>
                <input
                  type="text"
                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                  value={project.projectName}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      projectName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                      *
                    </span>
                    Khách hàng / Công Ty
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                    value={project.companyName}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                      *
                    </span>
                    Vai trò của bạn
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                    value={project.yourRole}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        yourRole: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    Từ Tháng
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                          !fromDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? (
                          format(fromDate, "dd/MM/yyyy")
                        ) : (
                          <span>Ngày/Tháng/Năm</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={fromDate}
                        onSelect={setFromDate}
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    Đến Tháng
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                          !toDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? (
                          format(toDate, "dd/MM/yyyy")
                        ) : (
                          <span>Ngày/Tháng/Năm</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={toDate}
                        onSelect={setToDate}
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-1">
                <p className="text-sm">
                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                    *
                  </span>
                  Mô tả dự án
                </p>
                <div className="overflow-hidden rounded-md border border-gray-300">
                  <ReactQuill
                    modules={modules}
                    theme="snow"
                    value={project.description}
                    onChange={(value) =>
                      setProject((prev) => ({
                        ...prev,
                        description: value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                    *
                  </span>
                  Link
                </label>
                <input
                  type="text"
                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                  value={project.projectLink}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      projectLink: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="mt-2 text-start text-sm italic text-gray-500">
                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                    *
                  </span>
                  Thông tin bắt buộc
                </p>
              </div>
            </div>
            <DialogFooter className="border-t border-gray-300 px-6 py-4">
              <Button
                className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                onClick={handleSave}
              >
                Lưu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {allProject.map((project: Projects) => (
          <div
            key={project._id}
            className="group my-4 cursor-pointer rounded-md p-2 transition duration-300 hover:bg-[#f8f9fa]"
          >
            <div className="mb-2 flex items-center gap-4">
              <Image
                src={project.logo}
                alt="logo"
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div className="flex flex-1 justify-between">
                <div>
                  <h3 className="font-medium">{project.projectName}</h3>
                  <p className="text-sm text-gray-500">{project.companyName}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {project.fromDate && <span>{project.fromDate}</span>}
                    {project.fromDate && project.toDate && <span> - </span>}
                    {project.toDate && <span>{project.toDate}</span>}
                  </div>
                  <Link
                    href={project.projectLink}
                    target="_blank"
                    className="transition-colors duration-300 group-hover:text-blue-500"
                  >
                    {project.projectLink}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <GoPencil
                    className="cursor-pointer text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    size={20}
                    onClick={() => handleEdit(project)}
                  />

                  <Dialog>
                    <DialogTrigger asChild>
                      <GoTrash
                        className="cursor-pointer text-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        size={20}
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-0">
                      <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
                        <DialogTitle>Xóa Kinh Nghiệm</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 px-6">
                        <div className="flex flex-col gap-1">
                          <p className="text-base">
                            Bạn có muốn xóa kinh nghiệm này không
                          </p>
                        </div>
                      </div>
                      <DialogFooter className="px-6 py-4">
                        <Button
                          className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                          onClick={() => handleDelete(project._id)}
                        >
                          Xóa
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: project.description,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Project;
