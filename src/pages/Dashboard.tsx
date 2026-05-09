import { motion } from "motion/react";
import { AlertCircle, Clock, Zap, Target, TrendingUp, Calendar, ArrowRight, Brain } from "lucide-react";
import { cn } from "@/src/lib/utils";

const stats = [
  { label: "Survival Score", value: "68", unit: "/100", icon: Target, color: "text-brand-cyan", glow: "glow-cyan" },
  { label: "Hours Studied", value: "4.5", unit: "h", icon: Clock, color: "text-brand-purple", glow: "glow-purple" },
  { label: "Syllabus Covered", value: "32", unit: "%", icon: TrendingUp, color: "text-brand-indigo", glow: "" },
];

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-8 py-8 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">COMMAND HUB</h2>
          <p className="text-slate-500 font-medium text-sm">Targeting <span className="text-brand-cyan font-bold italic">Discrete Maths</span> survival.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 glass rounded-lg border-l-3 border-brand-rose">
            <span className="text-[10px] block font-bold text-slate-500 uppercase">Panic Level</span>
            <span className="text-sm font-bold text-brand-rose italic">Critical Response Required</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={cn("glass p-8 rounded-2xl flex items-center gap-6 border-b-2", stat.glow, "border-b-transparent hover:border-b-" + stat.color.split('-')[2])}>
            <div className={cn("p-4 rounded-xl bg-white/5 border border-white/5", stat.color)}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white mono tracking-tighter">{stat.value}</span>
                <span className="text-sm font-bold text-slate-500">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Survival Plan */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass rounded-2xl overflow-hidden neon-border-cyan">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h3 className="font-bold text-xs tracking-widest flex items-center gap-2 uppercase">
                <Calendar className="w-4 h-4 text-brand-cyan" /> Optimized Roadmap
              </h3>
              <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded font-bold">AI GENERATED</span>
            </div>
            <div className="p-6 space-y-4">
              {[
                { time: "22:00", task: "Finish Paging & Segmentation", status: "completed" },
                { time: "23:30", task: "Solve 2023 PYQ - Section B", status: "current" },
                { time: "01:00", task: "Review Deadlocks & Semaphores", status: "pending" },
              ].map((item, i) => (
                <div key={i} className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all",
                  item.status === "current" ? "bg-brand-cyan/5 border-brand-cyan/30 scale-[1.01] shadow-lg shadow-brand-cyan/5" : "bg-white/[0.01] border-white/5 opacity-50"
                )}>
                  <div className="mono text-[10px] font-bold text-slate-500 w-12">{item.time}</div>
                  <div className="flex-1 font-semibold text-sm text-slate-200">{item.task}</div>
                  {item.status === "current" && <div className="text-[10px] font-black text-brand-cyan animate-pulse uppercase tracking-widest px-2 py-1 bg-brand-cyan/10 rounded">Active</div>}
                </div>
              ))}
            </div>
            <div className="p-6 bg-white/[0.02] border-t border-white/5">
              <button className="text-brand-cyan text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                Full Strategy Roadmap <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-2xl border-l-4 border-l-brand-red glow-purple">
              <h3 className="text-xs font-bold flex items-center gap-2 mb-4 text-brand-red uppercase tracking-widest">
                <AlertCircle className="w-4 h-4" /> Panic Pressure
              </h3>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-red"
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-600 uppercase tracking-tighter mono">
                <span>Chill</span>
                <span className="text-brand-red">Overwhelmed</span>
              </div>
              <p className="mt-4 text-xs text-slate-400 italic leading-relaxed font-medium">
                "Pressure is high. You have 3 critical topics left. Switch to 'Formula Focus' mode immediately for better retention."
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border-l-4 border-l-brand-indigo">
              <h3 className="text-xs font-bold flex items-center gap-2 mb-4 text-brand-indigo uppercase tracking-widest">
                <Brain className="w-4 h-4" /> AI Diagnostics
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-brand-indigo/5 rounded-xl border border-brand-indigo/10 text-[11px] text-slate-300 font-medium">
                  Weakness detected in <span className="text-brand-indigo font-bold">Semaphores</span>. Recommendation: Review unit 2 visualizers.
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-400">
                  Attendance mark risk (45%). High priority for Internal compensation.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass rounded-3xl p-8 flex flex-col items-center text-center glow-cyan border border-brand-cyan/20 relative overflow-hidden group">
            <Zap className="absolute -right-8 -bottom-8 w-32 h-32 text-brand-cyan/5 group-hover:scale-110 transition-transform duration-700" />
            <span className="text-brand-cyan text-[10px] uppercase font-black tracking-[0.2em] mb-6 block relative z-10">Pass Engine</span>
            <div className="relative w-40 h-40 flex items-center justify-center z-10">
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#1e293b" strokeWidth="10" />
                <motion.circle 
                  cx="80" cy="80" r="70" fill="none" stroke="url(#dash-grad)" strokeWidth="10" 
                  strokeDasharray="440" 
                  initial={{ strokeDashoffset: 440 }}
                  animate={{ strokeDashoffset: 158 }}
                  strokeLinecap="round" 
                />
              </svg>
              <defs>
                <linearGradient id="dash-grad">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white italic">64%</span>
                <span className="text-[10px] text-slate-500 uppercase font-black">Score</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-6 leading-relaxed relative z-10 px-2 font-medium">
              Complete <span className="text-white font-bold">Virtual Memory</span> tonight to boost probability to <span className="text-brand-cyan font-bold italic">82%</span>.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-[10px] tracking-widest uppercase text-slate-500 flex items-center justify-between">
              RESOURCE VAULT <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded">3 NEW</span>
            </h3>
            {[
              { name: "OS_Emergency_Review.pdf", size: "1.2 MB", accent: "text-brand-cyan" },
              { name: "Networking_Formulas.pdf", size: "850 KB", accent: "text-brand-purple" },
              { name: "PYQ_2024_Solved.pdf", size: "2.4 MB", accent: "text-brand-indigo" },
            ].map((note, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <Zap className={cn("w-4 h-4", note.accent)} />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-200 truncate">{note.name}</div>
                    <div className="text-[10px] text-slate-500 mono">{note.size}</div>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-3 border border-white/5 rounded-xl text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              Access Full Archive
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

