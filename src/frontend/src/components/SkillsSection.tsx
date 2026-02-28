import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  detail: string;
  color: string;
  glowColor: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  accentClass: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    icon: "⚡",
    accentClass: "from-blue-500/60 to-cyan-400/60",
    skills: [
      {
        name: "Python",
        level: 90,
        detail:
          "Primary language for ML/DL. Built NLP pipelines, data preprocessing tools, and API backends with FastAPI.",
        color: "from-blue-500 to-cyan-400",
        glowColor: "oklch(0.65 0.22 220)",
      },
      {
        name: "C++",
        level: 75,
        detail:
          "Used for performance-critical algorithms, competitive programming, and computer vision optimizations.",
        color: "from-violet-500 to-purple-400",
        glowColor: "oklch(0.62 0.22 295)",
      },
      {
        name: "JavaScript",
        level: 70,
        detail:
          "Frontend dashboards with React, real-time data visualizations, and interactive ML demo UIs.",
        color: "from-yellow-500 to-orange-400",
        glowColor: "oklch(0.78 0.18 80)",
      },
      {
        name: "SQL",
        level: 80,
        detail:
          "Complex queries, database design for ML feature stores, and ETL pipeline development.",
        color: "from-emerald-500 to-teal-400",
        glowColor: "oklch(0.72 0.18 170)",
      },
    ],
  },
  {
    title: "AIML Frameworks",
    icon: "🧠",
    accentClass: "from-orange-500/60 to-rose-500/60",
    skills: [
      {
        name: "TensorFlow",
        level: 85,
        detail:
          "Production model training, TensorFlow Serving, TFLite for edge deployment, and custom layers.",
        color: "from-orange-500 to-amber-400",
        glowColor: "oklch(0.72 0.18 55)",
      },
      {
        name: "PyTorch",
        level: 88,
        detail:
          "Research-grade deep learning, custom CUDA kernels, torchvision, and distributed training.",
        color: "from-red-500 to-rose-400",
        glowColor: "oklch(0.62 0.22 25)",
      },
      {
        name: "Scikit-learn",
        level: 82,
        detail:
          "Classical ML pipelines, hyperparameter tuning, ensemble methods, and model evaluation.",
        color: "from-blue-400 to-indigo-500",
        glowColor: "oklch(0.65 0.22 255)",
      },
      {
        name: "Keras",
        level: 80,
        detail:
          "Rapid prototyping of neural networks, transfer learning with pretrained models.",
        color: "from-red-400 to-pink-500",
        glowColor: "oklch(0.65 0.22 0)",
      },
      {
        name: "OpenCV",
        level: 75,
        detail:
          "Real-time video processing, feature detection, object tracking, and camera calibration.",
        color: "from-cyan-500 to-blue-400",
        glowColor: "oklch(0.75 0.18 210)",
      },
    ],
  },
  {
    title: "Data Science",
    icon: "📊",
    accentClass: "from-teal-500/60 to-sky-500/60",
    skills: [
      {
        name: "Pandas",
        level: 90,
        detail:
          "Large-scale data manipulation, feature engineering, and time series analysis.",
        color: "from-blue-500 to-teal-400",
        glowColor: "oklch(0.68 0.20 210)",
      },
      {
        name: "NumPy",
        level: 88,
        detail:
          "Vectorized operations, linear algebra for ML, and high-performance numerical computing.",
        color: "from-indigo-500 to-blue-400",
        glowColor: "oklch(0.62 0.22 255)",
      },
      {
        name: "Matplotlib",
        level: 85,
        detail:
          "Publication-quality plots, custom visualizations for model performance and data insights.",
        color: "from-sky-500 to-cyan-400",
        glowColor: "oklch(0.75 0.18 220)",
      },
      {
        name: "Seaborn",
        level: 80,
        detail:
          "Statistical visualizations, correlation heatmaps, and distribution plots for EDA.",
        color: "from-teal-500 to-emerald-400",
        glowColor: "oklch(0.72 0.18 180)",
      },
      {
        name: "Jupyter",
        level: 90,
        detail:
          "Interactive ML experimentation, reproducible research notebooks, and demos.",
        color: "from-orange-400 to-amber-500",
        glowColor: "oklch(0.72 0.18 60)",
      },
    ],
  },
  {
    title: "Cloud & Tools",
    icon: "☁️",
    accentClass: "from-amber-500/60 to-yellow-500/60",
    skills: [
      {
        name: "AWS",
        level: 70,
        detail:
          "SageMaker for ML training, S3 data lakes, Lambda for serverless inference, and EC2 GPU instances.",
        color: "from-orange-500 to-yellow-400",
        glowColor: "oklch(0.72 0.18 60)",
      },
      {
        name: "GCP",
        level: 65,
        detail:
          "Vertex AI, BigQuery ML, Cloud Storage, and Google Colab for collaborative development.",
        color: "from-blue-500 to-green-400",
        glowColor: "oklch(0.68 0.18 160)",
      },
      {
        name: "Docker",
        level: 72,
        detail:
          "Containerized ML models for reproducible environments and microservices deployment.",
        color: "from-cyan-500 to-blue-500",
        glowColor: "oklch(0.68 0.20 220)",
      },
      {
        name: "Git",
        level: 90,
        detail:
          "Version control for ML experiments, collaborative development, and CI/CD pipelines.",
        color: "from-red-500 to-orange-400",
        glowColor: "oklch(0.62 0.22 30)",
      },
      {
        name: "Linux",
        level: 85,
        detail:
          "Server administration, shell scripting for data pipelines, and GPU cluster management.",
        color: "from-yellow-600 to-amber-500",
        glowColor: "oklch(0.72 0.18 70)",
      },
    ],
  },
];

