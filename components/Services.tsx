'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { useMediaQuery } from './hooks/useMediaQuery';

interface Service {
  title: string;
  tag: string;
  description: string;
  icon: string;
  bg: string;
  visual: React.ReactNode;
}

const services: Service[] = [
  {
    title: "AI-Powered Apps",
    tag: "MOST POPULAR",
    description: "Need a custom AI tool? I build chatbots, summarizers, and automation that save your team hours every week.",
    icon: "🤖",
    bg: "#EEF3FF",
    visual: (
      <div className="relative w-full h-48 bg-white/70 rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-inner border border-blue-100">
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs">AI</div>
          <div className="bg-blue-50 text-xs text-blue-900 rounded-lg p-2.5 max-w-[150px]">Analyze this dataset...</div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="bg-white text-xs text-zinc-600 rounded-lg p-2.5 max-w-[150px] shadow-sm border border-zinc-50">Summarized 3 key trends!</div>
          <div className="w-8 h-8 rounded-full bg-[var(--accent-warm)] text-white flex items-center justify-center text-xs">AK</div>
        </div>
      </div>
    ),
  },
  {
    title: "Full-Stack Web Dev",
    tag: "CORE SERVICE",
    description: "From landing pages to full SaaS products — I build fast, scalable web apps your users will love.",
    icon: "💻",
    bg: "#F0F7F4",
    visual: (
      <div className="w-full h-48 bg-zinc-900 rounded-xl p-4 font-mono text-xs text-zinc-400 flex flex-col shadow-lg">
        <div className="flex gap-1.5 mb-3 border-b border-zinc-800 pb-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-[10px] text-zinc-600 ml-2">page.tsx</span>
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <div><span className="text-pink-400">export default function</span> <span className="text-blue-400">App</span>() &#123;</div>
          <div className="pl-4 text-zinc-500 my-1">return &lt;<span className="text-emerald-400">Portfolio</span> /&gt;</div>
          <div>&#125;</div>
        </div>
      </div>
    ),
  },
  {
    title: "Graphic Design",
    tag: "CREATIVE",
    description: "Eye-catching logos, brand kits, and social creatives that make your business look credible and professional.",
    icon: "🎨",
    bg: "#FFF3EE",
    visual: (
      <div className="relative w-full h-48 bg-white/70 rounded-xl flex items-center justify-center overflow-hidden border border-orange-100 shadow-inner">
        <div className="absolute w-20 h-20 rounded-full bg-[var(--accent-warm)]/10 animate-pulse" />
        <div className="w-16 h-16 rounded-xl bg-orange-100 border-2 border-[var(--accent-warm)] flex items-center justify-center text-sm font-bold text-[var(--accent-warm)] shadow-md rotate-12 hover:rotate-0 transition-transform duration-300">
          DESIGN
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <div className="w-5 h-5 rounded bg-purple-200" />
          <div className="w-5 h-5 rounded bg-pink-200" />
        </div>
      </div>
    ),
  },
  {
    title: "BI Dashboards",
    tag: "DATA",
    description: "Turn your raw data into clear Power BI dashboards with real-time KPIs your team can actually act on.",
    icon: "📊",
    bg: "#F3F0FF",
    visual: (
      <div className="w-full h-48 bg-white/80 rounded-xl p-4 flex flex-col justify-between border border-purple-100 shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-zinc-400 uppercase">Sales Growth</span>
          <span className="text-sm font-bold text-emerald-500">+14.2%</span>
        </div>
        <div className="flex items-end gap-2 h-24">
          <div className="w-full bg-purple-200 rounded-t h-[30%]" />
          <div className="w-full bg-purple-300 rounded-t h-[50%]" />
          <div className="w-full bg-purple-400 rounded-t h-[45%]" />
          <div className="w-full bg-[var(--accent)] rounded-t h-[85%]" />
        </div>
      </div>
    ),
  },
  {
    title: "AI Ads & Marketing",
    tag: "GROWTH",
    description: "AI-powered ad creatives and copy designed to stop the scroll and drive conversions.",
    icon: "📣",
    bg: "#FEFCE8",
    visual: (
      <div className="relative w-full h-48 bg-zinc-950 rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-lg border border-yellow-100">
        <div className="text-xs text-white/90 font-bold bg-yellow-500/20 border border-yellow-500/30 px-3 py-1.5 rounded w-fit uppercase tracking-wider">
          AI Campaign
        </div>
        <div className="text-xs text-zinc-400 leading-relaxed mt-4">
          Conversion rate optimized by <span className="text-yellow-400 font-bold text-sm">2.4x</span> using automated smart targeting.
        </div>
      </div>
    ),
  },
  {
    title: "Portfolio & Resume Sites",
    tag: "QUICK TURNAROUND",
    description: "Stand out from the crowd with a minimal, professional site that gets you callbacks and clients.",
    icon: "🌐",
    bg: "#FFF0F3",
    visual: (
      <div className="relative w-full h-48 bg-white/70 rounded-xl p-5 flex flex-col justify-between overflow-hidden border border-pink-100 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-pink-100" />
          <div className="w-20 h-2.5 bg-pink-200 rounded" />
        </div>
        <div className="space-y-2 my-auto">
          <div className="w-full h-2.5 bg-zinc-100 rounded" />
          <div className="w-5/6 h-2.5 bg-zinc-100 rounded" />
        </div>
        <div className="flex justify-end">
          <div className="text-[10px] font-bold text-white bg-pink-500 px-3 py-1 rounded-full">Explore</div>
        </div>
      </div>
    ),
  },
];

