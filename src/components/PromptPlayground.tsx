import { useState } from "react";
import { ArrowRight, Copy, Check, Sparkles, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EXAMPLES = [
  "Write a blog post about AI",
  "Email to my boss asking for time off",
  "Help me code a todo app",
];

const improvePrompt = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return "";
  return `# Role
You are a senior expert tasked with producing high-quality output for the following request.

# Objective
${trimmed.charAt(0).toUpperCase() + trimmed.slice(1)}.

# Context
- Target audience: specify who will read or use this
- Tone: clear, confident, and professional
- Format: well-structured with headings, short paragraphs, and bullet points where helpful

# Requirements
1. Begin with a concise summary of the main idea.
2. Provide 3–5 key points, each with a brief justification or example.
3. Anticipate likely follow-up questions and address them proactively.
4. Avoid filler, repetition, and vague generalities.

# Output
Return the final response in Markdown. If uncertain about any detail, state assumptions explicitly before proceeding.`;
};

const PromptPlayground = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImprove = () => {
    if (!input.trim()) {
      toast.error("Write something to improve first");
      return;
    }
    setLoading(true);
    setOutput("");
    setTimeout(() => {
      setOutput(improvePrompt(input));
      setLoading(false);
    }, 900);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Prompt copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-5">
            <Wand2 className="w-3.5 h-3.5 text-primary" />
            Try it free — no signup
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Paste a rough prompt. <span className="text-gradient">Get magic back.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our engine rewrites your input with structure, clarity, and context so any LLM delivers its best work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your prompt</span>
              <span className="text-xs text-muted-foreground font-mono">{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Write a cold email to investors about my startup..."
              className="w-full h-64 bg-transparent resize-none outline-none placeholder:text-muted-foreground/60 text-foreground font-mono text-sm leading-relaxed"
            />
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setInput(ex)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5 shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Improved prompt
              </span>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
            <div className="h-64 overflow-auto">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-sm">Improving your prompt…</span>
                </div>
              ) : output ? (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground/90 animate-fade-up">
                  {output}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground/60 text-sm text-center px-6">
                  Your structured, production-ready prompt will appear here.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="hero" size="xl" onClick={handleImprove} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Working magic
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Improve my prompt
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromptPlayground;
