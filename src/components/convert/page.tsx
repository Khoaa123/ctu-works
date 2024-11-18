import { useEffect, useState } from "react";
import { renderAsync } from "docx-preview";

export default function DocxViewer({ fileUrl }: { fileUrl: any }) {
  console.log("DocxViewer fileUrl:", fileUrl);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocx = async () => {
      try {
        const response = await fetch(fileUrl);
        if (response.status !== 200) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const container = document.getElementById("docx-container");
        if (container) {
          await renderAsync(arrayBuffer, container);
        }
      } catch (err) {
        console.error("Error rendering document:", err);
        setError("Failed to load document.");
      }
    };

    loadDocx();
  }, [fileUrl]);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div id="docx-container" className="prose max-w-none"></div>
      )}
    </div>
  );
}
