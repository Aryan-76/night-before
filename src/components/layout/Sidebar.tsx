import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { AlertCircle, LayoutDashboard, BookOpen, Clock, Users, Zap, User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/lib/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Panic Mode", path: "/panic", icon: AlertCircle, highlight: true },
  { name: "AI Assistant", path: "/assistant", icon: Zap },
  { name: "Focus Mode", path: "/focus", icon: Clock },
  { name: "Notes & PYQ", path: "/notes", icon: BookOpen },
  { name: "Community Wiki", path: "/community", icon: Users },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside className="w-64 h-screen glass border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-50">
      <Link to="/" className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-cyan to-brand-purple rounded-lg flex items-center justify-center font-extrabold text-white shadow-lg shadow-brand-cyan/20">
          NB
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">
          NIGHT<span className="text-brand-cyan italic">BEFORE</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                isActive 
                  ? "bg-white/10 text-brand-cyan neon-border-cyan" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-transform group-hover:scale-110",
                isActive ? "text-brand-cyan" : "text-slate-500",
                item.highlight && isActive && "animate-pulse"
              )} />
              <span className="uppercase tracking-wider text-[11px] font-bold">
                {item.name}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-brand-indigo to-brand-rose flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-white">
              {user?.displayName || "Guest Survivor"}
            </p>
            <p className="text-xs text-slate-500">
              Level {user ? "4" : "0"} Survivor
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
