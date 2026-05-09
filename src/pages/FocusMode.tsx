import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Coffee, Zap, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function FocusMode() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      // Switch between focus and break
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      {/* Immersive Background */}
      <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
        <div className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isActive ? "opacity-20" : "opacity-10"
        )}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/30 blur-[150px] rounded-full animate-pulse-slow" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 px-4 py-1 glass rounded-full border border-white/5 w-fit mx-auto text-xs font-bold text-zinc-500 uppercase tracking-widest">
            {isBreak ? <Coffee className="w-3 h-3 text-emerald-500" /> : <Zap className="w-3 h-3 text-brand-blue" />}
            {isBreak ? "Break Mode" : "Focus Session"}
          </div>
          <h2 className="text-[120px] font-display font-black tracking-tighter text-white tabular-nums leading-none">
            {formatTime(timeLeft)}
          </h2>
          <p className="text-zinc-500 font-medium">Keep your phone away. The exam is approaching.</p>
        </div>

        <div className="flex items-center justify-center gap-8">
          <button 
            onClick={resetTimer}
            className="p-4 glass rounded-full border-white/5 hover:bg-white/10 transition-all text-zinc-400"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button 
            onClick={toggleTimer}
            className={cn(
              "p-8 rounded-full transition-all scale-110 shadow-2xl",
              isActive ? "bg-white/10 text-white border border-white/20" : "bg-brand-blue text-white shadow-brand-blue/20"
            )}
          >
            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>

          <button 
            onClick={() => setIsAudioOn(!isAudioOn)}
            className="p-4 glass rounded-full border-white/5 hover:bg-white/10 transition-all text-zinc-400"
          >
            {isAudioOn ? <Volume2 className="w-6 h-6 text-brand-cyan" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 text-left space-y-1">
            <div className="text-[10px] font-bold text-zinc-500 uppercase">Current Goal</div>
            <div className="text-sm font-medium text-white truncate">OS Paging Concepts</div>
          </div>
          <div className="glass-card p-4 text-left space-y-1">
            <div className="text-[10px] font-bold text-zinc-500 uppercase">Focus Points</div>
            <div className="text-sm font-medium text-brand-purple">+12 XP</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Productivity Quotes */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-12 text-zinc-600 text-xs font-mono uppercase tracking-widest italic"
          >
            "Quiet people have the loudest minds." — Stephen Hawking
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

