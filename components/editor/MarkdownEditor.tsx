"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row border border-gray-300 rounded-md overflow-hidden">
      {/* Raw Text Area (Left Pane) */}
      <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
        <textarea
          className="w-full h-full p-4 resize-none outline-none text-gray-800 bg-gray-50"
          placeholder="Type your markdown here..."
          value={markdown}
          onChange={handleChange}
          data-testid="markdown-textarea"
        />
      </div>

      {/* Rendered HTML Output (Right Pane) */}
      <div
        className="flex-1 p-4 bg-white overflow-y-auto prose max-w-none"
        data-testid="markdown-preview"
      >
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};
