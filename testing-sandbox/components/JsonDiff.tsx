"use client";

import { useState } from "react";

const standardOrder = {
  id: "ord_abc123",
  display_id: "42851",
  current_state: "ACCEPTED",
  deliveries: [
    {
      id: "delivery_xyz789",
      current_state: "EN_ROUTE_TO_PICKUP",
      first_name: "John",
      vehicle: {
        make: "Toyota",
        model: "Camry",
        color: "Silver",
        license_plate: "UBER123",
        is_autonomous: false,
      },
      estimated_pickup_time: "2025-01-15T14:30:00Z",
    },
  ],
};

const avOrder = {
  id: "ord_abc123",
  display_id: "42851",
  current_state: "ACCEPTED",
  deliveries: [
    {
      id: "delivery_xyz789",
      current_state: "ARRIVED_AT_PICKUP",
      first_name: "Autonomous Vehicle",
      vehicle: {
        make: "Serve Robotics",
        model: "Rover",
        color: "Yellow",
        is_autonomous: true,
        passcode: "4829",
        handoff_instructions:
          "Enter code on keypad. Lift lid. Place food inside. Close lid.",
      },
      estimated_pickup_time: "2025-01-15T14:30:00Z",
    },
  ],
};

// Fields that are different or new in AV orders
const highlightFields = [
  "is_autonomous",
  "passcode",
  "handoff_instructions",
  "first_name",
  "current_state",
  "make",
  "model",
  "color",
];

interface FieldInfo {
  field: string;
  title: string;
  description: string;
}

const fieldInfoMap: Record<string, FieldInfo> = {
  is_autonomous: {
    field: "is_autonomous",
    title: "Is Autonomous",
    description:
      "Boolean flag indicating this delivery is handled by a robot, not a human courier. When true, your KDS should display the AV-specific UI with passcode and handoff instructions.",
  },
  passcode: {
    field: "passcode",
    title: "Passcode",
    description:
      "A 4-digit PIN that the crew must enter on the robot's keypad to open the food compartment. This is the most critical field - without it, the crew cannot load food into the robot.",
  },
  handoff_instructions: {
    field: "handoff_instructions",
    title: "Handoff Instructions",
    description:
      "Step-by-step instructions for the crew to load food into the robot. These vary by robot provider (Serve, Nuro, Waymo, etc.) and should be displayed on the KDS.",
  },
};

function renderJsonLines(
  obj: object,
  onFieldClick: (field: string) => void,
  selectedField: string | null
) {
  const json = JSON.stringify(obj, null, 2);
  const lines = json.split("\n");

  return lines.map((line, i) => {
    const matchedField = highlightFields.find((f) => line.includes(`"${f}"`));
    const isAVField =
      matchedField &&
      (matchedField === "is_autonomous" ||
        matchedField === "passcode" ||
        matchedField === "handoff_instructions");
    const isSelected = matchedField === selectedField;

    return (
      <div
        key={i}
        className={`px-4 font-mono text-sm leading-6 ${
          isAVField
            ? isSelected
              ? "bg-blue-100 border-l-2 border-blue-500 cursor-pointer"
              : "bg-yellow-50 border-l-2 border-yellow-400 cursor-pointer hover:bg-yellow-100"
            : matchedField
              ? "bg-gray-50"
              : ""
        }`}
        onClick={isAVField ? () => onFieldClick(matchedField!) : undefined}
      >
        {line}
      </div>
    );
  });
}

export default function JsonDiff() {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const handleFieldClick = (field: string) => {
    setSelectedField(selectedField === field ? null : field);
  };

  const info = selectedField ? fieldInfoMap[selectedField] : null;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Standard Order */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded">
              Standard Order
            </span>
            <span className="text-xs text-gray-500">Human courier delivery</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
            <pre className="py-2">
              {renderJsonLines(standardOrder, handleFieldClick, selectedField)}
            </pre>
          </div>
        </div>

        {/* AV Order */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              AV Order
            </span>
            <span className="text-xs text-gray-500">
              Click highlighted fields to learn more
            </span>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg overflow-hidden overflow-x-auto">
            <pre className="py-2">
              {renderJsonLines(avOrder, handleFieldClick, selectedField)}
            </pre>
          </div>
        </div>
      </div>

      {/* Field Info Panel */}
      {info && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-4 h-4 text-blue-600"
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
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">{info.title}</h4>
              <p className="text-sm text-blue-800 mt-1">{info.description}</p>
              <code className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded mt-2 inline-block">
                order.deliveries[].vehicle.{info.field}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
