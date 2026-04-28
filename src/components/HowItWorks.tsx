import { useState } from "react";
import { PenLine, Wand2, Copy } from "lucide-react";

const STEPS = [
  {
    icon: PenLine,
    title: "Write it messy",
    description: "Type whatever comes to mind. Rough, vague, half-baked — we don't judge.",
    preview: "write a post about ai for beginners",
  },
  {
    icon: Wand2,
    title: "Promptify it",
    description: "One click. Our engine adds role, context, constraints, and format in under a second.",
    preview: "# Role\nSenior technical writer...\n# Objective\nProduce a 700-word beginner post...",
  },
  {
    icon: Copy,
    title: "Ship the result",
    description: "Paste into any LLM. Watch the quality explode. Save it. Reuse it. Repeat.",
    preview: "✓ Copied to clipboard\n→ Ready for ChatGPT, Claude, Gemini...",
  },
];

const HowItWorks = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Three steps to <span className="text-gradient">a better brain.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left glass rounded-2xl p-5 transition-all duration-300 ${
                  active === i
                    ? "border-primary/50 shadow-glow scale-[1.02]"
                    : "hover:border-primary/30 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    active === i ? "bg-gradient-primary shadow-glow" : "bg-secondary"
                  }`}>
                    <s.icon className={`w-5 h-5 ${active === i ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                      <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 shadow-elegant min-h-[320px] relative overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-destructive/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
              Step 0{active + 1}
            </div>
            <pre
              key={active}
              className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground/90"
              style={{ animation: "fade-up 0.5s ease-out" }}
            >
              {STEPS[active].preview}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
