export function Divider() {
  return (
    <div className="w-full flex justify-center py-8 opacity-10 overflow-hidden pointer-events-none">
      <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none" className="max-w-6xl mx-auto px-6">
        <path
          d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
