"use client";

import type { FieldResult } from "@/lib/validators";

export default function FieldValidator({ fields }: { fields: FieldResult[] }) {
  if (fields.length === 0) return null;

  return (
    <div className="space-y-2">
      {fields.map((field) => (
        <div
          key={field.field}
          className={`flex items-start gap-3 p-3 rounded-lg border ${
            field.passed
              ? "bg-accent/5 border-accent/20"
              : "bg-red-500/5 border-red-500/20"
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {field.passed ? (
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono font-semibold text-white">
                {field.field}
              </code>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  field.passed
                    ? "bg-accent/20 text-accent"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {field.passed ? "PASS" : "FAIL"}
              </span>
            </div>
            <p
              className={`text-sm mt-0.5 ${
                field.passed ? "text-accent/80" : "text-red-400/80"
              }`}
            >
              {field.message}
            </p>
            {!field.passed && (
              <div className="mt-1.5 text-xs font-mono">
                <span className="text-text-tertiary">Expected: </span>
                <span className="text-text-secondary">
                  {JSON.stringify(field.expected)}
                </span>
                <span className="text-text-tertiary ml-2">Got: </span>
                <span className="text-text-secondary">
                  {JSON.stringify(field.actual)}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
