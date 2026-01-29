import React from 'react'
import { Sparkles } from 'lucide-react'
import { MotivationalSectionContent } from './MotivationalSectionContent'

const MotivationalSection = () => {
  return (
    <section className="relative py-24 w-full overflow-hidden bg-transparent">
      {/* Dynamic Background Blur Layers */}
      <div className="absolute top-0 -left-10 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 -right-10 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles size={14} />
            <span>Inspiration</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            FUEL YOUR <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">MIND</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Beyond the code and the pixels lies the drive that keeps us creating.
          </p>
        </div>

        <MotivationalSectionContent />
      </div>
    </section>
  )
}

export default MotivationalSection