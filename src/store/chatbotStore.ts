import { create } from "zustand";

interface ChatbotState {
  messages: { sender: string; content: string }[];
  userInput: string;
  isTyping: boolean;
  showChat: boolean;
  jobPosts: any[];
  detailsCompany: any[];
  setMessages: (messages: { sender: string; content: string }[]) => void;
  addMessage: (message: { sender: string; content: string }) => void;
  setUserInput: (input: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  setShowChat: (show: boolean) => void;
  setJobPosts: (posts: any[]) => void;
  setDetailsCompany: (details: any[]) => void;
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  messages: [],
  userInput: "",
  isTyping: false,
  showChat: false,
  jobPosts: [],
  detailsCompany: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setUserInput: (input) => set({ userInput: input }),
  setIsTyping: (isTyping) => set({ isTyping }),
  setShowChat: (show) => set({ showChat: show }),
  setJobPosts: (posts) => set({ jobPosts: posts }),
  setDetailsCompany: (details) => set({ detailsCompany: details }),
}));
