"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2, Trash2, ShieldCheck, Mail, Eye, Search, Filter, ChevronLeft, ChevronRight, Users } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ManageUsersController() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/auth/user?email=${searchTerm.toLowerCase()}&page=${currentPage}&limit=${limit}`
      );
      setUsers(res.data.result);
      setTotalPages(res.data.totalPages);
      setTotalUsers(res.data.totalUsers);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleUpdateRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await axiosInstance.patch(`/auth/user/admin/${id}`, { role: newRole });
      toast.success(`Role changed to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Role update failed");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/auth/user/${id}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    if (statusFilter === "submitted") return user.onForm === true;
    if (statusFilter === "unsubmitted") return user.onForm === false;
    return true;
  });

  if (loading && users.length === 0) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-cyan-500" />
    </div>
  );

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Manage Users</h2>
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.3em]">Neural Network Citizens</p>
            </div>
            <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                <Users size={14} className="text-cyan-400" />
                <span className="text-[10px] font-black text-white tracking-widest">{totalUsers} TOTAL</span>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative group w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="SEARCH BY EMAIL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="relative group w-full sm:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0a0a0a]">ALL USERS</option>
              <option value="submitted" className="bg-[#0a0a0a]">SUBMITTED</option>
              <option value="unsubmitted" className="bg-[#0a0a0a]">UNSUBMITTED</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-3xl">
        <table className="w-full text-left border-collapse text-nowrap">
          <thead>
            <tr className="border-b border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="px-6 py-6">User Profile</th>
              <th className="px-6 py-6">Current Role</th>
              <th className="px-6 py-6">OnForm Status</th>
              <th className="px-6 py-6 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="bg-transparent hover:bg-white/[0.01]">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-2xl object-cover border border-white/10" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">{user.name}</span>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1 lowercase"><Mail size={10} /> {user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${user.role === 'admin' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${user.onForm ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'}`}></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{user.onForm ? "SUBMITTED" : "UNSUBMITTED"}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/my-cluster/dashboard/admin/users/${user.firebaseUid}`} className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl">
                      <Eye size={18} />
                    </Link>
                    <button onClick={() => handleUpdateRole(user._id, user.role)} className={`p-2 rounded-xl cursor-pointer ${user.role === 'admin' ? 'hover:bg-gray-500/20 text-gray-400' : 'hover:bg-cyan-500/20 text-cyan-400'}`}>
                      <ShieldCheck size={18} />
                    </button>
                    <button onClick={() => handleDeleteUser(user._id)} className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-xl cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              Showing Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
              >
                  <ChevronLeft size={16} />
              </button>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
              >
                  <ChevronRight size={16} />
              </button>
          </div>
      </div>
    </div>
  );
}