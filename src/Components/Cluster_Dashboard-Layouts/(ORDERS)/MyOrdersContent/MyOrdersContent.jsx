"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { Search, Eye, XCircle, Zap, Package } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const MyOrdersContent = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    if (!user?.uid) return;
    try {
      const res = await axiosInstance.get(`/orders/user/${user.uid}`);
      const pendingOrders = (res.data.data || []).filter(
        (order) => order.status === "pending",
      );
      setOrders(pendingOrders);
      setFilteredOrders(pendingOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this node deployment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, cancel it!",
      background: "#0a0a0a",
      color: "#fff",
      backdrop: `rgba(0,0,123,0.4)`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.patch(`/orders/cancel/${id}`);

          if (res.data.success) {
            Swal.fire({
              title: "Cancelled!",
              text: "The node deployment has been terminated.",
              icon: "success",
              background: "#0a0a0a",
              color: "#fff",
            });
            fetchOrders();
          }
        } catch (error) {
          console.error("Cancellation Error:", error);
          Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "Failed to cancel the order",
            icon: "error",
            background: "#0a0a0a",
            color: "#fff",
          });
        }
      }
    });
  };

  useEffect(() => {
    const results = orders.filter(
      (order) =>
        order.orderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredOrders(results);
  }, [searchTerm, orders]);

  if (loading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Syncing_Pending_Nodes...
        </p>
      </div>
    );

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Pending <span className="text-cyan-400">Nodes</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Ready for deployment: {filteredOrders.length}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
              size={16}
            />
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
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">
                  Order Entity
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">
                  Classification
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">
                  Investment
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5">
                  Pulse
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-cyan-400/60 border-b border-white/5 text-right">
                  Operational Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="group hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="p-6 font-bold text-white">
                      <Package
                        size={18}
                        className="inline mr-3 text-cyan-400"
                      />{" "}
                      {order.orderTitle}
                    </td>
                    <td className="p-6 text-gray-400 text-xs">
                      {order.category}
                    </td>
                    <td className="p-6 text-white text-sm font-black">
                      ${order.totalAmount}
                    </td>
                    <td className="p-6">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/my-cluster/dashboard/payment/${order._id}`} className="p-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl hover:bg-cyan-400 hover:text-black transition-all cursor-pointer">
                          <Zap size={14} />
                        </Link>
                        <Link
                          href={`/my-cluster/dashboard/my-order/${order._id}`}
                          className="p-2.5 bg-white/5 text-gray-400 border border-white/10 rounded-xl hover:text-white transition-all cursor-pointer"
                        >
                          <Eye size={14} />
                        </Link>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="p-2.5 bg-red-500/5 text-red-500/50 border border-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center opacity-20 uppercase tracking-[0.4em] text-xs"
                  >
                    No Pending Nodes
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
