import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="relative bg-transparent h-[600px] flex justify-center items-center text-foreground py-20 text-center overflow-hidden">
      {/* Background Glow Image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo/ellipse.png"
          alt="Glow Background"
          width={600}
          height={600}
          className="w-[400px] md:w-[600px] opacity-40"
        />
      </div>

      <div className="relative z-10 px-4">
        <h2 className="text-2xl md:text-[56px] font-extrabold mb-4">
          Ready to Transform Your Finances
        </h2>
        <p className="text-muted text-2xl mx-auto mb-8">
          Join thousands of users who are already making smarter financial
          decisions with FinanceBot.
        </p>
        <button className="btn btn-primary lg:text-[2xl] px-[32px] py-[24px] mt-4 rounded-[8px] font-medium shadow-[1px_2px_6px_0px_#00E7F4ED]">
          Get Started For Free →
        </button>
      </div>
    </section>
  );
}
