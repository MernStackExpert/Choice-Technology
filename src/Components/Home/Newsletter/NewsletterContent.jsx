"use client";

import React from "react";
import { motion } from "framer-motion";
import {  Mail} from "lucide-react";
import ContactForm from "@/Shared/ContactForm";

export default function NewsletterContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Side: Text Content */}
      <div className="space-y-8 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Ready to Start Your <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
              Digital Journey?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0 font-light">
            Have a project in mind or just want to say hi? Feel free to reach
            out. I&apos;m always open to discussing new ideas and
            high-performance solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col gap-4 items-center lg:items-start"
        >
          <div className="group flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500 group-hover:text-black transition-colors">
              <Mail size={20} />
            </div>
            <span className="text-sm font-semibold tracking-wide">
              hello@choicetech.com
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Professional Contact Form */}
      <ContactForm/>
    </div>
  );
}
