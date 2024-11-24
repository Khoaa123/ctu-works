"use client";
import "regenerator-runtime"
import speech, { useSpeechRecognition } from "react-speech-recognition"
import * as Speech from 'expo-speech';
import { useEffect, useState } from "react";
import { chatSessionVoice } from "../../../ai/voiceAI"
import { chatSessionCreate } from "../../../ai/createJobAi"
interface FormDataVoice {
    jobTitle: string;
    expirationDate: string;
    location: { [key: string]: any }[]; // Thay đổi kiểu dữ liệu cho phù hợp
    jobDescription: string;
    jobRequirements: string;
    jobType: string;
    minSalary: number;
    maxSalary: number;
    canDeal: boolean;
    numberOfPositions: number;

    jobLevel: string;
    jobIndustry: string;
    keywords: string[];
    jobField: string;
    language: string;
    minExperience: number;
    nationality: string;
    educationLevel: string;
    gender: string;
    minAge: number;
    maxAge: number;
    maritalStatus: string;


    companyName: string;
    companyAddress: string;
    companySize: string;
    companyLogo: string;
    companyStaffName: string;
    companyBenefits: { title: string; content: string }[];
    companyEmail: string;

}

const Chatbot1 = () => {
    const [formDataVoice, setFormDataVoice] = useState<FormData>({
        jobTitle: "",
        expirationDate: '',
        location: [{}],
        jobDescription: "",
        jobRequirements: "",
        jobType: "",
        minSalary: 0,
        maxSalary: 0,
        canDeal: false,
        numberOfPositions: 0,

        jobLevel: "",
        jobIndustry: "",
        keywords: [],
        jobField: "",
        language: "",
        minExperience: 0,
        nationality: "",
        educationLevel: "",
        gender: "",
        minAge: 20,
        maxAge: 30,
        maritalStatus: "",


        companyName: "",
        companyAddress: "",
        companySize: "",
        companyLogo: "",
        companyStaffName: "",
        companyBenefits: [
            {
                title: "",
                content: "",
            },
        ],
        companyEmail: "",

    });
    const [newFormData, setNewFormData] = useState<FormData>({});
    const { listening, transcript, resetTranscript } = useSpeechRecognition()
    const [currentField, setCurrentField] = useState<keyof FormData>(
        'jobTitle' as keyof FormData
    );


    useEffect(() => {
        TextToSpeech("")
    })
    const Done = async () => {
        speech.stopListening()
        const result = await chatSessionCreate.sendMessage(`${dataVoice}`);
        console.log("result", result?.response?.text())
    }
    const Respeak = async () => {
        await speech.stopListening()
        resetTranscript()
        const key = currentField;
        const vnKey = changeToVietnamese(key)
        TextToSpeech(`Vui lòng nhập vào ${vnKey}`)
        startListening(currentField)
    }
    const startEnterForm = () => {
        TextToSpeech(`Vui lòng nhập vào chức danh`)
        startListening("jobTitle")
    }
    const startListening = async (field: any) => {
        await speech.startListening({ language: 'vi-VN', continuous: true })
    }
    const TextToSpeech = (data: any) => {
        const text = `${data}`;
        const options = new SpeechSynthesisUtterance(text);
        let vietnameseVoice = null;
        const voices = window.speechSynthesis.getVoices();
        for (const voice of voices) {
            if (voice.lang.startsWith('vi') || voice.name.includes('Vietnamese')) {
                vietnameseVoice = voice;
                break;
            }
        }
        if (vietnameseVoice) {
            options.voice = vietnameseVoice;
            window.speechSynthesis.speak(options);
        } else {
            console.warn('Vietnamese voice not found. Using the default voice.');
        }
    };
    const changeToVietnamese = (word: any) => {
        switch (word) {
            case "jobTitle":
                return "Chức danh";
            case "expirationDate":
                return "Ngày hết hạn";
            case "location":
                return "Địa điểm làm việc";
            case "jobDescription":
                return "Mô tả công việc";
            case "jobRequirements":
                return "Yêu cầu công việc";
            case "jobType":
                return "Loại công việc";
            case "minSalary":
                return "Mức lương tối thiểu";
            case "maxSalary":
                return "Mức lương tối đa";
            case "canDeal":
                return "Mức lương có thể thương lượng hay không";
            case "numberOfPositions":
                return "Số lượng vị trí";
            case "jobLevel":
                return "Cấp độ công việc";
            case "jobIndustry":
                return "Lĩnh vực công việc";
            case "keywords":
                return "Từ khóa";
            case "jobField":
                return "Ngành nghề chi tiết";
            case "language":
                return "Ngôn ngữ";
            case "minExperience":
                return "Kinh nghiệm tối thiểu";
            case "nationality":
                return "Quốc tịch";
            case "educationLevel":
                return "Bằng cấp tối thiểu";
            case "gender":
                return "Giới tính";
            case "minAge":
                return "Tuổi tối thiểu";
            case "maxAge":
                return "Tuổi tối đa";
            case "maritalStatus":
                return "Tình trạng hôn nhân";
            case "companyName":
                return "Tên công ty";
            case "companyAddress":
                return "Địa chỉ công ty";
            case "companySize":
                return "Quy mô công ty";
            case "companyStaffName":
                return "Tên nhân viên công ty";
            case "companyBenefits":
                return "Lợi ích công ty";
            case "companyEmail":
                return "Email công ty";
            case "companyInfo":
                return "Thông tin công ty";
            default:
                return word;
        }
    }
    
    const [dataVoice, setDataVoice] = useState([]);
    const handleNextField = () => {
        resetTranscript()
        const keys = Object.keys(formData) as (keyof FormData)[];
        setDataVoice([...dataVoice, `${currentField} : ${transcript}`]);
        const currentIndex = keys.indexOf(currentField);
        const nextIndex = currentIndex + 1;
        if (nextIndex < keys.length) {
            const key = keys[nextIndex];
            const vnKey = changeToVietnamese(key)
            setCurrentField(keys[nextIndex]);
            TextToSpeech(`Vui lòng nhập vào ${vnKey}`)
            startListening(keys[nextIndex])
        } else {
            console.log('Đã điền xong tất cả các trường:', formData);
            TextToSpeech(`'Đã điền xong tất cả các trường vui lòng kiểm tra lại thông tin.`)
        }
    };
    const handlePreviousField = () => {
        resetTranscript()
        const keys = Object.keys(formData) as (keyof FormData)[];
        const currentIndex = keys.indexOf(currentField);
        const previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
            const key = keys[previousIndex];
            const vnKey = changeToVietnamese(key)
            setCurrentField(keys[previousIndex]);
            TextToSpeech(`Vui lòng nhập vào ${vnKey}`)
            startListening(keys[previousIndex])
        }
    }
    const Test = async () => {
        console.log(dataVoice)
    }
    return (
        <div className="min-h-screen items-center justify-center bg-gray-100">
            <div>
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                        {key}: {JSON.stringify(value)}
                    </div>
                ))}
            </div>
            {transcript && <p>Transcript: {transcript}</p>}
            <span>
                <button onClick={startEnterForm}>Start</button>
            </span>
            <button onClick={handlePreviousField}>Previous</button>
            <button onClick={handleNextField}>Next</button>
            <button onClick={Respeak}>Respeak</button>
            <button onClick={Done}>Done</button>
            <span>
                <button onClick={() => TextToSpeech("Tôi là hỗ trợ ảo của website,bạn cần tôi giúp gì cho bạn?")}>Speech</button>
            </span>
        </div>

    );
};
export default Chatbot1;
