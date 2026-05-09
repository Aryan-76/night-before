import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Zap, Brain, MessageSquare, Sparkles, Loader2, User, Paperclip, X, FileText } from "lucide-react";
import { gemini } from "@/src/services/gemini";
import ReactMarkdown from "react-markdown";
import { cn } from "@/src/lib/utils";

interface Message {
  role: "user" | "ai";
  content: string;
  attachmentName?: string;
}

export function StudyAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hey! I'm your NIGHTBEFORE survival assistant. Stuck on a concept? Just ask. You can even upload your notes (PDF/Images) and I'll extract flashcards, formulas, and important questions for you." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Max 10MB allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedFile({
        data: event.target?.result as string,
        mimeType: file.type,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const userMessage = input.trim() || (selectedFile ? `Analyze this document: ${selectedFile.name}` : "");
    const attachment = selectedFile;
    
    setInput("");
    setSelectedFile(null);
    setMessages((prev) => [...prev, { 
      role: "user", 
      content: userMessage,
      attachmentName: attachment?.name 
    }]);
    setIsLoading(true);

    try {
      const response = await gemini.askDoubt(userMessage, attachment ? {
        data: attachment.data,
        mimeType: attachment.mimeType
      } : undefined);
      setMessages((prev) => [...prev, { role: "ai", content: response || "Sorry, I lost my train of thought. Can you ask again?" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Error processing your request. The document might be too complex or there's a connection issue." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 h-[calc(100vh-120px)] flex flex-col pt-8 space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-purple/10 rounded-2xl border border-brand-purple/20 shadow-lg shadow-brand-purple/5">
            <Brain className="w-6 h-6 text-brand-purple" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-black text-white italic tracking-tighter uppercase">AI SURVIVAL ASSIST</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Tactical Cognitive Engine</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-brand-cyan/5 rounded-full border border-brand-cyan/10">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-[9px] font-black text-brand-cyan uppercase tracking-widest">Systems Online</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-8 px-2 custom-scrollbar pb-8"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-5 max-w-[90%] md:max-w-[80%]",
                m.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg",
                m.role === "user" ? "bg-slate-800 border border-white/5" : "bg-brand-purple/10 border border-brand-purple/20"
              )}>
                {m.role === "user" ? <User className="w-4 h-4 text-slate-400" /> : <Sparkles className="w-4 h-4 text-brand-purple" />}
              </div>
              <div className="flex flex-col gap-2">
                {m.attachmentName && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 w-fit ml-auto">
                    <FileText className="w-3.5 h-3.5 text-brand-cyan" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.attachmentName}</span>
                  </div>
                )}
                <div className={cn(
                  "p-5 rounded-2xl text-[13px] leading-relaxed font-medium shadow-xl",
                  m.role === "user" 
                    ? "bg-slate-800 border border-white/10 rounded-tr-none text-white selection:bg-brand-cyan/30" 
                    : "glass border-white/5 rounded-tl-none text-slate-300 italic"
                )}>
                  <div className="markdown-body">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5">
            <div className="w-9 h-9 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shadow-lg">
              <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />
            </div>
            <div className="p-5 glass rounded-2xl rounded-tl-none border-white/5 italic text-slate-500 text-xs font-bold uppercase tracking-widest">
              Synthesizing response...
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-transparent border-t border-white/5">
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/20 rounded-xl px-4 py-2 w-fit"
          >
            <FileText className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-bold text-slate-200">{selectedFile.name}</span>
            <button 
              onClick={() => setSelectedFile(null)}
              className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-3 h-3 text-slate-400" />
            </button>
          </motion.div>
        )}
        
        <div className="relative glass rounded-3xl border-white/10 p-2 focus-within:border-brand-purple/30 focus-within:glow-purple transition-all duration-300">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder={selectedFile ? "Ask a specific question about this document..." : "Explain 'Virtual Memory' like I'm 5..."}
            className="w-full bg-transparent border-none focus:ring-0 text-white p-4 text-sm min-h-[70px] resize-none font-medium placeholder:text-slate-600"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex gap-2">
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,image/*"
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-all active:scale-95"
                title="Attach PDF or Image"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <div className="text-[9px] text-slate-600 font-black uppercase tracking-widest self-center ml-2">PDF / IMAGES ALLOWED</div>
            </div>
            
            <button 
              onClick={handleSend}
              disabled={(!input.trim() && !selectedFile) || isLoading}
              className="p-3 bg-brand-cyan rounded-2xl text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-brand-cyan/20"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

