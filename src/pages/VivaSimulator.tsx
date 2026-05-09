import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MessageSquare, Brain, ArrowRight, Play, CheckCircle2, RotateCcw } from "lucide-react";
import { gemini } from "@/src/services/gemini";

export function VivaSimulator() {
  const [subject, setSubject] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const startviva = async () => {
    if (!subject.trim()) return;
    setIsLoading(true);
    try {
      const qs = await gemini.generateVivaQuestions(subject);
      setQuestions(qs);
      setIsStarted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setIsStarted(false);
      setSubject("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center space-y-8"
          >
            <div className="w-20 h-20 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto border border-brand-cyan/30">
              <Mic className="w-10 h-10 text-brand-cyan" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-display font-black text-white">VIVA SIMULATOR</h2>
              <p className="text-zinc-500 max-w-md mx-auto">Practice with our strict AI examiner before the real thing. No mercy, just results.</p>
            </div>

            <div className="glass-card max-w-md mx-auto p-8 space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Enter Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Microprocessors, Jurisprudence..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
                />
              </div>
              <button 
                onClick={startviva}
                disabled={isLoading || !subject}
                className="btn-primary w-full py-4 text-lg bg-brand-cyan shadow-brand-cyan/20 flex items-center justify-center gap-2"
              >
                {isLoading ? "Preparing Examiner..." : "Enter Chamber"} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="exam"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">SESSION RECORDING</span>
              </div>
              <div className="text-sm font-mono text-white font-bold">Question {currentIndex + 1} / {questions.length}</div>
            </div>

            <div className="glass-card p-12 space-y-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-cyan" />
              
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-3xl md:text-4xl font-display font-black text-white italic">
                  "{questions[currentIndex]?.question}"
                </h3>
                
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-6 bg-brand-cyan/10 rounded-2xl border border-brand-cyan/20"
                    >
                      <div className="text-xs font-bold text-brand-cyan uppercase mb-2">Ideal Answer (Model Analysis)</div>
                      <p className="text-zinc-300 leading-relaxed italic">{questions[currentIndex]?.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 pt-12">
                <button 
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="btn-ghost border border-white/10 flex-1 py-4 flex items-center justify-center gap-2"
                >
                  <Brain className="w-5 h-5 text-brand-purple" /> {showAnswer ? "Hide Answer" : "See Model Answer"}
                </button>
                <button 
                  onClick={nextQuestion}
                  className="btn-primary bg-brand-cyan flex-1 py-4 flex items-center justify-center gap-2"
                >
                  Next Question <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => { setIsStarted(false); setSubject(""); }}
                className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-3 h-3" /> Terminate Simulation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

