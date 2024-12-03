import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyCRcv0OYDv0g_whs3ljcJ9V-rGw14OH-dc");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat(
    {
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "Bạn là một nhà phân tích chuyên nghiệp hay đọc các dữ liệu bên dưới và gợi ý cho tôi các từ khóa về công việc có chứa hoặc liên quan đến những dữ liệu mà tôi cung cấp." },
                ],
            },
        ],
    });
