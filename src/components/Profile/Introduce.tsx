"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { JwtPayload } from "@/utils/Types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { GoPlusCircle } from "react-icons/go";

type Introduce = {
  data: string;
};

const Introduce = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [introduce, setIntroduce] = useState<Introduce>({
    data: "",
  });
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const updateItem = async (item: Introduce) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-introduce/${decodedToken?.userid}`,
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

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Cập nhật mục tiêu nghề nghiệp thành công ");
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

  useEffect(() => {
    if (data && data.introduce) {
      setIntroduce(data.introduce);
    }
  }, [data]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const handleAdd = () => {
    updateMutation.mutate(introduce);
  };

  const handleSave = () => {
    handleAdd();
  };

  return (
    <>
      <div className="rounded-md bg-white p-4">
        <p className="text-xl font-bold">Mục Tiêu Nghề Nghiệp</p>
        <p className="my-3 text-xs font-normal italic">
          Giới thiệu bản thân và mục tiêu nghề nghiệp của bạn
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2">
              <GoPlusCircle className="text-blue-600" size={24} />
              <span className="text-sm font-bold text-blue-600">
                Thêm Giới thiệu bản thân
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
              <DialogTitle>Mục Tiêu Nghề Nghiệp</DialogTitle>
            </DialogHeader>
            <div className="px-6">
              <div className="overflow-hidden rounded-md border border-gray-300">
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={introduce.data}
                  onChange={(value) =>
                    setIntroduce((prev) => ({
                      ...prev,
                      data: value,
                    }))
                  }
                />
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
        {introduce?.data ? (
          <div
            dangerouslySetInnerHTML={{
              __html: introduce.data,
            }}
          />
        ) : (
          <p className="mt-4 text-sm">Chưa có mục tiêu nghề nghiệp</p>
        )}
      </div>
    </>
  );
};

export default Introduce;
