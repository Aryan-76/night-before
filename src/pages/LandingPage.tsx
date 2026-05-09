import { motion, useScroll, useTransform } from "motion/react";
import { AlertCircle, Zap, BookOpen, Clock, Users, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/src/lib/utils";

const features = [
  {
    title: "AI Panic Mode",
    description: "Generate a custom survival roadmap when you have less than 24 hours left.",
    icon: AlertCircle,
    color: "from-red-500 to-orange-500",
    link: "/panic"
  },
  {
    title: "Pass Probability",
    description: "Honest analytics on your chances of passing based on syllabus covered.",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    link: "/dashboard"
  },
  {
    title: "Emergency Summaries",
    description: "10-page notes condensed into 1-page high-impact survival sheets.",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    link: "/assistant"
  }
];

export function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-5xl mx-auto text-center space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-white/5 w-fit mx-auto text-[10px] font-bold uppercase tracking-widest text-slate-500"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
            Verified by 50,000+ academic survivors
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-9xl font-display font-black tracking-tighter leading-[0.85] text-white italic"
            >
              DRIVE YOUR <br />
              <span className="gradient-text not-italic">SURVIVAL.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              The AI platform built for the final 12 hours. Pure tactical insights to guarantee you clear the pass mark.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="btn-primary text-base px-10 py-4 h-14 flex items-center gap-3">
              Initiate Protocol <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-ghost text-base px-10 py-4 h-14">
              View Archive
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-full h-full max-w-4xl overflow-hidden pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/40 via-brand-indigo/40 to-transparent blur-[120px] rounded-full animate-pulse-slow" />
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl group relative overflow-hidden border border-white/5 hover:border-brand-cyan/20 transition-all duration-500"
            >
              <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 -z-10 bg-gradient-to-br", feature.color)} />
              <div className="p-3 bg-white/5 rounded-2xl w-fit mb-6">
                <feature.icon className="w-8 h-8 text-brand-cyan group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-black text-slate-500 group-hover:text-brand-cyan transition-colors cursor-pointer uppercase tracking-widest">
                Deploy module <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Critical Hours", value: "1.2M+" },
            { label: "Successful Pass", value: "850K+" },
            { label: "Survival Rate", value: "98.2%" },
            { label: "Panic Voids", value: "Infinite" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-4xl font-display font-black text-white mono tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            “NIGHTBEFORE saved my degree. I started at 2 AM for a 9 AM final. <span className="text-brand-cyan italic">I passed with a B.</span>”
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800" />
            <div className="text-left">
              <div className="font-bold text-white">Alex Chen</div>
              <div className="text-sm text-zinc-500 font-light italic">Engineering Student, SOS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-4 bg-gradient-to-b from-transparent to-brand-blue/5">
        <div className="max-w-xl mx-auto text-center space-y-8 glass p-12 rounded-[2rem] border-white/10">
          <h2 className="text-4xl font-display font-bold">Ready to survive?</h2>
          <p className="text-zinc-400">Stop panicking. Start studying. The night is young.</p>
          <button className="btn-primary w-full py-4 text-xl">Get Started for Free</button>
        </div>
      </section>

      <footer className="py-20 px-4 border-t border-white/5 text-center text-zinc-600 text-sm font-medium tracking-widest uppercase">
        &copy; 2026 NIGHTBEFORE AI — Academic Survival Division
      </footer>
    </div>
  );
}

