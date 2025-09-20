// app/page.tsx  (Next.js 13+ app router)
// If you're on pages router, export default function Home() in pages/index.tsx

import Image from "next/image";

export default function Chatbox() {
  return (
    <main className="relative overflow-hidden bg-transparent text-foreground">
      {/* subtle glow accents */}

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Headline */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            You Don’t Need More Advice.
            <br className="hidden sm:block" />
            <span className="block">You Need A Plan That Fits You.</span>
          </h1>

          <p className="mt-3 text-2xl text-muted/60 md:text-base">
            Spendex AI Chatbot Steps In. Not To Judge. Just To Help.
          </p>
        </div>

        {/* Content grid */}
        <div className="mt-12 grid items-start gap-10 md:gap-12 lg:grid-cols-3">
          {/* Left text */}
          <div>
            <h2 className="text-3xl font-bold">
              Struggling With Your Finances?
            </h2>
            <p className="mt-3 text-2xl italic text-muted/70 leading-relaxed">
              You’re not alone. Whether it’s living paycheck to paycheck,
              juggling multiple loans, or failing to save consistently — we’ve
              been there too.
            </p>
          </div>

          {/* Middle “stickers” */}
          <div className="mx-auto grid self-center max-w-full">
            {/* Replace these images with your actual illustrations in /public/ */}
            <figure className="flex items-center justify-center">
              <Image
                src="/images/illusion.png"
                alt="Budgeting dashboard"
                width={350}
                height={350}
                className="h-[350px] w-[350px] object-contain"
                priority
              />
            </figure>
          </div>

          {/* Right text */}
          <div className="lg:pl-4 self-end">
            <h2 className="text-3xl font-bold">
              That’s Why We Built This Chatbot.
            </h2>
            <p className="mt-3 text-2xl italic text-muted/70 leading-relaxed">
              It listens, learns from your situation, and guides you with
              real‑time, tailored advice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
