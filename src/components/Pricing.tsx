import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying Promptify.",
    features: ["20 improvements / day", "All core templates", "Copy & export", "Community support"],
    cta: "Start free",
    variant: "glass" as const,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For creators, devs & writers.",
    features: ["Unlimited improvements", "Advanced prompt chains", "Prompt library & history", "Priority AI models", "Export to any tool"],
    cta: "Go Pro",
    variant: "hero" as const,
    featured: true,
  },
  {
    name: "Team",
    price: "$39",
    period: "/month",
    description: "Collaborate across your org.",
    features: ["Everything in Pro", "Shared team library", "Role-based access", "SSO & audit logs", "Dedicated support"],
    cta: "Contact sales",
    variant: "glass" as const,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient">fair pricing.</span>
          </h2>
          <p className="text-muted-foreground text-lg">Start free. Upgrade when you're hooked.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                t.featured ? "border-primary/50 shadow-glow ring-1 ring-primary/30" : ""
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-glow">
                  Most popular
                </div>
              )}
              <h3 className="font-display font-semibold text-xl mb-1">{t.name}</h3>
              <p className="text-muted-foreground text-sm mb-5">{t.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                <span className="text-muted-foreground text-sm">{t.period}</span>
              </div>
              <Button variant={t.variant} className="w-full mb-6" size="lg">
                {t.cta}
              </Button>
              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
