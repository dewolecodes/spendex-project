// app/page.tsx  (Next.js 13+ app router)
// If you're on pages router, export default function Home() in pages/index.tsx

import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiPlantLight } from "react-icons/pi";

export default function MeasureFinance() {
  return (
    <main className="relative overflow-hidden bg-transparent text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Content grid */}
        <div className="mt-12 grid items-end gap-10 md:gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Left text */}
          <div className="flex flex-col justify-between items-start px-4 rounded-[11px] pt-7 gap-4">
            <div className="flex rounded-[2px] justify-center items-start gap-3 py-4 px-2 text-4xl">
              <img src="vector/vector.png" className="pt-2" />
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Meet Your Financial <br className="hidden sm:block" />
                <span className="block"> Wellness Instantly.</span>
              </h1>
            </div>
            <p className="mt-3 text-xl text-muted/70 leading-relaxed">
              Your Personalized Scorecard for Smarter Money Decisions
            </p>
            <p className="mt-3 text-xl w-full max-w-[600px] text-muted/70 leading-relaxed">
              Spendex uses a smart scoring system — the Financial Health Index
              (FHI) to help you understand your overall financial state. From
              debt to savings, income to investments, your FHI shows you where
              you stand and how to grow.{" "}
            </p>
            <button className="btn btn-primary lg:text-[2xl] px-[32px] py-[24px] mt-4 rounded-[8px] font-medium shadow-[1px_2px_6px_0px_#00E7F4ED]">
              Get Started For Free →
            </button>
          </div>

          {/* Right text */}
          <div className="flex flex-col justify-between items-start px-8 rounded-[11px] py-7 text-[#001726] dark:text-[#001726] backdrop-blur-[43px] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.068)_0%,rgba(153,153,153,0.0816)_100%)] bg-[#E6F0FF]">
            <h2 className="text-3xl font-bold">Key Copy Block:</h2>
            <ul className=" text-xl list-disc text-muted/70 leading-relaxed">
              <li className="mt-3 ">Developed by Financial Experts</li>
              <li className="mt-3 ">0-100 Score Based on your real data</li>
              <li className="mt-3 ">Adjusts as you improve your habits</li>
              <li className="mt-3 ">Integrated into your Spendex Plan</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
