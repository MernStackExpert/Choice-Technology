import { Suspense } from "react";
import PricingContent from "@/Components/Home/Pricing/PricingContent";
import { Zap, ShieldCheck, Globe, Rocket } from "lucide-react";

export const metadata = {
  title: "Initialize Your Project | Choice Technology",
  description: "Scale your business with our tailored digital models. Join Choice Technology for high-performance web solutions.",
};

export default function StartUsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-400 text-sm font-bold mb-6">
          <Zap size={16} /> <span>Trusted by Modern Startups</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
          Let's Scale Your <br /> 
          <span className="text-cyan-400 italic">Digital Future</span>
        </h1>
        
        <p className="text-gray-400 max-w-2xl mx-auto text-lg italic backdrop-blur-sm p-2 rounded-xl">
          Select a business model below to initialize your onboarding process. 
          Our team will verify your details and connect with you within 24 hours.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 border-y border-white/5 py-10 backdrop-blur-md bg-white/[0.02] rounded-3xl">
          {[
            { icon: <ShieldCheck className="text-green-400" />, text: "Verified Security" },
            { icon: <Globe className="text-purple-400" />, text: "Global Standards" },
            { icon: <Rocket className="text-cyan-400" />, text: "Rapid Launch" },
            { icon: <Zap className="text-yellow-400" />, text: "MERN Stack Experts" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 transition-transform hover:scale-105">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-xl shadow-black/20">{item.icon}</div>
              <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Suspense
          fallback={
            <div className="min-h-[400px] flex flex-col items-center justify-center text-white gap-4 backdrop-blur-xl bg-black/20 rounded-[3rem]">
              <span className="loading loading-ring loading-lg text-cyan-400"></span>
              <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Initializing Engine...</p>
            </div>
          }
        >
          <PricingContent />
        </Suspense>
      </div>
    </main>
  );
}