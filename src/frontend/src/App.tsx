import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useGesture } from "./hooks/useGesture";
import { useIncrementVisitorCount } from "./hooks/useQueries";

import AboutSection from "./components/AboutSection";
import Chatbot from "./components/Chatbot";
import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import ResumeSection from "./components/ResumeSection";
import SkillsSection from "./components/SkillsSection";

const SECTIONS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "resume",
  "contact",
] as const;
type SectionId = (typeof SECTIONS)[number];

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const appRef = useRef<HTMLDivElement>(null);

  // Increment visitor count once on mount
  const incrementVisitor = useIncrementVisitorCount();
  const { mutate: doIncrement } = incrementVisitor;
  useEffect(() => {
    doIncrement();
  }, [doIncrement]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { threshold: 0.4 },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const navigateTo = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const navigateNext = useCallback(() => {
    const currentIdx = SECTIONS.indexOf(activeSection);
    if (currentIdx < SECTIONS.length - 1) {
      navigateTo(SECTIONS[currentIdx + 1]);
    }
  }, [activeSection, navigateTo]);

  const navigatePrev = useCallback(() => {
    const currentIdx = SECTIONS.indexOf(activeSection);
    if (currentIdx > 0) {
      navigateTo(SECTIONS[currentIdx - 1]);
    }
  }, [activeSection, navigateTo]);

  // Global swipe gestures for section navigation
  useGesture(
    appRef,
    {
      onSwipeLeft: navigateNext,
      onSwipeRight: navigatePrev,
    },
    { minSwipeDistance: 80, enabled: true },
  );

  return (
    <div ref={appRef} className="min-h-screen bg-background text-foreground">
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      <main>
        <HeroSection onNavigate={navigateTo} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Chatbot floating assistant */}
      <Chatbot />

      {/* Toast notifications */}
      <Toaster position="bottom-left" richColors />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
