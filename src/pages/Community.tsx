import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Zap, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, updateDoc, doc, increment } from "firebase/firestore";
import { useAuth } from "@/src/lib/AuthContext";

interface CommunityTip {
  id: string;
  authorName: string;
  authorId: string;
  content: string;
  votes: number;
  tags: string[];
  createdAt: any;
}

export function Community() {
  const [tips, setTips] = useState<CommunityTip[]>([]);
  const [newTip, setNewTip] = useState("");
  const { user, login } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "discussions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tipsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommunityTip[];
      setTips(tipsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "discussions");
    });

    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (!newTip.trim()) return;
    if (!user) {
      login();
      return;
    }

    try {
      await addDoc(collection(db, "discussions"), {
        content: newTip,
        authorId: user.uid,
        authorName: user.displayName || "Survivor",
        tags: ["#NightBefore"],
        votes: 0,
        upvotes: 0,
        downvotes: 0,
        createdAt: serverTimestamp()
      });
      setNewTip("");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "discussions");
    }
  };

  const handleVote = async (tipId: string, delta: number) => {
    if (!user) return;
    const tipRef = doc(db, "discussions", tipId);
    try {
      await updateDoc(tipRef, {
        votes: increment(delta)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `discussions/${tipId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-display font-black text-white">SURVIVOR HUB</h2>
          <p className="text-zinc-500 font-medium tracking-tight">Real insights from students in the trenches.</p>
        </div>
        <div className="hidden md:flex -space-x-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030303] bg-zinc-800" />
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-[#030303] bg-brand-blue flex items-center justify-center text-[10px] font-bold text-white z-10">
            +52k
          </div>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4 border-brand-blue/20">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-5 h-5 text-brand-blue" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Share a survival tip</span>
        </div>
        <textarea 
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
          placeholder={user ? "What's the trick to passing tomorrow?" : "Login to share your survival tips..."}
          disabled={!user}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-blue transition-all min-h-[100px] resize-none disabled:opacity-50"
        />
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-zinc-600 font-mono italic">Keep it anonymous if you're sharing leaks.</div>
          {user ? (
            <button 
              onClick={handlePost}
              disabled={!newTip.trim()}
              className="btn-primary py-2 px-6 flex items-center gap-2 text-sm disabled:opacity-50"
            >
              Post Tip <Plus className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={login} className="btn-primary py-2 px-6 text-sm">Login to Post</button>
          )}
        </div>
      </div>

      <div className="space-y-6 pb-20">
        <AnimatePresence>
          {tips.map((tip, i) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card hover:border-white/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[10px] font-bold text-zinc-400 uppercase">
                    {tip.authorName?.[0] || 'S'}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{tip.authorName}</div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">
                      {tip.createdAt?.seconds ? new Date(tip.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                    </div>
                  </div>
                </div>
                <button className="text-zinc-600 hover:text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <p className="text-zinc-300 leading-relaxed mb-6 font-light">
                {tip.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tip.tags?.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleVote(tip.id, 1)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group/btn"
                  >
                    <ThumbsUp className="w-4 h-4 text-zinc-500 group-hover/btn:text-brand-blue" />
                    <span className="text-xs font-bold text-zinc-400 group-hover/btn:text-white">{tip.votes || 0}</span>
                  </button>
                  <button 
                    onClick={() => handleVote(tip.id, -1)}
                    className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all group/btn"
                  >
                    <ThumbsDown className="w-4 h-4 text-zinc-500 group-hover/btn:text-brand-red" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" /> Discussion
                  </button>
                  <button className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

