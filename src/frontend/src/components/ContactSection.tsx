import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useGesture } from "../hooks/useGesture";
import { useSubmitMessage } from "../hooks/useQueries";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", message: "" };

const CONTACT_LINKS = [
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/alexchen",
    href: "https://github.com",
    color: "hover:text-foreground",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/alexchen",
    href: "https://linkedin.com",
    color: "hover:text-blue-400",
  },
  {
    icon: Mail,
    label: "Email",
    value: "alex.chen@email.com",
    href: "mailto:alex.chen@email.com",
    color: "hover:text-primary",
  },
  {
    icon: Phone,
    label: "Location",
    value: "Bangalore, India",
    href: "#",
    color: "hover:text-emerald-400",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitMessage = useSubmitMessage();

  const clearForm = useCallback(() => {
    setForm(EMPTY_FORM);
    toast.success("Form cleared!");
  }, []);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        toast.error("Please fill in all fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      try {
        await submitMessage.mutateAsync({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        });
        setSubmitted(true);
        setForm(EMPTY_FORM);
        toast.success("Message sent! I'll get back to you soon 🚀");
        setTimeout(() => setSubmitted(false), 5000);
      } catch {
        toast.error("Failed to send message. Please try again.");
      }
    },
    [form, submitMessage],
  );

  // Shake to clear
  useGesture(
    sectionRef,
    {
      onShake: clearForm,
      onSwipeRight: () => {
        if (form.name || form.email || form.message) {
          void handleSubmit();
        }
      },
    },
    { minSwipeDistance: 80 },
  );

  return (
    <section
      id="contact"
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
            06. Contact
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to discuss AI opportunities? I'm
            always open to interesting conversations.
          </p>
          <div className="h-0.5 w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1">
              <span className="border border-border rounded px-1.5 py-0.5">
                Shake
              </span>
              <span>to clear form</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="border border-border rounded px-1.5 py-0.5">
                Swipe →
              </span>
              <span>to submit</span>
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <h3 className="font-display font-semibold text-lg mb-6 text-foreground">
              Reach out directly
            </h3>

            <div className="space-y-4">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`flex items-center gap-4 p-4 glass rounded-xl border border-border hover:border-primary/30 transition-all duration-300 group ${link.color}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 group-hover:bg-primary/10 flex items-center justify-center transition-colors shrink-0">
                    <link.icon
                      size={18}
                      className="text-muted-foreground group-hover:text-current transition-colors"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {link.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {link.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 glass rounded-xl p-4 border border-green-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-green-400">
                  Available for Work
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Open to full-time, internship, and freelance ML/AI engineering
                opportunities. Response time: within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 glass rounded-2xl p-12 border border-green-500/20"
              >
                <CheckCircle size={48} className="text-green-400" />
                <h3 className="font-display text-xl font-bold">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for reaching out. I'll get back to you within 24
                  hours.
                </p>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 sm:p-8 border border-border space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="bg-secondary/30 border-border focus:border-primary/50 transition-colors"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="bg-secondary/30 border-border focus:border-primary/50 transition-colors"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                  >
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className="bg-secondary/30 border-border focus:border-primary/50 transition-colors resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearForm}
                    className="border-border hover:border-primary/30"
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitMessage.isPending}
                    className="flex-1 bg-primary text-primary-foreground hover:shadow-glow hover:scale-[1.02] transition-all"
                  >
                    {submitMessage.isPending ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
