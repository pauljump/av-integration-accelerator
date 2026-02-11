"use client";

import { useState } from "react";
import TestRunner from "@/components/TestRunner";

export default function ValidatePage() {
  const [webhookUrl, setWebhookUrl] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-xs">
              Step 5
            </span>
            Validate
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Validation Suite
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Run all 7 test scenarios against your endpoint and get a compliance
            report. Pass every test to earn the AV Ready badge.
          </p>
        </div>

        {/* Webhook URL Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">
            Your Webhook URL
          </h2>
          <input
            type="url"
            placeholder="https://your-endpoint.com/webhook/orders"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <p className="mt-2 text-xs text-gray-500">
            We&apos;ll send all 7 test scenarios to this endpoint and validate each
            response.
          </p>
        </div>

        {/* Test Runner */}
        <TestRunner webhookUrl={webhookUrl} />

        {/* How It Works */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">How It Works</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-500">
                1
              </span>
              <p>
                We send each of the 7 test scenarios (standard order, AV orders
                from different providers, edge cases) to your endpoint via POST.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-500">
                2
              </span>
              <p>
                Your endpoint should parse the order and respond with a JSON
                object containing the extracted AV fields (
                <code className="bg-gray-100 px-1 rounded text-xs">
                  is_autonomous
                </code>
                ,{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">
                  passcode
                </code>
                ,{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">
                  handoff_instructions
                </code>
                ).
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-500">
                3
              </span>
              <p>
                We validate each response to ensure the fields match what we
                sent. Edge cases like missing passcodes and null instructions
                are also tested.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-500">
                4
              </span>
              <p>
                Pass all 7 tests and you earn the <strong>AV Ready</strong>{" "}
                badge. Download the JSON report to share with the AV team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
