"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Package, Calendar, DollarSign, Activity, 
  ShieldCheck, ArrowLeft, Globe, Terminal 
} from "lucide-react";
import { useRouter } from "next/navigation";

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

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!order) return <div className="text-center p-20 text-red-400 font-mono">NODE_NOT_FOUND: 404</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors group cursor-pointer"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Return to Cluster</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black/20 border border-cyan-500/10 rounded-[2.5rem] p-8 backdrop-blur-3xl">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
              <div className="flex gap-5">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                  <Package size={32} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">{order.orderTitle}</h1>
                  <p className="text-cyan-500/50 font-mono text-xs mt-1">INSTANCE_ID: {order.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                  {order.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoBox icon={<Globe size={18} />} label="Category" value={order.category} />
              <InfoBox icon={<Calendar size={18} />} label="Initiated" value={new Date(order.createdAt).toLocaleDateString()} />
              <InfoBox icon={<ShieldCheck size={18} />} label="Service Type" value="Managed Node" />
            </div>
          </div>

          <div className="bg-black/20 border border-cyan-500/10 rounded-[2.5rem] p-8 backdrop-blur-3xl">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase text-sm tracking-widest">
              <Activity size={18} className="text-cyan-400" /> Deployment Pulse
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase text-gray-500 tracking-widest">
                <span>Infrastructure Ready</span>
                <span className="text-cyan-400">{order.progress}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]" 
                  style={{ width: `${order.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-[2.5rem] p-8 backdrop-blur-3xl">
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
              <DollarSign size={18} className="text-cyan-400" /> Financials
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase font-bold">Total Budget</span>
                <span className="text-lg font-black text-white">${order.totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase font-bold">Paid Credits</span>
                <span className="text-sm font-black text-green-400">${order.paidAmount}</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-cyan-400 uppercase font-black">Outstanding</span>
                <span className="text-lg font-black text-cyan-400">${order.unPaidAmount}</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-2 text-gray-500 mb-4 uppercase text-[10px] font-black">
              <Terminal size={14} /> System Logs
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed font-mono">
              [SYSTEM]: Node connection established. <br />
              [INFO]: Monitoring active deployments. <br />
              [STATUS]: Ready for final verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ icon, label, value }) => (
  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
    <div className="text-cyan-500/50 mb-3">{icon}</div>
    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-white truncate">{value}</p>
  </div>
);

export default OrderDetailsContent;