"use client";

import JsonDiff from "@/components/JsonDiff";
import Timeline from "@/components/Timeline";
import KdsMockup from "@/components/KdsMockup";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-xs">
              Step 1
            </span>
            Learn
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Understanding AV Deliveries
          </h1>
          <p className="text-gray-600 max-w-2xl">
            When a delivery is handled by an autonomous vehicle instead of a
            human courier, 3 new fields appear in the order payload. Your
            integration needs to detect and display them.
          </p>
        </div>

        {/* Section: The 3 Required Fields */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            The 3 Fields You Need to Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                  />
                </svg>
              </div>
              <code className="text-sm font-mono text-blue-600 font-semibold">
                is_autonomous
              </code>
              <p className="text-sm text-gray-600 mt-2">
                Boolean. When <code className="text-xs bg-gray-100 px-1 rounded">true</code>, this delivery is handled by a robot. Switch
                your KDS to the AV-specific display.
              </p>
              <div className="mt-3 text-xs font-mono text-gray-400">
                Type: boolean
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <code className="text-sm font-mono text-amber-600 font-semibold">
                passcode
              </code>
              <p className="text-sm text-gray-600 mt-2">
                4-digit PIN the crew enters on the robot to open the food
                compartment. Display this prominently on the KDS.
              </p>
              <div className="mt-3 text-xs font-mono text-gray-400">
                Type: string | undefined
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
              <code className="text-sm font-mono text-green-600 font-semibold">
                handoff_instructions
              </code>
              <p className="text-sm text-gray-600 mt-2">
                Step-by-step instructions for loading food into the robot. Varies
                by provider (Serve, Nuro, Waymo, etc.).
              </p>
              <div className="mt-3 text-xs font-mono text-gray-400">
                Type: string | undefined
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-3 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <span className="text-sm text-gray-600">
              All 3 fields live at{" "}
              <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">
                order.deliveries[].vehicle
              </code>
            </span>
          </div>
        </section>

        {/* Section: JSON Diff */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Standard vs AV Order
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Compare a standard courier order with an autonomous vehicle order.
            Click on highlighted fields in the AV order to learn more.
          </p>
          <JsonDiff />
        </section>

        {/* Section: Delivery Timeline */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                What Happens During an AV Delivery?
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                An AV delivery follows the same general flow as a courier
                delivery, with key differences when the robot arrives and the
                crew loads the food.
              </p>
              <Timeline />
            </div>

            {/* KDS Mockup */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                What the Crew Sees
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                When a robot arrives, the Kitchen Display System should show the
                passcode prominently so the crew can load the food.
              </p>
              <KdsMockup
                isAutonomous={true}
                passcode="4829"
                instructions="Enter code on keypad. Lift lid. Place food inside. Close lid."
                status="ARRIVED_AT_PICKUP"
                vehicleInfo="Yellow Serve Robotics Rover"
              />
              <div className="mt-4">
                <KdsMockup
                  isAutonomous={false}
                  status="EN_ROUTE_TO_PICKUP"
                  vehicleInfo="Silver Toyota Camry"
                  driverName="John"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Next Step CTA */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Ready to code?</h3>
            <p className="text-sm text-gray-600">
              Copy-paste code snippets in Java, Node.js, Python, or C#.
            </p>
          </div>
          <a
            href="/build"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center gap-2"
          >
            Next: Build
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
