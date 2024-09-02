import UserSidebar from "@/components/UserSidebar/UserSidebar";
import React from "react";
import { FaUser, FaRegPenToSquare } from "react-icons/fa6";
import { FiPhone, FiGift, FiUser } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineLocationOn, MdMailOutline } from "react-icons/md";

const Profile = () => {
  return (
    <>
      <div className="bg-[#F7F8FA]">
        <div className="container py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <UserSidebar />
            </div>
            <div className="col-span-2">
              <div className="rounded-md bg-[#f1f2f4] p-4">
                <div className="flex items-center gap-6 rounded-md bg-white p-4">
                  <FaUser color="#EEEEEE" size={80} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xl font-bold">Nguyễn Tân Khoa</p>
                      <FaRegPenToSquare
                        color="#ed1b2f"
                        className="cursor-pointer"
                      />
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
            </div>
            <div className="col-span-1">cột 1</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
