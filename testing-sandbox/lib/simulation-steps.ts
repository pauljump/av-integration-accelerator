/**
 * Simulation step definitions for the interactive AV delivery walkthrough.
 * Each step represents a stage in the AV delivery lifecycle.
 */

import type { Order } from "./mock-orders";

export interface SimulationStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  crewAction: string;
  kdsDisplay: {
    highlight: boolean;
    status: string;
    passcodeVisible: boolean;
    instructionsVisible: boolean;
  };
  orderState: {
    current_state: string;
    delivery_state: string;
    is_autonomous: boolean;
    passcode: string | null;
    handoff_instructions: string | null;
  };
}

export const simulationSteps: SimulationStep[] = [
  {
    id: 1,
    title: "Order Created",
    subtitle: "Standard order arrives, no AV fields yet",
    description:
      "A new order comes in through your POS. At this point, no delivery vehicle has been assigned. The order looks like any other incoming order. The is_autonomous field is false and there's no passcode or handoff instructions.",
    crewAction: "Crew sees a new order on the KDS. They begin preparing food as usual.",
    kdsDisplay: {
      highlight: false,
      status: "NEW ORDER",
      passcodeVisible: false,
      instructionsVisible: false,
    },
    orderState: {
      current_state: "CREATED",
      delivery_state: "CREATED",
      is_autonomous: false,
      passcode: null,
      handoff_instructions: null,
    },
  },
  {
    id: 2,
    title: "Robot Assigned",
    subtitle: "is_autonomous flips to true, passcode appears",
    description:
      'A delivery robot has been assigned to this order. The webhook fires with updated fields: is_autonomous is now true, a 4-digit passcode appears, and handoff_instructions are populated. This is the critical moment your integration needs to detect.',
    crewAction:
      "KDS updates to show a ROBOT DELIVERY alert. Crew sees the passcode prominently displayed. They note this is not a human courier pickup.",
    kdsDisplay: {
      highlight: true,
      status: "ROBOT DELIVERY",
      passcodeVisible: true,
      instructionsVisible: true,
    },
    orderState: {
      current_state: "ACCEPTED",
      delivery_state: "SCHEDULED",
      is_autonomous: true,
      passcode: "4829",
      handoff_instructions:
        "Enter code on keypad. Lift lid. Place food inside. Close lid.",
    },
  },
  {
    id: 3,
    title: "Robot En Route",
    subtitle: "Robot is heading to the restaurant",
    description:
      "The robot is on its way to the restaurant for pickup. The order fields remain the same but the delivery state changes to EN_ROUTE_TO_PICKUP. The crew should be finishing food prep.",
    crewAction:
      "Crew continues preparing the order. The KDS shows estimated arrival time. They know a robot is coming, not a human driver.",
    kdsDisplay: {
      highlight: true,
      status: "ROBOT EN ROUTE",
      passcodeVisible: true,
      instructionsVisible: true,
    },
    orderState: {
      current_state: "ACCEPTED",
      delivery_state: "EN_ROUTE_TO_PICKUP",
      is_autonomous: true,
      passcode: "4829",
      handoff_instructions:
        "Enter code on keypad. Lift lid. Place food inside. Close lid.",
    },
  },
  {
    id: 4,
    title: "Robot Arrives",
    subtitle: "Robot is at the restaurant, waiting for food",
    description:
      "The robot has arrived at the restaurant. The delivery state changes to ARRIVED_AT_PICKUP. This triggers a notification on the KDS. The crew needs to bring the food outside and load it into the robot using the passcode.",
    crewAction:
      "Crew receives an alert: robot has arrived. They gather the order and head to the robot's location with the passcode ready.",
    kdsDisplay: {
      highlight: true,
      status: "ROBOT ARRIVED - LOAD FOOD",
      passcodeVisible: true,
      instructionsVisible: true,
    },
    orderState: {
      current_state: "ACCEPTED",
      delivery_state: "ARRIVED_AT_PICKUP",
      is_autonomous: true,
      passcode: "4829",
      handoff_instructions:
        "Enter code on keypad. Lift lid. Place food inside. Close lid.",
    },
  },
  {
    id: 5,
    title: "Crew Loads Food",
    subtitle: "Crew enters passcode and loads the order",
    description:
      "The crew member approaches the robot, enters the 4-digit passcode on the robot's keypad, the compartment opens, they place the food inside, and close the lid. The passcode is essential - without it, the robot can't be opened.",
    crewAction:
      'Crew enters passcode "4829" on the robot keypad. Lid opens. They place the food bag inside. Close the lid securely.',
    kdsDisplay: {
      highlight: true,
      status: "LOADING...",
      passcodeVisible: true,
      instructionsVisible: true,
    },
    orderState: {
      current_state: "ACCEPTED",
      delivery_state: "ARRIVED_AT_PICKUP",
      is_autonomous: true,
      passcode: "4829",
      handoff_instructions:
        "Enter code on keypad. Lift lid. Place food inside. Close lid.",
    },
  },
  {
    id: 6,
    title: "Robot Departs",
    subtitle: "Food loaded, robot heads to customer",
    description:
      "The food has been loaded and the robot departs for the customer. The delivery state changes to EN_ROUTE_TO_DROPOFF. The order is complete from the restaurant's perspective.",
    crewAction:
      "Crew marks the order as picked up. The KDS shows the delivery is complete. They move on to the next order.",
    kdsDisplay: {
      highlight: false,
      status: "PICKED UP - ROBOT DEPARTING",
      passcodeVisible: false,
      instructionsVisible: false,
    },
    orderState: {
      current_state: "ACCEPTED",
      delivery_state: "EN_ROUTE_TO_DROPOFF",
      is_autonomous: true,
      passcode: "4829",
      handoff_instructions:
        "Enter code on keypad. Lift lid. Place food inside. Close lid.",
    },
  },
];

/**
 * Generate a full Order object for a given simulation step.
 */
export function generateOrderForStep(step: SimulationStep): Order {
  return {
    id: "ord_8f2a4b6c-1d3e-4f5a-b6c7-d8e9f0a1b2c3",
    display_id: "42851",
    current_state: step.orderState.current_state,
    deliveries: [
      {
        id: "delivery_sim001",
        current_state: step.orderState.delivery_state,
        first_name: step.orderState.is_autonomous
          ? "Autonomous Vehicle"
          : "Pending",
        vehicle: {
          make: step.orderState.is_autonomous ? "Serve Robotics" : "Unknown",
          model: step.orderState.is_autonomous ? "Rover" : "Unknown",
          color: step.orderState.is_autonomous ? "Yellow" : "Unknown",
          is_autonomous: step.orderState.is_autonomous,
          ...(step.orderState.passcode
            ? { passcode: step.orderState.passcode }
            : {}),
          ...(step.orderState.handoff_instructions
            ? { handoff_instructions: step.orderState.handoff_instructions }
            : {}),
        },
        estimated_pickup_time: new Date(
          Date.now() + 5 * 60 * 1000
        ).toISOString(),
      },
    ],
  };
}
