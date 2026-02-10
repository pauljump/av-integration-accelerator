# Project Structure

## Directory Layout

```
av-integration-accelerator/
├── README.md                     # Main project documentation
├── docs/                         # Additional documentation
│   ├── PROJECT_STRUCTURE.md      # This file
│   ├── ARCHITECTURE.md           # Technical architecture
│   └── DEPLOYMENT.md             # Deployment guide
├── examples/                     # Example integrations
│   ├── complete-integration/     # Full working example
│   └── edge-cases/               # Edge case handling examples
├── testing-sandbox/              # Component 1: Web-based testing tool
│   ├── app/                      # Next.js 14 app directory
│   ├── components/               # React components
│   ├── lib/                      # Utilities and helpers
│   └── public/                   # Static assets
├── integration-validator/        # Component 2: Contract testing API
│   ├── src/
│   │   ├── validators/           # Test scenario validators
│   │   ├── scenarios/            # Test scenario definitions
│   │   └── reporting/            # Compliance report generator
│   ├── tests/                    # Unit tests
│   └── package.json
├── developer-guide/              # Component 3: Documentation
│   ├── quickstart.md
│   ├── field-reference.md
│   ├── testing-guide.md
│   ├── troubleshooting.md
│   └── kds-examples/             # KDS display mockups
└── starter-kits/                 # Component 4: Reference implementations
    ├── java/
    │   ├── src/main/java/
    │   └── pom.xml
    ├── nodejs/
    │   ├── src/
    │   └── package.json
    ├── csharp/
    │   ├── AVIntegration/
    │   └── AVIntegration.sln
    └── python/
        ├── av_integration/
        └── setup.py
```

## Component Details

### Testing Sandbox (`/testing-sandbox`)
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS

**Purpose:** Web UI for sending mock AV orders to integrator endpoints

**Key Files:**
- `app/page.tsx` - Main sandbox interface
- `app/api/send-order/route.ts` - API route for sending mock orders
- `components/OrderGenerator.tsx` - Order JSON generator
- `components/ResponseValidator.tsx` - Validates integrator responses
- `lib/mock-orders.ts` - Mock order templates

**Features:**
- Mock order generator (standard vs AV)
- Webhook sender
- Response visualization
- Edge case simulator

### Integration Validator (`/integration-validator`)
**Tech Stack:** Node.js, TypeScript, Express

**Purpose:** Automated contract testing suite

**Key Files:**
- `src/validators/field-validator.ts` - Validates field extraction
- `src/scenarios/test-scenarios.ts` - 10 test case definitions
- `src/reporting/compliance-report.ts` - Generates PDF/JSON reports
- `src/server.ts` - Express API server

**API Endpoints:**
- `POST /validate` - Run full validation suite
- `GET /scenarios` - List available test scenarios
- `GET /report/:validationId` - Download compliance report

### Developer Guide (`/developer-guide`)
**Format:** Markdown documentation

**Purpose:** Comprehensive implementation guide

**Files:**
- `quickstart.md` - 15-minute getting started guide
- `field-reference.md` - Complete API field documentation
- `testing-guide.md` - How to test implementations
- `troubleshooting.md` - Common issues and solutions
- `kds-examples/` - Visual examples of KDS displays

### Starter Kits (`/starter-kits`)
**Purpose:** Copy-paste ready reference implementations

**Each language includes:**
- Order parser with correct JSON paths
- Field extraction utilities
- Unit tests demonstrating correct behavior
- Mock server for local testing
- README with setup instructions

## Development Workflow

### 1. Local Development

```bash
# Testing Sandbox
cd testing-sandbox
npm install
npm run dev
# Visit http://localhost:3000

# Integration Validator
cd integration-validator
npm install
npm run dev
# API available at http://localhost:4000

# Starter Kits (example: Java)
cd starter-kits/java
mvn clean install
mvn test
```

### 2. Testing

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

### 3. Deployment

```bash
# Testing Sandbox (Vercel)
cd testing-sandbox
vercel deploy

# Integration Validator (Render/Railway)
cd integration-validator
npm run build
npm start
```

## File Naming Conventions

- Components: PascalCase (`OrderGenerator.tsx`)
- Utilities: camelCase (`mock-orders.ts`)
- API routes: kebab-case (`send-order/route.ts`)
- Tests: `*.test.ts` or `*.spec.ts`
- Documentation: UPPERCASE.md for root docs, lowercase.md for guides

## Code Style

- TypeScript for all JavaScript code
- Prettier for formatting
- ESLint for linting
- Tailwind CSS for styling
- Conventional Commits for git messages

## Dependencies

### Testing Sandbox
- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Shadcn/ui components (optional)

### Integration Validator
- Node.js 18+
- TypeScript 5+
- Express
- Axios (for webhook sending)
- PDF generation library (for reports)

### Starter Kits
- Java: Maven, JUnit
- Node.js: TypeScript, Jest
- C#: .NET 8, xUnit
- Python: pytest, requests

## Environment Variables

### Testing Sandbox
```env
NEXT_PUBLIC_VALIDATOR_API_URL=http://localhost:4000
```

### Integration Validator
```env
PORT=4000
NODE_ENV=development
REPORT_STORAGE=./reports
```

## Next Steps

1. Complete Testing Sandbox UI
2. Implement mock order generator
3. Build webhook sender
4. Create validation logic
5. Write developer guide
6. Build starter kits
7. Deploy to staging
8. Beta test with integrators
9. Public launch
