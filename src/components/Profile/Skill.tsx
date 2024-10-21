"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { GoPencil, GoPlusCircle, GoTrash } from "react-icons/go";

type SkillRequest = {
  skillName: string;
  skillLevel: number;
};

type Skills = SkillRequest & {
  _id: string;
};

type updateSkill = SkillRequest & {
  skillsId: string;
};

const Skill = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skills, setSkills] = useState<SkillRequest>({
    skillName: "",
    skillLevel: 1,
  });
  const [allSkill, setAllSkill] = useState<Skills[]>([]);
  const [editingSkillsId, setEditingSkillsId] = useState<string | null>(null);
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

  const addItem = async (item: SkillRequest) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-skills/${decodedToken?.userid}`,
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

  const updateItem = async (item: updateSkill) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-skills/${decodedToken?.userid}`,
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete-skills/${decodedToken?.userid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillsId: id }),
      }
    );
    return res.json();
  };

  const createMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      if (data.status === "OK") {
        toast.success("Thêm kỹ năng thành công ");
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
        toast.success("Cập nhật kỹ năng thành công");
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
        toast.success("Xóa kỹ năng thành công");
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
    if (data) {
      setAllSkill(data.skills);
    }
  }, [data]);

  const handleEdit = (item: Skills) => {
    setSkills(item);
    setEditingSkillsId(item._id);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    createMutation.mutate(skills, {
      onSuccess: () => {
        setSkills({
          skillName: "",
          skillLevel: 1,
        });
        setEditingSkillsId(null);
      },
    });
  };

  const handleSave = () => {
    if (editingSkillsId) {
      updateMutation.mutate({
        ...skills,
        skillsId: editingSkillsId,
      });
    } else {
      handleAdd();
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleLevelChange = (level: number) => {
    setSkills({ ...skills, skillLevel: level });
  };
  return (
    <>
      <div className="rounded-md bg-white p-4">
        <p className="text-xl font-bold">Kỹ Năng</p>
        <p className="my-3 text-xs font-normal italic">
          Trong phần này, bạn nên liệt kê các kỹ năng phù hợp với vị trí hoặc
          lĩnh vực nghề nghiệp mà bạn quan tâm.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2">
              <GoPlusCircle className="text-blue-600" size={24} />
              <span className="text-sm font-bold text-blue-600">
                Thêm Kỹ Năng
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="flex justify-between border-b border-gray-300 px-6 py-4">
              <DialogTitle>Kỹ Năng</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 px-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="" className="text-sm">
                    Tên Kỹ Năng
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                    value={skills.skillName}
                    onChange={(e) =>
                      setSkills((prev) => ({
                        ...prev,
                        skillName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-span-1 flex flex-1 items-center gap-2">
                  <div className="w-3/4">
                    <label htmlFor="" className="text-sm">
                      <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                        *
                      </span>
                      Mức Độ Thành Thạo{" "}
                      <span className="text-amber-400">
                        {skills.skillLevel}/5
                      </span>
                    </label>
                    <div className="flex items-center gap-[2px]">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          onClick={() => handleLevelChange(level)}
                          className={`h-10 w-1/5 transition-colors duration-300 cursor-pointer 
                            ${
                              level <= skills.skillLevel
                                ? "bg-[#ff7d55]"
                                : "bg-[#fff2ee]"
                            }
                            ${level === 1 ? "rounded-l-md" : ""}
                            ${level === 5 ? "rounded-r-md" : ""}
                          `}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex h-full items-end">
                    <Button
                      className="h-10 border border-solid border-orange-400 bg-white text-orange-400 shadow-none hover:bg-orange-50"
                      onClick={handleSave}
                    >
                      Thêm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="border-t border-gray-300 px-6 py-4">
              <DialogClose asChild>
                <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                  Hủy
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div>
          {allSkill?.map((item) => (
            <div
              key={item._id}
              className="group mt-3 flex w-fit gap-3 rounded-md border border-b border-solid bg-[#FBFBFB] px-3 py-2 hover:bg-[#f5f3f4]"
            >
              <div className="flex items-center gap-2 text-sm">
                <span>{item.skillName}</span>-<span>{item.skillLevel}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <GoPencil
                  onClick={() => handleEdit(item)}
                  size={16}
                  color="#666"
                  className="cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
                      <DialogTitle>Xóa Kỹ Năng</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 px-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-base">
                          Bạn có muốn xóa kỹ năng này không
                        </p>
                      </div>
                    </div>

                    <DialogFooter className="px-6 py-4">
                      <Button
                        className="bg-orange-400 text-white shadow-none hover:bg-orange-500"
                        onClick={() => handleDelete(item._id)}
                      >
                        Xóa
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skill;
