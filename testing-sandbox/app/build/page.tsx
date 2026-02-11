"use client";

import CodeSnippet from "@/components/CodeSnippet";

export default function BuildPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-xs">
              Step 2
            </span>
            Build
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Code Snippets
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Copy-paste these code snippets to add AV support to your POS
            integration. Select your language, then implement the 3 blocks:
            parse, display, and edge cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <CodeSnippet />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* JSON Path Reference */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">
                  JSON Path Reference
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500">Vehicle object:</div>
                    <div className="text-gray-900">
                      order.deliveries[].vehicle
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500">Is autonomous:</div>
                    <div className="text-blue-600">
                      .vehicle.is_autonomous
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500">Passcode:</div>
                    <div className="text-amber-600">.vehicle.passcode</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500">Instructions:</div>
                    <div className="text-green-600">
                      .vehicle.handoff_instructions
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">
                  Implementation Checklist
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Parse is_autonomous from vehicle</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Extract and display passcode</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Show handoff instructions</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Handle missing passcode</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Handle mixed deliveries</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Handle CREATED state</span>
                  </label>
                </div>
              </div>

              {/* Next Step */}
              <a
                href="/test"
                className="block bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
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
