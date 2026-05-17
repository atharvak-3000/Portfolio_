"use client";

import { motion, useScroll, useMotionValueEvent, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Close mobile menu if scrolling down
    } else {
      setHidden(false);
    }
    setScrolled(latest > 60);
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-100px 0px -100px 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top scroll indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-[51]"
        style={{ scaleX }}
      />
      
      <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 w-full">
        <motion.nav
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: "-150%", opacity: 0 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className={`flex items-center justify-between w-full max-w-3xl bg-white/95 dark:bg-zinc-950/95 border border-[var(--foreground)]/5 px-6 py-2.5 rounded-[50px] transition-all duration-300 ${
            scrolled 
              ? "scale-[0.96] shadow-[0_10px_30px_rgba(0,0,0,0.12)]" 
              : "shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Left Avatar */}
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-heading font-extrabold text-sm tracking-tighter flex-shrink-0">
            AK
          </Link>
          
          {/* Center Links (Desktop only) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["Services", "Projects", "About", "Reviews"].map((item) => {
              const lowerItem = item.toLowerCase();
              const isActive = activeSection === lowerItem;
              return (
                <Link key={item} href={`#${lowerItem}`} className="relative py-1 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot-redesign"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--accent)] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right CTA (Desktop/Tablet) */}
          <Link
            href="#contact"
            className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-warm)] transition-colors rounded-[50px] flex-shrink-0"
          >
            Hire Me
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-zinc-100 hover:border-zinc-300 text-zinc-800 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>

        {/* Mobile Navigation Drawer Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-3xl mt-3 md:hidden z-40"
            >
              <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-zinc-100 dark:border-zinc-900 rounded-[28px] p-6 shadow-2xl flex flex-col gap-4">
                {["Services", "Projects", "About", "Reviews"].map((item) => {
                  const lowerItem = item.toLowerCase();
                  const isActive = activeSection === lowerItem;
                  return (
                    <Link
                      key={item}
                      href={`#${lowerItem}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-[var(--accent)]/5 text-[var(--accent)]"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span>{item}</span>
                      {isActive && <span className="w-2 h-2 bg-[var(--accent)] rounded-full" />}
                    </Link>
                  );
                })}
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-xs font-bold uppercase tracking-wider py-3.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-warm)] transition-colors rounded-[50px] mt-2 block shadow-md"
                >
                  Hire Me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