function ServiceStackCard({ service, index, total, scrollYProgress }: { service: Service, index: number, total: number, scrollYProgress: MotionValue<number> }) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;

  // Map progress to numerical percent values to avoid Framer Motion string interpolation bugs
  const yVal = useTransform(
    scrollYProgress,
    [start - segmentSize, start, end],
    [100, 0, 0],
    { clamp: true }
  );

  const y = useTransform(yVal, (v) => `${v}%`);

  const scale = useTransform(
    scrollYProgress,
    [start, end, end + segmentSize],
    [1, 1, 1 - (total - index) * 0.04],
    { clamp: true }
  );

  const brightness = useTransform(
    scrollYProgress,
    [start, end, end + segmentSize],
    [1, 1, 0.85],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: index * 16,
        left: 0,
        right: 0,
        y,
        scale,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        zIndex: index + 1,
        transformOrigin: 'top center',
        borderRadius: '24px',
        padding: '3rem',
        minHeight: '360px',
        backgroundColor: service.bg,
        border: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        willChange: 'transform',
      }}
    >
      <div style={{ maxWidth: '500px' }}>
        <span style={{ fontSize: '2rem' }}>{service.icon}</span>
        <div style={{
          display: 'inline-block',
          marginLeft: '1rem',
          background: 'white',
          borderRadius: '50px',
          padding: '4px 14px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#1a1a1a',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}>
          {service.tag}
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2.8rem',
          marginTop: '1rem',
          marginBottom: '1rem',
          fontWeight: 800,
          color: '#1a1a1a',
          lineHeight: 1.1,
        }}>
          {service.title}
        </h3>
        <p style={{ color: '#6B6B6B', fontSize: '1.05rem', lineHeight: 1.7 }}>
          {service.description}
        </p>
        <a href="#contact" style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          fontWeight: 600,
          fontSize: '0.95rem',
          color: '#1B4FFF',
          textDecoration: 'none',
          position: 'relative',
        }}
          className="service-cta-link"
        >
          Get This Service &rarr;
        </a>
      </div>

      <div style={{ width: '260px', flexShrink: 0 }}>
        {service.visual}
      </div>
    </motion.div>
  );
}

function MobileServiceCard({ service }: { service: Service }) {
  return (
    <div style={{
      backgroundColor: service.bg,
      borderRadius: '24px',
      padding: '2rem',
      border: '1px solid rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>{service.icon}</span>
          <span style={{
            background: 'white',
            borderRadius: '50px',
            padding: '4px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#1a1a1a',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}>
            {service.tag}
          </span>
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2rem',
          fontWeight: 800,
          color: '#1a1a1a',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          {service.title}
        </h3>
        <p style={{ color: '#6B6B6B', fontSize: '1rem', lineHeight: 1.6 }}>
          {service.description}
        </p>
        <a href="#contact" className="service-cta-link" style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          fontWeight: 600,
          fontSize: '0.95rem',
          color: '#1B4FFF',
          textDecoration: 'none',
          position: 'relative',
        }}>
          Get This Service &rarr;
        </a>
      </div>
      <div>
        {service.visual}
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const init = () => setMounted(true);
    init();
  }, []);

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      scrollYProgress.set(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYProgress]);

  const currentIndex = useTransform(scrollYProgress, (v) => {
    const idx = Math.min(services.length - 1, Math.floor(v * services.length));
    const formattedIdx = idx + 1 < 10 ? `0${idx + 1}` : idx + 1;
    const formattedTotal = services.length < 10 ? `0${services.length}` : services.length;
    return `${formattedIdx} / ${formattedTotal}`;
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: mounted && isMobile ? 'auto' : `calc(100vh + ${services.length * 500}px)`,
        padding: mounted && isMobile ? '80px 24px' : '0',
        backgroundColor: '#F8F7F4',
      }}
    >
      {!mounted ? (
        <div style={{ opacity: 0 }} />
      ) : isMobile ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a' }}>
              What I Can Build For You
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {services.map((s, i) => <MobileServiceCard key={i} service={s} />)}
          </div>
        </>
      ) : (
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 100 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 800, color: '#1a1a1a' }}>
              What I Can Build For You
            </h2>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '860px', height: '420px' }}>
            <motion.div style={{
              position: 'absolute',
              top: '-2.5rem',
              right: '0',
              fontSize: '0.85rem',
              color: '#6B6B6B',
              fontFamily: 'sans-serif',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              {currentIndex}
            </motion.div>

            {services.map((service, i) => (
              <ServiceStackCard
                key={i}
                service={service}
                index={i}
                total={services.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
