"use client";

import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
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
      
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className={`flex items-center justify-between w-full max-w-3xl backdrop-blur-md border px-6 py-2.5 rounded-[50px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            scrolled 
              ? "scale-[0.96] bg-white/80 dark:bg-zinc-950/80 border-black/10 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" 
              : "scale-100 bg-white/70 dark:bg-zinc-950/70 border-black/5 dark:border-white/5 shadow-[0_4px_25px_rgba(0,0,0,0.02)]"
          }`}
        >
          {/* Left Avatar */}
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-heading font-extrabold text-sm tracking-tighter">
            AK
          </Link>
          
          {/* Center Links */}
          <div className="flex items-center gap-6 text-sm font-medium">
            {["Services", "Projects", "About", "Reviews"].map((item) => {
              const lowerItem = item.toLowerCase();
              const isActive = activeSection === lowerItem;
              return (
                <Link key={item} href={`#${lowerItem}`} className="relative py-1 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                  {item}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--accent)] rounded-full"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right CTA */}
          <Link
            href="#contact"
            className="text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-warm)] transition-colors rounded-[50px]"
          >
            Hire Me
          </Link>
        </motion.nav>
      </div>
    </>
  );
}
