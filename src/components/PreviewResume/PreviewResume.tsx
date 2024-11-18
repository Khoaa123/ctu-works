"use client";

import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PersonalDetailPreview from "./PersonalDetailPreview";
import SummeryPreview from "./SummeryPreview";
import ExperiencePreview from "./ExperiencePreview";
import EducationalPreview from "./EducationalPreview";
import SkillsPreview from "./SkillsPreview";
import PersonalProjectPreview from "./PersonalProjectPreview";

export default function PreviewResume() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div>
      <div
        id="resume-preview"
        className="h-full border-t-[20px] p-14 shadow-lg"
        style={{ borderColor: resumeInfo?.themeColor }}
      >
        <PersonalDetailPreview resumeInfo={resumeInfo} />
        <SummeryPreview resumeInfo={resumeInfo} />
        {resumeInfo?.education?.length > 0 && (
          <EducationalPreview resumeInfo={resumeInfo} />
        )}
        {resumeInfo?.experience?.length > 0 && (
          <ExperiencePreview resumeInfo={resumeInfo} />
        )}
        {resumeInfo?.personalProjects?.length > 0 && (
          <PersonalProjectPreview resumeInfo={resumeInfo} />
        )}
        {resumeInfo?.skills?.length > 0 && (
          <SkillsPreview resumeInfo={resumeInfo} />
        )}
      </div>
    </div>
  );
}
