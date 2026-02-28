import { ArrowDown, Download, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import NeuralCanvas from "./NeuralCanvas";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const TAGLINE =
  "Building intelligent systems that learn, adapt, and transform the world.";

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const typeIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const typeChar = () => {
      if (typeIndexRef.current < TAGLINE.length) {
        setDisplayedText(TAGLINE.slice(0, typeIndexRef.current + 1));
        typeIndexRef.current++;
        timeoutRef.current = setTimeout(typeChar, 38);
      } else {
        setTypingDone(true);
      }
    };

    timeoutRef.current = setTimeout(typeChar, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Neural Canvas — parallax */}
      <motion.div className="absolute inset-0" style={{ y: canvasY }}>
        <NeuralCanvas />
      </motion.div>

      {/* Multi-layer atmosphere */}
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,oklch(var(--background)/0.6)_70%,oklch(var(--background))_100%)]" />
      {/* Bottom fade for scroll continuity */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      {/* Scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)",
          backgroundSize: "100% 3px",
        }}
      />
      {/* Corner accent glows */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Content — parallax + fade on scroll */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
          style={{
            background: "oklch(var(--primary) / 0.07)",
            border: "1px solid oklch(var(--primary) / 0.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground tracking-wide">
            Available for opportunities
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Name — two-line cinematic treatment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 relative"
        >
          {/* Decorative horizontal rules */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
            <span className="font-mono text-[10px] text-primary/60 tracking-[0.3em] uppercase">
              Portfolio
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <h1 className="font-display font-extrabold tracking-tighter leading-[0.9]">
            {/* "Alex" — large, gradient */}
            <span
              className="block text-6xl sm:text-8xl md:text-[7rem] gradient-text"
              style={{ letterSpacing: "-0.04em" }}
            >
              Alex
            </span>
            {/* "Chen" — outlined stroke treatment */}
            <span
              className="block text-6xl sm:text-8xl md:text-[7rem] text-transparent"
              style={{
                WebkitTextStroke: "2px oklch(var(--primary) / 0.6)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Chen
            </span>
          </h1>
        </motion.div>

        {/* Title with flanking lines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-primary/50 to-primary/80" />
          <span className="font-mono text-sm sm:text-base text-primary font-semibold tracking-[0.2em] uppercase">
            AIML Engineer
          </span>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-primary/50 to-primary/80" />
        </motion.div>

        {/* Tagline (typewriter) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed min-h-[3rem] font-light"
        >
          {displayedText}
          {!typingDone && (
            <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-blink align-middle" />
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => onNavigate("projects")}
            className="group relative px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "oklch(var(--primary))",
              color: "oklch(var(--primary-foreground))",
              boxShadow: "0 0 0 0 oklch(var(--primary) / 0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px oklch(var(--primary) / 0.5), 0 0 48px oklch(var(--primary) / 0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 0 0 oklch(var(--primary) / 0)";
            }}
          >
            {/* Inner shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center gap-2">
              <Sparkles size={15} />
              View Projects
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={() => onNavigate("resume")}
            className="group px-8 py-3.5 rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{
              borderColor: "oklch(var(--primary) / 0.35)",
              color: "oklch(var(--primary))",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(var(--primary) / 0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "oklch(var(--primary) / 0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "oklch(var(--primary) / 0.35)";
            }}
          >
            <Download size={15} />
            Download Resume
          </button>
        </motion.div>

        {/* Stats row — anchored with dividers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="inline-flex items-center gap-0 rounded-2xl overflow-hidden"
          style={{
            background: "oklch(var(--card) / 0.5)",
            border: "1px solid oklch(var(--primary) / 0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          {[
            { value: "6+", label: "Projects" },
            { value: "2+", label: "Internships" },
            { value: "92%", label: "Top Score" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-stretch">
              {i > 0 && (
                <div className="w-px self-stretch my-3 bg-primary/15" />
              )}
              <div className="px-8 py-4 text-center">
                <div className="font-display text-xl font-bold gradient-text leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        onClick={() => onNavigate("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group z-20"
        aria-label="Scroll to about section"
      >
        {/* Scroll track */}
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid oklch(var(--primary) / 0.3)" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.8,
              ease: "easeInOut",
            }}
          />
        </div>
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.8,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <ArrowDown
            size={12}
            className="opacity-50 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
