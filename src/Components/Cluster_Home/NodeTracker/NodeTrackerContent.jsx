"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { ExternalLink, Clock, Target, Plus, Box, Zap } from "lucide-react";
import Link from "next/link";

export default function NodeTrackerContent() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const uid = user?.uid;
      if (!uid) return;
      try {
        const res = await axiosInstance.get(`/orders/user/${uid}`);
        if (res.data?.success) {
          const filteredOrders = (res.data.data || [])
            .filter(order => order.status !== "cancelled")
            .slice(0, 4);
          setOrders(filteredOrders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-20 w-full">
        <div className="relative">
          <div className="w-16 h-16 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full p-12 md:p-20 rounded-[4rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden text-center group"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8 p-8 rounded-full bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.1)]"
          >
            <Box size={60} className="text-cyan-400 opacity-80" />
          </motion.div>

          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
            No Neural <span className="text-cyan-400">Nodes</span> Active
          </h3>

          <p className="max-w-md text-gray-500 text-lg font-medium leading-relaxed mb-12 italic uppercase tracking-widest text-[10px]">
            Your workspace is currently offline. Initialize a new cluster
            connection to start monitoring real-time system synchronization.
          </p>

          <Link href="/my-cluster/order">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(34,211,238,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl transition-all overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                Initialize New Order <Plus size={18} strokeWidth={3} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </motion.button>
          </Link>

          <div className="mt-16 flex gap-8 items-center justify-center opacity-30">
            <Zap size={20} className="text-white" />
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white to-transparent" />
            <span className="text-[10px] font-black tracking-[0.5em] text-white uppercase">
              System Standby
            </span>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white to-transparent" />
            <Zap size={20} className="text-white" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {orders.map((order, i) => (
        <motion.div
          key={order.orderId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl hover:bg-white/[0.08] transition-all"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Target size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {order.orderTitle}
                </h3>
                <span className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">
                  Node ID: {order.orderId}
                </span>
              </div>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.status === "active" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" : "border-amber-500/30 text-amber-400 bg-amber-500/5"}`}
            >
              {order.status}
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Synchronization Progress
              </span>
              <span className="text-lg font-black text-cyan-400 tracking-tighter">
                {order.progress}%
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${order.progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="text-gray-500">
                <Clock size={14} />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                  Expiry Date
                </p>
                <p className="text-xs font-bold text-gray-300">
                  {new Date(order.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link href={`/my-cluster/dashboard/my-order/${order._id}`} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 transition-all text-[10px] font-black uppercase tracking-widest group/btn">
                Access Node
                <ExternalLink
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}