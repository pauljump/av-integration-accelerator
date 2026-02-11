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
      <div className="flex gap-0.5 bg-surface rounded-lg p-1 mb-6 w-fit border border-border">
        {languages.map((lang) => (
          <button
            key={lang.key}
            onClick={() => setActiveLanguage(lang.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeLanguage === lang.key
                ? "bg-surface-2 text-white"
                : "text-text-secondary hover:text-white"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Code Blocks */}
      <div className="space-y-4">
        {snippets.blocks.map((block, index) => (
          <div
            key={`${activeLanguage}-${index}`}
            className="bg-surface border border-border rounded-lg overflow-hidden"
          >
            {/* Block Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-tertiary">
                    {index + 1}/{snippets.blocks.length}
                  </span>
                  <h3 className="font-semibold text-white text-sm">
                    {block.title}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  {block.description}
                </p>
              </div>
              <CopyButton text={block.code} />
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
              <pre className="p-4 text-sm text-text-secondary leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
