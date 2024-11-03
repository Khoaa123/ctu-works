import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"
// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyCV5t9AYBtDsRP-NsISJFkqZL-FXQ60x6U");
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

export const chatSessionCreate = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Bạn là một nhà phân tích chuyên nghiệp, và đây là định dạng tôi cung cấp cho bạn. Hãy phân tích dữ liệu được cung cấp và trả về đúng định đã được cung cấp:\n  const [formData, setFormData] = useState<FormData>({\n    jobTitle: \"\",\n    expirationDate: '',\n    location: [],\n    jobDescription: \"\",\n    jobRequirements: \"\",\n    jobType: \"\",\n    minSalary: 1,\n    maxSalary: 1,\n    numberOfPositions: 0,\n\n      jobLevel: \"\",\n      jobIndustry: \"\",\n      keywords: [],\n      jobField: \"\",\n      language: \"\",\n      minExperience: 1,\n      nationality: \"\",\n      educationLevel: \"\",\n      gender: \"\",\n      minAge: 20,\n      maxAge: 30,\n      maritalStatus: \"\",\n\n      companyName: \"\",\n      companyAddress: \"\",\n      companySize: \"\",\n      companyLogo: \"\",\n      companyStaffName: \"\",\n      companyBenefits: [\n        {\n          title: \"\",\n          content: \"\",\n        },\n      ],\n      companyEmail: \"\",\n \n  });\n  const benefitoptions = [\n    { id: 0, name: \"Vui lòng chọn\", placeholder: \"Nhập chi tiết phúc lợi\" },\n    { id: 1, name: \"Thưởng\", placeholder: \"Ví dụ: Lương tháng 13\" },\n    {\n      id: 2,\n      name: \"Chăm sóc sức khỏe\",\n      placeholder:\n        \"Ví dụ: Chương trình chăm sóc sức khỏe cao cấp dành cho bạn và gia đình\",\n    },\n    {\n      id: 3,\n      name: \"Nghỉ phép có lương\",\n      placeholder: \"Ví dụ: 20 ngày nghỉ phép có lương trong năm\",\n    },\n    { id: 4, name: \"Đào tạo\", placeholder: \"Ví dụ: Cơ hội đào tạo nước ngoài\" },\n    {\n      id: 5,\n      name: \"Giải thưởng\",\n      placeholder: \"Ví dụ: Giải thưởng hằng tháng dành cho nhân viên xuất sắc\",\n    },\n    {\n      id: 6,\n      name: \"Thư viện\",\n      placeholder:\n        \"Ví dụ: Thư viện online với 20.000 đầu sách và không giới hạn truy cập\",\n    },\n    {\n      id: 7,\n      name: \"Máy tính xách tay\",\n      placeholder: \"Ví dụ: Macbook mới cho mỗi nhân viên\",\n    },\n    {\n      id: 8,\n      name: \"Điện thoại\",\n      placeholder: \"Ví dụ: Iphone cho mỗi nhân viên, với phụ cấp phi 20$/tháng\",\n    },\n    {\n      id: 9,\n      name: \"Cơ hội du lịch\",\n      placeholder:\n        \"Ví dụ: 2-3 chuyến du lịch trong năm để làm việc tại trụ sở chính\",\n    },\n    {\n      id: 10,\n      name: \"Hoạt động nhóm\",\n      placeholder:\n        \"Ví dụ: Chương trình 'Innovation Time Off' xuyên suốt cả năm\",\n    },\n    {\n      id: 11,\n      name: \"Xe đưa đón\",\n      placeholder: \"Ví dụ: Công ty có xe đưa đón dành cho các tất cả nhân viên\",\n    },\n    {\n      id: 12,\n      name: \"Căn-tin\",\n      placeholder: \"Ví dụ: Bữa trưa và thức ăn nhẹ không giới hạn\",\n    },\n    {\n      id: 13,\n      name: \"Phiếu giảm giá\",\n      placeholder: \"Ví dụ: Phiếu giảm giá 100$ dùng được tại hơn 100 cửa hàng\",\n    },\n    {\n      id: 14,\n      name: \"Nhà trẻ\",\n      placeholder:\n        \"Ví dụ: Phụ cấp phí nhà trẻ 200$ mỗi tháng cho mỗi bé dưới 5 tuổi\",\n    },\n    {\n      id: 15,\n      name: \"Khác\",\n      placeholder: \"Ví dụ: Cấp Misfix cho mỗi nhân viên\",\n    },\n  ];\njobLevel is  1 of Thực tập sinh/Sinh viên, Mới tốt nghiệp, Nhân viên, Trưởng phòng, Giám đốc và Cấp cao hơn\njobType is 1 of  Vui lòng chọn,  Toàn thời gian, Bán thời gian,  Thực tập, Việc làm online, Nghề tự do, Hợp đồng thời vụ, Khác\ngender Nam is 1 , Nữ is 2, everything else is any\nmaritalStatus Chưa kết hôn is 1 , Đã kết hôn is 2, everything else is any\nnationality Người Việt Nam is 1, Người nước ngoài is 2,  everything else is any" },
        { text: "Chỉ phân tích những thông tin được cung cấp trong dữ liệu được cấp" },
        { text: "Nếu cảm thấy thông tin được cung cấp không đủ dữ liệu cần thiết thì trả về lỗi" },
        { text: "không trả về null" },
        { text: "chuyển jobRequirements và jobDescription vào trong <p></p> mỗi câu và trả về nằm trên 1 dòng" },
        { text: "change gender Nam to 1 , Nữ to 2, Bất kỳ or other to any\nmaritalStatus Chưa kết hôn to 1 , Đã kết hôn to 2, Bất kỳ or other  to any\nnationality Người Việt Nam to 1, Người nước ngoài to 2,  Bất kỳ or other  to any" },
        { text: "Phân tích jobType và trả về giá trị phù hợp thuộc 1 trong: Toàn thời gian, Bán thời gian, Thực tập, Việc làm online, Nghề tự do, Hợp đồng thời vụ, Khác," },
        { text: "location chỉ là array string" },
        { text: "Mỗi phúc lợi chỉ được chọn 1 lần, nếu bạn phân tích thấy 2 phúc lợi này cùng loại thì gộp chúng lại, còn không thì không gộp và không được quá 250 ký tự" },
      ],
    },
  ],
});