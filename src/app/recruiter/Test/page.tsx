"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "react-toastify";
import { title } from "process";
import { chatSessionCreate } from "../../ai/createJobAi";
import { chatSessionTest } from "../../ai/Test";

import * as XLSX from 'xlsx';
import CreateJobPostAI from "../create-jobpost-ai/page";
const Login = () => {

    // const [keywords, setKeywords] = useState('');
    const [title, settitle] = useState('');
    const [jobField, setJobField] = useState('');
    const [recommendations, setRecommendations] = useState([
    ]);
    const [formData, setFormData] = useState('');
    const router = useRouter();
    const keywords = ["Anh Văn"];
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/recommend-jobs`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // title,
                        keywords,
                        // jobField,
                    }),
                }
            );
            // const response = await axios.post('/api/ai/recommend-jobs', {
            //     keywords,
            //     skills,
            //     experience
            // });
            const data = await res.json();
            setRecommendations(data);
        } catch (error) {
            console.error(error);
        }
    };
    let debounceTimeout: NodeJS.Timeout;

    const handleInputChange = async (e: any) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(async () => {
            if (e.target.value.length > 1) {
                const message = `Gợi ý cho tôi 20 từ khóa về kỹ năng và nghề nghiệp có chứa từ ${e.target.value} thuộc lĩnh vực Công nghệ thông tin`;
                const result = await chatSessionCreate.sendMessage(message);
                console.log(result?.response?.text());
            }
        }, 250);
    };
    const [data, setData] = useState([]);
    const extractedValues = [''];
    const handleFileUpload = async (e: any) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = async (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData: any = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
            parsedData.forEach((data: any, index: any) => {
                Object.keys(data).forEach((key) => {
                    extractedValues.push(data[key]);
                    console.log(`${key}: ${data[key]}`);
                });
            });

            const message = `Phân tích dữ liệu sau và đưa thông tin về định đạng đã được cung cấp ở trên ${extractedValues}`;
            const result = await chatSessionCreate.sendMessage(message);
            console.log(result?.response?.text());
            const Test = JSON.parse(result?.response?.text())
            // router.push("/recruiter/create-jobpost-ai")
        };

    }
    const Test = async () => {
        console.log(data)
    }
    const DataTest = require("../../ai/DataTest.json");

    const Test1 = async () => {
        // const res = await fetch(
        //     "http://localhost:3001/api/jobpost/get-all-jobpost"
        // );
        // const data = await res.json();
        // console.log(DataTest)
        const dataTestString = JSON.stringify(DataTest);
        const result = await chatSessionTest.sendMessage(`Tôi có kỹ năng C#, Java. bạn nghĩ tôi phù hợp những công việc gì`);
        console.log(result?.response?.text());
    }
    return (
        <div>
            <h1>Gợi ý công việc</h1>
            <button onClick={Test}>Test</button>
            <button onClick={Test1}>Test1</button>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="skills">Kỹ năng:</label>
                    <input type="text" id="skills" value={title} onChange={e => settitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="keywords">Từ khóa tìm kiếm:</label>
                    {/* <input type="text" id="keywords" value={keywords} onChange={e => setKeywords(e.target.value)} /> */}
                </div>
                <div>
                    <label htmlFor="experience">Kinh nghiệm:</label>
                    <input type="text" id="experience" value={jobField} onChange={e => setJobField(e.target.value)} />
                </div>
                <button type="submit">Gợi ý</button>
            </form>
            <h2>Kết quả:</h2>
            <ul>
                {recommendations.map(job => (
                    // <li key={job._id}>{job.title}</li>
                    <></>
                ))}
            </ul>
            <div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                        Thẻ từ khóa{" "}
                        <span className="text-gray-500">
                            (Tối đa 5 thẻ)
                        </span>{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center rounded border border-gray-300 p-2">
                        <input
                            type="text"
                            onChange={handleInputChange}
                            className="flex-grow p-2 outline-none"
                        />
                    </div>
                </div>
            </div>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />

            {data.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index}>{ }</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Login;
