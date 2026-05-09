import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Clock, Book, Brain, ShieldAlert, Zap, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

import { gemini } from "@/src/services/gemini";

export function PanicMode() {
  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState(12);
  const [prepLevel, setPrepLevel] = useState(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const startAnalysis = async () => {
    setIsGenerating(true);
    setStep(2);
    try {
      const result = await gemini.generateStudyPlan(subject, hours, prepLevel);
      if (result) {
        setRoadmap(result);
        setStep(3);
      } else {
        throw new Error("No result");
      }
    } catch (e) {
      console.error(e);
      // Fallback
      setRoadmap({
        probability: Math.min(prepLevel + (hours * 2), 95),
        strategy: "Focus strictly on PYQs from the last 3 years and Unit 1 & 2.",
        milestones: [{ time: "Hour 1", task: "Review UNIT 1", priority: "High" }],
        warnings: ["Don't panic."]
      });
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-rose/10 rounded-2xl flex items-center justify-center mx-auto border border-brand-rose/20 shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]">
                <AlertTriangle className="w-8 h-8 text-brand-rose animate-pulse" />
              </div>
              <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter italic">PANIC PROTOCOL</h2>
              <p className="text-slate-400 font-medium">Diagnostic requested. Define your current threat level.</p>
            </div>

            <div className="glass p-8 rounded-3xl space-y-8 border border-white/5 hover:border-brand-rose/20 transition-all duration-500">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Subject of Concern</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Theoretical Computer Science, Quant Finance..."
                  className="w-full bg-slate-900/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-rose transition-all placeholder:text-slate-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Hours to Extraction</label>
                  <div className="flex items-center gap-6">
                    <input 
                      type="range" 
                      min="1" 
                      max="48" 
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value))}
                      className="flex-1 accent-brand-cyan"
                    />
                    <span className="text-2xl font-mono text-white font-black w-14 tabular-nums tracking-tighter">{hours}H</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Current Readiness</label>
                  <div className="flex items-center gap-6">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={prepLevel}
                      onChange={(e) => setPrepLevel(parseInt(e.target.value))}
                      className="flex-1 accent-brand-indigo"
                    />
                    <span className="text-2xl font-mono text-white font-black w-14 tabular-nums tracking-tighter">{prepLevel}%</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!subject}
                className="btn-primary w-full py-5 text-base font-black flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale tracking-widest"
              >
                GENERATE SURVIVAL ROADMAP <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-10 py-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brand-cyan/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative z-10 w-24 h-24 mx-auto flex items-center justify-center">
                <Loader2 className="w-20 h-20 text-brand-cyan animate-spin" />
                <Brain className="absolute w-8 h-8 text-brand-cyan/50" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-display font-black italic tracking-tighter text-white">OPTIMIZING TRAJECTORY...</h3>
              <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">Cross-referencing 10Y PYQ trends for {subject}</p>
            </div>
            
            {!isGenerating && (
              <motion.button 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={startAnalysis}
                className="btn-primary px-10 py-4 font-black"
              >
                RE-SYNC ENGINE
              </motion.button>
            )}
          </motion.div>
        )}

        {step === 3 && roadmap && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 flex flex-col gap-6">
                <div className="glass p-8 rounded-[2rem] border-l-4 border-l-brand-cyan glow-cyan space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Tactical Assessment</h3>
                      <h2 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase">{subject} Plan</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Pass Index</div>
                      <div className={cn(
                        "text-5xl font-black mono tracking-tighter italic",
                        roadmap.probability > 70 ? "text-brand-cyan" : roadmap.probability > 40 ? "text-brand-indigo" : "text-brand-rose"
                      )}>
                        {roadmap.probability}%
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 italic text-slate-300 text-sm leading-relaxed font-medium">
                    <span className="text-brand-cyan font-black mr-2 uppercase tracking-widest not-italic text-[10px]">Strategy:</span>
                    {roadmap.strategy}
                  </div>

                  <div className="space-y-4">
                    {roadmap.milestones.map((m: any, i: number) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex gap-6 p-5 glass rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all group"
                      >
                        <div className="mono text-brand-cyan font-black text-base italic w-16 group-hover:scale-110 transition-transform">{m.time}</div>
                        <div className="flex-1">
                          <div className="text-slate-100 font-bold text-base leading-snug">{m.task}</div>
                          <div className="flex items-center gap-3 mt-2">
                             <div className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-slate-500">Priority: {m.priority}</div>
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-lg shadow-brand-cyan/50 animate-pulse" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="glass p-6 rounded-3xl border-l-4 border-l-brand-rose glow-purple space-y-6">
                  <div className="flex items-center gap-2 text-brand-rose font-black text-xs uppercase tracking-widest">
                    <ShieldAlert className="w-4 h-4" /> Threat Warnings
                  </div>
                  <ul className="space-y-4 px-1">
                    {roadmap.warnings.map((w: string, i: number) => (
                      <li key={i} className="text-xs text-slate-400 flex gap-3 font-medium leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose mt-1 flex-shrink-0" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass p-8 rounded-3xl text-center space-y-6 group hover:border-brand-purple/30 transition-all border border-transparent">
                  <div className="p-4 bg-brand-purple/10 rounded-2xl w-fit mx-auto">
                    <Brain className="w-8 h-8 text-brand-purple group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-black text-white text-sm uppercase tracking-widest italic group-hover:text-brand-purple transition-colors">Cognitive Assist</div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Stuck on a specific module? Our AI handles complexity while you focus on recall.</p>
                  </div>
                  <button className="btn-primary w-full py-3 text-xs bg-brand-purple shadow-brand-purple/20 font-black">Init. Assistant</button>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-8 pt-8">
              <button onClick={() => setStep(1)} className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                Abort & Refresh Protocol
              </button>
              <button className="flex items-center gap-2 text-brand-cyan hover:scale-105 transition-all text-[10px] font-black uppercase tracking-[0.2em] bg-brand-cyan/10 px-6 py-2 rounded-lg border border-brand-cyan/20">
                <Book className="w-3 h-3" /> Export PDF Log
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

