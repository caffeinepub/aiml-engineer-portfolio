import { Brain, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="relative border-t border-border/50 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Brain size={14} className="text-primary" />
          <span className="font-display font-semibold gradient-text">
            Alex Chen
          </span>
          <span>— AIML Engineer</span>
        </div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-muted-foreground text-center flex items-center gap-1"
        >
          © {year}. Built with{" "}
          <Heart
            size={12}
            className="text-red-400 inline animate-pulse"
            aria-hidden="true"
          />{" "}
          using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors underline-offset-2 hover:underline"
          >
            caffeine.ai
          </a>
        </motion.p>

        {/* Nav */}
        <div className="flex gap-4 text-xs text-muted-foreground">
          {["about", "projects", "contact"].map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => {
                document
                  .getElementById(s)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="capitalize hover:text-primary transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
