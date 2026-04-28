import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="relative glass rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-elegant">
          <div className="absolute inset-0 bg-hero opacity-80 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-float" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">
              Stop prompting.
              <br />
              <span className="text-gradient">Start promptifying.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of creators, engineers, and founders who ship better work with Promptify.
            </p>
            <Button variant="hero" size="xl" className="animate-pulse-glow" asChild>
              <a href="#playground">
                <Sparkles className="w-5 h-5" />
                Try Promptify free
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-5">No credit card. No signup wall. Just magic.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
