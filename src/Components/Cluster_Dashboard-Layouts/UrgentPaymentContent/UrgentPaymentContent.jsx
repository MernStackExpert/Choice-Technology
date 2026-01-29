"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { AlertTriangle, Clock, Eye, CreditCard, Box, Zap } from "lucide-react";
import Link from "next/link";

export default function UrgentPaymentContent() {
  const { user } = useContext(AuthContext);
  const [urgentOrders, setUrgentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrgentNodes = async () => {
      if (!user?.uid) return;
      try {
        const res = await axiosInstance.get(`/orders/user/${user.uid}`);
        if (res.data.success) {
          const now = new Date();
          const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

          const critical = res.data.data.filter(order => {
            const expiry = new Date(order.expiryDate);
            const isCriticalTime = expiry <= tomorrow;
            const hasValidStatus = order.status === "active" || order.status === "expired";
            
            return isCriticalTime && hasValidStatus;
          });

          setUrgentOrders(critical);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUrgentNodes();
  }, [user]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">
      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      Scanning_Neural_Timeline...
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <header className="px-2">
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
          Critical <span className="text-rose-500">Alerts</span>
          <AlertTriangle className="text-rose-500 animate-pulse" size={28} />
        </h1>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
          Nodes expiring within <span className="text-rose-400">24 Hours</span> or already <span className="text-rose-400">Expired</span>
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {urgentOrders.length > 0 ? urgentOrders.map((order) => {
          const isExpired = new Date(order.expiryDate) < new Date();
          
          return (
            <div key={order._id} className="relative p-8 rounded-[2.5rem] border border-rose-500/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${isExpired ? 'from-rose-500/10' : 'from-amber-500/10'} to-transparent opacity-50`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${isExpired ? 'text-rose-500' : 'text-amber-500'}`}>
                      <Clock size={24} className={!isExpired ? "animate-spin-slow" : ""} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase truncate max-w-[150px]">{order.orderTitle}</h3>
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">ID: {order.orderId}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isExpired ? 'border-rose-500/30 text-rose-500 bg-rose-500/5' : 'border-amber-500/30 text-amber-400 bg-amber-500/5'}`}>
                    {isExpired ? "Terminated" : "Expiring Soon"}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>Outstanding Due</span>
                    <span className="text-white">${order.unPaidAmount}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>Deadline</span>
                    <span className={isExpired ? "text-rose-500" : "text-amber-400"}>
                        {new Date(order.expiryDate).toLocaleDateString()} - {new Date(order.expiryDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/my-cluster/dashboard/my-order/${order._id}`} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                    <Eye size={14} /> Details
                  </Link>
                  <Link href={`/my-cluster/dashboard/payment/${order._id}`} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-cyan-500 text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all text-[10px] font-black uppercase tracking-widest">
                    <CreditCard size={14} /> Pay Now
                  </Link>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full p-20 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center opacity-30">
            <Box size={48} className="mb-4 text-gray-600" />
            <p className="text-xs font-black uppercase tracking-[0.4em]">All Nodes Are Optimized</p>
          </div>
        )}
      </div>
    </div>
  );
}