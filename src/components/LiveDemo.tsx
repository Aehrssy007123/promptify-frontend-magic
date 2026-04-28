import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const PAIRS = [
  {
    before: "write about productivity",
    after: "Act as a productivity coach for remote engineers. Write a 600-word guide with 5 actionable tactics, concrete examples, and a closing reflection prompt.",
  },
  {
    before: "make me a logo",
    after: "You are a senior brand designer. Propose 3 logo directions for a fintech app called Vaulta — each with concept, color palette (hex), typography, and mood keywords.",
  },
  {
    before: "help with my resume",
    after: "Act as a FAANG recruiter. Review this resume, highlight 3 strengths, 3 gaps, and rewrite the summary for a Senior PM role with quantifiable impact.",
  },
  {
    before: "code a login page",
    after: "Build a React + TypeScript login page with email/password, validation, loading states, accessible labels, and Tailwind styling. Return a single component file.",
  },
];

const LiveDemo = () => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "next">("typing");

  useEffect(() => {
    const target = PAIRS[idx].after;
    if (phase === "typing") {
      if (typed.length < target.length) {
        const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 18);
        return () => clearTimeout(t);
      }
      setPhase("pause");
    } else if (phase === "pause") {
      const t = setTimeout(() => setPhase("next"), 2200);
      return () => clearTimeout(t);
    } else {
      setTyped("");
      setIdx((i) => (i + 1) % PAIRS.length);
      setPhase("typing");
    }
  }, [typed, phase, idx]);

  const pair = PAIRS[idx];

  return (
    <div className="relative max-w-4xl mx-auto mt-16 animate-fade-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
      <div className="glass rounded-2xl p-6 md:p-8 shadow-elegant">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-2">promptify.live</span>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="rounded-xl bg-secondary/50 p-4 border border-border min-h-[120px]">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Before</div>
            <p className="font-mono text-sm text-muted-foreground line-through decoration-destructive/50">
              {pair.before}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
              <ArrowRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-[hsl(var(--accent-pink))]/10 p-4 border border-primary/30 min-h-[120px]">
            <div className="text-[10px] uppercase tracking-widest mb-2 font-semibold flex items-center gap-1.5 text-primary">
              <Sparkles className="w-3 h-3" /> After
            </div>
            <p className="font-mono text-sm text-foreground/90 leading-relaxed">
              {typed}
              <span className="inline-block w-1.5 h-4 bg-primary align-middle ml-0.5" style={{ animation: "blink 1s steps(2) infinite" }} />
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-6">
          {PAIRS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setTyped(""); setPhase("typing"); }}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gradient-primary" : "w-1.5 bg-border hover:bg-muted-foreground"}`}
              aria-label={`Show example ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
