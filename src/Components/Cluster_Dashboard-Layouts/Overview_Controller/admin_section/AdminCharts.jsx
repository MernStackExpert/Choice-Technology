"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { motion } from "framer-motion";

export default function AdminCharts({ metrics }) {
  // বার চার্টের জন্য ডেটা
  const barData = [
    { name: "Revenue", value: metrics.totalRevenue, color: "#10b981" },
    { name: "Outstanding Due", value: metrics.totalDue, color: "#f43f5e" },
  ];

  // পাই চার্টের জন্য কালার
  const COLORS = ["#22d3ee", "#a855f7", "#eab308"];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl h-[400px]"
      >
        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8">Financial Ecosystem Pulse</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ background: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '15px', fontSize: '10px' }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}