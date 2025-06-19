# Domain Check Web

A Single Page Web app for managing and checking domain records, built with React and TypeScript.

## Local Development Setup

### 1. Install dependencies

Change working directory to `apps/web` and run:

```bash
pnpm install
```

### 2. Set up environment variables (if needed)

Copy the file `.env.example` in `apps/api/` to `.env` and update its content:

```
PROXY_API_URL=http://localhost:3000
```

### 3. Run the app locally

Change working directory to `apps/web` and run:

```bash
pnpm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000) by default.

### 4. Run unit tests

Change working directory to `apps/web` and run:

```bash
pnpm run test
```

## Accessing Storybook

To view UI components in isolation with Storybook, run:

```bash
pnpm run storybook
```

Then open [http://localhost:6006](http://localhost:6006) in your browser.
