"use client";

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2, CreditCard, Eye, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ManagePaymentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/payment/all-requests");
      if (res.data.success) {
        setRequests(res.data.result);
        setTotalCount(res.data.totalRequests);
      }
    } catch (error) {
      toast.error("Failed to sync financial stream");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10">
      <div className="flex justify-between items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md mb-4">
            <CreditCard size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">{totalCount} Payment_Requests_Queue</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">Financial_Vault</h2>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.03]">
              <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Transaction_ID</th>
              <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol_Link</th>
              <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Quantum_Amount</th>
              <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Status</th>
              <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest text-center">Diagnostics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {loading ? (
              <tr><td colSpan="5" className="p-32 text-center"><Loader2 className="animate-spin text-cyan-500 mx-auto" size={40} /></td></tr>
            ) : requests.map((req) => (
              <tr key={req._id} className="hover:bg-white/[0.05] transition-all group">
                <td className="p-7 font-mono text-cyan-500 text-[11px] font-bold">{req.transactionId}</td>
                <td className="p-7">
                  <p className="text-[12px] font-black text-white uppercase tracking-tight">Node #{req.orderId}</p>
                  <p className="text-[9px] text-gray-500 mt-1 font-medium">{req.userEmail}</p>
                </td>
                <td className="p-7">
                  <p className="text-[11px] text-white font-mono font-bold">${req.amountPaid}</p>
                  <p className="text-[8px] text-gray-600 uppercase mt-1 font-black italic">{req.method}</p>
                </td>
                <td className="p-7">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 
                    req.status === 'rejected' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {req.status === 'approved' ? <CheckCircle size={10} /> : req.status === 'rejected' ? <XCircle size={10} /> : <Clock size={10} />}
                    {req.status}
                  </div>
                </td>
                <td className="p-7 text-center">
                  <Link 
                    href={`/my-cluster/dashboard/admin/payments/${req._id}`}
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
    </div>
  );
}