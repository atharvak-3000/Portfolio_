"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Riya Sharma",
    role: "Startup Founder · Pune",
    initials: "RS",
    avatarBg: "#E8F4F0",
    review: (
      <>
        Atharva built our company dashboard in under a week.{" "}
        <span className="font-semibold text-[var(--accent-warm)] underline decoration-[rgba(255,107,53,0.35)] decoration-2 underline-offset-4">
          Clean, fast, and exactly what we needed.
        </span>{" "}
        His attention to detail is unmatched — will hire again.
      </>
    ),
  },
  {
    name: "Karan Mehta",
    role: "Product Manager · ScatterPie Analytics",
    initials: "KM",
    avatarBg: "#EEE8F8",
    review: (
      <>
        <span className="font-semibold text-[var(--accent-warm)] underline decoration-[rgba(255,107,53,0.35)] decoration-2 underline-offset-4">
          The AI tool he built saved our team hours every week.
        </span>{" "}
        He understood the brief perfectly and delivered more than expected.
      </>
    ),
  },
  {
    name: "Sneha Patil",
    role: "HR Lead",
    initials: "SP",
    avatarBg: "#EEF3FF",
    review: (
      <>
        Got my portfolio site from Atharva —{" "}
        <span className="font-semibold text-[var(--accent-warm)] underline decoration-[rgba(255,107,53,0.35)] decoration-2 underline-offset-4">
          it&apos;s minimal, professional, and I started getting interview callbacks.
        </span>{" "}
        Highly recommend.
      </>
    ),
  },
  {
    name: "Priya Desai",
    role: "Marketing Head",
    initials: "PD",
    avatarBg: "#FFF3EE",
    review: (
      <>
        His AI ad creatives{" "}
        <span className="font-semibold text-[var(--accent-warm)] underline decoration-[rgba(255,107,53,0.35)] decoration-2 underline-offset-4">
          doubled our click-through rate.
        </span>{" "}
        He brings a rare mix of technical depth and creative instinct.
      </>
    ),
  },
];

const trustStats = [
  "Microsoft Certified",
  "10+ Dashboards Shipped",
  "2 AI Products Live",
  "Fast Delivery",
  "Revision Friendly",
  "GPA 8.1 / 10",
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#F8F7F4]">
      {/* Infinite Trust Marquee Scroll */}
      <div className="w-full bg-[#0D0D0D] text-[#F8F7F4] py-5 overflow-hidden border-y border-zinc-800 z-10 relative">
        <div className="flex whitespace-nowrap animate-marquee w-[200%]">
          {[...trustStats, ...trustStats].map((stat, index) => (
            <div key={index} className="inline-flex items-center justify-center min-w-[200px] md:min-w-[300px] text-xs font-bold uppercase tracking-widest text-[#F8F7F4]">
              <span className="text-[var(--accent-warm)] mr-4">✦</span>
              {stat}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4">Kind words from Clients</h2>
            <p className="text-lg text-zinc-500 font-sans">Delivering consistently high-value digital experiences.</p>
          </motion.div>

          {/* Testimonials 2-Column Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start font-sans">
            {reviews.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-8 bg-[#F5F5F3] dark:bg-zinc-900 rounded-[20px] shadow-sm border border-zinc-100 flex flex-col justify-between hover:border-[var(--accent)] transition-colors duration-300"
              >
                {/* Stars spring animation */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-base text-zinc-800 dark:text-zinc-200 leading-relaxed mb-8 flex-grow">
                  &quot;{item.review}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <div 
                    style={{ backgroundColor: item.avatarBg }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-800 font-bold text-xs uppercase shadow-sm"
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-950 dark:text-white leading-tight">{item.name}</h4>
                    <p className="text-xs text-zinc-500 font-medium">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
