type LogoProps = {
  iconOnly?: boolean;
};

export default function Logo({ iconOnly = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-violet-500/20" />
        <svg
          viewBox="0 0 64 64"
          className="relative h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M46 20C42.5 14.5 37.8 12 32 12C22.6 12 16 19.1 16 28.5V36"
            stroke="url(#grad1)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M18 37V44C18 46.2 19.8 48 22 48H24V33H22C19.8 33 18 34.8 18 37Z"
            stroke="url(#grad2)"
            strokeWidth="3.5"
            fill="rgba(255,255,255,0.03)"
          />
          <path
            d="M46 37V44C46 46.2 44.2 48 42 48H40V33H42C44.2 33 46 34.8 46 37Z"
            stroke="url(#grad3)"
            strokeWidth="3.5"
            fill="rgba(255,255,255,0.03)"
          />
          <path
            d="M27 25C29 22.5 31.2 21 34.5 21C37.2 21 39.7 22.1 42 24.5"
            stroke="white"
            strokeOpacity="0.9"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad1" x1="16" y1="12" x2="46" y2="36">
              <stop stopColor="#22D3EE" />
              <stop offset="0.55" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="grad2" x1="18" y1="33" x2="24" y2="48">
              <stop stopColor="#22D3EE" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="grad3" x1="40" y1="33" x2="46" y2="48">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className="text-lg font-semibold tracking-wide text-white">
            SoundVerse
          </span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-400">
            Feel Every Frequency
          </span>
        </div>
      )}
    </div>
  );
}
