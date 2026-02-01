"use client";

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2, Eye, CheckCircle, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ApprovedPaymentsController() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [syncingId, setSyncingId] = useState(null);

  const fetchApprovedRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/payment/all-requests");
      if (res.data.success) {
        const approvedOnly = res.data.result.filter(req => req.status === "approved");
        setRequests(approvedOnly);
      }
    } catch (error) {
      toast.error("Failed to sync approved stream");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovedRequests();
  }, [fetchApprovedRequests]);

  const handleConfirmOrderPayment = async (reqData) => {
    const result = await Swal.fire({
      title: "Authorize Sync?",
      text: `Confirm $${reqData.amountPaid} for Node #${reqData.orderId}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "YES, SYNC NOW",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        setSyncingId(reqData._id);
        const res = await axiosInstance.patch("/orders/approve-payment", {
          orderId: reqData.orderId,
          amountPaid: reqData.amountPaid
        });

        if (res.data.success) {
          await axiosInstance.patch("/payment/update-status", {
            paymentId: reqData._id,
            status: "complete"
          });

          Swal.fire({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            background: "#0a0a0a",
            color: "#fff",
            confirmButtonColor: "#22d3ee",
          });
          fetchApprovedRequests();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Order sync failed");
      } finally {
        setSyncingId(null);
      }
    }
  };

  const filtered = requests.filter(req => 
    req.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <CheckCircle className="text-cyan-500" /> Payment_Confirmation
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">Finalize approved funds into neural order nodes</p>
        </div>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="FILTER BY NODE OR EMAIL..."
            className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/40 transition-all"
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
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Client_Node</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Amount_To_Sync</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest text-center">Action_Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr><td colSpan="4" className="p-32 text-center"><Loader2 className="animate-spin text-cyan-500 mx-auto" size={40} /></td></tr>
              ) : filtered.map((req) => (
                <tr key={req._id} className="hover:bg-white/[0.05] transition-all group">
                  <td className="p-7 font-mono text-cyan-500 text-[11px] font-bold">#{req.orderId}</td>
                  <td className="p-7">
                    <p className="text-[12px] font-black text-white uppercase tracking-tight">{req.userEmail}</p>
                    <p className="text-[9px] text-gray-500 mt-1 font-medium">{req.method} / {req.transactionId}</p>
                  </td>
                  <td className="p-7">
                    <p className="text-[14px] text-white font-mono font-bold">${req.amountPaid}</p>
                  </td>
                  <td className="p-7">
                    <div className="flex items-center justify-center gap-3">
                      <Link 
                        href={`/my-cluster/dashboard/admin/payments/${req._id}`}
                        className="p-3 bg-white/5 border border-white/10 hover:text-white rounded-xl transition-all"
                      >
                        <Eye size={18} />
                      </Link>
                      <button 
                        disabled={syncingId === req._id}
                        onClick={() => handleConfirmOrderPayment(req)}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[10px] rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center cursor-pointer"
                      >
                        {syncingId === req._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <ShieldCheck size={14} />
                        )}
                        {syncingId === req._id ? "Syncing..." : "Confirm_Sync"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}