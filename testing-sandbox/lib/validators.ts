/**
 * Response validation logic for testing integrator endpoints.
 * Validates that the integrator correctly extracts and returns AV fields.
 */

import type { Order } from "./mock-orders";

export interface FieldResult {
  field: string;
  expected: string | boolean | null;
  actual: string | boolean | null | undefined;
  passed: boolean;
  message: string;
}

export interface ValidationResult {
  scenarioName: string;
  scenarioKey: string;
  passed: boolean;
  fields: FieldResult[];
  responseStatus: number | null;
  responseBody: unknown;
  error: string | null;
}

export interface ValidationSuiteResult {
  results: ValidationResult[];
  passed: number;
  failed: number;
  total: number;
  score: string;
  allPassed: boolean;
  timestamp: string;
}

/**
 * Validate a single response against expected AV fields from an order.
 */
export function validateResponse(
  scenarioName: string,
  scenarioKey: string,
  order: Order,
  responseStatus: number | null,
  responseBody: Record<string, unknown> | null,
  error: string | null
): ValidationResult {
  if (error || !responseBody) {
    return {
      scenarioName,
      scenarioKey,
      passed: false,
      fields: [],
      responseStatus,
      responseBody,
      error: error || "No response body received",
    };
  }

  const delivery = order.deliveries[0];
  const vehicle = delivery.vehicle;
  const fields: FieldResult[] = [];

  // Check is_autonomous
  const expectedIsAutonomous = vehicle.is_autonomous;
  const actualIsAutonomous = findField(responseBody, "is_autonomous", "isAutonomous");
  fields.push({
    field: "is_autonomous",
    expected: expectedIsAutonomous,
    actual: actualIsAutonomous,
    passed: actualIsAutonomous === expectedIsAutonomous,
    message:
      actualIsAutonomous === expectedIsAutonomous
        ? `Correctly identified as ${expectedIsAutonomous ? "autonomous" : "non-autonomous"}`
        : actualIsAutonomous === undefined
          ? "Field not found in response. Look for is_autonomous in the order payload."
          : `Expected ${expectedIsAutonomous}, got ${actualIsAutonomous}`,
  });

  // Check passcode (only relevant for AV orders)
  if (vehicle.is_autonomous) {
    const expectedPasscode = vehicle.passcode || null;
    const actualPasscode = findField(responseBody, "passcode");
    const passcodeMatch =
      expectedPasscode === null
        ? actualPasscode === null || actualPasscode === undefined || actualPasscode === "PENDING"
        : String(actualPasscode) === String(expectedPasscode);

    fields.push({
      field: "passcode",
      expected: expectedPasscode,
      actual: actualPasscode ?? null,
      passed: passcodeMatch,
      message: passcodeMatch
        ? expectedPasscode
          ? `Correctly extracted passcode "${expectedPasscode}"`
          : "Correctly handled missing passcode"
        : actualPasscode === undefined
          ? "Passcode not found in response. Extract from order.deliveries[].vehicle.passcode"
          : `Expected "${expectedPasscode}", got "${actualPasscode}"`,
    });

    // Check handoff_instructions
    const expectedInstructions = vehicle.handoff_instructions || null;
    const actualInstructions = findField(
      responseBody,
      "handoff_instructions",
      "handoffInstructions"
    );
    const instructionsMatch =
      expectedInstructions === null
        ? actualInstructions === null || actualInstructions === undefined
        : String(actualInstructions) === String(expectedInstructions);

    fields.push({
      field: "handoff_instructions",
      expected: expectedInstructions,
      actual: actualInstructions ?? null,
      passed: instructionsMatch,
      message: instructionsMatch
        ? expectedInstructions
          ? "Correctly extracted handoff instructions"
          : "Correctly handled missing instructions"
        : actualInstructions === undefined
          ? "Instructions not found in response. Extract from order.deliveries[].vehicle.handoff_instructions"
          : "Instructions do not match expected value",
    });
  }

  return {
    scenarioName,
    scenarioKey,
    passed: fields.every((f) => f.passed),
    fields,
    responseStatus,
    responseBody,
    error: null,
  };
}

/**
 * Search for a field in the response body, supporting nested structures.
 * Tries exact key names and common variants (snake_case and camelCase).
 */
function findField(
  obj: Record<string, unknown>,
  ...keys: string[]
): string | boolean | null | undefined {
  // Direct lookup
  for (const key of keys) {
    if (key in obj) {
      return obj[key] as string | boolean | null;
    }
  }

  // Look in avFields array (common response pattern)
  if (Array.isArray(obj.avFields) && obj.avFields.length > 0) {
    const first = obj.avFields[0] as Record<string, unknown>;
    for (const key of keys) {
      if (key in first) {
        return first[key] as string | boolean | null;
      }
    }
  }

  // Look in av_fields array
  if (Array.isArray(obj.av_fields) && obj.av_fields.length > 0) {
    const first = obj.av_fields[0] as Record<string, unknown>;
    for (const key of keys) {
      if (key in first) {
        return first[key] as string | boolean | null;
      }
    }
  }

  // Look in nested fields/data/result objects
  for (const nestedKey of ["fields", "data", "result", "delivery", "vehicle"]) {
    if (obj[nestedKey] && typeof obj[nestedKey] === "object") {
      const nested = obj[nestedKey] as Record<string, unknown>;
      for (const key of keys) {
        if (key in nested) {
          return nested[key] as string | boolean | null;
        }
      }
    }
  }

  return undefined;
}
