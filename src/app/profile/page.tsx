"use client";
import UserSidebar from "@/components/UserSidebar/UserSidebar";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FaUser, FaRegPenToSquare, FaPen } from "react-icons/fa6";
import { FiPhone, FiGift, FiUser } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineLocationOn, MdMailOutline } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { IoClose } from "react-icons/io5";

type ProficiencyLevel = "thanh-thao" | "trung-binh" | "moi-bat-dau";

const Profile = () => {
  const [date, setDate] = React.useState<Date>();
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const [skillName, setSkillName] = useState<string>("");
  const [proficiency, setProficiency] = useState<ProficiencyLevel | "">("");
  const [skills, setSkills] = useState<Record<ProficiencyLevel, string[]>>({
    "thanh-thao": [],
    "trung-binh": [],
    "moi-bat-dau": [],
  });

  const handleAddSkill = () => {
    if (skillName && proficiency) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [proficiency]: [...prevSkills[proficiency], skillName],
      }));
      setSkillName("");
      setProficiency("");
    }
  };

  const handleProficiencyChange = (value: string) => {
    setProficiency(value as ProficiencyLevel);
  };

  const handleRemoveSkill = (level: ProficiencyLevel, index: number) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [level]: prevSkills[level].filter((_, i) => i !== index),
    }));
  };
  return (
    <>
      <div className="bg-[#F7F8FA]">
        <div className="container py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <UserSidebar />
            </div>
            <div className="col-span-3 flex flex-col gap-3">
              <div className="rounded-md bg-[#f1f2f4] p-4">
                <div className="flex items-center gap-6 rounded-md bg-white p-4">
                  <FaUser color="#EEEEEE" size={80} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xl font-bold">Nguyễn Tân Khoa</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <FaRegPenToSquare
                            color="#ed1b2f"
                            className="cursor-pointer"
                          />
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl p-0">
                          <DialogHeader className="border-b border-gray-300 px-6 py-4">
                            <DialogTitle className="text-xl">
                              Thông tin cá nhân
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex items-center gap-6 px-6">
                            <div className="flex flex-col items-center gap-3">
                              <FaUser color="#EEEEEE" size={100} />
                              <button className="rounded-full p-3 outline-none transition duration-300 hover:bg-[#e9e9f2]">
                                <FaPen color="grey" />
                              </button>
                            </div>
                            <div className="flex flex-1 flex-col gap-6">
                              <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-1 flex flex-col gap-1">
                                  <label htmlFor="" className="text-sm">
                                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                      *
                                    </span>
                                    Họ
                                  </label>
                                  <input
                                    type="text"
                                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                                  />
                                </div>
                                <div className="col-span-1 flex flex-col gap-1">
                                  <label htmlFor="" className="text-sm">
                                    <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                      *
                                    </span>
                                    Tên
                                  </label>
                                  <input
                                    type="text"
                                    className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                                  />
                                </div>
                              </div>
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Chức Danh
                                </label>
                                <input
                                  type="text"
                                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                                />
                              </div>
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Địa chỉ email
                                </label>
                                <input
                                  type="text"
                                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-4 px-6">
                            <div className="grid grid-cols-2 gap-5">
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Số điện thoại
                                </label>
                                <input
                                  type="text"
                                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                                />
                              </div>
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Ngày sinh
                                </label>
                                <input
                                  type="text"
                                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Số điện thoại
                                </label>
                                <input
                                  type="text"
                                  className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                                />
                              </div>
                              <div className="col-span-1 flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">
                                  <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                                    *
                                  </span>
                                  Ngày sinh
                                </label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                        !date && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {date ? (
                                        format(date, "dd/MM/yyyy")
                                      ) : (
                                        <span>Ngày sinh</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown-buttons"
                                      selected={date}
                                      onSelect={setDate}
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
                                Địa chỉ
                              </label>
                              <input
                                type="text"
                                className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                            <DialogClose asChild>
                              <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                                Hủy
                              </Button>
                            </DialogClose>
                            <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                              Lưu
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="my-1">Chức danh</p>

                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <div className="my-1 flex items-center gap-2 text-gray-400">
                          <MdMailOutline />
                          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                            nguyentankhoa2002@gmail.com
                          </p>
                        </div>
                        <div className="my-1 flex items-center gap-2 text-gray-400">
                          <FiGift />
                          Ngày sinh
                        </div>
                        <div className="my-1 flex items-center gap-2 text-gray-400">
                          <MdOutlineLocationOn />
                          Địa chỉ
                        </div>
                      </div>

                      <div>
                        <div className="my-1 flex items-center gap-2 text-gray-400">
                          <FiPhone />
                          Số điện thoại
                        </div>
                        <div className="my-1 flex items-center gap-2 text-gray-400">
                          <FiUser />
                          Giới tính
                        </div>
                        <div className="my-1 flex items-center gap-2 text-gray-400">
                          <RiGraduationCapLine />
                          Bằng cấp cao nhất
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Giới Thiệu Bản Thân</p>
                <p className="my-3 text-xs font-normal italic">
                  Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn{" "}
                </p>
                <Dialog>
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
                      <DialogTitle>Giới thiệu bản thân</DialogTitle>
                    </DialogHeader>
                    <div className="px-6">
                      <p className="mb-4 font-medium">
                        <span className="font-semibold text-[#FF9119]">
                          Tip:
                        </span>{" "}
                        Tóm tắt kinh nghiệm chuyên môn, chú ý làm nổi bật các kỹ
                        năng và điểm mạnh.
                      </p>
                      <div className="overflow-hidden rounded-md border border-gray-300">
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <p className="mt-2 text-start text-sm text-gray-500">
                        0/2000 từ
                      </p>
                    </div>
                    <DialogFooter className="border-t border-gray-300 px-6 py-4">
                      <DialogClose asChild>
                        <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                          Hủy
                        </Button>
                      </DialogClose>
                      <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Mục Tiêu Nghề Nghiệp</p>
                <p className="my-3 text-xs font-normal italic">
                  Giới thiệu bản thân và mục tiêu nghề nghiệp của bạn
                </p>
                <Dialog>
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
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <p className="mt-2 text-start text-sm text-gray-500">
                        0/2000 từ
                      </p>
                    </div>
                    <DialogFooter className="border-t border-gray-300 px-6 py-4">
                      <DialogClose asChild>
                        <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                          Hủy
                        </Button>
                      </DialogClose>
                      <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Kinh Nghiệm Làm Việc</p>
                <p className="my-3 text-xs font-normal italic">
                  Mô tả kinh nghiệm làm việc của bạn càng chi tiết càng tốt,
                  điều đó giúp bạn có cơ hội hiển thị nhiều hơn trong kết quả
                  tìm kiếm
                </p>
                <Dialog>
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
                    <div className="px-6">
                      <div className="overflow-hidden rounded-md border border-gray-300">
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <p className="mt-2 text-start text-sm text-gray-500">
                        0/2000 từ
                      </p>
                    </div>
                    <DialogFooter className="border-t border-gray-300 px-6 py-4">
                      <DialogClose asChild>
                        <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                          Hủy
                        </Button>
                      </DialogClose>
                      <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Học Vấn</p>
                <p className="my-3 text-xs font-normal italic">
                  Mô tả toàn bộ quá trình học vấn của bạn, cũng như các bằng cấp
                  bạn đã được và các khóa huấn luyện bạn đã tham gia
                </p>
                <Dialog>
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
                      <DialogTitle>Học vấn</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 px-6">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-sm">
                          <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                            *
                          </span>
                          Trường
                        </label>
                        <input
                          type="text"
                          className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Chuyên Ngành
                          </label>
                          <input
                            type="text"
                            className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                          />
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Ngày sinh
                          </label>
                          <Select>
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn trình độ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trung-hoc">
                                Trung học
                              </SelectItem>
                              <SelectItem value="trung-cap">
                                Trung cấp
                              </SelectItem>
                              <SelectItem value="cao-dang">Cao đẳng</SelectItem>
                              <SelectItem value="cu-nhan">Cử nhân</SelectItem>
                              <SelectItem value="thac-si">Thạc sĩ</SelectItem>
                              <SelectItem value="tien-si">Tiến sĩ</SelectItem>
                              <SelectItem value="khac">Khác</SelectItem>
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
                            Từ lúc
                          </label>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "dd/MM/yyyy")
                                ) : (
                                  <span>Ngày/Tháng/Năm</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={date}
                                onSelect={setDate}
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
                            Đến lúc
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "dd/MM/yyyy")
                                ) : (
                                  <span>Ngày/Tháng/Năm</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={date}
                                onSelect={setDate}
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="border-t border-gray-300 px-6 py-4">
                      <DialogClose asChild>
                        <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                          Hủy
                        </Button>
                      </DialogClose>
                      <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Dự Án</p>
                <p className="my-3 text-xs font-normal italic">
                  Mô tả các dự án nổi bật của bạn nhằm thu hút nhà tuyển dụng
                </p>
                <Dialog>
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
                          Trường
                        </label>
                        <input
                          type="text"
                          className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Từ lúc
                          </label>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "dd/MM/yyyy")
                                ) : (
                                  <span>Ngày/Tháng/Năm</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={date}
                                onSelect={setDate}
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
                            Đến lúc
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "shadow-none h-10 rounded-md justify-start text-left hover:bg-transparent  font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "dd/MM/yyyy")
                                ) : (
                                  <span>Ngày/Tháng/Năm</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={date}
                                onSelect={setDate}
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-md border border-gray-300">
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                      </div>
                      <p className="text-start text-sm text-gray-500">
                        0/5000 từ
                      </p>
                    </div>
                    <DialogFooter className="border-t border-gray-300 px-6 py-4">
                      <DialogClose asChild>
                        <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                          Hủy
                        </Button>
                      </DialogClose>
                      <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Kỹ Năng</p>
                <p className="my-3 text-xs font-normal italic">
                  Trong phần này, bạn nên liệt kê các kỹ năng phù hợp với vị trí
                  hoặc lĩnh vực nghề nghiệp mà bạn quan tâm.
                </p>
                <Dialog>
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
                      <div className="grid grid-cols-5 gap-5">
                        <div className="col-span-2 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Tên Kỹ Năng
                          </label>
                          <input
                            type="text"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            className="h-10 rounded-md border border-solid px-3 outline-none focus:border-sky-400"
                          />
                        </div>
                        <div className="col-span-2 flex flex-col gap-1">
                          <label htmlFor="" className="text-sm">
                            <span className="-top-1 mr-1 inline-block text-[#dc362e]">
                              *
                            </span>
                            Mức Độ Thành Thạo
                          </label>
                          <Select
                            value={proficiency}
                            onValueChange={handleProficiencyChange}
                          >
                            <SelectTrigger className="h-10 bg-white shadow-none focus:ring-0">
                              <SelectValue placeholder="Vui lòng chọn trình độ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="moi-bat-dau">
                                Mới bắt đầu
                              </SelectItem>
                              <SelectItem value="trung-binh">
                                Trung bình
                              </SelectItem>
                              <SelectItem value="thanh-thao">
                                Thành thạo
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex flex-1 flex-col justify-end gap-1">
                          <Button
                            onClick={handleAddSkill}
                            className="h-10 border border-solid border-orange-400 bg-white text-orange-400 shadow-none hover:bg-orange-50"
                          >
                            Thêm
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 px-6">
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">
                          Thành thạo (hơn 3 năm kinh nghiệm)
                        </p>
                        <div className="flex gap-2">
                          {skills["thanh-thao"].length > 0 ? (
                            skills["thanh-thao"].map((skill, index) => (
                              <button
                                key={index}
                                className="flex w-fit items-center gap-1 rounded-md border border-solid border-orange-500 bg-white px-3 py-2 text-sm text-amber-500"
                                onClick={() =>
                                  handleRemoveSkill("thanh-thao", index)
                                }
                              >
                                {skill} <IoClose size={20} />
                              </button>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              Chưa thêm kỹ năng nào
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">
                          Trung bình (1 - 3 kinh nghiệm)
                        </p>
                        <div className="flex gap-2">
                          {skills["trung-binh"].length > 0 ? (
                            skills["trung-binh"].map((skill, index) => (
                              <button
                                key={index}
                                className="flex w-fit items-center gap-1 rounded-md border border-solid border-orange-500 bg-white px-3 py-2 text-sm text-amber-500"
                                onClick={() =>
                                  handleRemoveSkill("trung-binh", index)
                                }
                              >
                                {skill} <IoClose size={20} />
                              </button>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              Chưa thêm kỹ năng nào
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">
                          Mới bắt đầu (ít hơn 1 năm kinh nghiệm)
                        </p>
                        <div className="flex gap-2">
                          {skills["moi-bat-dau"].length > 0 ? (
                            skills["moi-bat-dau"].map((skill, index) => (
                              <button
                                key={index}
                                className="flex w-fit items-center gap-1 rounded-md border border-solid border-orange-500 bg-white px-3 py-2 text-sm text-amber-500"
                                onClick={() =>
                                  handleRemoveSkill("moi-bat-dau", index)
                                }
                              >
                                {skill} <IoClose size={20} />
                              </button>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              Chưa thêm kỹ năng nào
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="border-t border-gray-300 px-6 py-4">
                      <DialogClose asChild>
                        <Button className="bg-[#f1f2f4] text-black shadow-none hover:bg-slate-200">
                          Hủy
                        </Button>
                      </DialogClose>
                      <Button className="bg-orange-400 text-white shadow-none hover:bg-orange-500">
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md bg-white p-4">
                <p className="text-xl font-bold">Ngoại Ngữ</p>
                <p className="my-3 text-xs font-normal italic">
                  Cập nhật thông tin ngoại ngữ, điều này sẽ giúp tăng triển vọng
                  tìm kiếm công việc.
                </p>
                <button className="flex items-center gap-2">
                  <GoPlusCircle className="text-blue-600" size={24} />
                  <span className="text-sm font-bold text-blue-600">
                    Thêm Ngoại Ngữ
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
