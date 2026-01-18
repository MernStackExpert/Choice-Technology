import React from "react";
import NewsletterContent from "./NewsletterContent";

export default function Newsletter() {
  return (
    <section id="contact" className="relative z-10 py-24 px-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <NewsletterContent />
      </div>
    </section>
  );
}