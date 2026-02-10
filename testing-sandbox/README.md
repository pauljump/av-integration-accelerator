# AV Integration Testing Sandbox

Web-based tool for testing autonomous vehicle delivery order integrations.

## Features

- 🤖 Generate realistic AV order payloads
- 🎯 Multiple test scenarios (standard, AV, edge cases)
- 🚀 Send orders to your webhook endpoint
- ✅ Validate field extraction
- 📋 Copy JSON with one click

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Select a test scenario** (e.g., "AV Order - Serve Robotics")
2. **Click "Generate Order JSON"** to see the payload
3. **Enter your webhook URL** (optional)
4. **Click "Send Order"** to POST the order to your endpoint
5. **Verify your system extracts** `is_autonomous`, `passcode`, and `handoff_instructions`

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
