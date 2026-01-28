"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, LayoutGrid, AlertCircle, CreditCard } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/Provider/AuthContext";

export default function NodeStatusContent() {
  const { user, dbUser } = useContext(AuthContext); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const uid = user?.uid; 
      
      if (!uid) return;

      try {
        const res = await axiosInstance.get(`/orders/user/${uid}`); 
        if (res.data?.success) {
          setOrders(res.data.data || []);
        }
      } catch (error) {
        console.error("Failed to load node data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Calculations
  const activeNodes = orders.filter(o => o.status === "active").length;
  const pendingNodes = orders.filter(o => o.status === "pending").length;
  const totalDue = orders.reduce((acc, curr) => acc + (curr.unPaidAmount || 0), 0);
  const avgProgress = orders.length > 0 
    ? (orders.reduce((acc, curr) => acc + (curr.progress || 0), 0) / orders.length).toFixed(0) 
    : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-white/5 bg-white/5 backdrop-blur-3xl rounded-[2.5rem]">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-cyan-400 font-black tracking-widest text-[10px] uppercase animate-pulse">
          Synchronizing Neural Nodes...
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Node Instances",
      value: `${activeNodes} Active`,
      subValue: `${pendingNodes} Pending Request`,
      icon: <LayoutGrid className="text-cyan-400" size={20} />,
      color: "from-cyan-500/20"
    },
    {
      title: "Financial Liability",
      value: totalDue.toLocaleString(),
      subValue: "Current Outstanding Balance",
      icon: <CreditCard className="text-rose-400" size={20} />,
      color: "from-rose-500/20"
    },
    {
      title: "System Integrity",
      value: `${avgProgress}%`,
      subValue: "Real-time Node Progress",
      icon: <Activity className="text-emerald-400" size={20} />,
      color: "from-emerald-500/20"
    },
    {
      title: "Network Pulse",
      value: activeNodes > 0 ? "Operational" : "Standby",
      subValue: "Cloud Connectivity Status",
      icon: <AlertCircle className="text-purple-400" size={20} />,
      color: "from-purple-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="relative p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl overflow-hidden group w-full"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10">
            <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              {stat.title}
            </h3>
            
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest italic text-right">
                {stat.subValue}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}