import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What does Promptify actually do?",
    a: "Promptify takes a rough, unstructured prompt and rewrites it with clear role, goal, constraints, and output format — the patterns that make LLMs respond dramatically better.",
  },
  {
    q: "Which AI models does it work with?",
    a: "Any of them. The improved prompts are model-agnostic and work great with ChatGPT, Claude, Gemini, Mistral, Llama, and any other LLM.",
  },
  {
    q: "Do you store my prompts?",
    a: "No. Free-tier prompts are processed in memory and discarded. Pro users can optionally save to their private library — you always stay in control.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Of course. One click in settings, no questions asked, no pro-rated nonsense.",
  },
  {
    q: "Is there an API?",
    a: "Yes — Pro and Team plans include API access so you can integrate Promptify into your own apps and workflows.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Frequently <span className="text-gradient">asked</span>
          </h2>
          <p className="text-muted-foreground text-lg">Everything you wanted to know.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass rounded-2xl px-5 border-none">
              <AccordionTrigger className="font-display font-semibold text-left hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
