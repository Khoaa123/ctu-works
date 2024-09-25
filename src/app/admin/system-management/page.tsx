"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type SystemSettings = {
  maintenanceMode: boolean;
  registrationOpen: boolean;
  maxJobPostingsPerUser: number;
  jobPostingApprovalRequired: boolean;
};

const SystemManagement = () => {
  const fetchSystemSettings = async (): Promise<SystemSettings> => {
    return {
      maintenanceMode: false,
      registrationOpen: true,
      maxJobPostingsPerUser: 500,
      jobPostingApprovalRequired: true,
    };
  };

  const {
    data: settings,
    isLoading,
    isError,
  } = useQuery<SystemSettings>({
    queryKey: ["systemSettings"],
    queryFn: fetchSystemSettings,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading system settings</div>;

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Quản lý hệ thống</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt chung</CardTitle>
            <CardDescription>
              Quản lý các cài đặt chung của hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-mode">Chế độ bảo trì</Label>
                <Switch
                  id="maintenance-mode"
                  // checked={settings?.maintenanceMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="registration-open">Mở đăng ký</Label>
                <Switch
                  id="registration-open"
                  // checked={settings?.registrationOpen}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-job-postings">
                  Số lượng tin đăng tối đa mỗi người dùng
                </Label>
                <Input
                  id="max-job-postings"
                  type="number"
                  value={settings?.maxJobPostingsPerUser}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="job-approval">
                  Yêu cầu phê duyệt tin tuyển dụng
                </Label>
                <Switch
                  id="job-approval"
                  // checked={settings?.jobPostingApprovalRequired}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quản lý dữ liệu</CardTitle>
            <CardDescription>
              Thực hiện các thao tác quản lý dữ liệu hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Sao lưu dữ liệu
              </Button>
              <Button variant="outline" className="w-full">
                Khôi phục dữ liệu
              </Button>
              <Button variant="outline" className="w-full">
                Xóa cache
              </Button>
              <Button variant="destructive" className="w-full">
                Đặt lại hệ thống
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemManagement;
