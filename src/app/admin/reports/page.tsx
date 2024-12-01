"use client";

import React, { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

type Report = {
  totalUsers: number;
  newUsersThisMonth: number;
  newJobPostsThisMonth: number;
  totalJobPosts: number;
  totalApplications: number;
  userGrowthRate: number;
  jobPostGrowthRate: number;
  applicationGrowthRate: number;
  reportDate: string;
};

type MonthlyStat = {
  month: number;
  newUsers: number;
  newJobPosts: number;
};

const fetchLatestReport = async (): Promise<Report> => {
  const response = await fetch("http://localhost:3001/api/report/latest");
  if (!response.ok) {
    throw new Error("Failed to fetch latest report");
  }
  return response.json();
};

const fetchMonthlyStats = async (): Promise<MonthlyStat[]> => {
  const response = await fetch(
    "http://localhost:3001/api/report/monthly-stats"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch monthly stats");
  }
  return response.json();
};

export default function ReportsDashboard() {
  const { data: report, isLoading: isReportLoading } = useQuery<Report>({
    queryKey: ["latestReport"],
    queryFn: fetchLatestReport,
  });

  const { data: monthlyStats, isLoading: isMonthlyStatsLoading } = useQuery<
    MonthlyStat[]
  >({
    queryKey: ["monthlyStats"],
    queryFn: fetchMonthlyStats,
  });

  if (isReportLoading || isMonthlyStatsLoading) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      name: "Tổng số người dùng",
      value: report?.totalUsers || 0,
      // change: report?.userGrowthRate || 0,
    },
    {
      name: "Người dùng mới (tháng này)",
      value: report?.newUsersThisMonth || 0,
      // change: report?.userGrowthRate || 0,
    },
    {
      name: "Tổng số tin tuyển dụng",
      value: report?.totalJobPosts || 0,
      // change: report?.jobPostGrowthRate || 0,
    },
    {
      name: "Tin tuyển dụng mới (tháng này)",
      value: report?.newJobPostsThisMonth || 0,
      // change: report?.jobPostGrowthRate || 0,
    },
    {
      name: "Tổng số ứng tuyển",
      value: report?.totalApplications || 0,
      // change: report?.applicationGrowthRate || 0,
    },
  ];

  const monthNames = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ];
  const chartData =
    monthlyStats?.map((stat) => ({
      name: monthNames[stat.month - 1],
      "Người dùng mới": stat.newUsers,
      "Tin tuyển dụng mới": stat.newJobPosts,
    })) || [];

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Báo cáo thống kê</h1>
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value.toLocaleString()}
              </div>
              {/* <p
                className={`text-xs ${
                  stat.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change > 0 ? "↑" : "↓"} {Math.abs(stat.change).toFixed(2)}
                % so với tháng trước
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="users">Người dùng mới</TabsTrigger>
          <TabsTrigger value="jobs">Tin tuyển dụng mới</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê tổng quan</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="Người dùng mới"
                    stroke="#8884d8"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="Tin tuyển dụng mới"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê người dùng mới theo tháng</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Người dùng mới" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê tin tuyển dụng mới theo tháng</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Tin tuyển dụng mới" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
