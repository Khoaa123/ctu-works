import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaClipboardList,
  FaLayerGroup,
  FaCircleUser,
  FaBell,
  FaCartShopping,
  FaUser,
  FaEye,
  FaLock,
  FaLocationArrow,
  FaBuilding,
} from "react-icons/fa6";
import { RiRefreshLine } from "react-icons/ri";
import { FaCog, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

type JwtPayload = {
  userid: string;
  email: string;
  fullName: string;
  role: string;
};

type Notification = {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const HeaderRecruiter = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessTokenRecruiter");
  const decodedToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const userName = decodedToken?.fullName || "";
  const email = decodedToken?.email || "";
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) {
      router.push("/recruiter/login");
    }
  });
  const handleLogout = () => {
    cookies.remove("accessTokenRecruiter");
    cookies.remove("refreshTokenRecruiter");
    router.push("/recruiter/login");
  };

  const userId = decodedToken?.userid;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/notification/${userId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await res.json();
        setNotifications(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
      }
    };

    if (userId) fetchNotifications();

    const socket = io("http://localhost:3001");

    socket.on(`notification-${userId}`, (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/notification/read/${id}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu thông báo đã đọc:", error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <>
      <div className="bg-header-recruiter">
        <div className="container py-3">
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-[#d9d9d9]">
              <Link href="/recruiter">
                <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55]">
                  Dashboard
                </p>
              </Link>
              <Link href="/recruiter/job">
                <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55]">
                  Việc làm
                </p>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p className="cursor-pointer transition-colors duration-300 hover:text-[#ff7d55] data-[state=open]:text-[#ff7d55]">
                    Ứng viên
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <Link href="/recruiter/my-candidate">
                    <DropdownMenuItem className="flex items-center gap-3">
                      Ứng viên ứng tuyển{" "}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/recruiter/my-invite-candidate">
                    <DropdownMenuItem className="flex items-center gap-3">
                      Ứng viên đã gửi lời mời{" "}
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-4 text-white">
              <Link href="/recruiter/create-jobpost">
                <Button className="h-10 bg-[#ff7d55] hover:bg-[#fd6333] lg:min-w-32">
                  Đăng Tuyển Dụng
                </Button>
              </Link>
              <Link href="/recruiter/search">
                <Button className="h-10 bg-[#ff7d55] hover:bg-[#fd6333] lg:min-w-32">
                  Tìm Ứng Viên
                </Button>
              </Link>
              <Link href="/recruiter/create-jobpost-ai">
                <Button className="h-10 bg-[#ff7d55] hover:bg-[#fd6333] lg:min-w-32">
                  Đăng tuyển với AI
                </Button>
              </Link>
              <Link href="/recruiter/create-jobpost-voice">
                <Button className="h-10 bg-[#ff7d55] hover:bg-[#fd6333] lg:min-w-32">
                  Đăng tuyển bằng giọng nói
                </Button>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end gap-8">
              {/* <FaCartShopping size={24} className="cursor-pointer text-white" /> */}
              {/* <FaBell size={24} className="cursor-pointer text-white" /> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative flex cursor-pointer items-center justify-center rounded-full">
                    <FaBell size={24} className="cursor-pointer text-white" />
                    {unreadCount > 0 && (
                      <span className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 shadow-sm">
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold">Thông báo</h3>
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="mb-4 rounded-full bg-gray-200 p-4">
                          <FaBell size={24} color="#9CA3AF" />
                        </div>
                        <p className="text-center text-gray-500">
                          Bạn chưa có thông báo nào
                        </p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {notifications.map((notification) => (
                          <li
                            key={notification._id}
                            className={`cursor-pointer list-none rounded-md p-2 ${notification.isRead ? "bg-gray-100" : "bg-sky-100"
                              }`}
                            onClick={() => handleMarkAsRead(notification._id)}
                          >
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              {accessToken ? (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div>
                        <FaCircleUser
                          size={24}
                          className="cursor-pointer text-white"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="p-2 lg:min-w-[350px]"
                    >
                      <div className="flex flex-col items-start gap-1 border-b-2 border-teal-100 px-2 pb-2">
                        <p className="text-[#00b14f]">{userName}</p>
                        <p className="text-sm text-gray-400">{email}</p>
                      </div>
                      <Link href="/recruiter/profile">
                        <DropdownMenuItem className="my-[6px] flex cursor-pointer items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                          <FaUser size={16} color="#00b14f" />
                          Hồ sơ của tôi
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/recruiter/location">
                        <DropdownMenuItem className="my-[6px] flex cursor-pointer items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                          <FaBuilding size={16} color="#00b14f" />
                          Địa điểm làm việc
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/recruiter/history-view-user">
                        <DropdownMenuItem className="my-[6px] flex cursor-pointer items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                          <FaEye size={16} color="#00b14f" />
                          Các ứng viên đã xem gần đây
                        </DropdownMenuItem>
                      </Link>
                      {/* <DropdownMenuItem className="my-[6px] flex cursor-pointer items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                        <FaCog size={16} color="#00b14f" />
                        Cài đặt gợi ý việc làm
                      </DropdownMenuItem> */}
                      <Link href="/recruiter/change-password">

                        <DropdownMenuItem className="my-[6px] flex cursor-pointer items-center gap-3 bg-[#F6FAFB] p-3 font-medium">
                          <FaLock size={16} color="#00b14f" />
                          Đổi mật khẩu
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="my-[6px] flex cursor-pointer items-center gap-3 bg-[#F6FAFB] p-3 font-medium"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt
                          size={16}
                          color="#00b14f"
                          onClick={handleLogout}
                        />
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderRecruiter;
