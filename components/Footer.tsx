import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-[#E5E5E5] bg-[#F8F7F4] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-sm">
      
      {/* Left side */}
      <div className="space-y-4">
        <h3 className="font-heading text-2xl font-extrabold text-zinc-900 tracking-tight">
          Atharva Kale<span className="text-[var(--accent-warm)]">.</span>
        </h3>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <a
            href="https://www.linkedin.com/in/atharvak3000/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-zinc-300">•</span>
          <a
            href="https://github.com/atharvak-3000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Right side */}
      <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest md:text-right">
        © Atharva Kale &bull; 2025 &bull; Freelance Portfolio
      </div>
      
    </footer>
  );
}
