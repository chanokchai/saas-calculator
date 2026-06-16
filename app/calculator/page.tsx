"use client";

import { useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────
interface Inputs {
  customers: number;
  arpu: number;
  churnRate: number;
  cac: number;
  fixedCosts: number;
  grossMargin: number;
}

interface Results {
  mrr: number;
  monthlyChurn: number;
  customerLifetimeMonths: number;
  ltv: number;
  ltvCacRatio: number;
  monthlyProfit: number;
  breakEvenMonths: number;
  annualRunRate: number;
}

const defaultInputs: Inputs = {
  customers: 500,
  arpu: 49,
  churnRate: 5,
  cac: 300,
  fixedCosts: 15000,
  grossMargin: 80,
};

function compute(inputs: Inputs): Results {
  const { customers, arpu, churnRate, cac, fixedCosts, grossMargin } = inputs;

  const mrr = customers * arpu;
  const monthlyChurn = customers * (churnRate / 100);
  const customerLifetimeMonths = churnRate > 0 ? 1 / (churnRate / 100) : 999;
  const grossProfitPerCustomer = arpu * (grossMargin / 100);
  const ltv = grossProfitPerCustomer * customerLifetimeMonths;
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;
  const monthlyGrossProfit = mrr * (grossMargin / 100);
  const monthlyProfit = monthlyGrossProfit - fixedCosts;
  const annualRunRate = mrr * 12;
  const breakEvenMonths =
    monthlyProfit <= 0
      ? 999
      : Math.ceil(
          (customers * cac) / (monthlyProfit > 0 ? monthlyProfit : 1)
        );

  return {
    mrr,
    monthlyChurn,
    customerLifetimeMonths,
    ltv,
    ltvCacRatio,
    monthlyProfit,
    breakEvenMonths,
    annualRunRate,
  };
}

// ── Format helpers ─────────────────────────────────
const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const usdPrecise = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);

const pct = (n: number) => `${n.toFixed(1)}%`;

const num = (n: number) => n.toLocaleString("en-US");

// ── Metric card ────────────────────────────────────
function Metric({
  label,
  value,
  good,
  bad,
  hint,
}: {
  label: string;
  value: string;
  good?: boolean;
  bad?: boolean;
  hint?: string;
}) {
  const color = good ? "text-emerald-600 dark:text-emerald-400"
    : bad ? "text-red-600 dark:text-red-400"
    : "text-gray-900 dark:text-white";

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-5">
      <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </div>
      <div className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</div>
      {hint && (
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {hint}
        </div>
      )}
    </div>
  );
}

