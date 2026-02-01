"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Loader2, Search, Zap, Activity, Eye, 
  RefreshCcw, ShieldCheck, Globe, Database,
  TrendingUp, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ActiveOperations() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchActiveOperations = useCallback(async (isManual = false) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/orders/all");
      if (res.data.success) {
        const operationalNodes = res.data.result.filter(order => 
          order.status === "active" && order.unPaidAmount === 0
        );
        setOrders(operationalNodes);
        if (isManual) toast.success("Operational matrix synchronized");
      }
    } catch (error) {
      toast.error("Failed to sync operational nodes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveOperations();
  }, [fetchActiveOperations]);

  const filtered = useMemo(() => {
    return orders.filter(order => 
      order.orderTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId?.toString().includes(searchTerm) ||
      order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10 text-white pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md">
              <Zap size={12} className="text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
                {filtered.length} Live_Nodes_Operational
              </span>
            </div>
            <button 
              onClick={() => fetchActiveOperations(true)}
              className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-all active:scale-90"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Ops_Matrix</h2>
        </div>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="SEARCH BY NODE ID / TITLE / EMAIL..."
            className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/40 transition-all shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-32 flex justify-center">
            <Loader2 className="animate-spin text-cyan-500" size={40} />
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((node) => (
            <motion.div 
              layout
              key={node._id}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Database size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">{node.orderTitle}</h4>
                    <p className="text-[9px] text-gray-500 font-mono mt-1">ID: #{node.orderId}</p>
                  </div>
                </div>
                <Link 
                  href={`/my-cluster/dashboard/admin/orders/${node._id}`}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-cyan-400 transition-all"
                >
                  <Eye size={16} />
                </Link>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sync_Progress</span>
                  </div>
                  <span className="text-xs font-mono font-black text-white">{node.progress}%</span>
                </div>
                
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-1000"
                    style={{ width: `${node.progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase font-black mb-1">Financial_Status</p>
                    <div className="flex items-center gap-2 text-emerald-500">
                      <ShieldCheck size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-nowrap">Full Paid</span>
                    </div>
                  </div>
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase font-black mb-1">Client_Node</p>
                    <p className="text-[10px] font-bold text-white truncate lowercase">{node.userEmail}</p>
                  </div>
                </div>
              </div>

              {node.progress === 100 && (
                <div className="absolute top-0 right-0 p-6">
                  <CheckCircle2 size={40} className="text-emerald-500/20" />
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center flex flex-col items-center gap-4">
            <Activity className="text-gray-800 animate-pulse" size={48} />
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Zero fully funded operational nodes detected</p>
          </div>
        )}
      </div>
    </div>
  );
}