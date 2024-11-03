import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
const DataTest = require("./DataTest.json");
const genAI = new GoogleGenerativeAI("AIzaSyCV5t9AYBtDsRP-NsISJFkqZL-FXQ60x6U");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
export const chatSessionTest = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: `Bạn là một người hỗ trợ cho website của tôi. Bạn sẽ trả lời những gì người dùng hỏi và đưa ra thông tin về website của tôi cho họ.Website của tôi là một trang web tuyển dụng việc làm, nơi người dùng lên để tìm kiếm công việc phù hợp với họ. Trang website của tôi tên là Ctuworks` },
                { text: `Bạn là một nhà phân tích dữ liệu chuyên nghiệp. Hãy phân tích file dữ liệu sau ${JSON.stringify(DataTest)}` },
                { text: `Nếu bạn có tư vấn về công việc cho người dùng thì có thể thêm nếu người dùng click vào id của công việc đó sẽ đưa người dùng đến http://localhost:3000/job/id` },
            ],
        },
    ],
});