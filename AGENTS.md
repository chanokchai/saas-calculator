# AGENTS.md — Hermes Agent Project Rules

This file controls how Hermes Agent behaves when working in this repository.

## Git Workflow

- **Never commit directly to `master` or `main` branch.**
- For any new feature, bug fix, or change: first create a feature branch:

  ```bash
  git checkout -b feature/<short-description>
  ```

- Commit changes to the feature branch.
- Only merge to `master` after explicit user approval or instruction to do so.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # Next.js ESLint
```

## Architecture

Next.js 14 App Router app with two routes:
- `/` — Landing page
- `/calculator` — The interactive calculator

Uses Tailwind CSS with custom `brand` color scale.
