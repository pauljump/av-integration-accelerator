"use client";

import { useState } from "react";
import type { ValidationSuiteResult } from "@/lib/validators";

interface TestRunnerProps {
  webhookUrl: string;
}

export default function TestRunner({ webhookUrl }: TestRunnerProps) {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<ValidationSuiteResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleRunAll = async () => {
    if (!webhookUrl) {
      setError("Please enter a webhook URL first");
      return;
    }

    setRunning(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Validation failed: ${text}`);
      }

      const data: ValidationSuiteResult = await res.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
    }
  };

  const handleDownload = () => {
    if (!results) return;
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `av-validation-report-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Run Button */}
      <button
        onClick={handleRunAll}
        disabled={running || !webhookUrl}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {running ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Running All Tests...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Run All Tests
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mt-6 space-y-4">
          {/* Score Header */}
          <div
            className={`rounded-lg p-6 text-center ${
              results.allPassed
                ? "bg-green-50 border-2 border-green-200"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="text-4xl font-bold mb-1">
              {results.allPassed ? (
                <span className="text-green-600">{results.score}</span>
              ) : (
                <span className="text-gray-900">{results.score}</span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {results.passed} passed, {results.failed} failed
            </div>

            {results.allPassed && (
              <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                AV Ready
              </div>
            )}
          </div>

          {/* Results Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-700">
                    Scenario
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">
                    Fields
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-gray-700">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.results.map((result, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 ${
                      result.passed ? "" : "bg-red-50/50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {result.scenarioName}
                      </div>
                      {result.error && (
                        <div className="text-xs text-red-600 mt-0.5">
                          {result.error}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {result.fields.map((field) => (
                          <span
                            key={field.field}
                            className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                              field.passed
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {field.field}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {result.passed ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Report (JSON)
          </button>
        </div>
      )}
    </div>
  );
}
