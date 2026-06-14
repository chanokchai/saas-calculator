import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "SaaS Calc — Smart SaaS ROI Calculator",
  description:
    "Calculate your SaaS ROI, MRR, CAC, LTV, and break-even point instantly. Free, fast, and production-ready.",
  openGraph: {
    title: "SaaS Calc — Smart SaaS ROI Calculator",
    description:
      "Calculate your SaaS ROI, MRR, CAC, LTV, and break-even point instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
