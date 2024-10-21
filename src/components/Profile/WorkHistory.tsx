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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { GoPencil, GoPlusCircle, GoTrash } from "react-icons/go";

interface WorkingHistoryRequest {
  jobTitle: string;
  companyName: string;
  fromDate: string;
  toDate: string;
  description: string;
  isCurrent: number;
}

type WorkingHistories = WorkingHistoryRequest & {
  _id: string;
  companyLogo: string;
};

type updateWorkingHistories = WorkingHistoryRequest & {
  workingHistoriesId: string;
};

const WorkHistory = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [workingHistories, setWorkingHistories] =
    useState<WorkingHistoryRequest>({
      jobTitle: "",
      companyName: "",
      fromDate: "",
      toDate: "",
      description: "",
      isCurrent: 1,
    });
  const [allWorkingHistories, setAllWorkingHistories] = useState<
    WorkingHistories[]
  >([]);
  const [editingWorkingHistoriesId, setEditingWorkingHistoriesId] = useState<
    string | null
  >(null);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const addItem = async (item: WorkingHistoryRequest) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-working-histories/${decodedToken?.userid}`,
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

  const updateItem = async (item: updateWorkingHistories) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-working-histories/${decodedToken?.userid}`,
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete-working-histories/${decodedToken?.userid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workingHistoriesId: id }),
      }
    );
    return res.json();
  };

  const createMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Thêm kinh nghiệm làm việc thành công ");
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
        toast.success("Cập nhật kinh nghiệm làm việc thành công");
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
        toast.success("Xóa kinh nghiệm làm việc thành công");
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

  const handleIsCurrentChange = () => {
    setIsCurrent(!isCurrent);
    if (!isCurrent) {
      setToDate(undefined);
    }
  };

  useEffect(() => {
    if (fromDate) {
      setWorkingHistories((prev) => ({
        ...prev,
        fromDate: format(fromDate, "MM/yyyy"),
      }));
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate) {
      setWorkingHistories((prev) => ({
        ...prev,
        toDate: format(toDate, "MM/yyyy"),
      }));
    }
  }, [toDate]);

  useEffect(() => {
    if (data) {
      setAllWorkingHistories(data.workingHistories);
    }
  }, [data]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const handleEdit = (item: WorkingHistories) => {
    setWorkingHistories(item);
    setEditingWorkingHistoriesId(item._id);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    createMutation.mutate(workingHistories, {
      onSuccess: () => {
        setWorkingHistories({
          jobTitle: "",
          companyName: "",
          fromDate: "",
          toDate: "",
          description: "",
          isCurrent: 1,
        });
        setEditingWorkingHistoriesId(null);
      },
    });
  };

  const handleSave = () => {
    if (editingWorkingHistoriesId) {
      updateMutation.mutate({
        ...workingHistories,
        workingHistoriesId: editingWorkingHistoriesId,
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
        <p className="text-xl font-bold">Kinh Nghiệm Làm Việc</p>
        <p className="my-3 text-xs font-normal italic">
          Mô tả kinh nghiệm làm việc của bạn càng chi tiết càng tốt, điều đó
          giúp bạn có cơ hội hiển thị nhiều hơn trong kết quả tìm kiếm
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2">
              <GoPlusCircle className="text-blue-600" size={24} />
              <span className="text-sm font-bold text-blue-600">
                Thêm Kinh Nghiệm Làm Việc
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
              <DialogTitle>Kinh Nghiệm Làm Việc</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 px-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                      *
                    </span>
                    Tên Dự Án
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                    value={workingHistories.jobTitle}
                    onChange={(e) =>
                      setWorkingHistories((prev) => ({
                        ...prev,
                        jobTitle: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                      *
                    </span>
                    Công Ty
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                    value={workingHistories.companyName}
                    onChange={(e) =>
                      setWorkingHistories((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
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
                        disabled={isCurrent}
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
                <div className="col-span-1 flex items-center gap-1">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="h-4 w-4"
                    checked={isCurrent}
                    onChange={handleIsCurrentChange}
                  />
                  <label htmlFor="">Công việc hiện tại</label>
                </div>
              </div>
              <div className="overflow-hidden rounded-md border border-gray-300">
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={workingHistories.description}
                  onChange={(value) =>
                    setWorkingHistories((prev) => ({
                      ...prev,
                      description: value,
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
        {allWorkingHistories?.map((history: WorkingHistories) => (
          <div
            key={history._id}
            className="group my-4 cursor-pointer rounded-md p-2 transition duration-300 hover:bg-[#f8f9fa]"
          >
            <div className="mb-2 flex items-center gap-4">
              <Image
                src={history.companyLogo}
                alt="logo"
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div className="flex flex-1 justify-between">
                <div>
                  <h3 className="font-medium">{history.jobTitle}</h3>
                  <p className="text-sm text-gray-500">{history.companyName}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {history.fromDate && <span>{history.fromDate}</span>}
                    {history.fromDate && history.toDate && <span> - </span>}
                    {history.toDate && <span>{history.toDate}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GoPencil
                    className="cursor-pointer text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    size={20}
                    onClick={() => handleEdit(history)}
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
                          onClick={() => handleDelete(history._id)}
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
                __html: history.description,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkHistory;
