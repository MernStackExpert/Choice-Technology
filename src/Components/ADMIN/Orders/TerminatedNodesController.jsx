"use client";

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Search, Loader2, Eye, ShieldCheck, 
  ChevronLeft, ChevronRight, Archive 
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TerminatedNodesController() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTerminatedOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/orders/all`, {
        params: {
          page: currentPage,
          limit: 20,
          email: searchTerm,
        }
      });
      
      if (res.data.success) {
        const completedOnly = res.data.result.filter(order => order.status === "completed");
        setOrders(completedOnly);
        setTotalPages(res.data.totalPages);
        setTotalCount(completedOnly.length);
      }
    } catch (error) {
      toast.error("Failed to sync terminated nodes");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTerminatedOrders();
    }, 500); 
    return () => clearTimeout(delayDebounceFn);
  }, [fetchTerminatedOrders]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md">
            <Archive size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
              {totalCount} Terminated_Nodes_In_Archive
            </span>
          </div>
          <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <ShieldCheck className="text-cyan-500" /> Archive_Vault
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
              Historical record of fully synchronized and completed nodes
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="SEARCH ARCHIVED NODES..."
            className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/40 transition-all shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.03]">
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol_ID</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Node_Entity</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Revenue_Generated</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Termination_Date</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest text-center">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-32 text-center">
                    <Loader2 className="animate-spin text-cyan-500 mx-auto" size={40} />
                  </td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="hover:bg-white/[0.05] transition-all group">
                  <td className="p-7 font-mono text-cyan-500 text-[11px] font-bold">#{order.orderId}</td>
                  <td className="p-7">
                    <p className="text-[12px] font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{order.orderTitle}</p>
                    <p className="text-[9px] text-gray-500 lowercase mt-1 font-medium">{order.userEmail}</p>
                  </td>
                  <td className="p-7">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
                      <p className="text-[11px] text-white font-mono font-bold">${order.totalAmount}</p>
                    </div>
                    <p className="text-[8px] text-emerald-500 uppercase font-black mt-1 tracking-tighter">Fully_Funded</p>
                  </td>
                  <td className="p-7">
                    <p className="text-[10px] font-mono text-gray-400 font-bold">{new Date(order.updatedAt).toDateString()}</p>
                    <p className="text-[8px] text-gray-600 uppercase font-black mt-1">Lifecycle_End</p>
                  </td>
                  <td className="p-7 text-center">
                    <Link 
                      href={`/my-cluster/dashboard/admin/orders/${order._id}`}
                      className="inline-flex p-4 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-500 rounded-2xl transition-all"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!loading && orders.length === 0 && (
          <div className="p-32 text-center flex flex-col items-center gap-4">
             <Archive className="text-gray-800" size={48} />
             <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Archive is currently empty</p>
          </div>
        )}
      </div>

      {!loading && orders.length > 0 && (
        <div className="flex items-center justify-center gap-6 py-6">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-500 hover:text-cyan-500 disabled:opacity-10 transition-all cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">Vault_Sector</span>
             <span className="text-lg font-mono text-white leading-none mt-1">{currentPage} <span className="text-gray-600 text-xs">/ {totalPages}</span></span>
          </div>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-500 hover:text-cyan-500 disabled:opacity-10 transition-all cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}