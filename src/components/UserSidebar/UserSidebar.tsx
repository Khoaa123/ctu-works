import React from "react";
import {
  FaCircleUser,
  FaClipboardCheck,
  FaBookmark,
  FaBell,
} from "react-icons/fa6";
import { RiFileUserFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

const UserSidebar = () => {
  return (
    <>
      <div className="flex flex-col gap-[6px]">
        <div className="flex flex-col gap-4 rounded-md bg-[#4a80f8] p-4">
          <div className="flex items-center gap-4">
            <FaCircleUser color="#CCDEFF" size={60} />
            <span className="text-white"> Nguyễn Tân Khoa</span>
          </div>
          <div className="flex flex-col items-start gap-1 rounded-md bg-white p-4">
            <p className="text-base">Bật chế độ tìm việc</p>
            <p className="text-xs text-gray-400">
              Hồ sơ chưa đủ điều kiện cho phép tìm việc
            </p>
            <button className="text-xs text-blue-400">Thiết lập hồ sơ</button>
          </div>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <div className="flex items-center gap-3">
            <RiFileUserFill color="grey" size={20} />
            <p>Hồ sơ của tôi</p>
          </div>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <div className="flex items-center gap-3">
            <FaClipboardCheck color="grey" size={20} />
            <p>Lịch sử ứng tuyển</p>
          </div>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <div className="flex items-center gap-3">
            <FaBookmark color="grey" size={20} />
            <p>Công việc đã lưu</p>
          </div>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <div className="flex items-center gap-3">
            <FaBell color="grey" size={20} />
            <p>Cài đặt thông báo việc làm</p>
          </div>
        </div>
        <div className="cursor-pointer rounded-md border bg-white p-4 transition duration-300 hover:border-sky-200 hover:bg-[#ebf2ff]">
          <div className="flex items-center gap-3">
            <BiLogOut color="grey" size={20} />
            <p>Đăng xuất</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
