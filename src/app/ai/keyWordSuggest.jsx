import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyCV5t9AYBtDsRP-NsISJFkqZL-FXQ60x6U");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
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
                    { text: "Gợi ý cho tôi các từ khóa về các lĩnh vực công việc có liên quan đến từ java" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```json\n[\"Java Developer\", \"Software Engineer\", \"Backend Developer\", \"Full Stack Developer\", \"Web Developer\", \"Android Developer\", \"Big Data Developer\", \"Cloud Engineer\", \"DevOps Engineer\", \"Software Architect\", \"Application Developer\", \"Java EE Developer\", \"Spring Boot Developer\", \"Hibernate Developer\", \"Microservices Developer\", \"REST API Developer\", \"JavaFX Developer\", \"Test Automation Engineer\", \"Software Development Manager\"]\n\n\n```" },
                ],
            },
        ],
    });
