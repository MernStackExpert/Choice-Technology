"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Code2, Globe, Handshake, X } from "lucide-react";
import StartUsClient from "@/app/(page)/start-us/StartUsClient";

const plans = [
  {
    id: "custom",
    name: "Custom Web Build",
    price: "Custom",
    icon: <Code2 />,
    desc: "Tailored high-performance websites built precisely to your brand's specifications.",
    features: [
      "Custom UI/UX Design",
      "Next.js & Tailwind CSS",
      "Full Responsive Layout",
      "Search Engine Optimized",
      "Performance Tuning",
    ],
    color: "#22d3ee",
  },
  {
    id: "managed-subscription",
    name: "Managed Subscription",
    price: "$5/mo",
    icon: <Globe />,
    desc: "Complete peace of mind. We provide the domain, hosting, and maintenance.",
    features: [
      "Domain & Hosting Included",
      "Weekly Security Backups",
      "24/7 Technical Support",
      "Unlimited Content Updates",
      "SSL Certificate Included",
    ],
    color: "#a855f7",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Partnership",
    icon: <Handshake />,
    desc: "Custom high-end solutions or equity-based business partnerships.",
    features: [
      "Complex MERN Stack Apps",
      "Custom 3D Animations",
      "Revenue Share Options",
      "Priority Development",
      "Dedicated Tech Partner",
    ],
    color: "#4ade80",
  },
];

export default function PricingContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("subscription");

  const openModal = (id) => {
    setSelectedPlanId(id);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="space-y-16">
      <header className="text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Business <span className="text-cyan-400 italic">Models</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            onClick={() => openModal(plan.id)}
            className="relative group p-[1px] rounded-3xl overflow-hidden cursor-pointer"
          >
            {/* Background Animation & Card Content (Same as before) */}
            <div
              className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${plan.color} 50%, transparent 60%, transparent 100%)`,
              }}
            />

            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-[23px] h-full flex flex-col">
              <div
                className="mb-6 p-3 w-fit bg-white/5 rounded-2xl text-2xl"
                style={{ color: plan.color }}
              >
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-black text-white mb-4">
                {plan.price}
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-300 text-sm"
                  >
                    <Check size={16} style={{ color: plan.color }} /> {f}
                  </li>
                ))}
              </ul>
              <div className="w-full py-4 rounded-xl font-bold text-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                Get Started
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Modal Section --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#050505] rounded-[3rem] border border-white/10 shadow-2xl no-scrollbar mt-10 "
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white z-[1001] transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-16">
                <StartUsClient defaultPlan={selectedPlanId} isModal={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
