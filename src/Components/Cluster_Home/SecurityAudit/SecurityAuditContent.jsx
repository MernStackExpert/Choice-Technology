"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { ShieldCheck, Lock, Globe, Fingerprint, Server } from "lucide-react";

export default function SecurityAuditContent() {
  const { user, dbUser } = useContext(AuthContext);
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

  const activeNodes = orders.filter(o => o.status === 'active').slice(0, 4);

  const avgIntegrity = orders.length > 0 
    ? (orders.reduce((acc, curr) => acc + (curr.progress || 0), 0) / orders.length).toFixed(0) 
    : 0;

  const securityMetrics = [
    { label: "ENCRYPTION NODE", status: orders.length > 0 ? "ENCRYPTED" : "IDLE", icon: <Lock size={16} />, color: "text-emerald-400" },
    { label: "SYSTEM PULSE", status: orders.some(o => o.status === 'active') ? "STABLE" : "STANDBY", icon: <Globe size={16} />, color: "text-cyan-400" },
    { label: "IDENTITY MAPPING", status: dbUser ? "VERIFIED" : "UNVERIFIED", icon: <Fingerprint size={16} />, color: "text-purple-400" },
  ];

  if (loading) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="p-10 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-40 h-40 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
            <motion.circle 
              cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray="440" 
              initial={{ strokeDashoffset: 440 }}
              whileInView={{ strokeDashoffset: 440 - (440 * (avgIntegrity / 100)) }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-emerald-500 shadow-[0_0_15px_#10b981]" 
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-black text-white italic">{avgIntegrity}%</span>
            <span className="text-[8px] font-black text-emerald-500 tracking-[0.3em] uppercase">Integrity</span>
          </div>
        </div>
        <h4 className="text-sm font-black text-white uppercase tracking-widest">Neural System Pulse</h4>
      </motion.div>

      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            {securityMetrics.map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`${metric.color} opacity-80`}>{metric.icon}</div>
                  <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{metric.label}</span>
                </div>
                <span className={`text-[10px] font-black ${metric.color} tracking-widest`}>{metric.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <ShieldCheck className="text-emerald-500" size={20} />
            <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed">
              NODE SECURED UNDER ID: {user?.uid?.substring(0, 12)}...
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Active Neural Nodes</h4>
            <Server size={14} className="text-gray-500" />
          </div>
          <div className="space-y-4">
            {activeNodes.map((node, i) => (
              <div key={i} className="flex flex-col gap-1 border-l-2 border-emerald-500/30 pl-4 py-1 hover:bg-white/[0.02] transition-colors rounded-r-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white tracking-tighter uppercase truncate mr-2">{node.orderTitle}</span>
                  <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {node.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[9px] font-mono text-gray-600 truncate uppercase">CID: {node.orderId}</p>
              </div>
            ))}
            {activeNodes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 opacity-40">
                <Server size={24} className="text-gray-600 mb-2" />
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">No Active Nodes</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}