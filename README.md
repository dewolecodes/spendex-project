# Spendex Project

Spendex is an AI-powered personal finance management web application and landing/dashboard demo built with Next.js (App Router). It combines a modern, responsive UI with server-side API endpoints and lightweight AI features to help users track, analyze, and optimize their finances.

## Project type

- AI-enabled frontend web application (Next.js + React) using the App Router.
- Lightweight server/API routes for integrations and data handling located under `src/app/api/`.

## What this project does

Spendex demonstrates a professional finance management experience enhanced by AI capabilities. Key user-facing features include:

- Transaction overview and dashboard visuals.
- AI-assisted insights and recommendations for budgeting and eSpendex reduction.
- Conversational assistant endpoints for financial queries and quick guidance.
- Extensible component-driven UI for rapid experimentation and production hardening.

## Built with

- `Next.js` (App Router) — server and client components, routing, and static asset handling
- `React` — reusable UI components and composition
- `Node.js` / `npm` — runtime and package management
- `PostCSS` — CSS tooling and processing
- Plain/global CSS for layout and component styles (`src/app/globals.css`)

The project also includes static assets under `public/` and modular UI components in `src/components/`.

## Quick start

1. Install dependencies:

```powershell
npm install
```

2. Run the development server:

```powershell
npm run dev
```

3. Open `http://localhost:3000` in your browser.

Common npm scripts (see `package.json`):

- `dev` — start Next.js in development
- `build` — build for production
- `start` — start production server

## Where to look in the repo

- `src/app/` — Next.js App Router pages, layout, and global styles
- `src/app/api/` — example API routes (chat, health, profile, reset) including conversational/AI endpoints
- `src/components/` — reusable UI components (header, footer, hero, etc.)
- `public/` — static assets and images

## License

Copyright (c) 2025 dewolecodes. All rights reserved.

This project is distributed under a Recognition Required License. See `LICENSE.md` for the full terms. At a high level:

- Permissions: free for personal and commercial use; modifiable and redistributable.
- Condition: attribution to the original author is required.

