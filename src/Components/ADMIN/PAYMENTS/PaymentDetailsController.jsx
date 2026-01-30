"use client";

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Loader2, ArrowLeft, Check, X, ShieldAlert, 
  Image as ImageIcon, Calendar, Hash, Phone, 
  CreditCard, User, Landmark, Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentDetailsController({ id }) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/payment/details/${id}`);
      if (res.data.success) {
        setPayment(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch payment details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchDetails();
  }, [id, fetchDetails]);

  const updateStatus = async (status) => {
    try {
      setActionLoading(true);
      const res = await axiosInstance.patch(`/payment/update-status`, { paymentId: id, status });
      if (res.data.success) {
        toast.success(`Payment ${status} successfully`);
        setPayment(prev => ({ ...prev, status }));
      }
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em]">
      <Loader2 className="animate-spin" size={32} />
      Analyzing_Transaction_Nodes...
    </div>
  );

  if (!payment) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-gray-500 uppercase text-[10px] font-black tracking-widest gap-4">
      <ShieldAlert size={40} className="mb-4 opacity-20" />
      Transaction_Not_Found
      <button onClick={() => router.back()} className="text-cyan-500 underline cursor-pointer">Return to Queue</button>
    </div>
  );

  const isFinalized = payment.status === 'complete' || payment.status === 'rejected';

  return (
    <div className="p-4 md:p-10 space-y-8 max-w-7xl mx-auto relative z-10 text-white pb-20">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all cursor-pointer">
        <ArrowLeft size={14} /> Return to Queue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="p-8 md:p-10 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl shadow-2xl">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2">Financial_Identity</h4>
                <p className="text-2xl font-black uppercase tracking-tighter">Transaction_Protocol</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                payment.status === 'complete' || payment.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                payment.status === 'rejected' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse'
              }`}>
                {payment.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
              <div className="space-y-1">
                <p className="text-[9px] text-gray-500 uppercase flex items-center gap-2"><Hash size={12}/> TX_ID</p>
                <p className="text-sm font-black text-cyan-400 break-all">{payment.transactionId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-gray-500 uppercase flex items-center gap-2"><Landmark size={12}/> Node_Link</p>
                <p className="text-sm font-black text-emerald-500">#{payment.orderId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-gray-500 uppercase flex items-center gap-2"><CreditCard size={12}/> Amount_Received</p>
                <p className="text-2xl font-black text-white">${payment.amountPaid}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-gray-500 uppercase flex items-center gap-2"><Globe size={12}/> Gateway_Method</p>
                <p className="text-xl font-black text-white uppercase">{payment.method}</p>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-500"><Phone size={14}/></div>
                  <div>
                    <p className="text-[8px] text-gray-500 uppercase font-black">Sender_Line</p>
                    <p className="text-xs font-bold">{payment.senderNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-500"><Landmark size={14}/></div>
                  <div>
                    <p className="text-[8px] text-gray-500 uppercase font-black">Target_Receiver</p>
                    <p className="text-xs font-bold">{payment.paymentNumber}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-500"><User size={14}/></div>
                  <div>
                    <p className="text-[8px] text-gray-500 uppercase font-black">Origin_Email</p>
                    <p className="text-xs font-bold lowercase">{payment.userEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-500"><Calendar size={14}/></div>
                  <div>
                    <p className="text-[8px] text-gray-500 uppercase font-black">Timestamp</p>
                    <p className="text-xs font-bold">{new Date(payment.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isFinalized && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => updateStatus('approved')} 
                disabled={actionLoading || payment.status === 'approved'} 
                className="flex-1 py-5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:grayscale text-black font-black uppercase text-[11px] rounded-[1.5rem] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />} 
                Commit_Approval
              </button>
              <button 
                onClick={() => updateStatus('rejected')} 
                disabled={actionLoading || payment.status === 'rejected'} 
                className="flex-1 py-5 bg-white/5 border border-white/10 hover:border-rose-500 hover:text-rose-500 text-gray-500 font-black uppercase text-[11px] rounded-[1.5rem] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <X size={16} /> Terminate_Request
              </button>
            </div>
          )}

          {isFinalized && (
            <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-md text-center">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                This transaction has been finalized and locked.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="p-6 rounded-[3.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-center min-h-[400px] lg:min-h-[600px] overflow-hidden sticky top-24">
            {payment.paymentScreenshot ? (
              <div className="relative group w-full h-full flex items-center justify-center">
                <img 
                  src={payment.paymentScreenshot} 
                  alt="Verification_Node" 
                  className="max-h-[75vh] w-full object-contain rounded-3xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]" 
                />
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ) : (
              <div className="text-center space-y-6 opacity-20 py-20">
                <ImageIcon size={80} className="mx-auto text-gray-500" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Visual_Evidence_Missing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}