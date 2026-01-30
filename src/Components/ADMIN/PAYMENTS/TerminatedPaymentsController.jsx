"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2, CreditCard, Eye, ShieldCheck, Search, Database } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TerminatedPaymentsController() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTerminatedHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/payment/all-requests");
      if (res.data.success) {
        const completedOnly = res.data.result.filter(req => req.status === "complete");
        setRequests(completedOnly);
      }
    } catch (error) {
      toast.error("Failed to sync terminated financial records");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTerminatedHistory();
  }, [fetchTerminatedHistory]);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => 
      req.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md">
            <Database size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
              {filteredRequests.length} Finalized_Transactions_Vault
            </span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <ShieldCheck className="text-emerald-500" /> Terminated_Payments
          </h2>
        </div>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="SEARCH ARCHIVE..."
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
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Transaction_ID</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol_Link</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">Quantum_Value</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest">State</th>
                <th className="p-7 text-[9px] font-black text-gray-500 uppercase tracking-widest text-center">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr><td colSpan="5" className="p-32 text-center"><Loader2 className="animate-spin text-cyan-500 mx-auto" size={40} /></td></tr>
              ) : filteredRequests.map((req) => (
                <tr key={req._id} className="hover:bg-white/[0.05] transition-all group">
                  <td className="p-7 font-mono text-cyan-500 text-[11px] font-bold tracking-tighter">{req.transactionId}</td>
                  <td className="p-7">
                    <p className="text-[12px] font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">Node #{req.orderId}</p>
                    <p className="text-[9px] text-gray-500 mt-1 font-medium">{req.userEmail}</p>
                  </td>
                  <td className="p-7">
                    <p className="text-[11px] text-white font-mono font-bold">${req.amountPaid}</p>
                    <p className="text-[8px] text-gray-600 uppercase mt-1 font-black tracking-tighter italic">{req.method}</p>
                  </td>
                  <td className="p-7">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <ShieldCheck size={10} />
                      {req.status}
                    </div>
                  </td>
                  <td className="p-7 text-center">
                    <Link 
                      href={`/my-cluster/dashboard/admin/payments/${req._id}`}
                      className="inline-flex p-4 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 rounded-2xl transition-all active:scale-90"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!loading && filteredRequests.length === 0 && (
          <div className="p-32 text-center flex flex-col items-center gap-4">
             <Database className="text-gray-800" size={48} />
             <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">No terminated records found in the mainframe</p>
          </div>
        )}
      </div>
    </div>
  );
}