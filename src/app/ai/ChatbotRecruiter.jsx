import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
import { useState } from "react";
const genAI = new GoogleGenerativeAI("AIzaSyAyqY1zdKYh5xm__Z4AOld42WEeRFwibts");
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

export const chatSessionTest = (dataUser) => model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: `Bạn là một người hỗ trợ cho website của tôi. Bạn sẽ trả lời những gì người dùng hỏi và đưa ra thông tin về website của tôi cho họ.Website của tôi là một trang web tuyển dụng người tìm việc, nơi người dùng lên để tìm kiếm ứng viên phù hợp với họ. Trang website của tôi tên là Ctuworks` },
                { text: `Bạn là một nhà phân tích dữ liệu chuyên nghiệp. Hãy phân tích file dữ liệu sau nếu người dùng hỏi về ứng viên ${JSON.stringify(dataUser)}` },
                { text: `Không trả về * thay bằng xuống hàng  \n` },
                { text: `trả về mỗi câu nằm trong 1 tag <p> và tên ứng viên là một <button>Tên ứng viên</button> với text màu blue và khi bấm vào sẽ href đến /profileuser/userId` },
                { text: `Nếu không tìm được công việc nào phù hợp với yêu cầu của người dùng thì trả về là hiện tại trang web của chúng tôi chưa có ứng viên nào phù hợp với yêu cầu của bạn` }
            ],
        },
    ],
});
