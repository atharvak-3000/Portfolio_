"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-20 bg-[#F8F7F4]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Bio in Playfair Display Italic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="font-heading text-2xl md:text-3xl italic leading-relaxed text-zinc-900">
              &quot;I&apos;m Atharva — a final-year CS student specializing in AI & ML with hands-on industry experience at ScatterPie Analytics. I build fast, scalable products and love the intersection of code, design, and intelligence.&quot;
            </p>
          </motion.div>

          {/* Right: Certification Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Badge 1 */}
            <div className="p-6 bg-white rounded-[20px] shadow-sm border border-zinc-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 leading-tight">Microsoft DP-600 Certified</h4>
                  <p className="text-xs text-zinc-500 font-medium">Data Engineering & Analytics</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>

            {/* Badge 2 */}
            <div className="p-6 bg-white rounded-[20px] shadow-sm border border-zinc-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 leading-tight">Cloud Computing</h4>
                  <p className="text-xs text-zinc-500 font-medium">SWAYAM / NPTEL</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
