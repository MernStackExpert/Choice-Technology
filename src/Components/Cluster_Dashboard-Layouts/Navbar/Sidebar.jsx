"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingBag, CreditCard, 
  Settings, LogOut, Menu, X, ArrowLeftFromLine, 
  Users, Wallet, FileText, ChevronDown 
} from "lucide-react";
import { AuthContext } from "@/Provider/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const { dbUser, signOutUser } = useContext(AuthContext);

  const role = dbUser?.data?.role || "user";

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const sharedLinks = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/my-cluster/dashboard" },
  ];

  const userLinks = [
    { 
      name: "Orders", 
      icon: <ShoppingBag size={20} />, 
      children: [
        { name: "Add Order", path: "/my-cluster/order" },
        { name: "My Orders", path: "/my-cluster/dashboard/my-order" },
        { name: "Active-Node", path: "/my-cluster/dashboard/active-nodes" },
        { name: "Order History", path: "/my-cluster/dashboard/order-history" }
      ]
    },
    { name: "Urgent Payments", icon: <CreditCard size={20} />, path: "/my-cluster/dashboard/urgent-payments" },
  ];

  const adminLinks = [
    { name: "Manage Users", icon: <Users size={20} />, path: "/my-cluster/dashboard/all-users" },
    { 
      name: "Node Control", 
      icon: <FileText size={20} />, 
      children: [
        { name: "All Orders", path: "/my-cluster/dashboard/all-orders" },
        { name: "Active Nodes", path: "/my-cluster/dashboard/active-nodes" },
        { name: "Terminated", path: "/my-cluster/dashboard/cancelled-orders" }
      ]
    },
    { name: "Requests", icon: <Wallet size={20} />, path: "/my-cluster/dashboard/all-requests" },
  ];

  const menuItems = [
    ...sharedLinks,
    ...(role === "admin" ? adminLinks : userLinks),
    { name: "Settings", icon: <Settings size={20} />, path: "/my-cluster/dashboard/settings" },
    { name: "EXIT-HOME", icon: <ArrowLeftFromLine size={20} />, path: "/my-cluster" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-5 left-4 z-60 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-[70] w-64 border-r border-cyan-500/10 backdrop-blur-3xl bg-black/40 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full p-6 text-white relative">
          <button onClick={() => setIsOpen(false)} className="lg:hidden absolute top-6 right-6 text-cyan-400 cursor-pointer"><X size={20} /></button>

          <div className="mb-10 px-4">
            <h2 className="text-xl font-black tracking-tighter text-cyan-400 uppercase">Choice Tech.</h2>
            <p className="text-[10px] font-mono text-cyan-500/50 mt-1 uppercase tracking-widest">{role} Portal</p>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button 
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center justify-between w-full gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/5 text-gray-400 hover:text-white cursor-pointer`}
                    >
                      <div className="flex items-center gap-4">
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : ""}`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${openDropdown === item.name ? "max-h-40 mt-2 ml-4 border-l border-cyan-500/20" : "max-h-0"}`}>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.path}
                          onClick={() => setIsOpen(false)}
                          className={`block px-8 py-2 text-xs font-medium transition-colors ${pathname === child.path ? "text-cyan-400" : "text-gray-500 hover:text-white"}`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${pathname === item.path ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto border-t border-cyan-500/10 pt-6">
            <button onClick={signOutUser} className="flex items-center gap-4 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer">
              <LogOut size={20} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;