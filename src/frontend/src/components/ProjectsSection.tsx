import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useGesture } from "../hooks/useGesture";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  gradient: string;
  icon: string;
  github: string;
  demo?: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: "neural-style",
    title: "Neural Style Transfer App",
    description:
      "Deep learning application for artistic image transformation using VGG19 architecture.",
    fullDescription:
      "A web application that transforms photographs into artwork using the artistic style of famous paintings. Built on a pre-trained VGG19 network fine-tuned for content/style separation, with a Flask backend serving the model and a React frontend for real-time visualization.",
    tags: ["Python", "TensorFlow", "VGG19", "Flask", "React"],
    gradient: "from-violet-600 via-purple-500 to-blue-500",
    icon: "🎨",
    github: "https://github.com",
    demo: "https://demo.example.com",
    highlights: [
      "Reduced style transfer time by 60% with neural network optimization",
      "Handles images up to 2048×2048 resolution",
      "Deployed on AWS with auto-scaling",
      "500+ users in first week post-launch",
    ],
  },
  {
    id: "object-detection",
    title: "Real-time Object Detection System",
    description:
      "YOLOv8-based detection system for live video stream analysis with 30 FPS performance.",
    fullDescription:
      "A high-performance object detection system using the YOLOv8 architecture for real-time analysis of live video streams. Implemented with custom-trained models for specific use cases including industrial safety monitoring and traffic analysis.",
    tags: ["Python", "PyTorch", "YOLOv8", "OpenCV", "ONNX"],
    gradient: "from-cyan-600 via-blue-500 to-indigo-500",
    icon: "👁️",
    github: "https://github.com",
    highlights: [
      "Achieved 30 FPS on consumer-grade hardware with ONNX optimization",
      "Custom dataset of 15,000+ annotated images",
      "Supports 80+ object categories",
      "Integrated with RTSP camera streams",
    ],
  },
  {
    id: "sentiment",
    title: "Sentiment Analysis Dashboard",
    description:
      "NLP pipeline analyzing social media sentiment with 94% accuracy using BERT fine-tuning.",
    fullDescription:
      "A comprehensive sentiment analysis platform that processes social media posts, news articles, and customer reviews in real-time. Features a Streamlit dashboard for interactive analysis with multi-label sentiment classification.",
    tags: ["Python", "BERT", "Transformers", "Streamlit", "PostgreSQL"],
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    icon: "💬",
    github: "https://github.com",
    demo: "https://demo.example.com",
    highlights: [
      "94% accuracy on holdout test set",
      "Processes 10,000 tweets per minute",
      "Multi-language support (English, Spanish, French)",
      "Real-time dashboard with live sentiment trends",
    ],
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance ML Model",
    description:
      "ML model predicting equipment failures from IoT sensor data with 48-hour advance warning.",
    fullDescription:
      "An end-to-end predictive maintenance system that analyzes sensor telemetry from industrial equipment to predict failures before they occur. Uses an ensemble of gradient boosting and LSTM models for time series forecasting.",
    tags: ["Python", "Scikit-learn", "XGBoost", "LSTM", "Kafka"],
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    icon: "⚙️",
    github: "https://github.com",
    highlights: [
      "Predicted failures 48 hours in advance with 87% precision",
      "Reduced unplanned downtime by 35% in pilot deployment",
      "Handles 50+ sensor channels simultaneously",
      "Saved $2M in maintenance costs in first quarter",
    ],
  },
  {
    id: "rag-chatbot",
    title: "AI Chatbot with RAG",
    description:
      "Retrieval-augmented generation chatbot for document Q&A with semantic search.",
    fullDescription:
      "A production-ready RAG chatbot that enables natural language queries over large document corpora. Uses FAISS for efficient vector similarity search and LangChain for orchestrating the retrieval-generation pipeline.",
    tags: ["Python", "LangChain", "FAISS", "OpenAI", "FastAPI"],
    gradient: "from-rose-600 via-pink-500 to-purple-500",
    icon: "🤖",
    github: "https://github.com",
    highlights: [
      "Indexes 10,000+ documents with sub-50ms query latency",
      "Context-aware multi-turn conversations",
      "Hybrid dense + sparse retrieval for improved recall",
      "Deployed on GCP with 99.9% uptime SLA",
    ],
  },
  {
    id: "drone-nav",
    title: "Autonomous Drone Navigation",
    description:
      "Reinforcement learning system for drone path optimization in complex simulation environments.",
    fullDescription:
      "A reinforcement learning system trained in AirSim simulation to navigate a drone autonomously through obstacle-filled environments. Uses Proximal Policy Optimization (PPO) with curriculum learning for progressive difficulty scaling.",
    tags: ["Python", "TensorFlow", "ROS", "AirSim", "PPO"],
    gradient: "from-sky-600 via-blue-500 to-violet-500",
    icon: "🚁",
    github: "https://github.com",
    highlights: [
      "Achieved 92% task completion rate in complex environments",
      "Trained on 50M environment steps using parallel simulation",
      "Transfer learning from simulation to real hardware",
      "Published at IEEE International Conference on Robotics",
    ],
  },
];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [taps, setTaps] = useState(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleClick = () => {
    if (taps === 0) {
      setTaps(1);
      tapTimerRef.current = setTimeout(() => setTaps(0), 300);
    } else {
      setTaps(0);
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      onClick();
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.97 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col w-full text-left"
      style={{
        background: "oklch(var(--card) / 0.55)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(var(--border) / 0.6)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 0.15)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onHoverStart={() => {}}
      onClick={handleClick}
      aria-label={`Open ${project.title} details — double-tap to open`}
    >
      {/* Thumbnail — light bloom version */}
      <div
        className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden shrink-0`}
      >
        {/* Radial light source from top-left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,white/25,transparent_60%)]" />
        {/* Bottom content fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
        {/* Diagonal gloss line */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />

        {/* Icon — larger, centered with glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span
              className="text-6xl block"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
            >
              {project.icon}
            </span>
          </div>
        </div>

        {/* Top-right: demo badge (only if demo exists, cleaner) */}
        {project.demo && (
          <div
            className="absolute top-3 right-3 text-[10px] font-mono text-white/80 tracking-wider uppercase"
            style={{
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "4px",
              padding: "2px 6px",
            }}
          >
            Live
          </div>
        )}
      </div>

      {/* Hover border glow — rendered as pseudo via group */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1px oklch(var(--primary) / 0.4), 0 0 32px oklch(var(--primary) / 0.15)",
        }}
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-[15px] text-foreground group-hover:text-primary transition-colors duration-200 mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-2 py-0.5 font-mono"
              style={{
                background: "oklch(var(--primary) / 0.06)",
                color: "oklch(var(--primary) / 0.9)",
                border: "1px solid oklch(var(--primary) / 0.15)",
                borderRadius: "4px",
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action links */}
        <div className="flex gap-4 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={13} />
            <span>Code</span>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors"
            >
              <ExternalLink size={13} />
              <span>Demo</span>
            </a>
          )}
          <span className="ml-auto text-[10px] font-mono text-muted-foreground/40 self-center">
            tap ×2
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const CARDS_PER_VIEW = 3;

  const goNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, PROJECTS.length - CARDS_PER_VIEW),
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  useGesture(
    carouselRef,
    {
      onSwipeLeft: goNext,
      onSwipeRight: goPrev,
    },
    { minSwipeDistance: 60 },
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-base section-pattern"
    >
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
            03. Projects
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            A selection of AI/ML projects spanning computer vision, NLP, and
            reinforcement learning.
          </p>
          <div className="h-0.5 w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="border border-border rounded px-1.5 py-0.5">
              ←
            </span>
            <span>Swipe or click arrows to navigate</span>
            <span className="border border-border rounded px-1.5 py-0.5">
              →
            </span>
          </div>
        </motion.div>

        {/* Carousel container */}
        <div className="relative" ref={carouselRef}>
          {/* Desktop: 3-column grid with animation */}
          <div className="hidden md:block overflow-hidden">
            <motion.div
              className="grid grid-cols-3 gap-6"
              animate={{ x: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {PROJECTS.slice(currentIndex, currentIndex + CARDS_PER_VIEW).map(
                (project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ),
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous projects"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {PROJECTS.slice(0, PROJECTS.length - CARDS_PER_VIEW + 1).map(
                  (project, i) => (
                    <button
                      type="button"
                      key={project.id}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-primary w-6"
                          : "bg-border hover:bg-primary/50"
                      }`}
                      aria-label={`Go to project group ${i + 1}`}
                    />
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={currentIndex >= PROJECTS.length - CARDS_PER_VIEW}
                className="p-2 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next projects"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Mobile: swipeable horizontal scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
              {PROJECTS.map((project) => (
                <div key={project.id} className="snap-start flex-none w-[85vw]">
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project detail modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-2xl glass border-primary/20 max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div
                  className={`h-48 -mx-6 -mt-6 rounded-t-lg bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center mb-6`}
                >
                  <span className="text-6xl">{selectedProject.icon}</span>
                </div>
                <DialogTitle className="font-display text-xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {selectedProject.fullDescription}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2 text-foreground">
                  Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedProject.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/5 text-primary border border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:shadow-glow-sm transition-all"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
