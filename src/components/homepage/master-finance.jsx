import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiPlantLight } from "react-icons/pi";

export default function MasterFinance() {
  return (
  <main className="relative overflow-hidden bg-transparent text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Headline */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need To <br className="hidden sm:block" />
            <span className="block"> Master Your Finances.</span>
          </h1>

          <p className="mt-3 text-2xl text-muted/60 md:text-base">
            Powerful features to help you track, manage, and grow your money
            with confidence{" "}
          </p>
        </div>

        {/* Content grid */}
        <div className="mt-12 grid items-start gap-10 md:gap-12 lg:grid-cols-3">
          {/* Left text */}
          <div className="flex flex-col justify-between items-start px-4 rounded-[11px] h-[320px] py-7 gap-4 text-[#001726] dark:text-[#001726] backdrop-blur-[43px] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.068)_0%,rgba(153,153,153,0.0816)_100%)] bg-[#E6F0FF]">
            <div className="bg-white w-16 flex rounded-[2px] justify-center items-center py-4 px-2 text-4xl text-accent">
              <FaRegUser />
            </div>
            <h2 className="text-3xl font-bold">Get your personalized plan</h2>
            <p className="mt-3 text-xl text-muted/70 leading-relaxed">
              Budget breakdowns, savings goals, and debt strategy — all built
              for your real life.
            </p>
          </div>

          {/* Middle “stickers” */}
          <div
            className="flex flex-col justify-between items-start px-4 rounded-[11px] h-[320px] py-7 gap-4 text-[#001726] dark:text-[#001726] backdrop-blur-[43px] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.068)_0%,rgba(153,153,153,0.0816)_100%)] bg-[#d4ff20]"
          >
            <div className="bg-white w-16 flex rounded-[2px] justify-center items-center py-4 px-2 text-4xl text-[#001726]">
              <HiOutlineLightBulb />
            </div>
            <h2 className="text-3xl font-bold">
              Understands Your Finances
            </h2>
            <p className="mt-3 text-xl leading-relaxed">
              Just chat about your income, spending, and goals — it does the
              thinking for you.
            </p>
          </div>

          {/* Right text */}
          <div className="flex flex-col justify-between items-start px-4 h-[320px] rounded-[11px] py-7 gap-4 text-[#001726] dark:text-[#001726] backdrop-blur-[43px] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.068)_0%,rgba(153,153,153,0.0816)_100%)] bg-[#E6F0FF]">
            <div className="bg-white w-16 flex rounded-[2px] justify-center items-center py-4 px-2 text-4xl text-accent">
              <PiPlantLight />
            </div>
            <h2 className="text-3xl font-bold">Grow</h2>
            <p className="mt-3 text-xl text-muted/70 leading-relaxed">
              Your AI assistant checks in, adjusts to your life, and keeps you
              motivated with progress nudges.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
