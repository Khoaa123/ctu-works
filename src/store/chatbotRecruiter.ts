import { create } from "zustand";

interface ChatbotRecruiterState {
  messages: { sender: string; content: string }[];
  userInput: string;
  isTyping: boolean;
  showChat: boolean;
  jobPosts: any[];
  setMessages: (messages: { sender: string; content: string }[]) => void;
  addMessage: (message: { sender: string; content: string }) => void;
  setUserInput: (input: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  setShowChat: (show: boolean) => void;
  setJobPosts: (posts: any[]) => void;
}

export const useChatbotRecruiterStore = create<ChatbotRecruiterState>(
  (set) => ({
    messages: [],
    userInput: "",
    isTyping: false,
    showChat: false,
    jobPosts: [],
    setMessages: (messages) => set({ messages }),
    addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),
    setUserInput: (input) => set({ userInput: input }),
    setIsTyping: (isTyping) => set({ isTyping }),
    setShowChat: (show) => set({ showChat: show }),
    setJobPosts: (posts) => set({ jobPosts: posts }),
  })
);
