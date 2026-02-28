import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, GraduationCap, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  org: string;
  description: string;
  type: "work" | "cert" | "award" | "edu";
  tags: string[];
}

const TIMELINE: TimelineEvent[] = [
  {
    year: "2024",
    title: "ML Research Intern",
    org: "TechCorp AI Lab",
    description:
      "Developed advanced NLP models for document classification achieving 15% accuracy improvement over baseline. Collaborated with research team on LLM fine-tuning strategies for enterprise applications.",
    type: "work",
    tags: ["NLP", "BERT", "Python", "Research"],
  },
  {
    year: "2023",
    title: "Data Science Intern",
    org: "DataVision Analytics",
    description:
      "Built predictive churn models and interactive dashboards that reduced client churn by 20%. Implemented ETL pipelines processing 500K+ records daily with Apache Spark.",
    type: "work",
    tags: ["ML", "Spark", "Tableau", "Python"],
  },
  {
    year: "2023",
    title: "NPTEL Certification: Deep Learning",
    org: "IIT Madras, NPTEL",
    description:
      "Achieved score of 85% with Elite + Silver Medal certification. Covered CNNs, RNNs, GANs, and advanced optimization techniques with hands-on TensorFlow projects.",
    type: "cert",
    tags: ["Deep Learning", "TensorFlow", "85%", "Elite+Silver"],
  },
  {
    year: "2022",
    title: "NPTEL Certification: Python for Data Science",
    org: "IIT Madras, NPTEL",
    description:
      "Achieved outstanding score of 92% earning Elite + Gold Medal. Comprehensive coverage of NumPy, Pandas, Matplotlib, and Scikit-learn for practical data science applications.",
    type: "cert",
    tags: ["Python", "Data Science", "92%", "Elite+Gold"],
  },
  {
    year: "2022",
    title: "Winner — Smart India Hackathon",
    org: "Ministry of Education, India",
    description:
      "Secured 1st place nationally with an AI-based crop disease detection system using computer vision. The solution achieved 94% accuracy in identifying 25 different crop diseases from smartphone images.",
    type: "award",
    tags: ["Computer Vision", "CNNs", "1st Place", "National"],
  },
  {
    year: "2021",
    title: "Started B.Tech AIML",
    org: "XYZ University",
    description:
      "Enrolled in Bachelor of Technology in Artificial Intelligence & Machine Learning. Consistently on Dean's List (top 5% of cohort). Core focus on ML theory, algorithms, and real-world applications.",
    type: "edu",
    tags: ["B.Tech", "AIML", "Dean's List"],
  },
];

const TYPE_CONFIG = {
  work: {
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "glow-blue",
  },
  cert: {
    icon: Award,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "glow-violet",
  },
  award: {
    icon: Trophy,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    glow: "",
  },
  edu: {
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "",
  },
};

function TimelineItem({
  event,
  index,
  isLeft,
}: {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}) {
  const config = TYPE_CONFIG[event.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-start gap-6 ${
        isLeft ? "md:flex-row-reverse md:text-right" : "md:flex-row"
      }`}
    >
      {/* Timeline dot (desktop) */}
      <div className="hidden md:flex flex-col items-center flex-none">
        <div
          className={`relative w-12 h-12 rounded-full ${config.bg} border-2 ${config.border} flex items-center justify-center z-10`}
        >
          <Icon size={20} className={config.color} />
        </div>
      </div>

      {/* Content card */}
      <div className="flex-1 glass rounded-2xl p-5 border border-border hover:border-primary/20 transition-colors duration-300 group">
        <div
          className={`flex items-start justify-between mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}
        >
          <div className={`${isLeft ? "md:text-right" : ""}`}>
            <div className="font-mono text-xs text-primary mb-1">
              {event.year}
            </div>
            <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <div className="text-sm text-muted-foreground">{event.org}</div>
          </div>
          {/* Mobile icon */}
          <div
            className={`md:hidden flex w-10 h-10 rounded-full ${config.bg} border ${config.border} items-center justify-center shrink-0`}
          >
            <Icon size={18} className={config.color} />
          </div>
        </div>

        <p
          className={`text-sm text-muted-foreground mb-3 leading-relaxed ${isLeft ? "md:text-right" : ""}`}
        >
          {event.description}
        </p>

        <div
          className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}
        >
          {event.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`text-xs px-2 py-0.5 ${config.bg} ${config.color} border ${config.border}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-base section-pattern"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            04. Experience
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Career <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Internships, certifications, and milestones on the journey to
            becoming an AIML engineer.
          </p>
          <div className="h-0.5 w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-8 md:space-y-12">
            {TIMELINE.map((event, i) => (
              <div
                key={event.title}
                className="md:grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start"
              >
                {/* Left side (even indices) */}
                <div className="hidden md:block">
                  {i % 2 === 0 && (
                    <TimelineItem event={event} index={i} isLeft={true} />
                  )}
                </div>

                {/* Center dot (desktop) */}
                <div className="hidden md:flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                    className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-glow-sm mt-3 z-10"
                  />
                </div>

                {/* Right side (odd indices) */}
                <div className="hidden md:block">
                  {i % 2 !== 0 && (
                    <TimelineItem event={event} index={i} isLeft={false} />
                  )}
                </div>

                {/* Mobile: always show, left-aligned */}
                <div className="md:hidden col-span-full">
                  <TimelineItem event={event} index={i} isLeft={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
