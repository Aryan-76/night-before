import { useState } from "react";
import { motion } from "motion/react";
import { Search, Download, ThumbsUp, Eye, FileText, Filter, Upload, Zap } from "lucide-react";
import { cn } from "@/src/lib/utils";

const subjects = [
  "All", "Computer Networks", "Operating Systems", "Discrete Maths", "DBMS", "Software Engineering"
];

const mockResources = [
  { id: 1, name: "OS_Emergency_Review_v2.pdf", subject: "Operating Systems", views: 1204, likes: 85, size: "1.2 MB", type: "Note" },
  { id: 2, name: "Networking_Final_PYQ_2024.pdf", subject: "Computer Networks", views: 3400, likes: 210, size: "3.4 MB", type: "PYQ" },
  { id: 3, name: "Database_Normalisation_CheatSheet.pdf", subject: "DBMS", views: 890, likes: 45, size: "850 KB", type: "Note" },
  { id: 4, name: "Maths_Probability_Handwritten.pdf", subject: "Discrete Maths", views: 2100, likes: 120, size: "5.1 MB", type: "Note" },
  { id: 5, name: "SE_SDLC_Diagrams.png", subject: "Software Engineering", views: 450, likes: 32, size: "2.1 MB", type: "Diagram" },
];

export function NotesPYQ() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockResources.filter(r => 
    (selectedSubject === "All" || r.subject === selectedSubject) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-display font-black text-white uppercase tracking-tight">RESOURCE ARCHIVE</h2>
          <p className="text-zinc-500">Crowdsourced survival material. Verified by survivors.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-ghost border border-white/10 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Upload className="w-4 h-4" /> Share Notes
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Search & Categories */}
        <div className="md:w-64 space-y-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search resource..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue transition-all"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Subjects</h3>
            <div className="space-y-1">
              {subjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all",
                    selectedSubject === s ? "bg-brand-blue text-white font-bold" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((res, i) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card group cursor-pointer border-white/5 hover:border-brand-blue/30"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-brand-blue/10 rounded-xl">
                  <FileText className="w-6 h-6 text-brand-blue" />
                </div>
                <div className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-zinc-500 uppercase">{res.type}</div>
              </div>

              <div className="space-y-1 mb-6">
                <h4 className="font-bold text-white group-hover:text-brand-blue transition-colors line-clamp-1">{res.name}</h4>
                <p className="text-xs text-brand-purple font-medium">{res.subject}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {res.views}</span>
                  <span className="flex items-center gap-1 text-brand-purple"><ThumbsUp className="w-3 h-3" /> {res.likes}</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-600">{res.size}</div>
              </div>

              <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="btn-primary py-2 px-4 text-xs flex items-center gap-2">
                   <Download className="w-3 h-3" /> Download
                </div>
              </div>
            </motion.div>
          ))}
          
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <Zap className="w-12 h-12 text-zinc-700 mx-auto" />
              <p className="text-zinc-500 italic">No resources found. Be the first to upload for this subject!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

