"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Quote, MoveRight } from 'lucide-react'

export const MotivationalSectionContent = () => {
  const quotes = [
    {
      text: "The only way to do great work is to love what you do. Stay hungry, stay foolish.",
      author: "Steve Jobs",
      category: "Vision"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Persistence"
    },
    {
      text: "Your work is going to fill a large part of your life, the only way to be satisfied is great work.",
      author: "Steve Jobs",
      category: "Focus"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {quotes.map((quote, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          className="relative group p-8 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-2xl overflow-hidden transition-all"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          
          <Quote className="text-blue-500/40 mb-6 group-hover:text-blue-400 group-hover:rotate-12 transition-all" size={32} />
          
          <p className="text-gray-200 text-xl font-semibold leading-snug mb-10 min-h-[100px]">
            "{quote.text}"
          </p>
          
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{quote.category}</span>
              <span className="text-white font-bold text-sm tracking-wide">— {quote.author}</span>
            </div>
            <div className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-white group-hover:bg-blue-600 transition-all">
              <MoveRight size={16} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}