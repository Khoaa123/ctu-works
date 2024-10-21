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
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { JwtPayload } from "@/utils/Types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { GoPencil, GoPlusCircle, GoTrash } from "react-icons/go";

interface EducationRequest {
  major: string;
  schoolName: string;
  highestDegree: string;
  fromDate: string;
  toDate: string;
  achievement: string;
}

type Education = EducationRequest & {
  _id: string;
};

type UpdateEducation = EducationRequest & {
  educationsId: string;
};

const Education = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [education, setEducation] = useState<EducationRequest>({
    major: "",
    schoolName: "",
    highestDegree: "",
    fromDate: "",
    toDate: "",
    achievement: "",
  });
  const [allEducation, setAllEducation] = useState<Education[]>([]);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(
    null
  );
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const addItem = async (item: EducationRequest) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-educations/${decodedToken?.userid}`,
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

  const updateItem = async (item: UpdateEducation) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-educations/${decodedToken?.userid}`,
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete-educations/${decodedToken?.userid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ educationsId: id }),
      }
    );
    return res.json();
  };

  const createMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Thêm học vấn thành công");
        setIsDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi tạo:", error);
      toast.error("Tạo thất bại");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Cập nhật học vấn thành công");
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
        toast.success("Xóa học vấn thành công");
        queryClient.invalidateQueries({ queryKey: ["getUser"] });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
      }
    },
    onError: (error) => {
      console.error("Lỗi khi xóa:", error);
      toast.error("Xóa thất bại");
    },
  });

  useEffect(() => {
    if (fromDate) {
      setEducation((prev) => ({
        ...prev,
        fromDate: format(fromDate, "MM/yyyy"),
      }));
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate) {
      setEducation((prev) => ({
        ...prev,
        toDate: format(toDate, "MM/yyyy"),
      }));
    }
  }, [toDate]);

  useEffect(() => {
    if (data) {
      setAllEducation(data.educations);
    }
  }, [data]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const handleEdit = (item: Education) => {
    setEducation(item);
    setEditingEducationId(item._id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleAdd = () => {
    createMutation.mutate(education, {
      onSuccess: () => {
        setEducation({
          major: "",
          schoolName: "",
          highestDegree: "",
          fromDate: "",
          toDate: "",
          achievement: "",
        });
        setEditingEducationId(null);
      },
    });
  };

  const handleSave = () => {
    if (editingEducationId) {
      updateMutation.mutate({
        ...education,
        educationsId: editingEducationId,
      });
    } else {
      handleAdd();
    }
  };

  return (
    <>
      <div className="rounded-md bg-white p-4">
        <p className="text-xl font-bold">Học Vấn</p>
        <p className="my-3 text-xs font-normal italic">
          Mô tả toàn bộ quá trình học vấn của bạn, cũng như các bằng cấp bạn đã
          được và các khóa huấn luyện bạn đã tham gia
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2">
              <GoPlusCircle className="text-blue-600" size={24} />
              <span className="text-sm font-bold text-blue-600">
                Thêm Học Vấn
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
              <DialogTitle>Học Vấn</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 px-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                    *
                  </span>
                  Chuyên Ngành
                </label>
                <input
                  type="text"
                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                  value={education.major}
                  onChange={(e) =>
                    setEducation((prev) => ({
                      ...prev,
                      major: e.target.value,
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
                    Trường
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                    value={education.schoolName}
                    onChange={(e) =>
                      setEducation((prev) => ({
                        ...prev,
                        schoolName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                      *
                    </span>
                    Bằng Cấp
                  </label>
                  <Select
                    value={education.highestDegree}
                    onValueChange={(value) =>
                      setEducation((prev) => ({
                        ...prev,
                        highestDegree: value,
                      }))
                    }
                  >
                    <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                      <SelectValue placeholder="Vui lòng chọn trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trung học">Trung học</SelectItem>
                      <SelectItem value="Trung cấp">Trung cấp</SelectItem>
                      <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
                      <SelectItem value="Cử nhân">Cử nhân</SelectItem>
                      <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                      <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                      *
                    </span>
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
                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                      *
                    </span>
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
                <p>Thành tựu</p>
                <div className="overflow-hidden rounded-md border border-gray-300">
                  <ReactQuill
                    modules={modules}
                    theme="snow"
                    value={education.achievement}
                    onChange={(value) =>
                      setEducation((prev) => ({
                        ...prev,
                        achievement: value,
                      }))
                    }
                  />
                </div>
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
              <DialogClose asChild>
                <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                  Hủy
                </Button>
              </DialogClose>
              <Button
                className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                onClick={handleSave}
              >
                Lưu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {allEducation?.map((education: Education) => (
          <div
            key={education._id}
            className="group my-4 cursor-pointer rounded-md p-2 transition duration-300 hover:bg-[#f8f9fa]"
          >
            <div className="mb-2 flex items-center gap-4">
              <div className="flex flex-1 justify-between">
                <div>
                  <h3 className="font-medium">{education.major}</h3>
                  <p className="text-sm text-gray-500">
                    {education.schoolName}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {education.fromDate && <span>{education.fromDate}</span>}
                    {education.fromDate && education.toDate && <span> - </span>}
                    {education.toDate && <span>{education.toDate}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GoPencil
                    className="cursor-pointer text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    size={20}
                    onClick={() => handleEdit(education)}
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
                          onClick={() => handleDelete(education._id)}
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
                __html: education.achievement,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Education;
