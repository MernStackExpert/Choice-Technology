"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MessageSquare, Code, Rocket, Clock, ShieldCheck } from "lucide-react";

const steps = [
  { title: "Discussion", desc: "Understanding your project goals and requirements.", icon: <MessageSquare /> },
  { title: "Strategic Planning", desc: "Defining features, architecture, and timeline.", icon: <Search /> },
  { title: "Development", desc: "Building with MERN Stack and high-performance code.", icon: <Code /> },
  { title: "Quality & Launch", desc: "Testing, SEO optimization, and final deployment.", icon: <Rocket /> },
];

const faqs = [
  { 
    q: "How long does a project take to complete?", 
    a: "It depends on the complexity. Simple projects take max 7 days, medium-sized projects take up to 2 weeks, and high-level complex applications take around 4 weeks." 
  },
  { 
    q: "Do you provide post-launch support?", 
    a: "Yes, we provide 24/7 technical support and regular maintenance to ensure your website runs smoothly after launch." 
  },
  { 
    q: "Will the website be SEO friendly?", 
    a: "Absolutely. We build all our projects with Next.js and high-end SEO practices to ensure maximum visibility on Google." 
  },
  { 
    q: "Can you integrate payment gateways like SSLCommerz?", 
    a: "Yes, we specialize in integrating secure payment systems like SSLCommerz and Stripe for e-commerce solutions." 
  },
  { 
    q: "Is the source code provided after completion?", 
    a: "Yes, once the project is finalized, we provide full access to the source code and necessary documentation." 
  },
  { 
    q: "Can you convert Figma designs to React/Next.js?", 
    a: "Yes, we can transform any Figma or XD design into a pixel-perfect, responsive, and high-performance website." 
  }
];

export default function ProcessFAQContent() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      
      {/* --- Working Process --- */}
      <div className="space-y-12">
        <header>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Our Working <span className="text-cyan-400 italic font-extrabold">Workflow</span>
          </motion.h2>
          <p className="text-gray-400">A transparent step-by-step approach to bring your ideas to life.</p>
        </header>

        <div className="space-y-10">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-6 group"
            >
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-xl shadow-cyan-500/5">
                  {step.icon}
                </div>
                {i !== steps.length - 1 && <div className="w-[1px] h-full bg-gradient-to-b from-cyan-500/30 to-transparent mt-2" />}
              </div>
              <div className="pb-6">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FAQ Accordion --- */}
      <div className="space-y-12">
        <header>
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Frequently Asked <span className="text-purple-500 italic font-extrabold">Questions</span>
          </motion.h2>
          <p className="text-gray-400">Everything you need to know about our services and delivery.</p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="group relative p-[1px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left relative z-10 transition-colors cursor-pointer"
              >
                <span className={`text-lg font-semibold transition-colors ${activeFaq === i ? "text-cyan-400" : "text-gray-200"}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`text-gray-500 transition-transform duration-300 ${activeFaq === i ? "rotate-180 text-cyan-400" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden relative z-10"
                  >
                    <p className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 font-medium italic">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}