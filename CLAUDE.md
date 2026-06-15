# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # Next.js ESLint
```

There are no tests in this project.

## Architecture

Next.js 14 App Router app with two routes:

- `/` — Landing page: composes `Hero` and `Features` components (server components)
- `/calculator` — The interactive calculator (`"use client"`)

`app/layout.tsx` wraps all pages with `Navbar` and `Footer`. Dark mode is CSS-only via Tailwind's `dark:` variants — no JS toggle; it follows the OS preference.

### Calculator data flow (`app/calculator/page.tsx`)

All logic is self-contained in a single file with no external dependencies beyond React:

1. `Inputs` state (6 sliders) is held in `useState`
2. `compute(inputs)` derives `Results` synchronously on every render — no `useEffect`, no memoization of the result
3. `Metric` and `Slider` are local presentational components defined in the same file
4. Copy-to-clipboard uses the Web Clipboard API (`navigator.clipboard.writeText`)

### Styling

Tailwind CSS with a custom `brand` color scale (indigo-family blues, defined in `tailwind.config.js`). Use `brand-{50–900}` for primary accent colors. The `accent-brand-600` utility styles the range slider thumb cross-browser.