interface SkillBarProps {
  skill: Skill;
  index: number;
  animate: boolean;
}

function SkillBar({ skill, index, animate }: SkillBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handlePointerDown = () => {
    holdTimerRef.current = setTimeout(() => setShowTooltip(true), 400);
  };

  const handlePointerUp = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  const handlePointerLeave = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setShowTooltip(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="group w-full text-left"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onClick={() => setShowTooltip((prev) => !prev)}
        aria-label={`${skill.name}: ${skill.level}%. Click for details.`}
        aria-expanded={showTooltip}
      >
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
            {skill.name}
          </span>
          <span className="text-xs font-mono font-semibold text-primary/80 group-hover:text-primary transition-colors duration-200">
            {skill.level}%
          </span>
        </div>

        {/* Premium track: taller, darker bg, rounded */}
        <div
          className="h-3 rounded-full overflow-visible relative"
          style={{
            background: "oklch(var(--secondary) / 0.6)",
            boxShadow: "inset 0 1px 2px oklch(0 0 0 / 0.2)",
          }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
            initial={{ width: "0%" }}
            animate={{ width: animate ? `${skill.level}%` : "0%" }}
            transition={{
              duration: 1.4,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
          </motion.div>

          {/* Glowing endpoint dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full -ml-1.5 z-10"
            initial={{ left: "0%", opacity: 0 }}
            animate={
              animate
                ? { left: `${skill.level}%`, opacity: 1 }
                : { left: "0%", opacity: 0 }
            }
            transition={{
              duration: 1.4,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              background: `radial-gradient(circle, white 0%, ${skill.glowColor} 60%, transparent 100%)`,
              boxShadow: `0 0 8px 2px ${skill.glowColor}`,
            }}
          />
        </div>

        {/* Inline hint */}
        <div className="mt-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] font-mono text-primary/50">
            ▸ click for details
          </span>
        </div>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 right-0 z-20 mt-1"
          style={{
            background: "oklch(var(--card) / 0.95)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${skill.glowColor}40`,
            borderRadius: "12px",
            padding: "12px 14px",
            boxShadow: `0 4px 24px oklch(0 0 0 / 0.25), 0 0 0 1px ${skill.glowColor}20`,
          }}
        >
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            {skill.detail}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[10px] font-mono text-primary/60 hover:text-primary transition-colors"
          >
            ✕ dismiss
          </button>
        </motion.div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  groupIndex,
}: { category: SkillCategory; groupIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: groupIndex * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background: "oklch(var(--card) / 0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(var(--border) / 0.7)",
      }}
    >
      {/* Left accent bar — gradient unique per category */}
      <div
        className={`absolute left-0 top-6 bottom-6 w-0.5 rounded-full bg-gradient-to-b ${category.accentClass}`}
      />

      {/* Corner glow */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-bl ${category.accentClass} blur-2xl opacity-20 pointer-events-none`}
      />

      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl leading-none">{category.icon}</span>
        <h3 className="font-display font-bold text-base text-foreground">
          {category.title}
        </h3>
      </div>

      <div className="space-y-5">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            index={i}
            animate={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-base section-pattern">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            02. Skills
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            A curated set of tools and technologies I use to build intelligent
            systems.
          </p>
          <div className="h-px w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} groupIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
