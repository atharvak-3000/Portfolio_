"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { Counter } from "./Counter";

const MotionLink = motion.create(Link);

function MagneticLink({ children, href, className }: { children: React.ReactNode, href: string, className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
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

  return (
    <MotionLink
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}

function MagneticCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 120, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const { clientX, clientY } = e;
    const rect = ref.current!.getBoundingClientRect();
    const middleX = clientX - (rect.left + rect.width / 2);
    const middleY = clientY - (rect.top + rect.height / 2);
    x.set(middleX * 0.35);
    y.set(middleY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer select-none ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const headlineWords = "Full-Stack Dev".split(" ");
  const accentWords = "& AI Builder.".split(" ");

  // Running character counter for global stagger delays
  let charCounter = 0;

  const floatingElements = [
    {
      // Top-left Rotated Card
      positionClass: "top-[20%] left-[8%]",
      cardClass: "-rotate-8 bg-zinc-900 text-white p-5 rounded-2xl shadow-xl max-w-[180px]",
      content: (
        <div className="font-sans text-sm font-semibold tracking-tight">
          <div className="text-[var(--accent-warm)] text-xs uppercase tracking-wider mb-2 font-bold">Services</div>
          Full-Stack Development & AI Applications
        </div>
      ),
    },
    {
      // Top-right Mock Browser
      positionClass: "top-[15%] right-[8%]",
      cardClass: "rotate-3 bg-white border border-zinc-100 p-4 rounded-2xl shadow-xl w-[260px]",
      content: (
        <div className="font-mono text-[10px] text-zinc-500">
          <div className="flex gap-1 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <div className="text-zinc-800 font-bold mb-1">const aiBuilder = &#123;</div>
          <div className="pl-3">name: <span className="text-[var(--accent)]">&quot;Atharva&quot;</span>,</div>
          <div className="pl-3">focus: <span className="text-green-600">&quot;AI & Web&quot;</span>,</div>
          <div className="pl-3">speed: <span className="text-amber-600">&quot;10x&quot;</span></div>
          <div className="text-zinc-800 font-bold">&#125;;</div>
        </div>
      ),
    },
    {
      // Bottom-left Stacked Tech Books
      positionClass: "bottom-[20%] left-[10%]",
      cardClass: "-rotate-3 bg-white border border-zinc-100 p-5 rounded-2xl shadow-xl w-[220px]",
      content: (
        <div className="font-sans">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Core Stack</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#61DAFB]" /> React / Next.js
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#68A063]" /> Node.js / SQL
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#13AA52]" /> MongoDB / AI
            </div>
          </div>
        </div>
      ),
    },
    {
      // Bottom-right Initials Avatar Card
      positionClass: "bottom-[18%] right-[10%]",
      cardClass: "rotate-6 bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-warm)] p-1 rounded-2xl shadow-2xl",
      content: (
        <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-heading font-extrabold text-sm">
            AK
          </div>
          <div>
            <div className="font-sans text-xs font-bold">Atharva Kale</div>
            <div className="font-sans text-[10px] text-zinc-400">Nashik, IN</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 overflow-hidden">
      {/* Floating dot top-left */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-[15%] left-[28%] w-3 h-3 rounded-full bg-[var(--accent-warm)]"
      />

      {/* Floating independent elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0] 
          }}
          transition={{
            opacity: { duration: 0.6, delay: i * 0.15 },
            scale: { duration: 0.6, delay: i * 0.15 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }
          }}
          className={`hidden lg:block absolute z-10 ${el.positionClass}`}
        >
          <MagneticCard className={el.cardClass}>
            {el.content}
          </MagneticCard>
        </motion.div>
      ))}

      <div className="max-w-4xl z-20 flex flex-col items-center">
        {/* Top small label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs md:text-sm font-bold tracking-widest uppercase text-zinc-500 mb-6 font-sans"
        >
          Hello, I am a
        </motion.span>

        {/* Headline with Staggered Retro Arcade Character-by-Character Pop Animation */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-[90px] font-extrabold leading-[1.05] tracking-tight mb-8">
          <div className="flex flex-wrap justify-center gap-x-[0.25em]">
            {headlineWords.map((word, wIdx) => {
              const chars = word.split("");
              return (
                <span key={wIdx} className="inline-flex">
                  {chars.map((char, cIdx) => {
                    const globalIdx = charCounter++;
                    return (
                      <motion.span
                        key={cIdx}
                        initial={{ opacity: 0, y: 35, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 14,
                          delay: globalIdx * 0.03, // Global stagger cascading left-to-right
                        }}
                        className="inline-block origin-bottom"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-x-[0.25em] text-[var(--accent)]">
            {accentWords.map((word, wIdx) => {
              const chars = word.split("");
              return (
                <span key={wIdx} className="inline-flex">
                  {chars.map((char, cIdx) => {
                    const globalIdx = charCounter++;
                    return (
                      <motion.span
                        key={cIdx}
                        initial={{ opacity: 0, y: 35, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 14,
                          delay: globalIdx * 0.03,
                        }}
                        className="inline-block origin-bottom"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </div>
        </h1>

        {/* Underline SVG */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-48 h-4 relative -mt-6 mb-8 origin-center"
        >
          <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[var(--accent-warm)]">
            <path
              d="M5 15 C 50 2, 150 2, 195 15 C 140 20, 60 20, 5 15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl font-light text-zinc-500 mb-10 max-w-lg font-sans"
        >
          that every client can count on.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <MagneticLink
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white hover:bg-[var(--accent-warm)] transition-colors rounded-[50px] font-bold text-sm md:text-base tracking-wide shadow-lg select-none"
          >
            Let&apos;s Work Together &rarr;
          </MagneticLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm font-bold tracking-wider text-zinc-500 uppercase font-sans"
        >
          <span><Counter end={10} suffix="+" /> Dashboards Built</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <span><Counter end={2} /> AI Projects Shipped</span>
        </motion.div>
      </div>
    </section>
  );
}
