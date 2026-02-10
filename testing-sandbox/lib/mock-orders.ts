/**
 * Mock Order Generator for AV Integration Testing
 *
 * Generates realistic order payloads for testing POS integrations.
 * Includes standard courier orders and autonomous vehicle orders.
 */

export interface Vehicle {
  make: string;
  model: string;
  color: string;
  license_plate?: string;
  is_autonomous: boolean;
  passcode?: string;
  handoff_instructions?: string;
}

export interface Delivery {
  id: string;
  current_state: string;
  first_name: string;
  vehicle: Vehicle;
  estimated_pickup_time: string;
}

export interface Order {
  id: string;
  display_id: string;
  current_state: string;
  deliveries: Delivery[];
}

/**
 * Generate a standard human courier order
 */
export function generateStandardOrder(): Order {
  return {
    id: generateUUID(),
    display_id: generateDisplayId(),
    current_state: "ACCEPTED",
    deliveries: [
      {
        id: `delivery_${generateShortId()}`,
        current_state: "EN_ROUTE_TO_PICKUP",
        first_name: "John",
        vehicle: {
          make: "Toyota",
          model: "Camry",
          color: "Silver",
          license_plate: "UBER123",
          is_autonomous: false,
        },
        estimated_pickup_time: generateFutureTimestamp(15),
      },
    ],
  };
}

/**
 * Generate an autonomous vehicle order
 */
export function generateAVOrder(provider: AVProvider = "serve"): Order {
  const avConfig = getAVConfig(provider);

  return {
    id: generateUUID(),
    display_id: generateDisplayId(),
    current_state: "ACCEPTED",
    deliveries: [
      {
        id: `delivery_${generateShortId()}`,
        current_state: "ARRIVED_AT_PICKUP",
        first_name: "Autonomous Vehicle",
        vehicle: {
          make: avConfig.make,
          model: avConfig.model,
          color: avConfig.color,
          is_autonomous: true,
          passcode: generatePasscode(),
          handoff_instructions: avConfig.handoffInstructions,
        },
        estimated_pickup_time: generateFutureTimestamp(5),
      },
    ],
  };
}

/**
 * Generate an AV order with missing passcode (error scenario)
 */
export function generateAVOrderMissingPasscode(): Order {
  const order = generateAVOrder();
  order.deliveries[0].vehicle.passcode = undefined;
  return order;
}

/**
 * Generate an AV order with null handoff instructions
 */
export function generateAVOrderNullInstructions(): Order {
  const order = generateAVOrder();
  order.deliveries[0].vehicle.handoff_instructions = undefined;
  return order;
}

/**
 * Generate an order with multiple deliveries (one AV, one human)
 */
export function generateMixedDeliveryOrder(): Order {
  const standardOrder = generateStandardOrder();
  const avOrder = generateAVOrder();

  return {
    id: generateUUID(),
    display_id: generateDisplayId(),
    current_state: "ACCEPTED",
    deliveries: [
      standardOrder.deliveries[0],
      avOrder.deliveries[0],
    ],
  };
}

/**
 * Generate an order in CREATED state (before AV assigned)
 */
export function generateOrderBeforeAVAssignment(): Order {
  return {
    id: generateUUID(),
    display_id: generateDisplayId(),
    current_state: "CREATED",
    deliveries: [
      {
        id: `delivery_${generateShortId()}`,
        current_state: "CREATED",
        first_name: "Autonomous Vehicle",
        vehicle: {
          make: "Unknown",
          model: "Unknown",
          color: "Unknown",
          is_autonomous: false, // Not yet assigned
        },
        estimated_pickup_time: generateFutureTimestamp(10),
      },
    ],
  };
}

// ============================================================================
// AV Provider Configurations
// ============================================================================

export type AVProvider = "serve" | "nuro" | "waymo" | "coco" | "avride";

interface AVConfig {
  make: string;
  model: string;
  color: string;
  handoffInstructions: string;
}

function getAVConfig(provider: AVProvider): AVConfig {
  const configs: Record<AVProvider, AVConfig> = {
    serve: {
      make: "Serve Robotics",
      model: "Rover",
      color: "Yellow",
      handoffInstructions: "Enter code on keypad. Lift lid. Place food inside. Close lid.",
    },
    nuro: {
      make: "Nuro",
      model: "R2",
      color: "White",
      handoffInstructions: "Enter code on touchscreen. Door will open automatically. Place food in compartment.",
    },
    waymo: {
      make: "Waymo",
      model: "Delivery Bot",
      color: "Blue",
      handoffInstructions: "Scan QR code with phone or enter code. Place food in compartment when lid opens.",
    },
    coco: {
      make: "Coco Robotics",
      model: "Coco Bot",
      color: "Orange",
      handoffInstructions: "Enter passcode on keypad. Place order in top compartment. Close lid securely.",
    },
    avride: {
      make: "AvRide",
      model: "Delivery Robot",
      color: "Green",
      handoffInstructions: "Enter code to unlock. Place food in insulated compartment. Lid will close automatically.",
    },
  };

  return configs[provider];
}

// ============================================================================
// Utility Functions
// ============================================================================

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateShortId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function generateDisplayId(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

function generatePasscode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function generateFutureTimestamp(minutesFromNow: number): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutesFromNow);
  return now.toISOString();
}

// ============================================================================
// Test Scenario Exports
// ============================================================================

export const TestScenarios = {
  standard: {
    name: "Standard Courier Order",
    description: "Regular human courier delivery",
    generator: generateStandardOrder,
  },
  av_serve: {
    name: "AV Order (Serve Robotics)",
    description: "Autonomous delivery with Serve robot",
    generator: () => generateAVOrder("serve"),
  },
  av_nuro: {
    name: "AV Order (Nuro)",
    description: "Autonomous delivery with Nuro vehicle",
    generator: () => generateAVOrder("nuro"),
  },
  av_missing_passcode: {
    name: "AV Order - Missing Passcode (Error)",
    description: "AV order without passcode (should trigger error handling)",
    generator: generateAVOrderMissingPasscode,
  },
  av_null_instructions: {
    name: "AV Order - Null Instructions",
    description: "AV order with missing handoff instructions",
    generator: generateAVOrderNullInstructions,
  },
  mixed_delivery: {
    name: "Mixed Deliveries",
    description: "Order with both human courier and AV",
    generator: generateMixedDeliveryOrder,
  },
  before_assignment: {
    name: "Before AV Assignment",
    description: "Order in CREATED state before robot assigned",
    generator: generateOrderBeforeAVAssignment,
  },
} as const;

export type TestScenarioKey = keyof typeof TestScenarios;
