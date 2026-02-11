"use client";

import { useState } from "react";
import {
  TestScenarios,
  type TestScenarioKey,
  type Order,
} from "@/lib/mock-orders";
import { validateResponse, type ValidationResult } from "@/lib/validators";
import ScenarioPicker from "@/components/ScenarioPicker";
import FieldValidator from "@/components/FieldValidator";
import CopyButton from "@/components/CopyButton";

export default function TestPage() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [selectedScenario, setSelectedScenario] =
    useState<TestScenarioKey>("av_serve");
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [rawResponse, setRawResponse] = useState<string>("");
  const [showRaw, setShowRaw] = useState(false);
  const [error, setError] = useState("");

  const handleSendTest = async () => {
    if (!webhookUrl) {
      setError("Please enter your webhook URL");
      return;
    }

    setLoading(true);
    setError("");
    setValidationResult(null);
    setRawResponse("");

    const scenario = TestScenarios[selectedScenario];
    const order = scenario.generator();
    setGeneratedOrder(order);

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl, order }),
      });

      const proxyResult = await res.json();

      if (proxyResult.error) {
        setError(proxyResult.error);
        setValidationResult(
          validateResponse(
            scenario.name,
            selectedScenario,
            order,
            null,
            null,
            proxyResult.error
          )
        );
        return;
      }

      setRawResponse(
        JSON.stringify(
          {
            status: proxyResult.status,
            body: proxyResult.body,
          },
          null,
          2
        )
      );

      const result = validateResponse(
        scenario.name,
        selectedScenario,
        order,
        proxyResult.status,
        typeof proxyResult.body === "object" ? proxyResult.body : null,
        typeof proxyResult.body !== "object"
          ? "Response was not JSON. Your endpoint should return a JSON object with the extracted AV fields."
          : null
      );

      setValidationResult(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
            <span className="bg-blue-100 px-2 py-0.5 rounded text-xs">
              Step 3
            </span>
            Test
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Your Endpoint
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Send test orders to your webhook endpoint and verify it correctly
            extracts the AV fields. Your endpoint should respond with the
            extracted{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">
              is_autonomous
            </code>
            ,{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">passcode</code>,
            and{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">
              handoff_instructions
            </code>{" "}
            values.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Webhook URL */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
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
                We&apos;ll POST order JSON to this URL and validate the response.
                Requests are proxied server-side to avoid CORS issues.
              </p>
            </div>

            {/* Scenario Picker */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">
                Select Scenario
              </h2>
              <ScenarioPicker
                selected={selectedScenario}
                onSelect={setSelectedScenario}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendTest}
              disabled={loading || !webhookUrl}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  Send Test Order
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {/* Validation Results */}
            {validationResult && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">
                    Validation Results
                  </h2>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      validationResult.passed
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {validationResult.passed ? "ALL PASSED" : "ISSUES FOUND"}
                  </span>
                </div>

                {validationResult.error && !validationResult.fields.length ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">
                      {validationResult.error}
                    </p>
                  </div>
                ) : (
                  <FieldValidator fields={validationResult.fields} />
                )}
              </div>
            )}

            {/* Generated Order */}
            {generatedOrder && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-900 text-sm">
                    Sent Order Payload
                  </h2>
                  <CopyButton
                    text={JSON.stringify(generatedOrder, null, 2)}
                  />
                </div>
                <pre className="bg-gray-50 p-3 rounded-lg overflow-auto text-xs max-h-64">
                  {JSON.stringify(generatedOrder, null, 2)}
                </pre>
              </div>
            )}

            {/* Raw Response */}
            {rawResponse && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="flex items-center justify-between w-full"
                >
                  <h2 className="font-semibold text-gray-900 text-sm">
                    Raw Response
                  </h2>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      showRaw ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {showRaw && (
                  <pre className="mt-3 bg-gray-50 p-3 rounded-lg overflow-auto text-xs max-h-64">
                    {rawResponse}
                  </pre>
                )}
              </div>
            )}

            {/* Empty State */}
            {!validationResult && !generatedOrder && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">
                  Enter your webhook URL, select a scenario, and send a test
                  order to see validation results here.
                </p>
              </div>
            )}

            {/* Next Step */}
            <a
              href="/simulate"
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Next: Simulate a Live Delivery
                  </h3>
                  <p className="text-xs text-gray-500">
                    Walk through each step of an AV delivery
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
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
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
