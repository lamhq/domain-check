# Domain Check Web

A Single Page Web app for managing and checking domain records, built with React and TypeScript.

## Requirements

- Node.js >=22.12.0
- pnpm >=9.15.1

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

Note: When viewing components in Storybook, all network requests are mocked. This enables isolated development and testing of UI components without relying on a backend.

## Project Structure

The project architecture is organized according to the five levels of [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/):

- **Atoms** – The foundational building blocks of the interface such as buttons, inputs, icons, and labels.
- **Molecules** – Combinations of atoms that work together as a unit (e.g., input + label + button = search form).
- **Organisms** – Relatively complex components composed of groups of molecules and/or atoms that form distinct sections (e.g., headers, product cards, forms).
- **Templates** – Page layouts that combine organisms into cohesive structures using dummy content.
- **Pages** – Specific views that represent real content and demonstrate design fidelity.

```
src/
└── components/
    ├── atoms/
    ├── molecules/
    ├── organisms/
    ├── templates/
    └── pages/
```
