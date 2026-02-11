"use client";

import CodeSnippet from "@/components/CodeSnippet";

export default function BuildPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-accent font-medium mb-2">
            <span className="bg-accent/10 px-2 py-0.5 rounded text-xs border border-accent/20">
              Step 2
            </span>
            Build
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Code Snippets
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Copy-paste these code snippets to add AV support to your POS
            integration. Select your language, then implement the 3 blocks:
            parse, display, and edge cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CodeSnippet />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white text-sm mb-3">
                  JSON Path Reference
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-surface-2 p-2 rounded border border-border">
                    <div className="text-text-tertiary">Vehicle object:</div>
                    <div className="text-white">
                      order.deliveries[].vehicle
                    </div>
                  </div>
                  <div className="bg-surface-2 p-2 rounded border border-border">
                    <div className="text-text-tertiary">Is autonomous:</div>
                    <div className="text-accent">
                      .vehicle.is_autonomous
                    </div>
                  </div>
                  <div className="bg-surface-2 p-2 rounded border border-border">
                    <div className="text-text-tertiary">Passcode:</div>
                    <div className="text-amber-500">.vehicle.passcode</div>
                  </div>
                  <div className="bg-surface-2 p-2 rounded border border-border">
                    <div className="text-text-tertiary">Instructions:</div>
                    <div className="text-blue-500">
                      .vehicle.handoff_instructions
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white text-sm mb-3">
                  Implementation Checklist
                </h3>
                <div className="space-y-2 text-sm text-text-secondary">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded bg-surface-2 border-border" />
                    <span>Parse is_autonomous from vehicle</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded bg-surface-2 border-border" />
                    <span>Extract and display passcode</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded bg-surface-2 border-border" />
                    <span>Show handoff instructions</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded bg-surface-2 border-border" />
                    <span>Handle missing passcode</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded bg-surface-2 border-border" />
                    <span>Handle mixed deliveries</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded bg-surface-2 border-border" />
                    <span>Handle CREATED state</span>
                  </label>
                </div>
              </div>

              <a
                href="/test"
                className="block bg-accent text-black text-center px-4 py-2 rounded-lg hover:bg-accent-hover transition font-semibold text-sm"
              >
                Next: Test Your Endpoint
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
