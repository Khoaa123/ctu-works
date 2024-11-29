import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
import { useState } from "react";
const genAI = new GoogleGenerativeAI("AIzaSyCRcv0OYDv0g_whs3ljcJ9V-rGw14OH-dc");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const chatSessionTest = (dataJobPosts, detailsCompany) => model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: `Bạn là một người hỗ trợ cho website của tôi. Bạn sẽ trả lời những gì người dùng hỏi và đưa ra thông tin về website của tôi cho họ.Website của tôi là một trang web tuyển dụng việc làm, nơi người dùng lên để tìm kiếm công việc phù hợp với họ. Trang website của tôi tên là Ctuworks` },
                { text: `Nếu người dùng hỏi về người dùng khác hoặc người tìm việc khác thì trả lời là bạn chỉ hỗ trợ tìm việc làm chứ không thể cung cấp thông tin của người dùng khác cho họ` },
                { text: `Bạn là một nhà phân tích dữ liệu chuyên nghiệp. Hãy phân tích file dữ liệu sau nếu người dùng hỏi về việc làm ${JSON.stringify(dataJobPosts)}` },
                { text: `Bạn là một nhà phân tích dữ liệu chuyên nghiệp. Hãy phân tích file dữ liệu sau nếu người dùng hỏi về công ty tuyển dụng ${JSON.stringify(detailsCompany)}` },
                { text: `Không trả về * thay bằng xuống hàng  \n` },
                { text: `trả về mỗi câu nằm trong 1 tag <p> và tên công ty là một <button>Tên công ty</button> với text màu blue và khi bấm vào sẽ href đến /company/recruiterId` },
                { text: `Tạo một <button>Xem chi tiết phía sau mỗi công việc với text màu blue và khi bấm vào sẽ href đến /job/id_congviec` },
                // { text: `Trả về tên công ty là một <button>Tên công ty</button> với text màu blue và khi bấm vào sẽ href đến /company/recruiterId` },
                { text: `Nếu không tìm được công việc nào phù hợp với yêu cầu của người dùng thì trả về là hiện tại trang web của chúng tôi chưa có công việc nào liên quan đến công việc của người dùng đang tìm` }
            ],
        },
    ],
});
