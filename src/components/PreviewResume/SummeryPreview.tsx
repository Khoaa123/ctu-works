import React from "react";

function SummeryPreview({ resumeInfo }: any) {
  return <p className="text-xs">{resumeInfo?.summery}</p>;
}

export default SummeryPreview;
