/**
 * Shared data for KDS components.
 * Sample order items, KDS state configs, and annotation definitions.
 */

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  modifiers?: string[];
}

export const sampleOrderItems: OrderItem[] = [
  { name: "Double Smashburger", quantity: 2, price: 12.99, modifiers: ["No onions", "Extra pickles"] },
  { name: "Loaded Fries", quantity: 1, price: 6.49 },
  { name: "Chocolate Milkshake", quantity: 1, price: 5.99, modifiers: ["Whipped cream"] },
  { name: "Diet Coke", quantity: 2, price: 2.49 },
];

export interface KdsState {
  id: string;
  label: string;
  isAV: boolean;
  showPasscode: boolean;
  showInstructions: boolean;
  statusText: string;
  urgency: "low" | "medium" | "high";
}

export const kdsStates: KdsState[] = [
  {
    id: "new_order",
    label: "New Order",
    isAV: false,
    showPasscode: false,
    showInstructions: false,
    statusText: "NEW ORDER",
    urgency: "low",
  },
  {
    id: "robot_assigned",
    label: "Robot Assigned",
    isAV: true,
    showPasscode: true,
    showInstructions: true,
    statusText: "ROBOT DELIVERY",
    urgency: "medium",
  },
  {
    id: "en_route",
    label: "En Route",
    isAV: true,
    showPasscode: true,
    showInstructions: true,
    statusText: "ROBOT EN ROUTE",
    urgency: "medium",
  },
  {
    id: "arrived",
    label: "Arrived",
    isAV: true,
    showPasscode: true,
    showInstructions: true,
    statusText: "ROBOT ARRIVED - LOAD FOOD",
    urgency: "high",
  },
  {
    id: "loading",
    label: "Loading",
    isAV: true,
    showPasscode: true,
    showInstructions: true,
    statusText: "LOADING...",
    urgency: "high",
  },
  {
    id: "departed",
    label: "Departed",
    isAV: true,
    showPasscode: false,
    showInstructions: false,
    statusText: "PICKED UP - DEPARTING",
    urgency: "low",
  },
];

export interface Annotation {
  id: string;
  target: string;
  text: string;
  position: "top" | "right" | "bottom" | "left";
}

export const annotations: Annotation[] = [
  {
    id: "robot_badge",
    target: "delivery-type",
    text: "Crew instantly knows this is a robot, not a human courier",
    position: "right",
  },
  {
    id: "passcode",
    target: "passcode",
    text: "Crew needs this PIN to open the robot compartment",
    position: "right",
  },
  {
    id: "instructions",
    target: "instructions",
    text: "Steps vary by robot provider — display them exactly as received",
    position: "bottom",
  },
  {
    id: "vehicle",
    target: "vehicle-info",
    text: "Helps crew identify the correct robot outside",
    position: "left",
  },
];
