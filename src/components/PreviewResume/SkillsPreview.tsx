import React from "react";

function SkillsPreview({ resumeInfo }: any) {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-start text-sm font-semibold"
        // style={{
        //   color: resumeInfo?.themeColor,
        // }}
      >
        Kỹ năng
      </h2>
      <hr
      // style={{
      //   borderColor: resumeInfo?.themeColor,
      // }}
      />

      <div className="my-4 grid grid-cols-2 gap-3">
        {resumeInfo?.skills.map((skill: any, index: any) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="h-2 w-[120px] bg-gray-200">
              <div
                className="h-2"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
