"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Loader2, Mail, Search, Trash2, Eye, 
  Clock, User, MessageSquare, FilterX, 
  X, CheckCircle, ShieldCheck, RefreshCcw
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function ManageContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMessages = useCallback(async (isManual = false) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/contact");
      if (res.data?.result) {
        const pendingOnly = res.data.result.filter(msg => msg.status === "pending");
        setMessages(pendingOnly);
        if (isManual) toast.success("Neural signals synchronized");
      }
    } catch (error) {
      toast.error("Failed to sync communications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateStatus = async (id) => {
    const confirm = await Swal.fire({
      title: "Authorize Resolution?",
      text: "This signal will be marked as active and resolved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#374151",
      confirmButtonText: "YES, AUTHORIZE",
      background: "#0a0a0a",
      color: "#fff"
    });

    if (confirm.isConfirmed) {
      try {
        setActionLoading(true);
        const res = await axiosInstance.patch(`/contact/${id}`, { status: "active" });
        if (res.data) {
          toast.success("Signal updated to ACTIVE");
          setMessages(prev => prev.filter(msg => msg._id !== id));
          setSelectedMessage(null);
        }
      } catch (error) {
        toast.error("Status update failed");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const deleteMessage = async (id) => {
    const confirm = await Swal.fire({
      title: "Purge Signal?",
      text: "This transmission will be permanently erased from the matrix.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "YES, PURGE",
      background: "#0a0a0a",
      color: "#fff"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/contact/${id}`);
        if (res.data) {
          toast.success("Message purged from database");
          setMessages(prev => prev.filter(msg => msg._id !== id));
        }
      } catch (error) {
        toast.error("Deletion failed");
      }
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter(msg => 
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10 text-white pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md">
              <Clock size={12} className="text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
                {filteredMessages.length} Pending_Inquiries_Detected
              </span>
            </div>
            <button 
              onClick={() => fetchMessages(true)}
              disabled={loading}
              className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-all active:scale-90 disabled:opacity-50 cursor-pointer"
              title="Sync Signals"
            >
              <RefreshCcw size={16} className={`${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Comm_Link</h2>
        </div>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="SEARCH BY NAME / EMAIL / SUBJECT..."
            className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/40 transition-all shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-32 flex justify-center">
            <Loader2 className="animate-spin text-cyan-500" size={40} />
          </div>
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <motion.div 
              layout
              key={msg._id}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start gap-4 relative z-10">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">{msg.name}</h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">{msg.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(msg._id)}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all cursor-pointer"
                    title="Mark as Active"
                  >
                    <CheckCircle size={16} />
                  </button>
                  <button 
                    onClick={() => setSelectedMessage(msg)}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-all cursor-pointer"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => deleteMessage(msg._id)}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-8 space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-cyan-500/50" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subject: {msg.subject}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/5 font-medium">
                  {msg.message}
                </p>
                <div className="flex justify-between items-center pt-4 text-[9px] font-black uppercase tracking-widest text-gray-600">
                  <span className="flex items-center gap-1.5"><Clock size={10}/> {new Date(msg.sendAt).toLocaleString()}</span>
                  <span className="text-cyan-500/50">Status: {msg.status}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center flex flex-col items-center gap-4">
            <FilterX className="text-gray-800 animate-pulse" size={48} />
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Zero neural signals found in current frequency</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              <div className="p-8 md:p-12 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2">Neural_Transmission</h3>
                    <p className="text-2xl font-black uppercase tracking-tighter">{selectedMessage.subject}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedMessage(null)}
                    className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-rose-500/20 hover:text-rose-500 transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-white/5 rounded-[2rem] border border-white/5">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Origin_Identity</p>
                      <p className="text-sm font-bold">{selectedMessage.name}</p>
                      <p className="text-xs text-cyan-500/70 font-mono">{selectedMessage.email}</p>
                    </div>
                  </div>

                  <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 relative">
                    <MessageSquare className="absolute top-6 right-8 text-white/5" size={40} />
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4">Core_Message</p>
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                  <button
                    onClick={() => updateStatus(selectedMessage._id)}
                    disabled={actionLoading}
                    className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                  >
                    {actionLoading ? <Loader2 className="animate-spin" size={14} /> : <ShieldCheck size={14} />} 
                    Authorize_Resolution
                  </button>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                    Sent: {new Date(selectedMessage.sendAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}