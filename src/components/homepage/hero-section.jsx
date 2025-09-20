import Link from "next/link";

export default function HeroSection() {
  return (
  <section className="relative bg-transparent mt-20 sm:mt-16 md:mt-24 px-6 sm:px-8 md:px-20 py-8 sm:py-12 md:py-20 overflow-hidden">
      {/* Container: mobile-only circle layout, and separate sm+ layout */}
      <div className="max-w-3xl mx-auto text-center">
        {/* Mobile: circle background with centered content */}
        <div className="block sm:hidden">
          <div className="relative w-full h-[420px] flex items-center justify-center">
            <div className="bg-circle-gradient" />
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="max-w-xs text-center">
                <span className="inline-block bg-[#ffa124] text-[13px] px-3 py-2 rounded-full mb-3 text-[#121212] font-medium">
                  Built for everyday people
                </span>
                <h1 className="text-2xl font-bold text-foreground leading-tight mb-2">
                  Take control of your money
                </h1>
                <p className="text-muted text-sm mb-4">Personalized advice, real-time tracking, and AI-driven insights.</p>
                <Link href="/dashboard/wireframe" className="btn btn-primary text-sm px-4 py-2 rounded-md font-medium shadow-[1px_2px_6px_0px_#00E7F4ED]">
                  Get started
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile stats below circle */}
          <div className="mt-4 grid grid-cols-3 gap-2 px-4">
            <div className="bg-card rounded-lg py-2 px-2 text-center">
              <h3 className="text-lg font-bold text-foreground">50+</h3>
              <p className="text-[10px] text-muted mt-1">Active</p>
            </div>
            <div className="bg-card rounded-lg py-2 px-2 text-center">
              <h3 className="text-lg font-bold text-foreground">100+</h3>
              <p className="text-[10px] text-muted mt-1">Institutions</p>
            </div>
            <div className="bg-card rounded-lg py-2 px-2 text-center">
              <h3 className="text-lg font-bold text-foreground">200+</h3>
              <p className="text-[10px] text-muted mt-1">Integrations</p>
            </div>
          </div>
        </div>

        {/* Desktop / tablet: original layout */}
        <div className="hidden sm:block">
          {/* Tag */}
          <span className="inline-block bg-[#ffa124] text-[11px] sm:text-xs px-3 py-2 rounded-full mb-4 text-[#121212] font-medium">
            Built for everyday people
          </span>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl leading-tight sm:leading-tight md:leading-[72px] font-bold text-foreground mb-3">
            Take control of your money
            <br className="hidden sm:block" />
            <span className="text-accent">with AI that actually gets you</span>
          </h1>

          {/* Subheading */}
          <p className="text-muted text-sm sm:text-lg md:text-xl mb-6">
            Personalized advice, real-time tracking, and AI-driven insights to
            help you build better financial habits.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <Link href="/dashboard/wireframe" className="btn btn-primary text-sm sm:text-base md:text-lg px-5 py-3 sm:px-6 sm:py-4 rounded-md font-medium shadow-[1px_2px_6px_0px_#00E7F4ED]">
              Get started for free
            </Link>
          </div>

          <p className="text-muted text-xs sm:text-sm mt-3">Private & secure</p>

          {/* Stats - show side-by-side on small screens (3 columns) */}
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 items-center">
            <div className="bg-card rounded-lg py-3 px-2 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl md:text-3xl font-bold text-foreground">50+</h3>
              <p className="text-[10px] md:text-xs text-muted mt-1">Active users</p>
            </div>
            <div className="bg-card rounded-lg py-3 px-2 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl md:text-3xl font-bold text-foreground">100+</h3>
              <p className="text-[10px] md:text-xs text-muted mt-1">Financial institutions</p>
            </div>
            <div className="bg-card rounded-lg py-3 px-2 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl md:text-3xl font-bold text-foreground">200+</h3>
              <p className="text-[10px] md:text-xs text-muted mt-1">Integrations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
