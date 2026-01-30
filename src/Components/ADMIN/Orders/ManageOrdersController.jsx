"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Search, Loader2, Eye, Package, 
  Clock, XCircle, ChevronLeft, ChevronRight, Filter 
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ManageOrdersController() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrders = useCallback(async () => {
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
        const filteredData = res.data.result.filter(order => 
          order.status === "pending" || order.status === "cancelled"
        );
        setOrders(filteredData);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error("Order Sync Error:", error);
      toast.error("Failed to sync orders with neural network");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchOrders();
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [fetchOrders]);

  const displayedOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter(order => order.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <Package className="text-cyan-500" /> Restricted_Order_Stream
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
            Managing pending and cancelled nodes exclusively
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="SEARCH BY CLIENT EMAIL..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative w-full sm:w-48 group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="all" className="bg-[#050505]">ALL INACTIVE</option>
              <option value="pending" className="bg-[#050505]">PENDING ONLY</option>
              <option value="cancelled" className="bg-[#050505]">CANCELLED ONLY</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-6 text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol_ID</th>
              <th className="p-6 text-[9px] font-black text-gray-500 uppercase tracking-widest">Node_Entity</th>
              <th className="p-6 text-[9px] font-black text-gray-500 uppercase tracking-widest">Financials</th>
              <th className="p-6 text-[9px] font-black text-gray-500 uppercase tracking-widest">Sync_Status</th>
              <th className="p-6 text-[9px] font-black text-gray-500 uppercase tracking-widest text-center">Diagnostics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-20 text-center">
                  <Loader2 className="animate-spin text-cyan-500 mx-auto" size={32} />
                </td>
              </tr>
            ) : displayedOrders.map((order) => (
              <tr key={order._id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-6 font-mono text-cyan-500 text-[11px]">#{order.orderId}</td>
                <td className="p-6">
                  <p className="text-[11px] font-bold text-white uppercase tracking-tight">{order.orderTitle}</p>
                  <p className="text-[9px] text-gray-500 lowercase mt-0.5">{order.userEmail}</p>
                </td>
                <td className="p-6">
                  <p className="text-[11px] text-white font-mono">${order.totalAmount}</p>
                  <p className="text-[9px] text-rose-500 uppercase font-black mt-0.5 tracking-tighter">Due: ${order.unPaidAmount}</p>
                </td>
                <td className="p-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    order.status === 'cancelled' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {order.status === 'cancelled' ? <XCircle size={10} /> : <Clock size={10} />}
                    {order.status}
                  </div>
                </td>
                <td className="p-6 text-center">
                  <Link 
                    href={`/my-cluster/dashboard/admin/orders/${order._id}`}
                    className="inline-flex p-3 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-xl transition-all"
                  >
                    <Eye size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!loading && displayedOrders.length === 0 && (
          <div className="p-20 text-center text-[10px] font-black text-gray-600 uppercase tracking-widest">
            No pending or cancelled nodes found in this sector.
          </div>
        )}
      </div>

      {!loading && displayedOrders.length > 0 && (
        <div className="flex items-center justify-center gap-4 py-4">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
            Stream_Page {currentPage} / {totalPages}
          </span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}