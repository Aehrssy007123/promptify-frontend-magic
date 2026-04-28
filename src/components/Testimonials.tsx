import { useState } from "react";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "My ChatGPT outputs went from meh to magnificent. Promptify is basically cheat mode for AI.",
    name: "Maya Chen",
    role: "Product Designer, Figma",
    avatar: "M",
    color: "from-primary to-[hsl(var(--accent-pink))]",
  },
  {
    quote: "I stopped writing prompts manually weeks ago. The structure it adds is exactly what LLMs need.",
    name: "Dev Okafor",
    role: "Staff Engineer, Stripe",
    avatar: "D",
    color: "from-[hsl(var(--accent-cyan))] to-primary",
  },
  {
    quote: "Our whole team uses Promptify before sending anything to Claude. Quality jumped overnight.",
    name: "Sara Lindqvist",
    role: "Head of Content, Notion",
    avatar: "S",
    color: "from-[hsl(var(--accent-pink))] to-[hsl(var(--accent-cyan))]",
  },
  {
    quote: "Saved me hours of prompt wrangling. It just… gets it. Feels like pair-programming with an expert.",
    name: "Jon Park",
    role: "Indie hacker",
    avatar: "J",
    color: "from-primary to-[hsl(var(--accent-cyan))]",
  },
  {
    quote: "The copy my team ships has never been sharper. I won't use an LLM without this in front of it.",
    name: "Priya Sharma",
    role: "Marketing Lead, Linear",
    avatar: "P",
    color: "from-[hsl(var(--accent-pink))] to-primary",
  },
  {
    quote: "A tiny tool that made a massive difference in my workflow. Zero learning curve, instant wins.",
    name: "Tomás Reyes",
    role: "Founder, Playlab",
    avatar: "T",
    color: "from-[hsl(var(--accent-cyan))] to-[hsl(var(--accent-pink))]",
  },
];

const Testimonials = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="aurora opacity-30" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="text-gradient">prompt nerds.</span>
          </h2>
          <div className="flex items-center justify-center gap-1 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="ml-2 text-muted-foreground text-sm">4.9 / 5 from 2,400+ users</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`glass rounded-2xl p-6 transition-all duration-500 hover-lift cursor-default ${
                hovered !== null && hovered !== i ? "opacity-60 scale-[0.98]" : "opacity-100"
              }`}
            >
              <Quote className="w-7 h-7 text-primary/40 mb-3" />
              <p className="text-foreground/90 leading-relaxed mb-5 text-sm">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-display font-bold text-primary-foreground`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
