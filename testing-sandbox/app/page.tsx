"use client";

import { useState } from "react";
import { TestScenarios, type TestScenarioKey, type Order } from "@/lib/mock-orders";

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<TestScenarioKey>("av_serve");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleGenerateOrder = () => {
    const scenario = TestScenarios[selectedScenario];
    const order = scenario.generator();
    setGeneratedOrder(order);
    setResponse("");
    setError("");
  };

  const handleSendToWebhook = async () => {
    if (!webhookUrl) {
      setError("Please enter a webhook URL");
      return;
    }

    if (!generatedOrder) {
      setError("Please generate an order first");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generatedOrder),
      });

      const responseText = await res.text();
      setResponse(`Status: ${res.status} ${res.statusText}\n\n${responseText}`);
    } catch (err) {
      setError(`Failed to send: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AV Integration Testing Sandbox
          </h1>
          <p className="text-gray-600">
            Test your POS integration with autonomous vehicle delivery orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="space-y-6">
            {/* Scenario Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">1. Select Test Scenario</h2>
              <div className="space-y-3">
                {Object.entries(TestScenarios).map(([key, scenario]) => (
                  <label
                    key={key}
                    className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition"
                  >
                    <input
                      type="radio"
                      name="scenario"
                      value={key}
                      checked={selectedScenario === key}
                      onChange={(e) => setSelectedScenario(e.target.value as TestScenarioKey)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{scenario.name}</div>
                      <div className="text-sm text-gray-600">{scenario.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              <button
                onClick={handleGenerateOrder}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Generate Order JSON
              </button>
            </div>

            {/* Webhook Configuration */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">2. Send to Your Endpoint</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-test-endpoint.com/orders"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Leave empty to just generate and view the JSON
                  </p>
                </div>
                <button
                  onClick={handleSendToWebhook}
                  disabled={loading || !generatedOrder || !webhookUrl}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Order"}
                </button>
              </div>
            </div>

            {/* Response */}
            {response && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Response</h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {response}
                </pre>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-red-800 font-medium">Error:</span>
                  <span className="ml-2 text-red-700">{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Generated Order */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Order JSON</h2>
                {generatedOrder && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(generatedOrder, null, 2));
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Copy JSON
                  </button>
                )}
              </div>
              {generatedOrder ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm max-h-[600px]">
                  {JSON.stringify(generatedOrder, null, 2)}
                </pre>
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-500">
                  Select a scenario and click &quot;Generate Order JSON&quot; to see the payload
                </div>
              )}
            </div>

            {/* Field Extraction Guide */}
            {generatedOrder && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Required Fields to Extract:
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-mono bg-white p-2 rounded">
                    <span className="text-gray-600">is_autonomous:</span>{" "}
                    <span className="font-bold text-blue-600">
                      {String(generatedOrder.deliveries[0]?.vehicle.is_autonomous)}
                    </span>
                  </div>
                  {generatedOrder.deliveries[0]?.vehicle.passcode && (
                    <div className="font-mono bg-white p-2 rounded">
                      <span className="text-gray-600">passcode:</span>{" "}
                      <span className="font-bold text-blue-600">
                        &quot;{generatedOrder.deliveries[0].vehicle.passcode}&quot;
                      </span>
                    </div>
                  )}
                  {generatedOrder.deliveries[0]?.vehicle.handoff_instructions && (
                    <div className="font-mono bg-white p-2 rounded">
                      <span className="text-gray-600">handoff_instructions:</span>{" "}
                      <span className="font-bold text-blue-600">
                        &quot;{generatedOrder.deliveries[0].vehicle.handoff_instructions}&quot;
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-blue-900">
                  <strong>JSON Path:</strong>{" "}
                  <code className="bg-white px-2 py-1 rounded">
                    order.deliveries[0].vehicle
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
