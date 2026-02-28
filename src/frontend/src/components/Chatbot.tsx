import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetFAQAnswer } from "../hooks/useQueries";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Hardcoded knowledge base
const KB: Record<string, string> = {
  skills:
    "Alex has strong expertise in: **Programming** (Python 90%, C++ 75%, JavaScript 70%, SQL 80%), **AI/ML Frameworks** (TensorFlow 85%, PyTorch 88%, Scikit-learn 82%, Keras 80%, OpenCV 75%), **Data Science** (Pandas, NumPy, Matplotlib, Seaborn), and **Cloud/Tools** (AWS, GCP, Docker, Git, Linux).",
  projects:
    "Alex has built 6 notable projects: 🎨 Neural Style Transfer App (VGG19), 👁️ Real-time Object Detection (YOLOv8), 💬 Sentiment Analysis Dashboard (BERT, 94% accuracy), ⚙️ Predictive Maintenance ML (XGBoost), 🤖 AI Chatbot with RAG (LangChain), and 🚁 Autonomous Drone Navigation (Reinforcement Learning).",
  experience:
    "Alex's experience includes: **2024** - ML Research Intern at TechCorp AI Lab (improved NLP accuracy by 15%), **2023** - Data Science Intern at DataVision Analytics (reduced client churn by 20%), and multiple certifications and hackathon wins.",
  internship:
    "Alex has completed 2 internships: ML Research Intern at TechCorp AI Lab (2024) and Data Science Intern at DataVision Analytics (2023).",
  education:
    "Alex is pursuing a **B.Tech in Artificial Intelligence & Machine Learning** at XYZ University (2021–2025). He is on the Dean's List (top 5% of cohort) and has earned NPTEL certifications in Deep Learning and Python for Data Science.",
  degree:
    "B.Tech in Artificial Intelligence & Machine Learning at XYZ University, graduating 2025. Dean's List student.",
  contact:
    "You can reach Alex at: **Email**: alex.chen@email.com | **GitHub**: github.com/alexchen | **LinkedIn**: linkedin.com/in/alexchen. He's available for full-time roles, internships, and freelance projects!",
  email:
    "Alex's email is **alex.chen@email.com**. He typically responds within 24 hours.",
  github:
    "Find Alex's code at **github.com/alexchen** — featuring 6+ AI/ML projects with full source code.",
  linkedin: "Connect with Alex on LinkedIn at **linkedin.com/in/alexchen**.",
  resume:
    "Alex's resume is available in the Resume section. You can preview it there or download the PDF. It covers education, 2 internships, 6 projects, and certifications.",
  download:
    "Go to the Resume section to preview and download Alex's ATS-optimized PDF resume.",
  hello:
    "Hi there! I'm Alex's AI portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch!",
  hi: "Hey! Happy to help. What would you like to know about Alex Chen's portfolio?",
  about:
    "Alex Chen is a passionate AIML Engineer pursuing a B.Tech (2021–2025). He specializes in building production-ready ML systems with a focus on deep learning and NLP. He's completed 2 internships, built 6+ AI projects, and won the Smart India Hackathon.",
  awards:
    "Alex won **1st Place at the Smart India Hackathon** (2022) with an AI-based crop disease detection system. He also earned NPTEL Elite+Gold (92%) and Elite+Silver (85%) medals in Data Science certifications.",
  certification:
    "Alex has earned: NPTEL Deep Learning (Elite+Silver, 85%, IIT Madras 2023) and NPTEL Python for Data Science (Elite+Gold, 92%, IIT Madras 2022).",
  tensorflow:
    "Alex uses TensorFlow (85% proficiency) for production model training, TFLite for edge deployment, and model serving. He's used it in the Neural Style Transfer and Drone Navigation projects.",
  pytorch:
    "Alex's strongest framework — PyTorch (88% proficiency). Used for research-grade deep learning, custom CUDA kernels, and the Object Detection and Chatbot projects.",
  python:
    "Python is Alex's primary language (90% proficiency). He uses it for ML pipelines, data science, API development with FastAPI/Flask, and everything AI-related.",
};

function getResponse(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(KB)) {
    if (lower.includes(key)) {
      return value;
    }
  }
  return null;
}

const WELCOME_MSG: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Alex's AI assistant 🤖 Ask me anything about the portfolio — skills, projects, experience, education, or how to contact Alex. I'm here to help!",
  timestamp: new Date(),
};

const QUICK_PROMPTS = [
  "What are Alex's skills?",
  "Tell me about projects",
  "How to contact Alex?",
  "Work experience",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const getFAQ = useGetFAQAnswer();

  // Two-finger tap anywhere to open chatbot
  useEffect(() => {
    let lastTouchCount = 0;
    let twoFingerTapTimer: ReturnType<typeof setTimeout> | undefined;

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchCount = e.touches.length;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (lastTouchCount === 2 && e.changedTouches.length >= 1) {
        if (twoFingerTapTimer) clearTimeout(twoFingerTapTimer);
        twoFingerTapTimer = setTimeout(() => {
          // Make sure it wasn't a pinch (check for short duration)
        }, 50);
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      if (twoFingerTapTimer) clearTimeout(twoFingerTapTimer);
    };
  }, []);

  // Auto-scroll to bottom when messages or typing state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const addMessage = useCallback(
    (role: "user" | "assistant", content: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${role}-${Date.now()}`,
          role,
          content,
          timestamp: new Date(),
        },
      ]);
    },
    [],
  );

  const handleSend = useCallback(
    async (text?: string) => {
      const query = (text || input).trim();
      if (!query) return;

      setInput("");
      addMessage("user", query);
      setIsTyping(true);

      // Simulate typing delay
      await new Promise((r) => setTimeout(r, 600));

      // Try local knowledge base first
      const localAnswer = getResponse(query);

      if (localAnswer) {
        setIsTyping(false);
        addMessage("assistant", localAnswer);
        return;
      }

      // Fallback to backend FAQ
      try {
        const keyword = query.split(" ")[0].toLowerCase();
        const backendAnswer = await getFAQ.mutateAsync(keyword);
        if (backendAnswer) {
          setIsTyping(false);
          addMessage("assistant", backendAnswer);
          return;
        }
      } catch {
        // ignore backend error
      }

      // Default fallback
      setIsTyping(false);
      addMessage(
        "assistant",
        "I'm not sure about that, but I can answer questions about Alex's **skills**, **projects**, **experience**, **education**, **resume**, or **contact info**. Try asking one of those topics!",
      );
    },
    [input, addMessage, getFAQ],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  // Simple markdown bold rendering
  const renderContent = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // biome-ignore lint/suspicious/noArrayIndexKey: static text splits
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // biome-ignore lint/suspicious/noArrayIndexKey: static text splits
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI assistant chatbot"
        title="Chat with Alex's AI assistant (or use two-finger tap)"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] glass-strong rounded-2xl border border-primary/20 shadow-glow flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">
                  Alex's AI Assistant
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online • Powered by local KB
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chatbot"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-primary/20"
                        : "bg-secondary"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={14} className="text-primary" />
                    ) : (
                      <User size={14} className="text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-secondary/50 text-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-secondary/50 rounded-2xl rounded-tl-sm px-3 py-2">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 0.8,
                            delay: i * 0.15,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      type="button"
                      key={prompt}
                      onClick={() => void handleSend(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Alex..."
                className="bg-secondary/30 border-border text-sm focus:border-primary/50"
                disabled={isTyping}
              />
              <Button
                size="sm"
                onClick={() => void handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-primary text-primary-foreground shrink-0"
                aria-label="Send message"
              >
                {isTyping ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
