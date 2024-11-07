// pages/chatbot.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { chatSessionTest } from "../../../ai/Test";
const Chatbot = () => {
    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobpost/get-all-jobpost`
                );
                const data = await res.json();
                if (data.status === "OK") {
                    setJobPosts(data.data);
                } else {
                    console.error("Failed to fetch job posts");
                }
            } catch (error) {
                console.error("Error fetching job posts:", error);
            }
        };

        fetchJobPosts();
    }, []);
    const [messages, setMessages] = useState<any>([]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const [detailsCompany, setDetailsCompany] = useState([{
        companyLogo: "",
        companyName: "",
        companyScale: "",
        companyIndustries: "",
        fullName: "",
        companyAddress: "",
        companyDescription: "",
        following: -1,
        follower: [],
        recruiterId: "",
        _id: "",
    }]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDetailsCompany();
            setDetailsCompany(data.data);
        };
        fetchData();
    }, []);

    const fetchDetailsCompany = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiter/get-all-company`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.json();
    };
    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        try {

            setMessages((prevMessages: any) => [...prevMessages, { sender: 'user', content: userInput }]);
            setUserInput('');
            setIsTyping(true);
            const result = await chatSessionTest(jobPosts, detailsCompany).sendMessage(`${userInput}`);
            console.log(result?.response?.text().replace(/\*/g, '\n'));
            const data = result?.response?.text().replace(/\*/g, '\n');

            setMessages((prevMessages: any) => [...prevMessages, { sender: 'bot', content: data }]);
            setIsTyping(false);
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            setIsTyping(false);
        }
    };
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current && showChat) {
            inputRef.current.focus();
        }
    }, [showChat]);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {showChat && (
                <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden relative ml-4">
                    <div className="bg-indigo-500 text-white py-3 px-4 text-center font-bold relative">
                        Chatbot
                        <button
                            className="absolute top-2 right-4 text-white hover:text-gray-100"
                            onClick={() => setShowChat(false)}
                        >
                            X
                        </button>
                    </div>
                    <div className="p-4 h-96 overflow-y-auto" id="chat-log">
                        {messages.map((message: any, index: any) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    } mb-2`}
                            >
                                <div
                                    className={`${message.sender === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200'
                                        } rounded-lg py-2 px-4 max-w-xs`}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: message.content ?? "",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start mb-2">
                                <div className="bg-gray-200 rounded-lg py-2 px-4 max-w-xs">
                                    <span className="animate-pulse">...</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="px-4 py-3 bg-gray-100 flex">
                        <input
                            type="text"
                            className="flex-grow px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                            placeholder="Nhập tin nhắn..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="bg-indigo-500 text-white px-4 rounded-r-md hover:bg-indigo-600 focus:outline-none"
                            onClick={sendMessage}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
            <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none absolute bottom-4 right-4" // Thêm absolute, bottom-4, right-4
                onClick={() => setShowChat(!showChat)}
            >
                Chat với hỗ trợ AI
            </button>
        </div>
    );
}
export default Chatbot;
