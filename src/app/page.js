import Image from "next/image";
import HeroSection from "@/components/homepage/hero-section";
import Chatbox from "@/components/homepage/chatbox-intro";
import MasterFinance from "@/components/homepage/master-finance";
import MeasureFinance from "@/components/homepage/measure-finance";
import WhyChoose from "@/components/homepage/why-choose";
import HowItWorks from "@/components/homepage/how-it-works";
import CallToAction from "@/components/homepage/call-to-action";

export default function Home() {
  return (
    <div className="font-sans relative">
      <span>
        <Image
          src="/logo/ellipse.png"
          alt="Spendex Logo"
          width={662}
          height={662}
          className="absolute top-5 left-1/2 -translate-x-1/2"
        />{" "}
      </span>
      <span className="bg-circle-gradient"></span>
      <span className="absolute top-[30%] left-[20%] w-[200px] h-[200px] rounded-full border border-cyan-400/20 blur-md"></span>
      <span className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full border border-cyan-400/20 blur-lg"></span>

      <span>
        <Image
          src="/logo/ellipse.png"
          alt="Spendex Logo"
          width={662}
          height={662}
          className="absolute top-190 -right-80"
        />{" "}
      </span>
      <span className="bg-circle-gradient"></span>
      <span className="absolute top-[30%] left-[20%] w-[200px] h-[200px] rounded-full border border-cyan-400/20 blur-md"></span>
      <span className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full border border-cyan-400/20 blur-lg"></span>

      <HeroSection />
      <Chatbox />
      <MasterFinance />
      <MeasureFinance />
      <WhyChoose />
      <HowItWorks />
  <CallToAction />
    </div>
  );
}
