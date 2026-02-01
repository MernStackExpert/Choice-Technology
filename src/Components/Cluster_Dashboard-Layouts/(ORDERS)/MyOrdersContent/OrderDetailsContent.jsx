"use client";

import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Package, Calendar, DollarSign, Activity, 
  ShieldCheck, ArrowLeft, Globe, Terminal, 
  Clock, AlertCircle, CreditCard
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrderDetailsContent = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axiosInstance.get(`/orders/details/${orderId}`);
        setOrder(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const timeLeft = useMemo(() => {
    if (!order?.expiryDate) return null;
    const diff = new Date(order.expiryDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }, [order]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!order) return <div className="text-center p-20 text-red-400 font-mono italic uppercase tracking-widest">Node_Not_Found: 404</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Cluster</span>
        </button>

        {order.unPaidAmount > 0 && (
          <Link
            href={`/my-cluster/dashboard/payment/${order._id}`}
            className="flex items-center gap-3 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-95"
          >
            <CreditCard size={14} />
            Payment Now
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div className="flex gap-6">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                  <Package size={36} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">{order.orderTitle}</h1>
                  <p className="text-cyan-500/50 font-mono text-[10px] mt-2 uppercase tracking-widest italic">Protocol_ID: {order.orderId}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
                <div className={`w-2 h-2 rounded-full animate-pulse ${order.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{order.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <InfoBox icon={<Globe size={18} />} label="Category" value={order.category} />
              <InfoBox icon={<Calendar size={18} />} label="Initiated" value={new Date(order.createdAt).toLocaleDateString()} />
              <InfoBox icon={<Clock size={18} />} label="Allocation" value={`${order.duration} ${order.planType}`} />
              <InfoBox 
                icon={<AlertCircle size={18} className={timeLeft <= 5 ? "text-rose-500" : "text-cyan-500"} />} 
                label="Days Remaining" 
                value={timeLeft !== null ? `${timeLeft} Days` : "N/A"} 
              />
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-10 backdrop-blur-3xl">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-white font-black uppercase text-xs tracking-[0.3em] flex items-center gap-3">
                <Activity size={18} className="text-cyan-400" /> Neural Deployment Pulse
              </h3>
              <span className="text-sm font-mono font-black text-cyan-400">{order.progress}%</span>
            </div>
            <div className="space-y-6">
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out" 
                  style={{ width: `${order.progress}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Synchronization with mainframe in progress</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-[3rem] p-10 backdrop-blur-3xl relative">
            <h3 className="text-white font-black mb-10 uppercase text-xs tracking-[0.3em] flex items-center gap-3 border-b border-white/5 pb-4">
              <DollarSign size={18} className="text-cyan-400" /> Financials
            </h3>
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Total Budget</span>
                <span className="text-xl font-black text-white font-mono">${order.totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Paid Credits</span>
                <span className="text-sm font-black text-emerald-400 font-mono">+ ${order.paidAmount}</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-cyan-400 uppercase font-black tracking-[0.2em]">Outstanding</span>
                <span className="text-2xl font-black text-cyan-400 font-mono shadow-cyan-500/20 drop-shadow-md">${order.unPaidAmount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Clock size={14} /> Expiry Intelligence
            </h4>
            <div className="space-y-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Termination Date</p>
                  <p className="text-xs font-bold text-amber-500 font-mono">{new Date(order.expiryDate).toDateString()}</p>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Billing Cycle</p>
                  <p className="text-xs font-bold text-white uppercase">{order.planType}</p>
               </div>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-2 text-gray-600 mb-4 uppercase text-[9px] font-black tracking-widest">
              <Terminal size={14} /> Neural System Logs
            </div>
            <div className="space-y-2 text-[10px] font-mono text-gray-500">
              <p><span className="text-cyan-800 mr-2">▶</span> [SYSTEM]: Node active</p>
              <p><span className="text-cyan-800 mr-2">▶</span> [SYNC]: Monitoring latency</p>
              <p><span className="text-cyan-800 mr-2">▶</span> [AUTH]: Verification valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ icon, label, value }) => (
  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-colors group">
    <div className="text-cyan-500/30 group-hover:text-cyan-400 mb-4 transition-colors">{icon}</div>
    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-2">{label}</p>
    <p className="text-sm font-bold text-white truncate">{value}</p>
  </div>
);

export default OrderDetailsContent;