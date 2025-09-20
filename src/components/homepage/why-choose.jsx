// app/page.tsx  (Next.js 13+ app router)
// If you're on pages router, export default function Home() in pages/index.tsx

import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiPlantLight } from "react-icons/pi";

export default function WhyChoose() {
  return (
    <main className="relative overflow-hidden bg-transparent text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* Content grid */}
  <div className="mt-4 grid items-center gap-8 md:gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Left text */}

          {/* Right text */}
          <img src="images/index.jpg" className="object-cover rounded-[11px]" />
          <div className="flex flex-col justify-between items-start px-4 rounded-[11px] pt-3 gap-4">
            <div className="flex rounded-[2px] justify-center items-start gap-3 py-4 px-2 text-4xl">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Why Choose FinanceBot?
              </h1>
            </div>
            <ul className=" text-xl px-8 list-image-[url('/vector/frame.png')] text-muted/70 leading-relaxed">
              <li className="mt-3 ">
                AI-powered financial advice tailored to you
              </li>
              <li className="mt-3 ">Secure and encrypted data protection</li>
              <li className="mt-3 ">Real-time tracking and insights</li>
              <li className="mt-3 ">
                Easy-to-use interface for all experience levels
              </li>
              <li className="mt-3 ">
                Comprehensive financial health monitoring
              </li>
            </ul>
            <button className="btn btn-primary lg:text-[2xl] px-[32px] py-[24px] mt-4 rounded-[8px] font-medium shadow-[1px_2px_6px_0px_#00E7F4ED]">
              Start Your Financial Journey →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
