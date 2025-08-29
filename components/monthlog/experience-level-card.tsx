'use client';

import * as React from 'react';
import clsx from 'clsx';

type Props = {
  level: number;
  levelName: string; // "여유로운 도시 유랑자"
  subtitle?: string; // "현재 칭호"
  currentExp: number; // 2340
  maxExp: number; // 3000
  className?: string;
  sticky?: boolean; // default true
};

const pct = (cur: number, max: number) =>
  Math.max(0, Math.min(100, Math.round((cur / Math.max(1, max)) * 100)));

export default function ExperienceLevelCard({
  level,
  levelName,
  subtitle,
  currentExp,
  maxExp,
  className,
  sticky = true,
}: Props) {
  const percent = pct(currentExp, maxExp);

  // animate when in view
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={clsx('organic-card p-4 sm:p-5 md:p-6 rounded-2xl', className)}
      aria-label="Experience level"
    >
      {/* Main row */}
      <div className="flex justify-between items-center gap-4 md:gap-6">
        {/* Left: trophy + level */}
        <div className="flex  items-center gap-3 md:pr-6 md:border-r md:border-black/5">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-md grid place-items-center">
            {/* Trophy icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="white"
                d="M7 2h10v2h3v3a5 5 0 0 1-5 5h-.3A6.5 6.5 0 0 1 13 16v2h2v2H9v-2h2v-2a6.5 6.5 0 0 1-1.7-4H9a5 5 0 0 1-5-5V4h3V2Zm-2 5a3 3 0 0 0 3 3h.4A7 7 0 0 1 7 6H5Zm14-1h-2a7 7 0 0 1-1.4 4H16a3 3 0 0 0 3-3V6Z"
              />
            </svg>
            <span className="absolute -bottom-1 right-0 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-black/25 backdrop-blur">
              Lv.{level}
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-[12px] text-gray-500">레벨</div>
            <div className="text-sm sm:text-base font-semibold text-gray-900">
              Lv.{level}
            </div>
          </div>
        </div>

        {/* Middle: title */}
        {/* <div className="flex-1 min-w-0 md:px-6 md:border-r md:border-black/5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
            {levelName}
          </h3>
          {subtitle && (
            <p className="text-[13px] text-gray-600 truncate">{subtitle}</p>
          )}
        </div> */}

        {/* Right: bar + % */}
        <div className="w-40 sm:w-56">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 sm:h-2.5 bg-gray-100 rounded-full shadow-inner overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: inView ? `${percent}%` : '0%',
                  transition: 'width 700ms cubic-bezier(0.4,0,0.2,1)',
                  background:
                    'linear-gradient(90deg, hsl(var(--primary)) 0%, color-mix(in oklab, hsl(var(--primary)) 75%, white) 100%)',
                }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={maxExp}
                aria-valuenow={currentExp}
                aria-label="EXP progress"
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {percent}%
            </span>
          </div>
          <div
            className="mt-1 text-[13px] font-semibold"
            style={{ color: 'hsl(var(--primary))' }}
          >
            {currentExp} / {maxExp} EXP
          </div>
        </div>
      </div>
    </section>
  );
}
