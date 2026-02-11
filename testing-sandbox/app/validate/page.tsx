"use client";

import { useState } from "react";
import TestRunner from "@/components/TestRunner";

export default function ValidatePage() {
  const [webhookUrl, setWebhookUrl] = useState("");

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-accent font-medium mb-2">
            <span className="bg-accent/10 px-2 py-0.5 rounded text-xs border border-accent/20">
              Step 5
            </span>
            Validate
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Validation Suite
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Run all 7 test scenarios against your endpoint and get a compliance
            report. Pass every test to earn the AV Ready badge.
          </p>
        </div>

        <div className="bg-surface rounded-lg border border-border p-5 mb-6">
          <h2 className="font-semibold text-white mb-3">
            Your Webhook URL
          </h2>
          <input
            type="url"
            placeholder="https://your-endpoint.com/webhook/orders"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg focus:ring-1 focus:ring-accent focus:border-accent text-sm text-white placeholder-text-tertiary"
          />
          <p className="mt-2 text-xs text-text-tertiary">
            We&apos;ll send all 7 test scenarios to this endpoint and validate each
            response.
          </p>
        </div>

        <TestRunner webhookUrl={webhookUrl} />

        <div className="mt-8 bg-surface rounded-lg border border-border p-5">
          <h3 className="font-semibold text-white mb-3">How It Works</h3>
          <div className="space-y-3 text-sm text-text-secondary">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-surface-2 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-text-tertiary font-mono border border-border">
                1
              </span>
              <p>
                We send each of the 7 test scenarios (standard order, AV orders
                from different providers, edge cases) to your endpoint via POST.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-surface-2 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-text-tertiary font-mono border border-border">
                2
              </span>
              <p>
                Your endpoint should parse the order and respond with a JSON
                object containing the extracted AV fields (
                <code className="bg-surface-2 px-1 rounded text-xs text-accent">
                  is_autonomous
                </code>
                ,{" "}
                <code className="bg-surface-2 px-1 rounded text-xs text-accent">
                  passcode
                </code>
                ,{" "}
                <code className="bg-surface-2 px-1 rounded text-xs text-accent">
                  handoff_instructions
                </code>
                ).
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-surface-2 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-text-tertiary font-mono border border-border">
                3
              </span>
              <p>
                We validate each response to ensure the fields match what we
                sent. Edge cases like missing passcodes and null instructions
                are also tested.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-surface-2 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-text-tertiary font-mono border border-border">
                4
              </span>
              <p>
                Pass all 7 tests and you earn the{" "}
                <span className="text-accent font-semibold">AV Ready</span>{" "}
                badge. Download the JSON report to share with the AV team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
