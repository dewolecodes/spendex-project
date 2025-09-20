export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Create Account",
      description: "Sign up in seconds with just your email.",
    },
    {
      number: 2,
      title: "Connect Your Data",
      description: "Safely link your financial accounts or enter manually.",
    },
    {
      number: 3,
      title: "Get Insights",

      description: "Receive personalized financial analysis and advice.",
    },
    {
      number: 4,
      title: "Track Progress",
      description: "Monitor your financial health and achieve goals.",
    },
  ];

  return (
  <section className="how-it-works bg-[#0ea5a4] dark:bg-[#0e212d] text-foreground py-16 px-4 text-center">
      <h2 className="text-3xl md:text-6xl font-bold mb-4">
        How FinanceBot Works
      </h2>
      <p className="how-desc text-muted text-2xl max-w-2xl mx-auto mb-12">
        Get started in minutes and let our AI help you achieve your financial
        goals.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-[97px] mx-auto">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center space-y-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#D18127] text-white font-bold text-lg flex items-center justify-center">
              {step.number}
            </div>
            <h3 className="text-3xl font-semibold">{step.title}</h3>
            <p className="how-desc text-muted text-xl">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
