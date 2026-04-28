const LOGOS = ["ChatGPT", "Claude", "Gemini", "Mistral", "Llama", "Grok", "DeepSeek", "Perplexity"];

const Marquee = () => {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="relative py-12 overflow-hidden border-y border-border">
      <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold">
        Optimized for every model
      </div>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
      >
        {row.map((l, i) => (
          <span key={i} className="font-display text-2xl md:text-3xl font-semibold text-muted-foreground/60 hover:text-foreground transition-colors">
            {l}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Marquee;
