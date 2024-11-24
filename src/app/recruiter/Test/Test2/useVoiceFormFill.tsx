"use client";
import { useEffect, useState } from 'react';
import speech, { useSpeechRecognition } from 'react-speech-recognition'; // hoặc thư viện tương tự
interface FormData {
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
    jobInformation: {
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
    };
    companyInfo: {
        companyName: string;
        companyAddress: string;
        companySize: string;
        companyLogo: string;
        companyStaffName: string;
        companyBenefits: { title: string; content: string }[];
        companyEmail: string;
    };
}


const useVoiceFormFill = (initialFormData: FormData) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [currentField, setCurrentField] = useState<keyof FormData>(
        'jobTitle' as keyof FormData
    );
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        TextToSpeech("")
    })

    const handleNextField = () => {
        const keys = Object.keys(formData) as (keyof FormData)[];
        const currentIndex = keys.indexOf(currentField);
        const nextIndex = currentIndex + 1;
        if (nextIndex < keys.length) {
            setCurrentField(keys[nextIndex]);
            resetTranscript();
        } else {
            // Xử lý khi đã điền xong tất cả các trường
            console.log('Đã điền xong tất cả các trường:', formData);
        }
    };

    const handleSpeechChange = () => {
        if (!listening) return;
        let value: any = transcript.trim();

        // Xử lý dữ liệu dựa trên kiểu dữ liệu của trường
        switch (typeof formData[currentField]) {
            case 'number':
                value = parseInt(value, 10) || 0; // xử lý nếu người dùng nhập sai
                break;
            case 'boolean':
                value = value.toLowerCase() === 'true' || value.toLowerCase() === 'có'; // xử lý nếu người dùng nhập "có" hoặc "true"
                break;
            case 'object':
                // Xử lý object (location, companyBenefits, keywords,...)  -  Cần logic phức tạp hơn, phụ thuộc vào cấu trúc object
                console.log("Object handling not implemented yet");
                return;
            default:
                break;
        }

        setFormData({ ...formData, [currentField]: value });
        handleNextField();
    };


    const startListening = () => {
        resetTranscript();
        //Chỉ start khi có hỗ trợ SpeechRecognition
        if (browserSupportsSpeechRecognition) {
            // Hiển thị hướng dẫn người dùng cho trường hiện tại
            TextToSpeech(`Hãy đọc thông tin cho trường ${currentField}`);
            console.log(currentField)
            speech.startListening({ language: 'vi-VN', continuous: false })
            handleSpeechChange()
        } else {
            console.log("Trình duyệt không hỗ trợ SpeechRecognition");
        }
    };

    const TextToSpeech = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        let vietnameseVoice = null;
        const voices = window.speechSynthesis.getVoices();
        for (const voice of voices) {
            if (voice.lang.startsWith('vi') || voice.name.includes('Vietnamese')) {
                vietnameseVoice = voice;
                break;
            }
        }
        if (vietnameseVoice) {
            utterance.voice = vietnameseVoice;
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('Vietnamese voice not found. Using the default voice.');
        }
        // window.speechSynthesis.speak(utterance);
    };

    return { formData, startListening, listening, transcript, handleSpeechChange, browserSupportsSpeechRecognition };
};

export default useVoiceFormFill;