// ── Input slider ───────────────────────────────────
function Slider({
  label,
  suffix,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  suffix: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <label className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="font-semibold text-brand-600 dark:text-brand-400 tabular-nums">
          {suffix === "$"
            ? usd(value)
            : suffix === "%"
            ? pct(value)
            : suffix === "#"
            ? num(value)
            : `${value}${suffix}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          bg-gray-200 dark:bg-gray-700
          accent-brand-600 dark:accent-brand-400
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-brand-600
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>
          {suffix === "$"
            ? usd(min)
            : suffix === "%"
            ? pct(min)
            : suffix === "#"
            ? num(min)
            : min}
        </span>
        <span>
          {suffix === "$"
            ? usd(max)
            : suffix === "%"
            ? pct(max)
            : suffix === "#"
            ? num(max)
            : max}
        </span>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────
export default function CalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [copied, setCopied] = useState(false);

  const update = useCallback(
    (key: keyof Inputs) => (val: number) =>
      setInputs((prev) => ({ ...prev, [key]: val })),
    []
  );

  const results = compute(inputs);

  const handleCopy = async () => {
    const text = [
      `📊 SaaS Calc Results`,
      ``,
      `MRR:              ${usd(results.mrr)}`,
      `ARR:              ${usd(results.annualRunRate)}`,
      `Customer Lifetime: ${results.customerLifetimeMonths.toFixed(1)} mo`,
      `LTV:              ${usdPrecise(results.ltv)}`,
      `LTV:CAC Ratio:    ${results.ltvCacRatio.toFixed(1)}x`,
      `Monthly Profit:   ${usd(results.monthlyProfit)}`,
      `Break-even:       ${results.breakEvenMonths === 999 ? "N/A" : `${results.breakEvenMonths} mo`}`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          SaaS ROI Calculator{" "}
          <span className="text-base font-normal text-gray-400 dark:text-gray-500">
            · powered by JJB
          </span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Adjust the sliders below and see your key metrics update instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* ── Input panel ──────────────────── */}
        <div className="lg:col-span-2 space-y-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Business
          </h2>

          <Slider
            label="Customers"
            suffix="#"
            min={0}
            max={10000}
            step={10}
            value={inputs.customers}
            onChange={update("customers")}
          />

          <Slider
            label="ARPU (per month)"
            suffix="$"
            min={0}
            max={500}
            step={1}
            value={inputs.arpu}
            onChange={update("arpu")}
          />

          <Slider
            label="Monthly Churn Rate"
            suffix="%"
            min={0}
            max={50}
            step={0.5}
            value={inputs.churnRate}
            onChange={update("churnRate")}
          />

          <hr className="border-gray-200 dark:border-gray-800" />

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Costs
          </h2>

          <Slider
            label="CAC (per customer)"
            suffix="$"
            min={0}
            max={2000}
            step={10}
            value={inputs.cac}
            onChange={update("cac")}
          />

          <Slider
            label="Monthly Fixed Costs"
            suffix="$"
            min={0}
            max={200000}
            step={500}
            value={inputs.fixedCosts}
            onChange={update("fixedCosts")}
          />

          <Slider
            label="Gross Margin"
            suffix="%"
            min={10}
            max={100}
            step={1}
            value={inputs.grossMargin}
            onChange={update("grossMargin")}
          />
        </div>

        {/* ── Results panel ────────────────── */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top-level row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <Metric
              label="MRR"
              value={usd(results.mrr)}
              hint="Monthly Recurring Revenue"
            />
            <Metric
              label="ARR"
              value={usd(results.annualRunRate)}
              hint="Annual Run Rate"
            />
            <Metric
              label="LTV:CAC"
              value={`${results.ltvCacRatio.toFixed(1)}x`}
              good={results.ltvCacRatio >= 3}
              bad={results.ltvCacRatio < 1}
              hint={results.ltvCacRatio >= 3 ? "Healthy" : results.ltvCacRatio >= 1 ? "OK" : "At risk"}
            />
          </div>

          {/* Medium row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <Metric
              label="LTV"
              value={usdPrecise(results.ltv)}
              hint="Lifetime Value"
            />
            <Metric
              label="Customer Lifetime"
              value={`${results.customerLifetimeMonths.toFixed(1)} mo`}
              hint={inputs.churnRate > 0 ? `At ${inputs.churnRate}% churn` : "No churn"}
            />
            <Metric
              label="CAC"
              value={usd(inputs.cac)}
              hint="Customer Acquisition Cost"
            />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Metric
              label="Monthly Profit"
              value={usd(results.monthlyProfit)}
              good={results.monthlyProfit >= 0}
              bad={results.monthlyProfit < 0}
              hint={results.monthlyProfit >= 0 ? "Profitable" : "Loss"}
            />
            <Metric
              label="Break-even"
              value={
                results.breakEvenMonths === 999
                  ? "—"
                  : `${results.breakEvenMonths} mo`
              }
              good={results.breakEvenMonths <= 12}
              bad={results.breakEvenMonths > 36 && results.breakEvenMonths < 999}
              hint={
                results.breakEvenMonths === 999
                  ? "Not reached"
                  : results.breakEvenMonths <= 12
                  ? "Under 1 year"
                  : "Over 1 year"
              }
            />
          </div>

          {/* Copy button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-[0.97]"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Results
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
