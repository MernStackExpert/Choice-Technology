"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Loader2, Search, Trash2, Eye, Clock, User, 
  MessageSquare, FilterX, X, CheckCircle, 
  Layers, Zap, Globe, Mail
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ArchiveMessages() {
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchArchiveData = useCallback(async () => {
    try {
      setLoading(true);
      const [contactRes, startupRes] = await Promise.all([
        axiosInstance.get("/contact"),
        axiosInstance.get("/startus")
      ]);

      const activeContacts = (contactRes.data?.result || [])
        .filter(msg => msg.status === "active")
        .map(item => ({ ...item, origin: "contact" }));

      const activeStartups = (startupRes.data?.result || [])
        .filter(req => req.status === "active")
        .map(item => ({ ...item, origin: "startup" }));

      setCombinedData([...activeContacts, ...activeStartups].sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
      ));
    } catch (error) {
      toast.error("Failed to sync archive mainframe");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArchiveData();
  }, [fetchArchiveData]);

  const deleteArchiveItem = async (id, origin) => {
    try {
      const endpoint = origin === "contact" ? `/contact/${id}` : `/startus/${id}`;
      const res = await axiosInstance.delete(endpoint);
      if (res.data) {
        toast.success("Record permanently deleted from archive");
        setCombinedData(prev => prev.filter(item => item._id !== id));
      }
    } catch (error) {
      toast.error("Purge failed");
    }
  };

  const filteredArchive = useMemo(() => {
    return combinedData.filter(item => {
      const matchesSearch = 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.plan?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === "all" ? true : item.origin === filterType;
      
      return matchesSearch && matchesFilter;
    });
  }, [combinedData, searchTerm, filterType]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto relative z-10 text-white pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md">
            <CheckCircle size={12} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
              {filteredArchive.length} Archived_Authorized_Signals
            </span>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Neural_Archive</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <select 
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-cyan-500/50 cursor-pointer"
          >
            <option value="all" className="bg-black">All_Origins</option>
            <option value="contact" className="bg-black">Contact_Logs</option>
            <option value="startup" className="bg-black">Startup_Nodes</option>
          </select>
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="SEARCH ARCHIVE..."
              className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/40 transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-32 flex justify-center">
            <Loader2 className="animate-spin text-cyan-500" size={40} />
          </div>
        ) : filteredArchive.length > 0 ? (
          filteredArchive.map((item) => (
            <motion.div 
              layout
              key={item._id}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.05] transition-all group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform group-hover:rotate-6 ${item.origin === 'startup' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                    {item.origin === 'startup' ? <Zap size={24} /> : <Mail size={24} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">{item.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedItem(item)} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-all cursor-pointer"><Eye size={16} /></button>
                  <button onClick={() => deleteArchiveItem(item._id, item.origin)} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer"><Trash2 size={16} /></button>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5">
                    Origin: {item.origin}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle size={10} /> Resolved
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/5">
                  {item.message || item.description}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center flex flex-col items-center gap-4 text-gray-700">
            <FilterX size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Archive is empty in this frequency</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative p-10 md:p-14">
              <button onClick={() => setSelectedItem(null)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-2xl hover:text-rose-500 transition-all cursor-pointer"><X size={20}/></button>
              
              <div className="space-y-10">
                <div className="space-y-2">
                  <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em]">Resolved_Payload</p>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">{selectedItem.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-1">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Network_Address</p>
                    <p className="text-sm font-bold truncate">{selectedItem.email}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-1">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Signal_Origin</p>
                    <p className="text-sm font-bold uppercase">{selectedItem.origin}</p>
                  </div>
                </div>

                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 italic">Resolution_Content</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{selectedItem.message || selectedItem.description}</p>
                </div>

                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-gray-700">
                  <div className="flex items-center gap-2"><Clock size={12}/> Last Sync: {new Date(selectedItem.updatedAt).toLocaleString()}</div>
                  <div className="text-emerald-500/50">Status: Archive_Stored</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}