"use client";
import FormResume from "@/components/FormResume/FormResume";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState<any>(dummy);
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="p-10">
        <FormResume
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
