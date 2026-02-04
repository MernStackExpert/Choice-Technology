"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Wrench, Briefcase, Mail, Zap } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ArsheBrandLogo from "@/Shared/ArsheBrandLogo";

const cn = (...inputs) => twMerge(clsx(inputs));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      closeMenu();
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "About", href: "/about", icon: <Briefcase size={18} /> },
    { name: "Services", href: "/services", icon: <Wrench size={18} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={18} /> },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-5 px-4",
        scrolled || isOpen 
          ? "bg-black/40 backdrop-blur-xl border-b border-white/5" 
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group relative z-[110]">
          {/* <div className="relative w-70 h-20  transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/main-logo-removebg.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div> */}
          <ArsheBrandLogo/>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-all duration-300 hover:text-cyan-400",
                pathname === link.href ? "text-cyan-400" : "text-slate-300"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/start-us" 
            className="group relative flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-black text-sm transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <Zap size={14} className="fill-current" />
            START US
          </Link>
        </div>

        <button
          className="md:hidden relative z-[110] p-2 text-white transition-transform active:scale-90 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-[#050505]/95 backdrop-blur-2xl md:hidden z-[105]"
          >
            <div className="flex flex-col justify-center h-full p-10 gap-8">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">Navigation</p>
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center gap-5 text-4xl font-black transition-colors",
                        pathname === link.href ? "text-cyan-400" : "text-white hover:text-cyan-400"
                      )}
                    >
                      <span className="text-sm font-mono text-gray-600">0{i + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Link 
                  href="/start-us" 
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-cyan-400 text-black font-black text-xl rounded-2xl shadow-lg shadow-cyan-500/20"
                >
                  <Zap size={24} className="fill-current" />
                  START US NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;