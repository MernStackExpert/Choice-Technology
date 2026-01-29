"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { Search, Eye, History, CheckCircle2, XCircle, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderHistoryContent = () => {
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
        const historyOrders = (res.data.data || []).filter(
          order => order.status === "completed" || order.status === "cancelled"
        );
        setOrders(historyOrders);
        setFilteredOrders(historyOrders);
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
      <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">Retrieving_History_Logs...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Order <span className="text-gray-500">History</span>
          </h1>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-1 font-mono">Archive Records: {filteredOrders.length}</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Search Archive ID..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs focus:outline-none focus:border-cyan-500/50 transition-all text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="bg-black/20 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-white/[0.01]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Archived Node</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Completion Date</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order._id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        order.status === "completed" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}>
                        {order.status === "completed" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white transition-colors">{order.orderTitle}</h4>
                        <p className="text-[9px] text-gray-600 font-mono uppercase mt-1 tracking-widest">{order.orderId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-bold text-gray-400 font-mono">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-[9px] text-gray-600 uppercase mt-1 font-black">Terminated</p>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                      order.status === "completed" 
                      ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => router.push(`/my-cluster/dashboard/my-order/${order._id}`)}
                        className="p-2.5 bg-white/5 text-gray-400 border border-white/10 rounded-xl hover:text-cyan-400 transition-all cursor-pointer"
                      >
                        <Eye size={14} />
                      </button>
                      <button className="p-2.5 bg-white/5 text-gray-400 border border-white/10 rounded-xl hover:text-white transition-all cursor-pointer">
                        <FileText size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <History size={48} className="text-gray-500" />
                      <p className="text-xs font-black uppercase tracking-[0.4em]">Archive is Empty</p>
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

export default OrderHistoryContent;