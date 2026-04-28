import { Brain, Target, Layers, Zap, Shield, GitBranch } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Context-aware rewrites",
    description: "We analyze your intent and inject the missing structure — role, goal, constraints, and output format.",
  },
  {
    icon: Target,
    title: "Built for any model",
    description: "Optimized templates for GPT-4, Claude 3.5, Gemini, and open-source models. One input, perfect output everywhere.",
  },
  {
    icon: Layers,
    title: "Chain of thought",
    description: "Automatically adds step-by-step reasoning instructions so complex tasks get handled with care.",
  },
  {
    icon: Zap,
    title: "Instant results",
    description: "Sub-second rewrites. Paste, click, ship. No more staring at a blank prompt box.",
  },
  {
    icon: Shield,
    title: "Privacy first",
    description: "Your prompts are never stored or used for training. What you type stays yours — always.",
  },
  {
    icon: GitBranch,
    title: "Version & iterate",
    description: "Save, compare, and refine. Build a library of killer prompts you can reuse across every project.",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything you need to <span className="text-gradient">prompt like a pro.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stop wrestling with vague outputs. Promptify handles the engineering so you focus on the thinking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
