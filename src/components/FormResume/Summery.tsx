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
  const [summery, setSummery] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState<any>();

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);

    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(result.response.text());
    console.log(JSON.parse(result.response.text()));
    setAiGenerateSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };
  console.log("nè", aiGeneratedSummeryList);

  const onSave = (e: any) => {
    e.preventDefault();
    if (!summery.trim()) {
      toast.error("Vui lòng nhập tóm tắt!");
      return;
    }
    setResumeInfo({ ...resumeInfo, summery });
    setEnabledNext(true);
    toast.success("Lưu thành công!");
  };
  return (
    <div>
      <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
        <h2 className="text-lg font-bold">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex items-end justify-between">
            <label>Add Summery</label>
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => GenerateSummeryFromAI()}
              className="flex gap-2 border-primary text-primary"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5 min-h-32"
            required
            onChange={(e) => setSummery(e.target.value)}
            defaultValue={resumeInfo?.summery}
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Lưu"}
            </Button>
          </div>
        </form>
      </div>
      {/* 
      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="text-lg font-bold">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item: any, index: any) => (
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
      )} */}
    </div>
  );
};

export default Summery;
