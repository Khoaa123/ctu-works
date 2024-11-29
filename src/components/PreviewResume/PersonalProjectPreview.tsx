import React from "react";

function PersonalProjectPreview({ resumeInfo }: any) {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-start text-sm font-semibold"
        // style={{
        //   color: resumeInfo?.themeColor,
        // }}
      >
        Dự Án
      </h2>
      <hr
      // style={{
      //   borderColor: resumeInfo?.themeColor,
      // }}
      />

      {resumeInfo?.personalProjects?.map((project: any, index: any) => (
        <div key={index} className="my-2">
          <h2
            className="text-sm font-semibold"
            // style={{
            //   color: resumeInfo?.themeColor,
            // }}
          >
            {project?.title}
          </h2>

          <div className="my-2 text-xs">
            <strong>Công nghệ:</strong>{" "}
            {Array.isArray(project?.technologies)
              ? project.technologies.join(", ")
              : project?.technologies}
          </div>
          <div className="my-2 text-xs">
            <strong>Mô tả:</strong>
            <div
              className="my-2"
              dangerouslySetInnerHTML={{ __html: project?.description }}
            />
          </div>
          {project?.link && (
            <div className="my-2 text-xs">
              <strong>Link:</strong>{" "}
              <a
                href={project?.link}
                target="_blank"
                // rel="noopener noreferrer"
                // style={{
                //   color: resumeInfo?.themeColor,
                // }}
                className="text-blue-600 hover:underline"
              >
                {project?.link}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PersonalProjectPreview;
