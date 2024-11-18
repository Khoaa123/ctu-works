import React from "react";

function PersonalProjectPreview({ resumeInfo }: any) {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-center text-sm font-bold"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Personal Projects
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.personalProjects?.map((project: any, index: any) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {project?.title}
          </h2>

          <div className="my-2 text-xs">
            <strong>Technologies:</strong>{" "}
            {Array.isArray(project?.technologies)
              ? project.technologies.join(", ")
              : project?.technologies}
          </div>
          <div className="my-2 text-xs">
            <strong>Description:</strong>
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
                rel="noopener noreferrer"
                style={{
                  color: resumeInfo?.themeColor,
                }}
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
