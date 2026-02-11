import { NextRequest, NextResponse } from "next/server";
import { TestScenarios, type TestScenarioKey } from "@/lib/mock-orders";
import {
  validateResponse,
  type ValidationResult,
  type ValidationSuiteResult,
} from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const { webhookUrl } = await request.json();

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Missing webhookUrl in request body" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(webhookUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid webhook URL format" },
        { status: 400 }
      );
    }

    const results: ValidationResult[] = [];
    const scenarioKeys = Object.keys(TestScenarios) as TestScenarioKey[];

    // Run each scenario sequentially
    for (const key of scenarioKeys) {
      const scenario = TestScenarios[key];
      const order = scenario.generator();

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "AV-Integration-Toolkit/1.0",
          },
          body: JSON.stringify(order),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        const responseText = await response.text();
        let body: Record<string, unknown> | null = null;
        let parseError: string | null = null;

        try {
          body = JSON.parse(responseText);
        } catch {
          parseError =
            "Response was not valid JSON. Your endpoint should return a JSON object.";
        }

        const result = validateResponse(
          scenario.name,
          key,
          order,
          response.status,
          body,
          parseError
        );

        results.push(result);
      } catch (err) {
        const errorMsg =
          err instanceof Error && err.name === "AbortError"
            ? "Request timed out after 15 seconds"
            : `Failed to reach endpoint: ${err instanceof Error ? err.message : String(err)}`;

        results.push(
          validateResponse(scenario.name, key, order, null, null, errorMsg)
        );
      }
    }

    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed).length;

    const suiteResult: ValidationSuiteResult = {
      results,
      passed,
      failed,
      total: results.length,
      score: `${passed}/${results.length}`,
      allPassed: failed === 0,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(suiteResult);
  } catch (err) {
    return NextResponse.json(
      {
        error: `Server error: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 500 }
    );
  }
}
