# AV Integration Accelerator

**Self-service developer platform for integrating Uber Eats Autonomous Vehicle delivery orders**

## Overview

This toolkit helps POS integration engineers add autonomous vehicle (AV) delivery support to their merchant systems in days instead of months. Built by Uber Partner Engineering to accelerate AV merchant adoption.

## Problem

Autonomous delivery robots (Serve, Nuro, Waymo) require POS systems to handle 3 additional fields:
- `is_autonomous` (Boolean) - Triggers AV workflow
- `passcode` (String) - Unlock code for robot compartment
- `handoff_instructions` (String) - How crew should load the food

**Current challenges:**
- No sandbox to test AV orders without real robots
- No validation tool to verify implementations
- Integrators rely on tablets (doesn't scale) or wait weeks for robot access

## Components

### 1. Testing Sandbox (`/testing-sandbox`)
Web-based tool that generates mock AV orders for testing.

**Features:**
- Send realistic AV order payloads to your webhook endpoint
- Compare standard vs AV order structures
- Simulate edge cases (null passcode, multiple deliveries)
- No robot access required

**Status:** In development

### 2. Integration Validator (`/integration-validator`)
Contract testing suite that validates POS implementations.

**Features:**
- Sends 10 test scenarios to your endpoint
- Validates correct field extraction
- Generates pass/fail compliance report
- Identifies missing fields and errors

**Status:** Planned

### 3. Developer Guide (`/developer-guide`)
Comprehensive implementation documentation.

**Includes:**
- Getting started guide
- Field reference and specifications
- Testing strategies
- Troubleshooting common issues
- KDS display examples

**Status:** Planned

### 4. Starter Kits (`/starter-kits`)
Reference implementations in multiple languages.

**Languages:**
- Java (for Infosys, Qu, etc.)
- Node.js
- C#
- Python

**Each kit includes:**
- Order parser with correct JSON paths
- Field extraction examples
- Mock server for local testing
- Unit tests

**Status:** Planned

## Quick Start

### For Integrators

1. **Read the guide:**
   ```bash
   cd developer-guide
   cat quickstart.md
   ```

2. **Test with sandbox:**
   - Visit the Testing Sandbox web UI
   - Enter your webhook endpoint
   - Click "Send AV Order"
   - Verify your system extracts the 3 required fields

3. **Run validation:**
   ```bash
   curl -X POST https://av-validator.uber.com/validate \
     -d '{"endpoint": "https://your-test-endpoint.com/orders"}'
   ```

4. **Get certified:**
   - Pass all validation tests
   - Receive "AV Ready" compliance report
   - Share with Uber Partner Engineering

### For Development

```bash
# Clone the repo
git clone https://github.com/uber/av-integration-accelerator
cd av-integration-accelerator

# Set up Testing Sandbox (Next.js)
cd testing-sandbox
npm install
npm run dev

# Set up Integration Validator (Node.js)
cd integration-validator
npm install
npm test

# Use starter kit
cd starter-kits/java
mvn clean install
mvn test
```

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  POS Integrator                     │
│  (Infosys, Olo, Qu, Toast, etc.)                   │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ 1. Tests implementation
                  ▼
┌─────────────────────────────────────────────────────┐
│           Testing Sandbox (Web UI)                  │
│  • Mock AV order generator                          │
│  • Webhook sender                                   │
│  • Response validator                               │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ 2. Validates compliance
                  ▼
┌─────────────────────────────────────────────────────┐
│        Integration Validator (API)                  │
│  • Contract testing suite                           │
│  • 10 test scenarios                                │
│  • Pass/fail reporting                              │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ 3. Gets certified
                  ▼
┌─────────────────────────────────────────────────────┐
│          "AV Ready" Certification                   │
│  • Compliance report                                │
│  • Integration goes live                            │
└─────────────────────────────────────────────────────┘
```

## API Reference

### Standard Order (Human Courier)
```json
{
  "id": "order_123",
  "deliveries": [{
    "vehicle": {
      "make": "Toyota",
      "model": "Camry",
      "is_autonomous": false
    }
  }]
}
```

### Autonomous Vehicle Order
```json
{
  "id": "order_456",
  "deliveries": [{
    "vehicle": {
      "make": "Serve Robotics",
      "model": "Rover",
      "is_autonomous": true,
      "passcode": "9124",
      "handoff_instructions": "Enter 9124 on keypad. Place food in compartment."
    }
  }]
}
```

### Required Fields
- **Path:** `order.deliveries[].vehicle.is_autonomous`
- **Type:** Boolean
- **Purpose:** Triggers AV workflow in POS/KDS

- **Path:** `order.deliveries[].vehicle.passcode`
- **Type:** String
- **Purpose:** Unlock code crew enters on robot keypad

- **Path:** `order.deliveries[].vehicle.handoff_instructions`
- **Type:** String
- **Purpose:** Step-by-step loading instructions for crew

## Roadmap

- **Week 1-2:** Testing Sandbox MVP
- **Week 2-3:** Developer Guide
- **Week 3-4:** Integration Validator
- **Week 4-5:** Starter Kits (all languages)
- **Week 5-6:** Beta testing + public launch

## Success Metrics

- **Target:** 15 integrators certified in 6 weeks
- **Time to integration:** <7 days (vs months currently)
- **Self-service rate:** 80% (integrators succeed without Uber eng support)
- **Validation pass rate:** >80%

## Contributing

This is an internal Uber Partner Engineering project. External contributions welcome via:
- Bug reports
- Documentation improvements
- Additional language starter kits
- Edge case test scenarios

## Support

- **Documentation:** [developer.uber.com/av-integration](https://developer.uber.com/av-integration)
- **Issues:** File a GitHub issue
- **Slack:** #av-partner-engineering (internal)
- **Email:** partner-engineering@uber.com

## License

MIT License (placeholder - update based on Uber policy)

## Credits

Built by Uber Partner Engineering to accelerate autonomous vehicle delivery adoption.

**Strategic Context:**
This toolkit demonstrates Partner Engineering's unique value in externalizing technical capabilities and enabling ecosystem growth, positioning the team as essential to Uber's AV expansion strategy.
