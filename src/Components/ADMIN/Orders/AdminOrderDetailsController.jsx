"use client";

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Loader2, ArrowLeft, Mail, Clock, ShieldCheck, 
  Database, FileText, CreditCard, Activity, Save,
  Calendar, Hash, Briefcase, FileCode, Landmark,
  TrendingUp, CheckCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminOrderDetailsController({ id }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const fetchOrderDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/orders/details/${id}`);
      if (res.data.success) {
        setOrder(res.data.data);
        setProgress(res.data.data.progress || 0);
      }
    } catch (error) {
      toast.error("Failed to sync node details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchOrderDetails();
  }, [id, fetchOrderDetails]);

  const handleUpdateProgress = async () => {
    try {
      setUpdating(true);
      const res = await axiosInstance.patch(`/orders/update-progress`, {
        orderId: order.orderId,
        progressValue: progress
      });
      if (res.data.success) {
        toast.success(`Progress synchronized to ${progress}%`);
      }
    } catch (error) {
      toast.error("Neural sync failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em]">
      <Loader2 className="animate-spin" size={32} />
      Scanning_Order_Intelligence...
    </div>
  );

  if (!order) return null;

  return (
    <div className="p-4 md:p-10 space-y-10 max-w-7xl mx-auto pb-20">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all">
        <ArrowLeft size={14} /> Back to Stream
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Summary & Progress */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl text-center">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-[2rem] flex items-center justify-center text-cyan-500 mx-auto mb-6 border border-cyan-500/20">
              <Database size={36} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">{order.orderTitle}</h3>
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.3em] mt-3 bg-cyan-500/5 py-2 rounded-full border border-cyan-500/10">
              ID: {order.orderId}
            </p>
            
            <div className="mt-10 space-y-5">
               <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Activity size={12}/> Status</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md ${order.status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>{order.status}</span>
               </div>
               <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Briefcase size={12}/> Category</span>
                  <span className="text-[10px] font-black text-white uppercase">{order.category}</span>
               </div>
            </div>
          </div>

          {/* Neural Sync Interface */}
          <div className="p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl text-center">
             <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-8">Neural_Sync_Update</h4>
             <div className="relative inline-block w-40 h-40 mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * progress) / 100} className="text-cyan-500 transition-all duration-1000 shadow-[0_0_20px_rgba(34,211,238,0.5)]" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white font-mono">{progress}%</span>
                  <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Synced</span>
                </div>
             </div>
             <input type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(e.target.value)} className="w-full accent-cyan-500 cursor-pointer h-1 bg-white/10 rounded-full" />
             <button onClick={handleUpdateProgress} disabled={updating} className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[11px] rounded-[1.5rem] mt-8 flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)]">
               {updating ? <Loader2 className="animate-spin" size={16} /> : <TrendingUp size={16} />} Commit_Sync_Data
             </button>
          </div>
        </div>

        {/* RIGHT COLUMN: All Fields Data */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Identity & Protocol Info */}
          <div className="p-10 rounded-[3.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl">
            <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
              <ShieldCheck size={18} /> Core_Protocol_Data
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500"><Mail size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Access Email</p>
                  <p className="text-sm font-bold text-white mt-1 break-all font-mono">{order.userEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500"><Hash size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Client User_ID</p>
                  <p className="text-sm font-bold text-white mt-1 break-all font-mono">{order.userId}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500"><Calendar size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Initial_Creation</p>
                  <p className="text-sm font-bold text-white mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500"><Clock size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Last_Synchronization</p>
                  <p className="text-sm font-bold text-white mt-1">{new Date(order.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Architecture */}
          <div className="p-10 rounded-[3.5rem] border border-white/5 bg-white/10 backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
              <Landmark size={18} /> Financial_Architecture
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Total Project Value</p>
                <p className="text-2xl font-black text-white font-mono">${order.totalAmount}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2">Authorized Paid</p>
                <p className="text-2xl font-black text-emerald-400 font-mono">${order.paidAmount}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-rose-500/20">
                <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-2">Remaining Debt</p>
                <p className="text-2xl font-black text-rose-500 font-mono">${order.unPaidAmount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
               <div className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <CreditCard className="text-cyan-500" />
                  <div>
                    <p className="text-[9px] font-black text-gray-600 uppercase">Monthly Installment</p>
                    <p className="text-sm font-bold text-white">${order.monthlyFee} / Month</p>
                  </div>
               </div>
               <div className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <CheckCircle className="text-amber-500" />
                  <div>
                    <p className="text-[9px] font-black text-gray-600 uppercase">Current Expiry Log</p>
                    <p className="text-sm font-bold text-amber-500 font-mono">{new Date(order.expiryDate).toDateString()}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Plan & Files */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2"><FileCode size={16}/> System_Requirement</h4>
              <p className="text-[9px] font-black text-gray-600 uppercase mb-2">Plan Type: <span className="text-white">{order.planType}</span></p>
              <p className="text-[9px] font-black text-gray-600 uppercase">Duration: <span className="text-white">{order.duration} {order.planType === 'monthly' ? 'Months' : 'Days'}</span></p>
              
              <div className="mt-8">
                {order.requirementFile ? (
                  <a href={order.requirementFile} target="_blank" className="flex items-center justify-between p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl group hover:bg-cyan-500 transition-all">
                    <span className="text-[10px] font-black text-cyan-500 group-hover:text-black uppercase tracking-widest">Download Requirements</span>
                    <FileText size={18} className="text-cyan-500 group-hover:text-black" />
                  </a>
                ) : (
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-gray-600 uppercase tracking-widest text-center italic">
                    No requirement files uploaded
                  </div>
                )}
              </div>
            </div>

            <div className="p-10 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2"><FileText size={16}/> Project_Brief</h4>
              <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 min-h-[120px]">
                <p className="text-xs text-gray-400 leading-relaxed italic">"{order.description}"</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}