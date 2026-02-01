"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Loader2, Search, Trash2, Eye, Clock, User, 
  MapPin, Phone, Globe, Briefcase, Layout, 
  CheckCircle, ShieldCheck, X, FilterX
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageStartupRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReq, setSelectedReq] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/startus");
      if (res.data?.result) {
        const pendingOnly = res.data.result.filter(req => req.status === "pending");
        setRequests(pendingOnly);
      }
    } catch (error) {
      toast.error("Failed to sync neural startup requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const updateStatus = async (id) => {
    try {
      setActionLoading(true);
      const res = await axiosInstance.patch(`/startus/${id}`, { status: "active" });
      if (res.data) {
        toast.success("Startup link established: ACTIVE");
        setRequests(prev => prev.filter(req => req._id !== id));
        setSelectedReq(null);
      }
    } catch (error) {
      toast.error("Status update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    try {
      const res = await axiosInstance.delete(`/startus/${id}`);
      if (res.data) {
        toast.success("Request purged from mainframe");
        setRequests(prev => prev.filter(req => req._id !== id));
      }
    } catch (error) {
      toast.error("Purge failed");
    }
  };

  const filtered = useMemo(() => {
    return requests.filter(req => 
      req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.plan?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10 text-white pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md">
            <Clock size={12} className="text-cyan-500 animate-pulse" />
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
              {filtered.length} Pending_Startup_Nodes
            </span>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Startup_Protocol</h2>
        </div>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="SEARCH BY NAME / EMAIL / PLAN..."
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
        ) : filtered.length > 0 ? (
          filtered.map((req) => (
            <motion.div 
              layout
              key={req._id}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.05] transition-all group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">{req.name}</h4>
                    <p className="text-[10px] text-cyan-500/50 font-mono mt-1 italic">{req.plan}_PLAN</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(req._id)} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all cursor-pointer"><CheckCircle size={16}/></button>
                  <button onClick={() => setSelectedReq(req)} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-all cursor-pointer"><Eye size={16}/></button>
                  <button onClick={() => deleteRequest(req._id)} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer"><Trash2 size={16}/></button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-black"><User size={12}/> {req.experience}</div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-black"><MapPin size={12}/> {req.location}</div>
              </div>
              <p className="mt-4 text-xs text-gray-500 line-clamp-1 italic">"{req.description}"</p>
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
                <span>{new Date(req.submittedAt).toDateString()}</span>
                <span className="text-cyan-500/30">Node_Pending</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center flex flex-col items-center gap-4">
            <FilterX className="text-gray-800 animate-pulse" size={48} />
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Zero neural startup signals detected</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedReq && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] w-full max-w-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-10 md:p-14 space-y-10">
                <div className="flex justify-between items-start">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 border border-cyan-500/20"><User size={32}/></div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">{selectedReq.name}</h3>
                      <p className="text-xs text-cyan-500/70 font-mono mt-1">{selectedReq.email}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedReq(null)} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:text-rose-500 transition-all cursor-pointer"><X size={20}/></button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <DetailItem icon={<Phone size={14}/>} label="Neural_Line" value={selectedReq.phone}/>
                  <DetailItem icon={<Globe size={14}/>} label="Digital_Node" value={selectedReq.website}/>
                  <DetailItem icon={<Briefcase size={14}/>} label="Skill_Level" value={selectedReq.experience}/>
                  <DetailItem icon={<Layout size={14}/>} label="Selected_Plan" value={selectedReq.plan}/>
                  <DetailItem icon={<MapPin size={14}/>} label="Grid_Sector" value={selectedReq.location}/>
                  <DetailItem icon={<CheckCircle size={14}/>} label="Social_Link" value={selectedReq.facebook}/>
                </div>

                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Core_Objective</p>
                  <p className="text-sm text-gray-300 leading-relaxed font-medium italic">"{selectedReq.description}"</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                  <button 
                    onClick={() => updateStatus(selectedReq._id)}
                    disabled={actionLoading}
                    className="w-full sm:w-auto px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
                  >
                    {actionLoading ? <Loader2 className="animate-spin" size={16}/> : <ShieldCheck size={16}/>} Establish_Connection
                  </button>
                  <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">Payload_Received: {new Date(selectedReq.submittedAt).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DetailItem = ({ icon, label, value }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-gray-600 uppercase text-[8px] font-black tracking-widest">{icon} {label}</div>
    <p className="text-[11px] font-bold text-white truncate">{value}</p>
  </div>
);