import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveDemo from "@/components/LiveDemo";

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-hero">
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-[hsl(var(--accent-cyan))]/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8 animate-fade-up">
          <Zap className="w-3.5 h-3.5 text-primary" />
          Powered by advanced prompt engineering
          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
          <span className="text-foreground">v2.0 just shipped</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          Turn rough ideas into
          <br />
          <span className="text-gradient">powerful AI prompts.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          Promptify rewrites your half-formed thoughts into precise, high-performing prompts for ChatGPT, Claude, Gemini, and any LLM you use.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
          <Button variant="hero" size="xl" asChild>
            <a href="#playground">
              <Sparkles className="w-5 h-5" />
              Try Promptify free
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <a href="#features">See how it works</a>
          </Button>
        </div>

        <LiveDemo />
      </div>
    </section>
  );
};

export default Hero;
