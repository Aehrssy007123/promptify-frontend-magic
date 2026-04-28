import { Sparkles, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </span>
            <span className="text-gradient">Promptify</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:border-primary/40 transition-colors">
              <Twitter className="w-4 h-4 text-muted-foreground" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:border-primary/40 transition-colors">
              <Github className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground/70 mt-8">
          © {new Date().getFullYear()} Promptify. Crafted with ✨ for prompters.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
