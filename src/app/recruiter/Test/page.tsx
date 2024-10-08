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
import { chatSession } from "../../ai/keyWordSuggest";
const Login = () => {

    // const [keywords, setKeywords] = useState('');
    const [title, settitle] = useState('');
    const [jobField, setJobField] = useState('');
    const [recommendations, setRecommendations] = useState([
    ]);
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
                const result = await chatSession.sendMessage(message);
                console.log(result?.response?.text());
            }
        }, 250);
    };

    return (
        <div>
            <h1>Gợi ý công việc</h1>
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
        </div>
    );
};

export default Login;
