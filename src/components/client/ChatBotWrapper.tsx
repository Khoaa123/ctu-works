"use client";
import { usePathname } from "next/navigation";
import React from "react";
import ChatBot from "../ChatBot/ChatBot";

const ChatBotWrapper = () => {
  const pathname = usePathname();
  const isHiddenPage =
    pathname.startsWith("/recruiter") ||
    pathname.startsWith("/cv") ||
    pathname.startsWith("/profileuser") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin");

  if (isHiddenPage) {
    return null;
  }

  return <ChatBot />;
};

export default ChatBotWrapper;
