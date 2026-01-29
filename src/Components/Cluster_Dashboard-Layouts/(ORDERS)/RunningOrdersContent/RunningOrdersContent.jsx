"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { Search, Eye, Activity, Terminal, ShieldCheck, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

const RunningOrdersContent = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;
      try {
        const res = await axiosInstance.get(`/orders/user/${user.uid}`);
        const activeOrders = (res.data.data || []).filter(order => order.status === "active");
        setOrders(activeOrders);
        setFilteredOrders(activeOrders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    const results = orders.filter(order =>
      order.orderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(results);
  }, [searchTerm, orders]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">Monitoring_Active_Pulse...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Nodes</span>
          </h1>
          <p className="text-cyan-500/50 text-[10px] font-bold uppercase tracking-widest mt-1 font-mono">Total Operational: {filteredOrders.length}</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Filter Active Node ID..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs focus:outline-none focus:border-cyan-500/50 transition-all text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="bg-black/20 border border-cyan-500/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.2)]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">Operational Entity</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">Service Pulse</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">Current Phase</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order._id} className="group hover:bg-cyan-500/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 border border-green-500/20">
                          <Activity size={18} />
                        </div>
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">{order.orderTitle}</h4>
                        <p className="text-[9px] text-gray-600 font-mono uppercase mt-1 tracking-widest">{order.orderId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={12} className="text-cyan-500" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{order.category}</span>
                    </div>
                    <p className="text-xs font-black text-white font-mono">$ {order.monthlyFee} <span className="text-[9px] text-gray-600 font-normal">/ MONTHLY</span></p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]" style={{ width: `${order.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-green-400">{order.progress}%</span>
                    </div>
                    <p className="text-[9px] text-gray-600 uppercase mt-2 font-bold tracking-widest flex items-center gap-1">
                      <Terminal size={10} /> Online & Running
                    </p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => router.push(`/my-cluster/dashboard/my-order/${order._id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer group"
                      >
                        <Eye size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Details</span>
                      </button>
                      <button className="p-2.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl hover:bg-green-500 hover:text-black transition-all cursor-pointer shadow-lg shadow-green-500/5">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <Activity size={48} className="text-gray-500" />
                      <p className="text-xs font-black uppercase tracking-[0.4em]">No Active Nodes In Orbit</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RunningOrdersContent;