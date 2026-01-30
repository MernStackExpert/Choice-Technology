"use client";

import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { 
  DollarSign, Hash, Smartphone, Send, ArrowLeft, Info, ShieldCheck, Image as ImageIcon, Loader2, CheckCircle2 
} from "lucide-react";
import Swal from "sweetalert2";

export default function ManualPaymentContent({ orderId }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentNumbers = [
    { label: "bKash (Personal)", number: "01908716502", type: "Bkash" },
    { label: "Nagad (Personal)", number: "01908716502", type: "Nagad" },
    { label: "Rocket (Personal)", number: "01908716502", type: "Rocket" }
  ];

  const [formData, setFormData] = useState({
    method: paymentNumbers[0].type,
    paymentNumber: paymentNumbers[0].number,
    transactionId: "",
    senderNumber: "",
    amountPaid: "",
    paymentScreenshot: ""
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/details/${orderId}`);
        if (res.data.success) {
          setOrder(res.data.data);
          setFormData(prev => ({ 
            ...prev, 
            amountPaid: res.data.data.monthlyFee || res.data.data.totalAmount 
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const imageData = new FormData();
    imageData.append("image", file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: "POST",
        body: imageData,
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, paymentScreenshot: data.data.display_url }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, screenshot: "Upload failed" }));
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.transactionId) tempErrors.transactionId = "Required";
    if (!formData.senderNumber || formData.senderNumber.length < 11) tempErrors.senderNumber = "Invalid Number";
    if (!formData.amountPaid || formData.amountPaid <= 0) tempErrors.amountPaid = "Invalid Amount";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const paymentData = {
      orderId: order.orderId, 
      userEmail: order.userEmail,
      method: formData.method,
      paymentNumber: formData.paymentNumber,
      transactionId: formData.transactionId.toUpperCase(),
      senderNumber: formData.senderNumber,
      amountPaid: parseFloat(formData.amountPaid),
      paymentScreenshot: formData.paymentScreenshot || null
    };

    try {
      const res = await axiosInstance.post("/payment/submit", paymentData);
      if (res.data.success) {
        Swal.fire({
          title: "Node Synchronized",
          text: "Verification pulse active.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff"
        });
        router.push("/my-cluster/dashboard/my-order");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Critical Failure",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">Neural_Sync_In_Progress...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all font-black uppercase text-[10px] tracking-widest group cursor-pointer">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Cluster
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-black/20 border border-cyan-500/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 size={120} className="text-cyan-500" />
            </div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase text-[10px] tracking-[0.2em]">
              <Info size={16} className="text-cyan-400" /> Verification Summary
            </h3>
            <div className="space-y-4">
              <DetailRow label="Node Entity" value={order.orderTitle} />
              <DetailRow label="System ID" value={order.orderId} isMono />
              <DetailRow label="Target Receiver" value={formData.paymentNumber} color="text-cyan-400" isMono />
              <DetailRow label="Method" value={formData.method} color="text-cyan-400" />
              <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                <DetailRow label="Required Credits" value={`$${order.unPaidAmount}`} color="text-white" />
                <div className="flex justify-between items-center p-5 bg-cyan-500/5 rounded-3xl border border-cyan-500/10">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Active Invoice</span>
                  <span className="text-2xl font-black text-cyan-400">${formData.amountPaid}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-black/20 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">
              Transfer <span className="text-cyan-400">Authorization</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Receiving Protocol</label>
                  <select 
                    value={formData.paymentNumber}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-cyan-500 transition-all cursor-pointer"
                    onChange={(e) => {
                        const selected = paymentNumbers.find(p => p.number === e.target.value);
                        setFormData({
                          ...formData, 
                          paymentNumber: e.target.value, 
                          method: selected.type
                        });
                    }}
                  >
                    {paymentNumbers.map((p, idx) => (
                        <option key={idx} value={p.number} className="bg-black">{p.label} - {p.number}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Credits Amount ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={14} />
                    <input 
                      type="number" required
                      className={`w-full bg-white/5 border ${errors.amountPaid ? 'border-red-500' : 'border-white/10'} rounded-2xl p-4 pl-10 text-xs text-white outline-none focus:border-cyan-500 transition-all`}
                      value={formData.amountPaid}
                      onChange={(e) => setFormData({...formData, amountPaid: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Transaction Identity</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={14} />
                    <input 
                      type="text" required placeholder="TRX-NODE-XXXX"
                      className={`w-full bg-white/5 border ${errors.transactionId ? 'border-red-500' : 'border-white/10'} rounded-2xl p-4 pl-10 text-xs text-white outline-none focus:border-cyan-500 transition-all uppercase font-mono`}
                      onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                    />
                  </div>
                  {errors.transactionId && <p className="text-[8px] text-red-500 ml-2 mt-1 uppercase font-black tracking-widest">{errors.transactionId}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Sender Mobile Node</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={14} />
                    <input 
                      type="text" required placeholder="01XXXXXXXXX"
                      className={`w-full bg-white/5 border ${errors.senderNumber ? 'border-red-500' : 'border-white/10'} rounded-2xl p-4 pl-10 text-xs text-white outline-none focus:border-cyan-500 transition-all`}
                      onChange={(e) => setFormData({...formData, senderNumber: e.target.value})}
                    />
                  </div>
                  {errors.senderNumber && <p className="text-[8px] text-red-500 ml-2 mt-1 uppercase font-black tracking-widest">{errors.senderNumber}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Digital Receipt (Optional)</label>
                <div className="relative w-full bg-white/5 border border-white/10 border-dashed rounded-3xl p-6 transition-all hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center gap-3">
                  <input 
                    type="file" accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  {uploading ? <Loader2 className="text-cyan-400 animate-spin" size={24} /> : <ImageIcon className="text-gray-500" size={24} />}
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {formData.paymentScreenshot ? "Node Proof Verified ✓" : "Drop Transaction Screenshot"}
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={submitting || uploading}
                className={`w-full py-5 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 transition-all cursor-pointer ${submitting || uploading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-[1.01]'}`}
              >
                {submitting ? "Processing Node..." : "Initiate Verification"} <Send size={16} />
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <ShieldCheck className="text-emerald-500 shrink-0" size={24} />
              <p className="text-[9px] text-gray-600 font-bold uppercase leading-relaxed tracking-wider">
                Authorized Node Verification System. Please ensure the <span className="text-cyan-400">Target Receiver</span> number matches your transfer destination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailRow = ({ label, value, color = "text-white", isMono = false }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{label}</span>
    <span className={`text-xs font-bold ${color} ${isMono ? "font-mono" : ""}`}>{value}</span>
  </div>
);