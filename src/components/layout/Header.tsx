import { LogIn, LogOut, Zap } from "lucide-react";
import { useAuth } from "@/src/lib/AuthContext";
import { motion } from "motion/react";

export function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header className="h-20 glass border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Survival Command Center
          <span className="text-slate-500 text-sm font-normal">— CS Finals</span>
        </h1>
        <p className="text-xs text-slate-500">Next exam: Discrete Maths • tomorrow, 09:00 AM</p>
      </div>

      <div className="flex gap-6 items-center">
        <div className="hidden md:flex flex-col items-end">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Survival Time Remaining</p>
          <p className="text-2xl font-black text-brand-rose font-mono tracking-tighter glow-purple tabular-nums">
            14:42:09
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={logout} className="btn-ghost flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          ) : (
            <button onClick={login} className="btn-primary">
              <LogIn className="w-4 h-4" /> Register Identity
            </button>
          )}
          <button className="btn-primary bg-brand-cyan text-black px-6">
            <Zap className="w-4 h-4 fill-current" /> Optimize Plan
          </button>
        </div>
      </div>
    </header>
  );
}
