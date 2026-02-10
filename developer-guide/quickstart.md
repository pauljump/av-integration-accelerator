# AV Integration Quickstart Guide

**15-minute guide to adding autonomous vehicle delivery support to your POS integration**

## Overview

When Uber Eats assigns an autonomous vehicle (robot) to deliver an order, three additional fields appear in the order payload that your POS system must handle:

1. `is_autonomous` (Boolean) - Identifies this as an AV delivery
2. `passcode` (String) - Unlock code crew enters on robot keypad
3. `handoff_instructions` (String) - Step-by-step loading instructions

## Step 1: Understand the Data Structure

### Standard Order (Human Courier)
```json
{
  "id": "order_123",
  "deliveries": [{
    "vehicle": {
      "make": "Toyota",
      "is_autonomous": false
    }
  }]
}
```

### AV Order (Robot)
```json
{
  "id": "order_456",
  "deliveries": [{
    "vehicle": {
      "make": "Serve Robotics",
      "is_autonomous": true,
      "passcode": "9124",
      "handoff_instructions": "Enter 9124 on keypad. Place food inside."
    }
  }]
}
```

**JSON Path:** `order.deliveries[].vehicle`

## Step 2: Update Your Order Parser

### Before (Standard Orders Only)
```java
// Java example
String courier = order.getDeliveries().get(0).getFirstName();
// Display: "John"
```

### After (AV Support)
```java
Delivery delivery = order.getDeliveries().get(0);
Vehicle vehicle = delivery.getVehicle();

if (vehicle.getIsAutonomous()) {
    // AV delivery - display passcode
    String passcode = vehicle.getPasscode();
    String instructions = vehicle.getHandoffInstructions();
    
    // Print on KDS ticket
    printAVTicket(passcode, instructions);
} else {
    // Standard courier delivery
    String courier = delivery.getFirstName();
    printStandardTicket(courier);
}
```

## Step 3: Display on KDS/Receipt

The passcode MUST be prominently displayed so crew can see it easily.

### Example KDS Display
```
════════════════════════════════════
  UBER EATS ORDER #99456
════════════════════════════════════
  🤖 ROBOT DELIVERY

  UNLOCK CODE: 9124
  ────────────────────────────────
  Enter code on keypad
  Place food in compartment
  Close lid
════════════════════════════════════
```

## Step 4: Test Your Implementation

Use the AV Integration Testing Sandbox:

1. Visit the sandbox web UI
2. Select "AV Order (Serve Robotics)"
3. Click "Generate Order JSON"
4. Copy the JSON
5. Manually test your parser
6. Verify passcode and instructions are extracted

**OR** send to your test endpoint:

```bash
curl -X POST https://your-test-endpoint.com/orders \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_123",
    "deliveries": [{
      "vehicle": {
        "make": "Serve Robotics",
        "is_autonomous": true,
        "passcode": "9124",
        "handoff_instructions": "Enter code. Place food inside."
      }
    }]
  }'
```

## Step 5: Handle Edge Cases

### Missing Passcode (Error)
```java
if (vehicle.getIsAutonomous() && vehicle.getPasscode() == null) {
    // Alert manager - something went wrong
    logError("AV order missing passcode");
    escalateToManager(order);
}
```

### Multiple Deliveries
```java
for (Delivery delivery : order.getDeliveries()) {
    if (delivery.getVehicle().getIsAutonomous()) {
        // Handle AV
    } else {
        // Handle standard courier
    }
}
```

### Before Robot Assigned (CREATED state)
```java
// Passcode may be null if order just created
// Fields populate when robot is assigned and en route
if (order.getCurrentState().equals("CREATED")) {
    // Don't expect passcode yet
}
```

## Step 6: Run Validation

Use the Integration Validator to verify your implementation:

```bash
curl -X POST https://av-validator.uber.com/validate \
  -d '{"endpoint": "https://your-test-endpoint.com/orders"}'
```

Validation will test 10 scenarios and return a pass/fail report.

## Common Mistakes

❌ **Wrong JSON path:** `order.vehicle.passcode`  
✅ **Correct path:** `order.deliveries[0].vehicle.passcode`

❌ **Not displaying passcode on KDS**  
✅ **Print passcode prominently**

❌ **Treating all deliveries as AV**  
✅ **Check `is_autonomous` flag first**

❌ **Expecting passcode immediately**  
✅ **Passcode appears when robot assigned**

## Next Steps

- Read the [Field Reference](field-reference.md) for complete documentation
- Test with [all scenarios](testing-guide.md)
- Review [troubleshooting guide](troubleshooting.md)
- Get [certified](../README.md#certification)

## Need Help?

- **Sandbox:** Test at av-sandbox.uber.com
- **Validator:** Validate at av-validator.uber.com
- **Support:** partner-engineering@uber.com
