"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Zap, Clock, Shield } from "lucide-react";
import ContactForm from "@/Shared/ContactForm";

const contactInfo = [
  {
    icon: <Mail className="text-cyan-400" />,
    label: "Official Email",
    value: "info@choichteck.com",
    color: "#22d3ee"
  },
  {
    icon: <Phone className="text-purple-500" />,
    label: "Direct Call",
    value: "+880 1XXX-XXXXXX",
    color: "#a855f7"
  },
  {
    icon: <MapPin className="text-green-400" />,
    label: "Headquarters",
    value: "Rajshahi, Bangladesh",
    color: "#4ade80"
  }
];

const faqs = [
  {
    q: "How fast can you start my project?",
    a: "We usually initiate the discovery phase within 24-48 hours of the first contact."
  },
  {
    q: "Do you offer technical partnership?",
    a: "Yes, we collaborate as tech equity partners for innovative and scalable startups."
  },
  {
    q: "What is included in the $5 plan?",
    a: "It includes premium hosting, domain management, SSL, and monthly maintenance."
  }
];

export default function ContactClient() {
  return (
    <section className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Contact Choice Technology
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white mb-8"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <MessageSquare className="text-cyan-500" /> Agency Inquiries
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Whether you're looking for a bespoke MERN stack solution, a $5/month managed subscription, 
                or a long-term technical partnership, we are ready to scale your vision.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center gap-6"
                >
                  <div className="p-4 rounded-2xl bg-white/5" style={{ color: info.color }}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-[2rem] border border-cyan-500/20 bg-cyan-500/5">
              <h4 className="text-white font-bold mb-4">Why Choice Technology?</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-300"><Zap size={16} className="text-cyan-400"/> Rapid Development Cycle</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Shield size={16} className="text-purple-400"/> Enterprise Grade Security</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Clock size={16} className="text-green-400"/> 24/7 Managed Support</li>
              </ul>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            {/* Reusable Contact Form Component */}
            <ContactForm />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
              <h5 className="text-white font-bold mb-3">{faq.q}</h5>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full h-[450px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58139.66759714853!2d88.5561084!3d24.3746497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefd0a5519577%3A0xaf3a04462ee9c0d!2sRajshahi!5e0!3m2!1sen!2sbd!4v1716200000000!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}