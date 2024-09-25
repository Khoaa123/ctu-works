"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StatData = {
  name: string;
  value: number;
  change: number;
};

type ChartData = {
  name: string;
  newUsers: number;
  newJobs: number;
  applications: number;
};

type JobCategoryData = {
  name: string;
  value: number;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Reports = () => {
  const fetchStats = async (): Promise<StatData[]> => {
    return [
      { name: "Tổng số người dùng", value: 10000, change: 5.2 },
      { name: "Người dùng mới (tháng này)", value: 500, change: 2.1 },
      { name: "Tin tuyển dụng mới (tháng này)", value: 200, change: -1.5 },
      { name: "Tổng số ứng tuyển", value: 5000, change: 7.8 },
    ];
  };

  const fetchChartData = async (): Promise<ChartData[]> => {
    return [
      { name: "T1", newUsers: 400, newJobs: 240, applications: 1000 },
      { name: "T2", newUsers: 300, newJobs: 139, applications: 800 },
      { name: "T3", newUsers: 200, newJobs: 980, applications: 1200 },
      { name: "T4", newUsers: 278, newJobs: 390, applications: 900 },
      { name: "T5", newUsers: 189, newJobs: 480, applications: 1100 },
      { name: "T6", newUsers: 239, newJobs: 380, applications: 1300 },
      { name: "T7", newUsers: 349, newJobs: 430, applications: 1500 },
    ];
  };

  const fetchJobCategoryData = async (): Promise<JobCategoryData[]> => {
    return [
      { name: "IT", value: 400 },
      { name: "Marketing", value: 300 },
      { name: "Sales", value: 300 },
      { name: "Finance", value: 200 },
      { name: "Other", value: 100 },
    ];
  };

  const { data: stats } = useQuery<StatData[]>({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  const { data: chartData } = useQuery<ChartData[]>({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  const { data: jobCategoryData } = useQuery<JobCategoryData[]>({
    queryKey: ["jobCategoryData"],
    queryFn: fetchJobCategoryData,
  });

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Báo cáo thống kê</h1>
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value.toLocaleString()}
              </div>
              <p
                className={`text-xs ${
                  stat.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change > 0 ? "↑" : "↓"} {Math.abs(stat.change)}% so với
                tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="jobs">Việc làm</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê tổng quan</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
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
                    dataKey="newUsers"
                    stroke="#8884d8"
                    name="Người dùng mới"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="newJobs"
                    stroke="#82ca9d"
                    name="Tin tuyển dụng mới"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="applications"
                    stroke="#ffc658"
                    name="Số lượng ứng tuyển"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê người dùng mới</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="newUsers"
                    fill="#8884d8"
                    name="Người dùng mới"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phân bố việc làm theo ngành nghề</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={jobCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {jobCategoryData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thống kê tin tuyển dụng mới</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="newJobs"
                    fill="#82ca9d"
                    name="Tin tuyển dụng mới"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
