"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import { codeSnippets, type Language } from "@/lib/code-snippets";

const languages: { key: Language; label: string }[] = [
  { key: "java", label: "Java" },
  { key: "node", label: "Node.js" },
  { key: "python", label: "Python" },
  { key: "csharp", label: "C#" },
];

export default function CodeSnippet() {
  const [activeLanguage, setActiveLanguage] = useState<Language>("node");

  const snippets = codeSnippets[activeLanguage];

  return (
    <div>
      {/* Language Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        {languages.map((lang) => (
          <button
            key={lang.key}
            onClick={() => setActiveLanguage(lang.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeLanguage === lang.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Code Blocks */}
      <div className="space-y-6">
        {snippets.blocks.map((block, index) => (
          <div
            key={`${activeLanguage}-${index}`}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Block Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-400">
                    {index + 1}/{snippets.blocks.length}
                  </span>
                  <h3 className="font-semibold text-gray-900">{block.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">
                  {block.description}
                </p>
              </div>
              <CopyButton text={block.code} />
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
              <pre className="p-4 text-sm text-gray-800 leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
