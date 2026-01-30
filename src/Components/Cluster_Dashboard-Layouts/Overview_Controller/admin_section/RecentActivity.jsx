"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function RecentActivity({ latestOrders, latestPayments }) {
  return (
    <div className="space-y-8">
      {/* Latest Orders Section */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-cyan-400">Latest Nodes Initialized</h4>
          <Link href="/my-cluster/dashboard/admin/orders/active-nodes" className="text-[9px] font-black text-gray-600 hover:text-white uppercase transition-all">View All</Link>
        </div>
        
        <div className="space-y-4">
          {latestOrders.map((order, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase">{order.orderTitle}</span>
                <span className="text-[9px] font-mono text-gray-600">{order.orderId}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[8px] font-black px-2 py-1 rounded-full uppercase ${order.status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                  {order.status}
                </span>
                <Link href={`/my-cluster/admin/orders/${order._id}`}>
                  <ExternalLink size={14} className="text-gray-600 hover:text-cyan-400 cursor-pointer" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Latest Payments Section */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-emerald-400">Incoming Credits</h4>
          <Link href="/my-cluster/dashboard/admin/payments/pending-payments" className="text-[9px] font-black text-gray-600 hover:text-white uppercase transition-all">Verify All</Link>
        </div>
        
        <div className="space-y-4">
          {latestPayments.map((payment, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">${payment.amountPaid}</span>
                <span className="text-[9px] font-mono text-gray-600">{payment.transactionId}</span>
              </div>
              <div className="flex items-center gap-3">
                {payment.status === "pending" ? (
                  <Clock size={14} className="text-amber-500" />
                ) : (
                  <CheckCircle size={14} className="text-emerald-500" />
                )}
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{payment.method}</span>
              </div>
            </div>
          ))}
          {latestPayments.length === 0 && <p className="text-[9px] text-gray-600 italic uppercase">No recent transfers detected.</p>}
        </div>
      </motion.div>
    </div>
  );
}