import { Button } from "@/components/ui/button";
import { ChevronUp, Download, FileText, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useGesture } from "../hooks/useGesture";

function ResumePreviewContent() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 rounded-xl p-8 shadow-2xl max-w-2xl mx-auto font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Alex Chen
        </h1>
        <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
          AIML Engineer
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>alex.chen@email.com</span>
          <span>|</span>
          <span>github.com/alexchen</span>
          <span>|</span>
          <span>linkedin.com/in/alexchen</span>
        </div>
      </div>

      {/* Education */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
          Education
        </h2>
        <div className="flex justify-between">
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              B.Tech in Artificial Intelligence & Machine Learning
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              XYZ University
            </div>
          </div>
          <div className="text-right text-gray-500 dark:text-gray-400 text-xs">
            <div>2021 – 2025</div>
            <div>Dean's List</div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
          Technical Skills
        </h2>
        <div className="space-y-1 text-xs">
          <div>
            <span className="font-semibold">Languages:</span> Python, C++,
            JavaScript, SQL
          </div>
          <div>
            <span className="font-semibold">Frameworks:</span> TensorFlow,
            PyTorch, Scikit-learn, Keras, OpenCV, LangChain
          </div>
          <div>
            <span className="font-semibold">Data Science:</span> Pandas, NumPy,
            Matplotlib, Seaborn, Jupyter
          </div>
          <div>
            <span className="font-semibold">Cloud & Tools:</span> AWS SageMaker,
            GCP Vertex AI, Docker, Git, Linux
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
          Experience
        </h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">
                ML Research Intern — TechCorp AI Lab
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                2024
              </span>
            </div>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-0.5 list-disc list-inside">
              <li>
                Developed NLP models for document classification, improving
                accuracy by 15%
              </li>
              <li>
                Fine-tuned BERT-based models for enterprise document analysis
              </li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">
                Data Science Intern — DataVision Analytics
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                2023
              </span>
            </div>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-0.5 list-disc list-inside">
              <li>Built predictive dashboards reducing client churn by 20%</li>
              <li>Designed ETL pipelines processing 500K+ records daily</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
          Selected Projects
        </h2>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div>
            <span className="font-semibold">Neural Style Transfer App</span> —
            VGG19-based artistic image transformation (TensorFlow, Flask)
          </div>
          <div>
            <span className="font-semibold">Real-time Object Detection</span> —
            YOLOv8 system for live video analysis (PyTorch, OpenCV)
          </div>
          <div>
            <span className="font-semibold">Sentiment Analysis Dashboard</span>{" "}
            — BERT NLP pipeline, 94% accuracy (Transformers, Streamlit)
          </div>
          <div>
            <span className="font-semibold">AI Chatbot with RAG</span> —
            Document Q&A system (LangChain, FAISS, FastAPI)
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
          Certifications & Awards
        </h2>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div>
            NPTEL Deep Learning — Elite + Silver Medal, 85% (IIT Madras, 2023)
          </div>
          <div>
            NPTEL Python for Data Science — Elite + Gold Medal, 92% (IIT Madras,
            2022)
          </div>
          <div>
            1st Place — Smart India Hackathon, AI Crop Disease Detection (2022)
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeSection() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGesture(
    sectionRef,
    {
      onSwipeUp: () => setPreviewOpen(true),
      onSwipeDown: () => setPreviewOpen(false),
    },
    { minSwipeDistance: 60 },
  );

  useGesture(
    overlayRef,
    {
      onSwipeDown: () => setPreviewOpen(false),
    },
    { minSwipeDistance: 60 },
  );

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="section-base section-pattern"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            05. Resume
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            ATS-optimized resume highlighting key skills, experience, and
            achievements.
          </p>
          <div className="h-0.5 w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="border border-border rounded px-1.5 py-0.5">
              ↑
            </span>
            <span>Swipe up to preview</span>
          </div>
        </motion.div>

        {/* Resume card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-8 md:p-12 text-center border border-primary/10 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, oklch(var(--primary)) 39px, oklch(var(--primary)) 40px)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center animate-pulse-glow">
              <FileText size={36} className="text-primary" />
            </div>

            <h3 className="font-display text-2xl font-bold mb-2">
              Alex Chen — AIML Engineer
            </h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              Comprehensive resume covering education, work experience,
              projects, certifications, and technical skills.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto mb-8">
              {[
                { value: "2+", label: "Years XP" },
                { value: "6+", label: "Projects" },
                { value: "2", label: "Internships" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-xl font-bold gradient-text">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setPreviewOpen(true)}
                variant="outline"
                className="group border-primary/30 hover:border-primary hover:bg-primary/10 text-primary"
              >
                <ChevronUp
                  size={16}
                  className="mr-2 group-hover:animate-bounce"
                />
                Preview Resume
              </Button>
              <Button
                className="glow-blue bg-primary text-primary-foreground hover:shadow-glow hover:scale-105 transition-all"
                onClick={() => {
                  // Note: PDF would be linked here in production
                  alert(
                    "Resume PDF coming soon! The preview above shows the full resume content.",
                  );
                }}
              >
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground italic">
              * PDF version coming soon. Preview available above.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Preview overlay */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-16 px-4"
            onClick={(e) =>
              e.target === e.currentTarget && setPreviewOpen(false)
            }
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl relative"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="absolute -top-12 right-0 p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-4 text-xs text-muted-foreground font-mono">
                Swipe down or click outside to close
              </div>

              <ResumePreviewContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
