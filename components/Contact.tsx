"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" fill="#E1E3E6" />
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v2l10 5.5L22 8V6z" fill="#EA4335" />
    <path d="M2 8v10c0 1.1.9 2 2 2h4v-9.5L2 8z" fill="#4285F4" />
    <path d="M22 8l-6 4.5V20h4c1.1 0 2-.9 2-2V8z" fill="#34A853" />
    <path d="M8 20h8v-8l-4 3-4-3v8z" fill="#FBBC05" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#25D366" d="M12.003 21.097c-1.611 0-3.184-.424-4.577-1.229l-.328-.194-3.4.891.906-3.32-.213-.339A9.8 9.8 0 013.004 12c0-5.417 4.407-9.824 9.825-9.824 5.417 0 9.824 4.407 9.824 9.824s-4.407 9.824-9.824 9.824m8.31-18.136A11.75 11.75 0 0012.003 0C5.501 0 .204 5.297.201 11.799c0 2.079.543 4.11 1.572 5.9l-1.67 6.104 6.245-1.637a11.76 11.76 0 005.65 1.455h.005c6.5 0 11.796-5.297 11.8-11.8a11.76 11.76 0 00-3.48-8.337z" />
    <path fill="#FFF" d="M17.33 14.286c-.292-.146-1.727-.852-1.993-.949-.267-.098-.461-.146-.655.146-.195.292-.754.949-.925 1.144-.17.195-.341.219-.633.073a7.97 7.97 0 01-2.35-1.449 8.78 8.78 0 01-1.625-2.024c-.17-.292-.018-.45.127-.595.13-.131.292-.341.438-.511.146-.17.195-.292.292-.487.098-.195.049-.365-.024-.511-.073-.146-.655-1.579-.897-2.164-.236-.569-.475-.49-.655-.5-.17-.008-.365-.008-.56-.008a1.08 1.08 0 00-.779.365c-.267.292-1.022 1.004-1.022 2.457 0 1.452 1.056 2.857 1.202 3.051.146.195 2.077 3.167 5.031 4.444.703.304 1.252.485 1.68.621.708.225 1.353.193 1.86.117.566-.084 1.727-.706 1.971-1.388.243-.682.243-1.266.17-1.388-.073-.122-.267-.195-.56-.341z" />
  </svg>
);

function MagneticButton({ children, className, onClick, href, target, rel }: any) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </Component>
  );
}

export default function Contact() {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const subject = `Inquiry from ${fd.get("name")}`;
    const body = `Name: ${fd.get("name")}%0AEmail: ${fd.get("email")}%0A%0A${fd.get("message")}`;
    window.location.href = `mailto:atharvakale20536@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 py-32 text-center flex flex-col items-center bg-[#0D0D0D] text-white">
      <div className="max-w-3xl w-full relative z-10">
        
        {/* Giant heading */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Let&apos;s build <span className="text-[var(--accent)]">something.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl opacity-80 mb-12 font-sans"
        >
          Open to freelance, collabs & full-time.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticButton
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto sm:min-w-[220px] px-8 py-4.5 flex items-center justify-center gap-3 bg-[var(--accent)] text-white hover:bg-[var(--accent-warm)] transition-colors rounded-[50px] font-bold text-base tracking-wide shadow-lg"
          >
            <GmailIcon className="w-5 h-5 flex-shrink-0" />
            Email Me
          </MagneticButton>
          
          <MagneticButton
            href="https://wa.me/918308758777"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto sm:min-w-[220px] px-8 py-4.5 flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors rounded-[50px] font-bold text-base tracking-wide shadow"
          >
            <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
            WhatsApp
          </MagneticButton>
        </motion.div>

        {/* Collapsible Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden mb-16"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left max-w-md mx-auto p-8 bg-zinc-950 border border-zinc-800 rounded-[20px]">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-400">Name</label>
                  <input required name="name" type="text" className="w-full p-3 bg-zinc-900 border border-zinc-800 focus:border-[var(--accent)] outline-none rounded-xl text-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-400">Email</label>
                  <input required name="email" type="email" className="w-full p-3 bg-zinc-900 border border-zinc-800 focus:border-[var(--accent)] outline-none rounded-xl text-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-400">Message</label>
                  <textarea required name="message" rows={4} className="w-full p-3 bg-zinc-900 border border-zinc-800 focus:border-[var(--accent)] outline-none rounded-xl text-white transition-colors resize-none" />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent-warm)] transition-colors rounded-[50px] mt-2 shadow-lg">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center gap-8"
        >
          <a
            href="https://linkedin.com/in/atharvakale"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-zinc-900 border border-zinc-800 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all rounded-full"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/atharvakale"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-zinc-900 border border-zinc-800 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all rounded-full"
            aria-label="GitHub"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
