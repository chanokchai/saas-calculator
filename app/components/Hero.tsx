import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-white dark:from-gray-950 dark:via-gray-950 dark:to-brand-950" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/50 px-4 py-1.5 text-sm text-brand-700 dark:text-brand-300 mb-8">
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          Free &middot; No signup &middot; Open source
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance text-gray-900 dark:text-white">
          Know Your SaaS&nbsp;Numbers&nbsp;—{" "}
          <span className="text-brand-600 dark:text-brand-400">
            Instantly
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-balance">
          Calculate MRR, CAC, LTV, gross margin, and break-even time for your
          SaaS product. No spreadsheets, no bull — just clear answers in
          seconds.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 transition-all active:scale-[0.97]"
          >
            Open Calculator
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3.5 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            Learn More
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            ["MRR", "Monthly Recurring Revenue"],
            ["CAC", "Customer Acquisition Cost"],
            ["LTV", "Lifetime Value"],
            ["ROI", "Return on Investment"],
          ].map(([label, desc]) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400">
                {label}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
