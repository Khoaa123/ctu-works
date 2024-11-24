"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Brain, LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { AIChatSession } from "@/app/ai/CreateSummeryAI";
import { toast } from "react-toastify";

const prompt =
  "Job Title: {jobTitle} , Hãy viết cho tôi tóm tắt về mục tiêu cho vị trí này với 4 hoặc 5 câu";

const Summery = ({ setEnabledNext }: any) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState<string>(resumeInfo.summery || "");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState<any[]>(
    []
  );

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      summery: summery,
    });
    checkIfFormIsValid(summery);
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);

    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      const aiSummaries = JSON.parse(responseText);
      setAiGenerateSummeryList(aiSummaries);
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      toast.error("Có lỗi xảy ra khi tạo tóm tắt từ AI");
    } finally {
      setLoading(false);
    }
  };

  const checkIfFormIsValid = (summery: string) => {
    const isValid = summery.trim().length > 0;
    setEnabledNext(isValid);
  };

  const handleTextareaChange = (e: any) => {
    const value = e.target.value;
    setSummery(value);
    checkIfFormIsValid(value);
  };

  return (
    <div>
      <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
        <h2 className="text-lg font-bold">Mục tiêu nghề nghiệp</h2>
        <div className="mt-7">
          <div className="flex items-end justify-between">
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={GenerateSummeryFromAI}
              className="flex gap-2 border-primary text-primary"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5 min-h-32"
            required
            onChange={handleTextareaChange}
            value={summery}
          />
        </div>
      </div>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="my-5">
          <h2 className="text-lg font-bold">Gợi ý</h2>
          {aiGeneratedSummeryList.map((item: any, index: any) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="my-4 cursor-pointer rounded-lg p-5 shadow-lg"
            >
              <h2 className="my-1 font-bold text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;