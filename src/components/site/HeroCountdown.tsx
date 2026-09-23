import { useState, useEffect } from "react";
import { Zap, Users, Layers, Clock } from "lucide-react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "20",
    hours: "10",
    minutes: "32",
    seconds: "04",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Target: 8 October 2026, 09:00:00 IST
    const targetDate = new Date("2026-10-08T09:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0"),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[420px] mx-auto lg:max-w-none">
      <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-[#081F16]/90 via-[#061811]/90 to-[#040E0A]/95 border border-emerald-500/20 backdrop-blur-xl shadow-2xl shadow-black/60 transition-all duration-300 hover:border-amber-400/30">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-emerald-900/40">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Zap className="w-3.5 h-3.5 fill-amber-400/40 text-amber-400" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] font-semibold text-neutral-200">
              Congress Countdown
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-amber-300 bg-amber-400/10 border border-amber-400/25">
            OCT 2026
          </span>
        </div>

        {/* Digits Grid with Clean Fading Dividers */}
        <div className="grid grid-cols-4 items-center py-5 sm:py-6 text-center relative">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 tabular-nums">
              {isMounted ? timeLeft.days : "20"}
            </span>
            <span className="mt-1 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400/70">
              Days
            </span>
          </div>

          <div className="h-8 sm:h-10 w-[1px] bg-gradient-to-b from-transparent via-emerald-700/40 to-transparent mx-auto absolute left-[25%]" />

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 tabular-nums">
              {isMounted ? timeLeft.hours : "10"}
            </span>
            <span className="mt-1 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400/70">
              Hours
            </span>
          </div>

          <div className="h-8 sm:h-10 w-[1px] bg-gradient-to-b from-transparent via-emerald-700/40 to-transparent mx-auto absolute left-[50%]" />

          {/* Mins */}
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 tabular-nums">
              {isMounted ? timeLeft.minutes : "32"}
            </span>
            <span className="mt-1 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400/70">
              Mins
            </span>
          </div>

          <div className="h-8 sm:h-10 w-[1px] bg-gradient-to-b from-transparent via-emerald-700/40 to-transparent mx-auto absolute left-[75%]" />

          {/* Secs */}
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 tabular-nums">
              {isMounted ? timeLeft.seconds : "04"}
            </span>
            <span className="mt-1 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400/70">
              Secs
            </span>
          </div>
        </div>

        {/* Date & Venue Tag */}
        <div className="py-2.5 px-3 rounded-lg bg-[#05140E]/80 border border-emerald-900/30 text-center mb-3">
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-emerald-300/80">
            8 – 11 OCT 2026 • SRMIST, CHENNAI
          </span>
        </div>

        {/* Bottom Quick Stats */}
        <div className="grid grid-cols-3 gap-1 pt-3 border-t border-emerald-900/40 text-[10px] sm:text-xs font-sans text-neutral-300">
          <div className="flex items-center justify-center gap-1">
            <Users className="w-3 h-3 text-amber-300" />
            <span>300+ Delegates</span>
          </div>
          <div className="flex items-center justify-center gap-1 border-x border-emerald-900/40">
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>6 Pillars</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>4 Days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-export as Countdown for seamless compatibility
export const Countdown = HeroCountdown;
