import React from "react";
import NewsletterContent from "./NewsletterContent";

export default function Newsletter() {
  return (
    <section id="contact" className="relative z-10 py-24 px-4 md:px-6 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <NewsletterContent />
      </div>
    </section>
  );
}