"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Custom cursor state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSize = useMotionValue(10);
  const cursorOpacity = useMotionValue(0);
  const cursorBorder = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Cursor tracking
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (cursorOpacity.get() === 0) cursorOpacity.set(1);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        cursorSize.set(32);
        cursorBorder.set(1); // 1 means ring
      } else {
        cursorSize.set(10);
        cursorBorder.set(0); // 0 means filled
      }
    };

    if (!window.matchMedia("(max-width: 768px)").matches) {
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, cursorOpacity, cursorSize, cursorBorder]);

  return (
    <>
      {/* Page Load Sweep (Fail-safe Pure CSS transition) */}
      <div className="page-load-overlay" />

      {/* Custom Cursor */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{
            x: cursorX,
            y: cursorY,
            width: cursorSize,
            height: cursorSize,
            opacity: cursorOpacity,
            backgroundColor: useTransform(cursorBorder, [0, 1], ["var(--accent)", "transparent"]),
            border: useTransform(cursorBorder, [0, 1], ["none", "2px solid var(--accent)"]),
          }}
        />
      )}

      {children}
    </>
  );
}
