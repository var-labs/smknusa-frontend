"use client";

import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import PDFViewer from "@/components/ui/pdf-viewer";
import { SchoolProfile } from "@/services/api/useQueries/useSchool";

interface DynamicSchoolContentRendererProps {
  data: SchoolProfile[] | null;
}

const DynamicSchoolContentRenderer: React.FC<DynamicSchoolContentRendererProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      {data.map((item, index) => {
        const { profile_data, name_data } = item;

        if (!profile_data || profile_data.trim() === "") return null;

        let type_data = item.type_data?.toLowerCase();
        if (!type_data) {
          if (profile_data.endsWith(".pdf")) {
            type_data = "pdf";
          } else if (profile_data.startsWith("http")) {
            type_data = "url";
          } else {
            type_data = "text";
          }
        }

        if (!profile_data) return null;

        switch (type_data) {
          case "pdf":
            case "file":
            return (
              <div key={index} className="mt-10 w-full">
                <PDFViewer url={profile_data} />
              </div>
            );
          case "text":
            const sanitizedHtml = DOMPurify.sanitize(profile_data, {
              FORBID_TAGS: ["img", "style", "b", "i", "strong", "em", "u", "font"],
              FORBID_ATTR: ["style"],
            });
            const parsedHtml = parse(sanitizedHtml);
            return (
              <div key={index} className="mt-10 w-full">
                <p className="text-gray-800 whitespace-pre-line">{parsedHtml}</p>
              </div>
            );
          case "url":
            return (
              <div key={index} className="mt-10 w-full">
                <iframe
                  src={profile_data}
                  title={`Embedded ${name_data}`}
                  className="w-full h-[600px] border rounded"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            );
          default:
            return (
              <div key={index} className="mt-10 w-full">
                <p className="text-gray-800">{name_data || "No content available"}</p>
              </div>
            );
        }
      })}
    </>
  );
};

export default DynamicSchoolContentRenderer;
