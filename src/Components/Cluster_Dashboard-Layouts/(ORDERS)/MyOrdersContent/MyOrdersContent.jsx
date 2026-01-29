"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { Search, Eye, XCircle, Zap, Package } from "lucide-react";
import { Router } from "next/router";
import Link from "next/link";

const MyOrdersContent = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;
      try {
        const res = await axiosInstance.get(`/orders/user/${user.uid}`);
        const pendingOrders = (res.data.data || []).filter(order => order.status === "pending");
        setOrders(pendingOrders);
        setFilteredOrders(pendingOrders);
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
      <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">Syncing_Pending_Nodes...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Pending <span className="text-cyan-400">Nodes</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Ready for deployment: {filteredOrders.length}</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Search Protocol ID or Title..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs focus:outline-none focus:border-cyan-500/50 transition-all text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="bg-black/20 border border-cyan-500/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">Order Entity</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">Classification</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">Investment</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">Pulse</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order._id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                        <Package size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{order.orderTitle}</h4>
                        <p className="text-[9px] text-gray-600 font-mono uppercase mt-1">ID: {order.orderId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                      {order.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-black text-white">${order.totalAmount}</p>
                    <p className="text-[9px] text-cyan-500/50 font-bold uppercase tracking-widest mt-0.5">Paid: ${order.paidAmount}</p>
                  </td>
                  <td className="p-6">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" 
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] font-black text-gray-500 mt-2 uppercase tracking-widest">{order.progress}% Ready</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl hover:bg-cyan-500 hover:text-black transition-all cursor-pointer shadow-lg shadow-cyan-500/5">
                        <Zap size={14} />
                      </button>
                      <Link href={(`/my-cluster/dashboard/my-order/${order._id}`)} className="p-2.5 bg-white/5 text-gray-400 border border-white/10 rounded-xl hover:text-white transition-all cursor-pointer">
                        <Eye size={14} />
                      </Link>
                      <button className="p-2.5 bg-red-500/5 text-red-500/50 border border-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                        <XCircle size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <Package size={48} className="text-gray-500" />
                      <p className="text-xs font-black uppercase tracking-[0.4em]">No Pending Nodes Detected</p>
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

export default MyOrdersContent;