import { ChevronDown, GraduationCap, Target, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useGesture } from "../hooks/useGesture";

const SHORT_BIO = `I'm Alex Chen, a passionate AIML Engineer with a strong foundation in machine learning, deep learning, and data science. Currently pursuing my B.Tech in Artificial Intelligence & Machine Learning (2021–2025), I specialize in building production-ready AI systems that solve real-world problems.`;

const FULL_BIO = `${SHORT_BIO}

My journey in AI began with a fascination for how machines can learn from data to make intelligent decisions. Through academic projects, internships at leading tech companies, and self-driven research, I've developed expertise spanning the full ML lifecycle — from data preprocessing and model development to deployment and monitoring.

I believe AI's greatest potential lies in its application to solve humanity's complex challenges. Whether it's healthcare diagnostics, environmental monitoring, or autonomous systems, I'm driven to build solutions that make a meaningful impact.

Outside of coding, I contribute to open-source ML projects, write technical blogs about emerging AI trends, and mentor junior students in AIML. I'm always looking for opportunities to collaborate on cutting-edge AI research and ambitious engineering projects.`;

export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useGesture(
    sectionRef,
    {
      onSwipeUp: () => setExpanded(true),
      onSwipeDown: () => setExpanded(false),
    },
    { minSwipeDistance: 60 },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-base section-pattern"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            01. About Me
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            The <span className="gradient-text">Mind</span> Behind the Models
          </h2>
          <div className="h-0.5 w-20 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-xs mx-auto">
              {/* Avatar placeholder */}
              <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden glow-blue">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center">
                  <div className="font-display text-6xl font-extrabold gradient-text">
                    AC
                  </div>
                </div>
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan-y pointer-events-none" />
              </div>

              {/* Info cards */}
              <div className="mt-6 space-y-3">
                {[
                  {
                    icon: GraduationCap,
                    label: "Education",
                    value: "B.Tech AIML, XYZ University",
                  },
                  {
                    icon: Target,
                    label: "Focus",
                    value: "Deep Learning & NLP",
                  },
                  {
                    icon: User,
                    label: "Status",
                    value: "Open to Opportunities",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 4 }}
                    className="glass flex items-center gap-3 p-3 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {item.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Swipe hint */}
            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground font-mono">
              <span className="border border-border rounded px-1.5 py-0.5">
                ↑
              </span>
              <span>Swipe up to expand</span>
              <span className="border border-border rounded px-1.5 py-0.5">
                ↓
              </span>
              <span>Swipe down to collapse</span>
            </div>

            {/* Bio text */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-base">
                {SHORT_BIO}
              </p>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        My journey in AI began with a fascination for how
                        machines can learn from data to make intelligent
                        decisions. Through academic projects, internships at
                        leading tech companies, and self-driven research, I've
                        developed expertise spanning the full ML lifecycle —
                        from data preprocessing and model development to
                        deployment and monitoring.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        I believe AI's greatest potential lies in its
                        application to solve humanity's complex challenges.
                        Whether it's healthcare diagnostics, environmental
                        monitoring, or autonomous systems, I'm driven to build
                        solutions that make a meaningful impact.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        Outside of coding, I contribute to open-source ML
                        projects, write technical blogs about emerging AI
                        trends, and mentor junior students in AIML. I'm always
                        looking for opportunities to collaborate on cutting-edge
                        AI research and ambitious engineering projects.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Expand/collapse button */}
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium"
            >
              {expanded ? "Show Less" : "Read More"}
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>

            {/* Key goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 glass rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold text-base mb-4 text-foreground">
                Career Goals
              </h3>
              <ul className="space-y-2">
                {[
                  "Build production-grade ML systems at scale",
                  "Research LLMs and multimodal AI architectures",
                  "Contribute to open-source AI tooling",
                  "Solve high-impact problems with deep learning",
                ].map((goal) => (
                  <li
                    key={goal}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { FULL_BIO };
