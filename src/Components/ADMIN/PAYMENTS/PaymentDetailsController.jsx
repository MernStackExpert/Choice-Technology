"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2, ArrowLeft, Check, X, ShieldAlert, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentDetailsController({ id }) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(`/payment/details/${id}`);
        if (res.data.success) setPayment(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch payment details");
      } finally { setLoading(false); }
    };
    fetchDetails();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setActionLoading(true);
      const res = await axiosInstance.patch(`/payment/update-status`, { paymentId: id, status });
      if (res.data.success) {
        toast.success(`Payment ${status} successfully`);
        setPayment({ ...payment, status });
      }
    } catch (err) { toast.error("Failed to update status"); }
    finally { setActionLoading(false); }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-cyan-500" /></div>;

  return (
    <div className="p-4 md:p-10 space-y-8 max-w-5xl mx-auto relative z-10 text-white">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all">
        <ArrowLeft size={14} /> Return to Queue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="p-10 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl">
            <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-8">Transaction_Info</h4>
            <div className="space-y-6 font-mono">
              <div><p className="text-[9px] text-gray-500 uppercase">TX_ID</p><p className="text-lg font-black text-cyan-400">{payment.transactionId}</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-[9px] text-gray-500 uppercase">Amount</p><p className="text-xl font-black">${payment.amountPaid}</p></div>
                <div><p className="text-[9px] text-gray-500 uppercase">Method</p><p className="text-xl font-black">{payment.method}</p></div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] text-gray-500 uppercase">Sender Number</p><p className="text-sm font-bold">{payment.senderNumber}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => updateStatus('approved')} disabled={actionLoading || payment.status === 'approved'} className="flex-1 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all">
              <Check size={16} /> Approve_Payment
            </button>
            <button onClick={() => updateStatus('rejected')} disabled={actionLoading || payment.status === 'rejected'} className="flex-1 py-5 bg-white/5 border border-white/10 hover:border-rose-500 text-rose-500 font-black uppercase text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all">
              <X size={16} /> Reject_Request
            </button>
          </div>
        </div>

        <div className="p-6 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-center min-h-[400px]">
          {payment.paymentScreenshot ? (
            <img src={payment.paymentScreenshot} alt="Verification" className="max-h-[500px] rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10" />
          ) : (
            <div className="text-center space-y-4 opacity-20">
              <ImageIcon size={64} className="mx-auto" />
              <p className="text-[10px] font-black uppercase tracking-widest">No Screenshot Provided</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}