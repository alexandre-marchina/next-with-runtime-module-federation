# Monorepo POC - Module Federation with Next.js Runtime

A Proof of Concept (POC) for a monorepo using **pnpm workspaces** with:

- 2 Next.js 16 applications (App Router and Pages Router)
- 1 React library built with Rsbuild exported via Module Federation
- Component consumption via **Module Federation Runtime** (without Next.js plugin)

## Project Structure

```
next-with-runtime-module-federation/
├── apps/
│   ├── app-router/          # Next.js 16 with App Router (port 3002)
│   └── pages-router/        # Next.js 16 with Pages Router (port 3003)
├── packages/
│   └── ui-library/          # Rsbuild + React Components (port 3001)
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 24.x (LTS)
- pnpm 10.x (installed globally)

### Installation

```bash
# Install monorepo dependencies
pnpm install
```

### Development Mode

Start all applications simultaneously:

```bash
pnpm dev
```

This will start:

- **UI Library** at http://localhost:3001
- **App Router** at http://localhost:3002
- **Pages Router** at http://localhost:3003

You can also start individual applications:

```bash
# UI Library only
pnpm dev:ui-library

# App Router only
pnpm dev:app-router

# Pages Router only
pnpm dev:pages-router
```

## Testing Module Federation Integration

### App Router (http://localhost:3002)

1. Open http://localhost:3002 in your browser
2. Click "Remote Component" in the menu
3. You'll see a remote button dynamically loaded from the UI Library

**Features**:

- Uses `dynamic()` from Next.js with `ssr: false`
- `export const dynamic = "force-dynamic"` prevents static pre-rendering
- Asynchronous remote component loading

### Pages Router (http://localhost:3003)

1. Open http://localhost:3003 in your browser
2. Click "Remote Component" in the menu
3. You'll see a remote button dynamically loaded from the UI Library

**Features**:

- Uses `dynamic()` from Next.js with `ssr: false`
- Asynchronous remote component loading
- No static pre-rendering during build

## 🚀 Testing in Production

To simulate a production environment with all services running as they would in production:

### Step 1: Build Everything

```bash
pnpm build
```

This builds:

- UI Library → `packages/ui-library/dist/`
- App Router → `apps/app-router/.next/`
- Pages Router → `apps/pages-router/.next/`

### Step 2: Start Services (In Separate Terminals)

**Terminal 1: UI Library Server**

```bash
pnpm prod:lib
```

- Starts static file server on port 3001
- Serves the `mf-manifest.json`

**Terminal 2: App Router**

```bash
PORT=3002 pnpm -F app-router run start
```

- Starts on port 3002

**Terminal 3: Pages Router**

```bash
PORT=3003 pnpm -F pages-router run start
```

- Starts on port 3003

### Example Production Workflow

```bash
# 1. Build everything
pnpm build

# 2. Verify builds completed
ls packages/ui-library/dist/mf-manifest.json  # Should exist
ls apps/app-router/.next                       # Should exist
ls apps/pages-router/.next                     # Should exist

# 3. Start production servers (in separate terminals)
# Terminal 1:
pnpm prod:lib

# Terminal 2:
PORT=3002 pnpm -F app-router run start

# Terminal 3:
PORT=3003 pnpm -F pages-router run start

# 4. Test in browser
# Open http://localhost:3002 or http://localhost:3003
# Click "Remote Component" to test MF loading
```
