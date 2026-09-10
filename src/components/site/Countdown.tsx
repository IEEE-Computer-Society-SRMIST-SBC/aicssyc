import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-10-08T00:00:00").getTime();

function getTimeLeft() {
  const now = new Date().getTime();
  const difference = TARGET_DATE - now;
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINS" },
    { value: timeLeft.seconds, label: "SECS" },
  ];

  return (
    <div className="w-full">
      {/* Monospace 4-column Compact Countdown Strip with subtle dividers */}
      <div className="grid grid-cols-4 items-center gap-1 sm:gap-2 py-1">
        {units.map((unit, idx) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center p-1 sm:p-2"
          >
            <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-light text-[#E2B767] tabular-nums tracking-wide sm:tracking-wider select-none drop-shadow-[0_0_12px_rgba(226,183,103,0.18)] flex items-center justify-center">
              <span className="inline-block min-w-[2ch] text-center font-mono tabular-nums">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.18em] text-white/50 uppercase font-medium">
              {unit.label}
            </div>

            {idx < units.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 sm:h-7 w-px bg-white/10" />
            )}
          </div>
        ))}
      </div>

      {/* Clean Date & Venue subtext */}
      <div className="text-center mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/60 font-medium">
          8 – 11 OCT 2026 • SRM IST, CHENNAI
        </span>
      </div>
    </div>
  );
}
