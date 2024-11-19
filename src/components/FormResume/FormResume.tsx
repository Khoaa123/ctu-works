"use client";

import React, { useState, useContext, useEffect } from "react";
import PersonalDetail from "./PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import Summery from "./Summery";
import Experience from "./Experience";
import Education from "./Education";
import PersonalProject from "./PersonalProject";
import Skills from "./Skills";
import PreviewResume from "../PreviewResume/PreviewResume";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function FormResume({
  activeFormIndex,
  setActiveFormIndex,
}: {
  activeFormIndex: number;
  setActiveFormIndex: (index: number) => void;
}) {
  const [enabledNext, setEnabledNext] = useState(false);
  const { resumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    checkIfFormIsValid();
  }, [resumeInfo]);

  const handleNext = () => {
    if (enabledNext) {
      setActiveFormIndex(activeFormIndex + 1);
      setEnabledNext(false);
    }
  };

  const handlePrevious = () => {
    setActiveFormIndex(activeFormIndex - 1);
    checkIfFormIsValid();
  };

  const checkIfFormIsValid = () => {
    const isValid =
      resumeInfo.firstName &&
      resumeInfo.lastName &&
      resumeInfo.jobTitle &&
      resumeInfo.address &&
      resumeInfo.phone &&
      resumeInfo.email &&
      resumeInfo.summery &&
      resumeInfo.education.every(
        (item: any) =>
          item.universityName &&
          item.degree &&
          item.major &&
          item.startDate &&
          item.endDate
      ) &&
      resumeInfo.experience.every(
        (item: any) =>
          item.title &&
          item.companyName &&
          item.city &&
          item.state &&
          item.startDate &&
          item.endDate &&
          item.workSummery
      ) &&
      resumeInfo.personalProjects.every(
        (item: any) =>
          item.title &&
          item.description &&
          item.technologies.length > 0 &&
          item.link
      );
    setEnabledNext(isValid);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeInfo.firstName}_${resumeInfo.lastName}_CV.pdf`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
      {activeFormIndex < 7 ? (
        <>
          <div>
            <div className="mb-4 flex justify-end">
              <div className="flex gap-2">
                {activeFormIndex > 1 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handlePrevious}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại
                  </Button>
                )}
                {activeFormIndex < 7 && (
                  <Button
                    size="sm"
                    disabled={!enabledNext}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={handleNext}
                  >
                    Tiếp theo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {activeFormIndex === 1 && (
              <PersonalDetail setEnabledNext={setEnabledNext} />
            )}
            {activeFormIndex === 2 && (
              <Summery setEnabledNext={setEnabledNext} />
            )}
            {activeFormIndex === 3 && (
              <Education setEnabledNext={setEnabledNext} />
            )}
            {activeFormIndex === 4 && (
              <Experience setEnabledNext={setEnabledNext} />
            )}
            {activeFormIndex === 5 && (
              <PersonalProject setEnabledNext={setEnabledNext} />
            )}
            {activeFormIndex === 6 && (
              <Skills setEnabledNext={setEnabledNext} />
            )}
          </div>

          <div>
            <PreviewResume />
          </div>
        </>
      ) : (
        <div className="col-span-2 flex flex-col items-center">
          <div className="mb-8 flex justify-center gap-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Tải xuống PDF
            </Button>
          </div>

          <div className="w-full max-w-4xl">
            <PreviewResume />
          </div>
        </div>
      )}
    </div>
  );
}
