# SaaS Calc

A clean, production-ready SaaS ROI calculator built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind CSS**. Deploy instantly to Vercel from any GitHub repo.

![Screenshot](https://img.shields.io/badge/status-live-brightgreen)

## ✨ Features

- **Instant ROI metrics** — MRR, ARR, LTV, CAC, break-even, monthly profit
- **Live sliders** — update any value and see results immediately
- **Copy results** — one-click copy to clipboard
- **Responsive** — works on desktop, tablet, and mobile
- **Dark mode** — respects your system preference
- **No backend** — everything runs in the browser. Zero data leaves your machine.

## 🚀 Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.
4. Done.

Or deploy with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/saas-calculator)

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
saas-calculator/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx     # Responsive navigation
│   │   ├── Footer.tsx     # Site footer
│   │   ├── Hero.tsx       # Landing hero section
│   │   └── Features.tsx   # Feature cards
│   ├── calculator/
│   │   └── page.tsx       # Calculator page (form + results)
│   ├── globals.css        # Tailwind imports + base styles
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Landing page
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
├── package.json
└── README.md
```

## 📊 What It Calculates

| Metric | Formula |
|---|---|
| **MRR** | Customers × ARPU |
| **ARR** | MRR × 12 |
| **Customer Lifetime** | 1 / Monthly Churn Rate |
| **LTV** | Gross Profit per Customer × Lifetime |
| **LTV:CAC** | LTV / CAC |
| **Monthly Profit** | (MRR × Gross Margin %) — Fixed Costs |
| **Break-even** | (Customers × CAC) / Monthly Profit |

## 📄 License

MIT
