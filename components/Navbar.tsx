"use client";

import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
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
      
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
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
