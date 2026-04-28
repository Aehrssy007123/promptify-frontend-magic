import Counter from "@/components/Counter";

const stats = [
  { end: 142, suffix: "K+", label: "Prompts improved" },
  { end: 38, suffix: "x", label: "Better outputs", decimals: 0 },
  { end: 12, suffix: "+", label: "LLMs supported" },
  { end: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
];

const Stats = () => {
  return (
    <section className="relative py-16 px-6 border-y border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-1 group-hover:scale-110 transition-transform duration-300">
                <Counter end={s.end} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
