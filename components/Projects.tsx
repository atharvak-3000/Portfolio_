'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from './hooks/useMediaQuery';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  tag: string;
  bg: string;
  textColor: string;
  description: string;
  bullets: string[];
  techTags: string[];
  links: {
    live: string;
    github: string;
  };
  mockVisual: React.ReactNode;
}

const projects: Project[] = [
  {
    title: "AudioScribe",
    tag: "Full-Stack + AI",
    bg: "#E8F4F0",
    textColor: "#1C3D32",
    description: "AI meeting summarizer featuring real-time audio-to-summary conversion.",
    bullets: [
      "Translates raw voice into highly accurate Markdown notes.",
      "Reduces meeting overhead summarizing key points in seconds.",
      "Leverages Gemini API stream processing for real-time output."
    ],
    techTags: ["Next.js", "Gemini API", "Clerk"],
    links: { live: "#", github: "#" },
    mockVisual: (
      <div className="w-full bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
        <div className="bg-zinc-800 px-4 py-2.5 flex items-center gap-1.5 border-b border-zinc-700">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="flex-grow flex justify-center">
            <div className="bg-zinc-900 text-[8px] text-zinc-500 rounded px-4 py-0.5 max-w-[120px] truncate">audioscribe.ai/dashboard</div>
          </div>
        </div>
        <div className="p-4 space-y-3 font-sans text-left">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-ping" />
            <div className="h-3 w-2/3 bg-zinc-700 rounded" />
          </div>
          <div className="space-y-1.5 pl-5">
            <div className="h-2 w-full bg-zinc-800 rounded" />
            <div className="h-2 w-5/6 bg-zinc-800 rounded" />
            <div className="h-2 w-4/5 bg-zinc-800 rounded" />
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <div className="h-3 w-1/3 bg-emerald-950/50 border border-emerald-900/50 rounded p-1 mb-2 text-[6px] text-emerald-400 font-bold uppercase tracking-wider text-center">Summary Complete</div>
            <div className="h-2 w-full bg-zinc-800 rounded" />
            <div className="h-2 w-11/12 bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: "SkillSense",
    tag: "Full-Stack + AI",
    bg: "#EEE8F8",
    textColor: "#3A215C",
    description: "AI resume analyzer providing personalized feedback for job candidates.",
    bullets: [
      "Provides actionable scoring against job description criteria.",
      "Identifies missing high-impact technical keywords instantly.",
      "Improves applicant callbacks using localized suggestions."
    ],
    techTags: ["React", "Tailwind", "AI"],
    links: { live: "#", github: "#" },
    mockVisual: (
      <div className="w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-zinc-100">
        <div className="bg-zinc-50 px-4 py-2.5 flex items-center gap-1.5 border-b border-zinc-100">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="flex-grow flex justify-center">
            <div className="bg-white text-[8px] text-zinc-400 border border-zinc-100 rounded px-4 py-0.5 max-w-[120px] truncate">skillsense.app/upload</div>
          </div>
        </div>
        <div className="p-4 space-y-3 font-sans text-left text-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-50 pb-2">
            <div className="h-3 w-1/4 bg-zinc-100 rounded" />
            <div className="h-4 w-8 bg-purple-100 text-purple-700 font-bold text-[8px] flex items-center justify-center rounded">85%</div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-[10px]">✅</span>
              <div className="h-2 w-5/6 bg-zinc-100 rounded" />
            </div>
            <div className="flex gap-2">
              <span className="text-[10px]">✅</span>
              <div className="h-2 w-4/5 bg-zinc-100 rounded" />
            </div>
            <div className="flex gap-2">
              <span className="text-[10px]">⚠️</span>
              <div className="h-2 w-11/12 bg-zinc-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }
];

function ProjectStackCard({ project, index, total, scrollYProgress }: { project: Project, index: number, total: number, scrollYProgress: MotionValue<number> }) {
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
        top: index * 20,
        left: 0,
        right: 0,
        y,
        scale,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        zIndex: index + 1,
        transformOrigin: 'top center',
        borderRadius: '24px',
        padding: '3rem',
        minHeight: '400px',
        backgroundColor: project.bg,
        border: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        willChange: 'transform',
      }}
    >
      <div style={{ maxWidth: '500px', flex: 1, paddingRight: '2rem' }}>
        <div>
          <span style={{
            display: 'inline-block',
            background: 'white',
            borderRadius: '50px',
            padding: '4px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#1a1a1a',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {project.tag}
          </span>
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '3rem',
          marginTop: '1rem',
          marginBottom: '1rem',
          fontWeight: 800,
          color: project.textColor,
          lineHeight: 1.1,
        }}>
          {project.title}
        </h3>
        <p style={{ color: '#444', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        <ul style={{ marginBottom: '1.5rem', listStyle: 'none', padding: 0 }}>
          {project.bullets.map((bullet: string, i: number) => (
            <li key={i} style={{ display: 'flex', gap: '0.5rem', color: '#555', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--accent)' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {project.techTags.map((tech: string, i: number) => (
            <span key={i} style={{
              background: 'rgba(255,255,255,0.6)',
              padding: '4px 12px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#333',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={project.links.live} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--accent)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '0.85rem',
            textDecoration: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Live Demo <ArrowUpRight style={{ width: '14px', height: '14px' }} />
          </a>
          <a href={project.links.github} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'white',
            color: '#333',
            border: '1px solid #ddd',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '0.85rem',
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <GithubIcon style={{ width: '14px', height: '14px' }} /> GitHub
          </a>
        </div>
      </div>

      <div style={{ width: '320px', flexShrink: 0 }}>
        {project.mockVisual}
      </div>
    </motion.div>
  );
}

function MobileProjectCard({ project }: { project: Project }) {
  return (
    <div style={{
      backgroundColor: project.bg,
      borderRadius: '24px',
      padding: '2rem',
      border: '1px solid rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'white',
            borderRadius: '50px',
            padding: '4px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#1a1a1a',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {project.tag}
          </span>
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2rem',
          marginBottom: '1rem',
          fontWeight: 800,
          color: project.textColor,
          lineHeight: 1.1,
        }}>
          {project.title}
        </h3>
        <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        <ul style={{ marginBottom: '1.5rem', listStyle: 'none', padding: 0 }}>
          {project.bullets.map((bullet: string, i: number) => (
            <li key={i} style={{ display: 'flex', gap: '0.5rem', color: '#555', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--accent)' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {project.techTags.map((tech: string, i: number) => (
            <span key={i} style={{
              background: 'rgba(255,255,255,0.6)',
              padding: '4px 12px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#333',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <a href={project.links.live} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--accent)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '0.85rem',
            textDecoration: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Live Demo <ArrowUpRight style={{ width: '14px', height: '14px' }} />
          </a>
          <a href={project.links.github} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'white',
            color: '#333',
            border: '1px solid #ddd',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '0.85rem',
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <GithubIcon style={{ width: '14px', height: '14px' }} /> GitHub
          </a>
        </div>
      </div>

      <div>
        {project.mockVisual}
      </div>
    </div>
  );
}

export default function Projects() {
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
    const idx = Math.min(projects.length - 1, Math.floor(v * projects.length));
    const formattedIdx = idx + 1 < 10 ? `0${idx + 1}` : idx + 1;
    const formattedTotal = projects.length < 10 ? `0${projects.length}` : projects.length;
    return `${formattedIdx} / ${formattedTotal}`;
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: mounted && isMobile ? 'auto' : `calc(100vh + ${projects.length * 600}px)`,
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
              Client Projects
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projects.map((p, i) => <MobileProjectCard key={i} project={p} />)}
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
              Client Projects
            </h2>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', height: '480px' }}>
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

            {projects.map((project, i) => (
              <ProjectStackCard
                key={i}
                project={project}
                index={i}
                total={projects.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
