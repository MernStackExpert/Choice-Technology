"use client";
import { motion } from "framer-motion";
import { DollarSign, Activity, Users, Clock, AlertCircle } from "lucide-react";

export default function AdminStatsCards({ metrics }) {
  const cards = [
    { label: "Total Revenue", value: `$${metrics.totalRevenue}`, icon: <DollarSign />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Total Due", value: `$${metrics.totalDue}`, icon: <AlertCircle />, color: "text-rose-400", bg: "bg-rose-500/10" },
    { label: "Active Nodes", value: metrics.activeNodes, icon: <Activity />, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "New Requests", value: metrics.newPaymentRequests, icon: <Clock />, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Total Customers", value: metrics.totalCustomers, icon: <Users />, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl hover:bg-white/[0.08] transition-all group"
        >
          <div className={`${card.bg} ${card.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
            {card.icon}
          </div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{card.label}</p>
          <h3 className="text-2xl font-black text-white mt-1">{card.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}