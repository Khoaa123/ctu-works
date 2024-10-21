"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

type CertificationRequest = {
  certification: string;
  organization: string;
  fromDate: string;
  linkCertification: string;
};

type Certification = CertificationRequest & {
  _id: string;
  logo: string;
};

type updateCertification = CertificationRequest & {
  certificationsId: string;
};

const Certification = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [certification, setCertification] = useState<CertificationRequest>({
    certification: "",
    organization: "",
    fromDate: "",
    linkCertification: "",
  });
  const [allCertification, setAllCertification] = useState<Certification[]>([]);
  const [editingCertificationsId, setEditingCertificationsId] = useState<
    string | null
  >(null);
  const [fromDate, setFromDate] = useState<Date>();
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const addItem = async (item: CertificationRequest) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-certifications/${decodedToken?.userid}`,
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

  const updateItem = async (item: updateCertification) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-certifications/${decodedToken?.userid}`,
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete-certifications/${decodedToken?.userid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ certificationsId: id }),
      }
    );
    return res.json();
  };

  const createMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Thêm chứng chỉ thành công ");
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
        toast.success("Cập nhật chứng chỉ thành công");
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
        toast.success("Xóa chứng chỉ thành công");
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
      setCertification((prev) => ({
        ...prev,
        fromDate: format(fromDate, "MM/yyyy"),
      }));
    }
  }, [fromDate]);

  useEffect(() => {
    if (data) {
      setAllCertification(data.certifications);
    }
  }, [data]);

  const handleEdit = (item: Certification) => {
    setCertification(item);
    setEditingCertificationsId(item._id);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    createMutation.mutate(certification, {
      onSuccess: () => {
        setCertification({
          certification: "",
          organization: "",
          fromDate: "",
          linkCertification: "",
        });
        setEditingCertificationsId(null);
      },
    });
  };

  const handleSave = () => {
    if (editingCertificationsId) {
      updateMutation.mutate({
        ...certification,
        certificationsId: editingCertificationsId,
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
        <p className="text-xl font-bold">Chứng chỉ</p>
        <p className="my-3 text-xs font-normal italic">
          Liệt kê các chứng chỉ nổi bật của bạn nhằm thu hút nhà tuyển dụng
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2">
              <GoPlusCircle className="text-blue-600" size={24} />
              <span className="text-sm font-bold text-blue-600">
                Thêm Chứng Chỉ
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
              <DialogTitle>Chứng chỉ</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 px-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                    *
                  </span>
                  Tên Chứng Chỉ
                </label>
                <input
                  type="text"
                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                  value={certification.certification}
                  onChange={(e) =>
                    setCertification((prev) => ({
                      ...prev,
                      certification: e.target.value,
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
                    Tổ chức
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                    value={certification.organization}
                    onChange={(e) =>
                      setCertification((prev) => ({
                        ...prev,
                        organization: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    Thời gian
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
                  value={certification.linkCertification}
                  onChange={(e) =>
                    setCertification((prev) => ({
                      ...prev,
                      linkCertification: e.target.value,
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
        {allCertification?.map((certification: Certification) => (
          <div
            key={certification._id}
            className="group my-4 cursor-pointer rounded-md p-2 transition duration-300 hover:bg-[#f8f9fa]"
          >
            <div className="mb-2 flex items-center gap-4">
              <Image
                src={certification.logo}
                alt="logo"
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div className="flex flex-1 justify-between">
                <div>
                  <h3 className="font-medium">{certification.certification}</h3>
                  <p className="text-sm text-gray-500">
                    {certification.organization}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {certification.fromDate && (
                      <span>{certification.fromDate}</span>
                    )}
                  </div>
                  <Link
                    href={certification.linkCertification}
                    target="_blank"
                    className="transition-colors duration-300 group-hover:text-blue-500"
                  >
                    Đường Dẫn Chứng Chỉ
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <GoPencil
                    className="cursor-pointer text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    size={20}
                    onClick={() => handleEdit(certification)}
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
                        <DialogTitle>Xóa Chứng Chỉ</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 px-6">
                        <div className="flex flex-col gap-1">
                          <p className="text-base">
                            Bạn có muốn xóa chứng chỉ này không
                          </p>
                        </div>
                      </div>

                      <DialogFooter className="px-6 py-4">
                        <Button
                          className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                          onClick={() => handleDelete(certification._id)}
                        >
                          Xóa
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Certification;
