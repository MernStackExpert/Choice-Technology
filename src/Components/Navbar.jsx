"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Wrench, Briefcase, Mail } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => twMerge(clsx(inputs));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "About", href: "about", icon: <Briefcase size={18} /> },
    { name: "Services", href: "services", icon: <Wrench size={18} /> },
    { name: "Contact", href: "contact", icon: <Mail size={18} /> },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-black/20 backdrop-blur-md border-b border-white/5" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-30 h-10 transition-transform group-hover:scale-110">
            <Image
              src="/choice-logo.png"
              alt="Choice Tech Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors flex items-center gap-2"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/start-us" className="btn btn-primary btn-sm rounded-full px-6 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            Start US
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-lg font-medium text-slate-300"
                >
                  <span className="text-primary">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              <Link href="/start-us" className="btn btn-primary w-full">Start Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;