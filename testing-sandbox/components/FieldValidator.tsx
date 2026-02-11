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
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          {/* Pass/Fail icon */}
          <div className="flex-shrink-0 mt-0.5">
            {field.passed ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
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

          {/* Field info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono font-semibold text-gray-900">
                {field.field}
              </code>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  field.passed
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {field.passed ? "PASS" : "FAIL"}
              </span>
            </div>
            <p
              className={`text-sm mt-0.5 ${
                field.passed ? "text-green-700" : "text-red-700"
              }`}
            >
              {field.message}
            </p>
            {!field.passed && (
              <div className="mt-1.5 text-xs font-mono">
                <span className="text-gray-500">Expected: </span>
                <span className="text-gray-800">
                  {JSON.stringify(field.expected)}
                </span>
                <span className="text-gray-500 ml-2">Got: </span>
                <span className="text-gray-800">
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
