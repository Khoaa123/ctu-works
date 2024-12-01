// pages/chatbot.js
"use client";
import { useState, useEffect, useRef } from "react";
import { chatSessionTest } from "../../app/ai/ChatbotUser";

const Chatbot = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [messages, setMessages] = useState<any>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [detailsCompany, setDetailsCompany] = useState([
    {
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
    },
  ]);

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
    if (userInput.trim() === "") return;

    try {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { sender: "user", content: userInput },
      ]);
      setUserInput("");
      setIsTyping(true);
      const result = await chatSessionTest(
        jobPosts,
        detailsCompany
      ).sendMessage(`${userInput}`);
      console.log(result?.response?.text().replace(/\*/g, "\n"));
      const data = result?.response?.text().replace(/\*/g, "\n");

      setMessages((prevMessages: any) => [
        ...prevMessages,
        { sender: "bot", content: data },
      ]);
      setIsTyping(false);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
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
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {showChat ? (
        <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
          <div className="relative bg-indigo-500 px-4 py-3 text-center font-bold text-white">
            Chatbot
            <button
              className="absolute right-4 top-2 text-white hover:text-gray-100"
              onClick={() => setShowChat(false)}
            >
              X
            </button>
          </div>
          <div className="h-96 overflow-y-auto p-4" id="chat-log">
            {messages.map((message: any, index: any) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
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
              <div className="mb-2 flex justify-start">
                <div className="max-w-xs rounded-lg bg-gray-200 px-4 py-2">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex bg-gray-100 px-4 py-3">
            <input
              type="text"
              className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Nhập tin nhắn..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <button
              className="rounded-r-md bg-indigo-500 px-4 text-white hover:bg-indigo-600 focus:outline-none"
              onClick={sendMessage}
            >
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <button
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none"
          onClick={() => setShowChat(!showChat)}
        >
          Chat với hỗ trợ AI
        </button>
      )}
    </div>
  );
};

export default Chatbot;
