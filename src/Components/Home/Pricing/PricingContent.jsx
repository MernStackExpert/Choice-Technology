"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Rocket, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Custom",
    icon: <Zap />,
    desc: "Perfect for personal portfolios & small business.",
    features: ["Single Page Site", "Full Responsive", "Next.js & Tailwind", "Basic SEO", "7 Days Delivery"],
    color: "#22d3ee",
  },
  {
    name: "Business",
    price: "Custom",
    icon: <Rocket />,
    desc: "Best for growing startups & companies.",
    features: ["Multi-page Web App", "MERN Stack Integration", "Admin Dashboard", "Advanced SEO", "2 Weeks Delivery"],
    color: "#a855f7",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    icon: <Crown />,
    desc: "High-end solutions with complex features.",
    features: ["E-commerce Solution", "Payment Gateway", "Real-time Features", "Premium Support", "4 Weeks Delivery"],
    color: "#4ade80",
  },
];

export default function PricingContent() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Flexible <span className="text-cyan-400 italic">Packages</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto italic">Transparent pricing for every digital need.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`relative group p-[1px] rounded-3xl overflow-hidden ${plan.popular ? 'scale-105 z-20' : ''}`}
          >
            {/* Animating Border */}
            <div 
              className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity"
              style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${plan.color} 50%, transparent 60%, transparent 100%)` }}
            />

            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-[23px] h-full flex flex-col">
              {plan.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-purple-500 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Most Popular
                </span>
              )}
              
              <div className="mb-6 p-3 w-fit bg-white/5 rounded-2xl text-2xl" style={{ color: plan.color }}>
                {plan.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-black text-white mb-4">{plan.price}</div>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">{plan.desc}</p>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4" style={{ color: plan.color }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className="w-full py-4 rounded-xl font-bold transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}30` }}
              >
                Choose Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}