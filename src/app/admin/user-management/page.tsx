"use client";

import React, { useState, useMemo, useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, UserPlus } from "lucide-react";
import { FaChevronRight, FaChevronLeft, FaTrash } from "react-icons/fa6";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

type UserData = {
  _id: string;
  role: string;
  email: string;
  seekJobMode: boolean;
  isVerified: boolean;
  lastOnline: string;
  createdAt: string;
};

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [isOpen, setIsOpen] = useState(false);

  const [userDelete, setUserDelete] = useState('');
  const fetchAllUsers = async (): Promise<UserData[]> => {
    const res = await fetch(`http://localhost:3001/api/user/getAll`);
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery<UserData[]>({
    queryKey: ["getAllUsers"],
    queryFn: fetchAllUsers,
  });

  const filteredData = useMemo(() => {
    return (data || []).filter((user) =>
      user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const router = useRouter();
  const cookies = useCookies();
  useLayoutEffect(() => {
    const accessTokenAdmin = cookies.get("accessTokenAdmin");
    if (!accessTokenAdmin) {
      router.replace("/admin/login");
    }
    console.log("accessTokenAdmin", accessTokenAdmin);
  }, [cookies, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        Lỗi khi tải dữ liệu: {error?.message}
      </div>
    );
  }

  const openPopup = (id: any) => {
    setUserDelete(id)
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const fetchDeleteUser = async (userId: string) => {
    const res = await fetch(`http://localhost:3001/api/user/delete-user/${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
    return res.json();
  };
  const handleDeleteUser = async () => {
    const res = await fetchDeleteUser(userDelete);
    if(res.status === "OK"){
      toast.success("Xóa người dùng thành công")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }else{
      toast.error("Xóa người dùng thất bại")
    }
    closePopup();
  };
  const handleCancleDelete = () => {
    closePopup();
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 border-b border-indigo-200 pb-2 text-2xl font-bold text-indigo-700">
        Quản lý người dùng
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Input
            placeholder="Tìm kiếm theo email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="mr-2 max-w-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button variant="outline" onClick={() => setPage(1)}>
            <Search className="mr-2 h-4 w-4" /> Tìm kiếm
          </Button>
        </div>
        {/* <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          <UserPlus className="mr-2 h-4 w-4" /> Thêm người dùng
        </Button> */}
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Tìm việc</TableHead>
            <TableHead>Xác thực</TableHead>
            <TableHead>Lần cuối trực tuyến</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${user.seekJobMode
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {user.seekJobMode ? "Đang tìm việc" : "Không tìm việc"}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${user.isVerified
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {user.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                </span>
              </TableCell>
              <TableCell>
                {new Date(user.lastOnline).toLocaleString("vi-VN")}
              </TableCell>
              <TableCell>
                <button onClick={() => openPopup(user._id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </TableCell>
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-xl p-8 w-96">
                    <h2 className="text-lg font-bold mb-4">Bạn chắc chắn xóa người dùng này chứ?</h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleDeleteUser()}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Chắn chắn
                      </button>
                      <button
                        onClick={() => handleCancleDelete()}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!isOpen &&
        <div className="mt-5 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <FaChevronLeft />
          </Button>
          <span className="mx-4 flex items-center">
            Trang {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            <FaChevronRight />
          </Button>
        </div>
      }
    </div>
  );
};

export default UserManagement;
