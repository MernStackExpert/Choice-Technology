"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { CheckCircle2, Circle, Timer, Rocket, Laptop, Database } from "lucide-react";

export default function ServiceRoadmapContent() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;
      try {
        const res = await axiosInstance.get(`/orders/user/${user.uid}`);
        if (res.data?.success) {
          setOrders(res.data.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const avgProgress = orders.length > 0 
    ? (orders.reduce((acc, curr) => acc + (curr.progress || 0), 0) / orders.length) 
    : 0;

  const steps = [
    { label: "Architecture Design", min: 0, icon: <Laptop size={18} /> },
    { label: "Core Development", min: 25, icon: <Database size={18} /> },
    { label: "Neural Integration", min: 60, icon: <Timer size={18} /> },
    { label: "Final Deployment", min: 90, icon: <Rocket size={18} /> },
  ];

  if (loading) return null;

  return (
    <div className="w-full p-8 md:p-12 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl overflow-hidden">
      <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 hidden md:block -translate-y-1/2" />
        
        {steps.map((step, idx) => {
          const isCompleted = avgProgress > step.min;
          const isCurrent = avgProgress >= step.min && (idx === steps.length - 1 || avgProgress < steps[idx + 1].min);

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              <div className={`mb-4 p-4 rounded-2xl border transition-all duration-500 ${
                isCompleted 
                ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]" 
                : isCurrent ? "bg-white/10 border-white/20 text-white animate-pulse"
                : "bg-white/5 border-white/5 text-gray-600"
              }`}>
                {step.icon}
              </div>
              
              <div className="flex flex-col items-center gap-2 text-center">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? "text-indigo-400" : "text-gray-500"}`}>
                  Phase 0{idx + 1}
                </span>
                <h4 className={`text-sm font-bold tracking-tight uppercase ${isCompleted ? "text-white" : "text-gray-600"}`}>
                  {step.label}
                </h4>
                {isCompleted ? (
                  <CheckCircle2 size={16} className="text-indigo-500 mt-2" />
                ) : (
                  <Circle size={16} className="text-gray-800 mt-2" />
                )}
              </div>

              {/* Mobile Line */}
              {idx !== steps.length - 1 && (
                <div className="h-10 w-[1px] bg-white/5 md:hidden my-2" />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            System Synchronization: {avgProgress.toFixed(0)}% Complete
          </span>
        </div>
        <p className="text-[9px] font-bold text-gray-600 uppercase italic tracking-tighter">
          * Roadmap stages are dynamically mapped to your cluster's neural integrity.
        </p>
      </div>
    </div>
  );
}