import React from "react";

function ExperiencePreview({ resumeInfo }: any) {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-start text-sm font-semibold"
        // style={{
        //   color: resumeInfo?.themeColor,
        // }}
      >
        Kinh Nghiệm Làm Việc
      </h2>
      <hr
      // style={{
      //   borderColor: resumeInfo?.themeColor,
      // }}
      />

      {resumeInfo?.experience.map((experience: any, index: any) => (
        <div key={index} className="my-2">
          <h2
            className="text-sm font-semibold"
            // style={{
            //   color: resumeInfo?.themeColor,
            // }}
          >
            {experience?.title}
          </h2>
          <h2 className="flex justify-between text-xs">
            <span>
              {experience?.companyName} {experience?.city} {experience?.state}
            </span>
            <span>
              {experience?.startDate} -{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>

          <div
            className="my-2 text-xs"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
