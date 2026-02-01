import ManageStartupRequests from "@/Components/ADMIN/ADMIN_PAGES/ManageStartupRequests/ManageStartupRequests";

export const metadata = {
  title: "Startup Protocol | Admin Mainframe",
  description: "Monitor and authorize new startup node requests within the Choice Technology ecosystem.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StartupRequestsPage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Neural Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-cyan-500/5 blur-[150px] -z-10 rounded-full animate-pulse" />
      
      {/* Section Header for Admin Context */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-6">
        <div className="flex items-center gap-3 text-gray-500 mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Mainframe</span>
          <div className="w-1 h-1 rounded-full bg-cyan-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500/50">Startup_Queue</span>
        </div>
      </div>

      {/* Main Component Content */}
      <ManageStartupRequests />
      
      {/* Bottom Security Banner */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-10">
        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-between">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
            All requests are end-to-end encrypted. <br />
            Authorization grants instant access to the <span className="text-cyan-500">Startup_Matrix</span>.
          </p>
          <div className="hidden md:flex gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500/20 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-cyan-500/20 animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-blue-500/20 animate-pulse delay-150" />
          </div>
        </div>
      </div>
    </div>
  );
}