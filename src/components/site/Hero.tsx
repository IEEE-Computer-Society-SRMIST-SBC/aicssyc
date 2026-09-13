import { motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Cpu,
  Clock
} from "lucide-react";
import { HeroCanvas3D } from "./HeroCanvas3D";
import { Countdown } from "./Countdown";
import { GICAnnouncementAnimation } from "./GICAnnouncementAnimation";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden text-white bg-[#060D0A]">
      {/* Interactive 3D Particle Constellation WebGL Canvas (15% Opacity) */}
      <HeroCanvas3D />

      {/* Subtle Ambient Glow Highlights (Constrained to prevent mobile overflow) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] lg:w-[700px] h-[320px] sm:h-[600px] lg:h-[700px] bg-emerald-500/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none glow-emerald-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-[#E2B767]/5 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none glow-gold-pulse" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column Editorial Content (Ordered 1->4) */}
          <div className="flex flex-col items-start">


            {/* 1. Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-pill border border-white/10 text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest text-[#E2B767] mb-5 sm:mb-8"
            >
              <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500" />
              </span>
              <span className="text-white/90 font-medium uppercase">IEEE COMPUTER SOCIETY</span>
              <span className="text-white/30">•</span>
              <span className="text-[#E2B767] font-bold uppercase">ALL INDIA SYP CONGRESS</span>
            </motion.div>

            {/* 2. Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-7xl font-serif leading-[1.05] sm:leading-[0.98] lg:leading-[0.95] tracking-tight text-white"
            >
              <span className="tracking-tight block">AICSSYC 2026</span>
              <span className="font-editorial italic font-semibold text-[#E2B767]">
                Where Agents
              </span>{" "}
              <span className="text-white font-semibold">Meet Humans.</span>
            </motion.h1>

            {/* 3. Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/70 max-w-xl font-sans leading-relaxed"
            >
              India's premier gathering of student leaders, young professionals, and AI researchers.
              Convening at SRMIST, Chennai to shape the next era of autonomous systems and human-AI
              synergy.
            </motion.p>

            {/* 4. Primary & Secondary CTA Buttons: Full-width stacked on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 sm:mt-8 w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5"
            >
              <a
                href="#tickets"
                className="w-full sm:w-auto min-h-[44px] bg-[#E2B767] hover:bg-[#d6aa5a] text-[#060D0A] font-semibold px-6 py-3 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(226,183,103,0.3)] hover:shadow-[0_0_30px_rgba(226,183,103,0.5)] group active:scale-[0.98]"
              >
                <span>Get Passes</span>
                <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
              </a>

              <a
                href="#agenda"
                className="w-full sm:w-auto min-h-[44px] btn-secondary-glass px-6 py-3 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-white/15 text-white hover:bg-white/10 active:scale-[0.98]"
              >
                <span>Explore Schedule</span>
              </a>
            </motion.div>
          </div>

          {/* 5. Right Column: Glassmorphic Countdown Card (Positioned with breathing room for rocket landing) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="relative w-full mt-16 sm:mt-20 lg:mt-24"
          >
            {/* Cinematic Paper Rocket & GIC Reveal Micro-Interaction */}
            <GICAnnouncementAnimation />

            {/* Background Soft Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-[#E2B767]/20 to-emerald-500/20 blur-xl opacity-50 float-slow" />

            <div className="relative backdrop-blur-xl bg-[#0A1612]/70 rounded-3xl p-4 sm:p-6 border border-white/10 float-slow shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[#E2B767] animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/90">
                    ⚡ CONGRESS COUNTDOWN
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-[#E2B767]/15 text-[#E2B767] border border-[#E2B767]/30">
                  OCT 2026
                </span>
              </div>

              {/* Countdown Strip Component */}
              <div className="py-2 sm:py-3">
                <Countdown />
              </div>

              {/* Bottom Sub-stats Row (wrap or horizontal chip bar) */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-white/10 text-xs font-mono text-white/90 gap-2">
                <div className="flex items-center gap-1.5 justify-center">
                  <Users size={15} className="text-[#E2B767]" />
                  <span>
                    300+ <span className="text-white/40">Participants</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <Cpu size={15} className="text-[#E2B767]" />
                  <span>
                    6 <span className="text-white/40">Tracks</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <Clock size={15} className="text-[#E2B767]" />
                  <span>
                    4 <span className="text-white/40">Days</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sleek Unified Horizontal Event Metadata Bar (Bottom Hero) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20 flex justify-center w-full"
        >
          <div className="glass-pill rounded-2xl sm:rounded-full py-3 sm:py-3.5 px-4 sm:px-6 md:px-8 border border-white/10 shadow-xl flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-white/90 font-medium bg-[#060D0A]/70 backdrop-blur-md">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin size={14} className="text-[#E2B767]" />
              <span>SRMIST, Chennai</span>
            </div>

            <div className="h-3.5 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar size={14} className="text-[#E2B767]" />
              <span>Oct 8–11, 2026</span>
            </div>

            <div className="h-3.5 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>IEEE CS Approved</span>
            </div>

            <div className="h-3.5 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-1.5 sm:gap-2 text-white/80">
              <Users size={14} className="text-[#E2B767]" />
              <span>300+ Participants</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
