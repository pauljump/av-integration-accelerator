"use client";

import React, { useState } from "react";
import {
  simulationSteps,
  generateOrderForStep,
} from "@/lib/simulation-steps";
import KdsMockup from "@/components/KdsMockup";

export default function SimulatePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = simulationSteps[currentStep];
  const order = generateOrderForStep(step);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-xs">
              Step 4
            </span>
            Simulate
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Simulate an AV Delivery
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Walk through each step of an autonomous vehicle delivery. See how
            the order JSON changes, what the KDS displays, and what the crew
            does at each stage.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-1">
            {simulationSteps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className={`flex-1 h-2 rounded-full transition-all ${
                  i < currentStep
                    ? "bg-blue-500"
                    : i === currentStep
                      ? "bg-blue-600"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              Step {currentStep + 1} of {simulationSteps.length}
            </span>
            <span className="text-xs text-gray-500">{step.title}</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Step Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.id}
                </span>
                <div>
                  <h2 className="font-semibold text-gray-900">{step.title}</h2>
                  <p className="text-xs text-gray-500">{step.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Crew Action */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <h3 className="font-semibold text-amber-900 text-sm">
                  What the Crew Does
                </h3>
              </div>
              <p className="text-sm text-amber-800">{step.crewAction}</p>
            </div>

            {/* KDS Display */}
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                KDS Display
              </h3>
              <KdsMockup
                isAutonomous={step.orderState.is_autonomous}
                passcode={
                  step.kdsDisplay.passcodeVisible
                    ? step.orderState.passcode
                    : undefined
                }
                instructions={
                  step.kdsDisplay.instructionsVisible
                    ? step.orderState.handoff_instructions
                    : undefined
                }
                status={step.kdsDisplay.status}
                vehicleInfo={
                  step.orderState.is_autonomous
                    ? "Yellow Serve Robotics Rover"
                    : "Pending assignment"
                }
              />
            </div>
          </div>

          {/* Column 2-3: Order JSON */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-24">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Order Payload at This Step
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    {step.orderState.is_autonomous && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-mono">
                        is_autonomous: true
                      </span>
                    )}
                    {step.orderState.passcode && (
                      <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-mono">
                        passcode: {step.orderState.passcode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 overflow-auto max-h-[calc(100vh-12rem)]">
                <pre className="text-sm leading-relaxed">
                  {renderHighlightedJSON(order)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Previous Step
          </button>

          {currentStep < simulationSteps.length - 1 ? (
            <button
              onClick={() =>
                setCurrentStep(
                  Math.min(simulationSteps.length - 1, currentStep + 1)
                )
              }
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Next Step
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
            </button>
          ) : (
            <a
              href="/validate"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Next: Run Validation Suite
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
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Render JSON with AV fields highlighted
 */
function renderHighlightedJSON(obj: object): React.ReactNode[] {
  const json = JSON.stringify(obj, null, 2);
  const lines = json.split("\n");
  const avFields = [
    "is_autonomous",
    "passcode",
    "handoff_instructions",
  ];

  return lines.map((line, i) => {
    const isAVField = avFields.some((f) => line.includes(`"${f}"`));

    return (
      <div
        key={i}
        className={`px-2 -mx-2 ${
          isAVField
            ? "bg-blue-50 border-l-2 border-blue-400 font-semibold text-blue-900"
            : "text-gray-700"
        }`}
      >
        {line}
      </div>
    );
  });
}
