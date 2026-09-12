import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Trophy, ExternalLink, Sparkles, Calendar } from "lucide-react";
import { congressAgenda } from "@/data/agenda";

export function Agenda() {
  const [activeDayIndex, setActiveDayIndex] = useState(0); // Default to Day 1 (8 October)
  const currentDay = congressAgenda[activeDayIndex] || congressAgenda[0];

  return (
    <section
      id="agenda"
      className="relative w-full py-12 sm:py-20 px-3.5 sm:px-6 lg:px-8 bg-[#040D09] text-emerald-50 overflow-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] bg-emerald-600/10 blur-[100px] sm:blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[450px] h-[250px] bg-amber-500/5 blur-[90px] sm:blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-amber-300 bg-emerald-950/60 border border-emerald-500/25 mb-3 shadow-md shadow-emerald-950/50"
          >
            <Calendar size={12} className="text-amber-400" />
            <span>FOUR DAYS OF CONVERGENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white"
          >
            Congress{" "}
            <span className="font-editorial italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 font-normal">
              Schedule
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base text-white/70 max-w-xl mx-auto text-center mt-2.5 font-sans leading-relaxed font-normal"
          >
            8–11 October 2026 · TP Ganesan Auditorium &amp; SRMIST Campuses, Chennai
          </motion.p>
        </div>

        {/* Horizontal Day Tabs (Mobile Scrollable + Desktop Centered) */}
        <div className="flex sm:justify-center overflow-x-auto snap-x snap-mandatory no-scrollbar gap-2 pb-3 mb-6 sm:mb-10 -mx-3.5 px-3.5 sm:mx-0">
          {congressAgenda.map((day, idx) => {
            const isActive = activeDayIndex === idx;
            const isDay2 = day.dayNumber === 2;

            return (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`snap-start shrink-0 min-w-[130px] sm:min-w-[155px] py-2.5 px-3 sm:px-4 rounded-xl text-left sm:text-center transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-b from-[#0e2c21] via-[#09241B] to-[#061912] border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40 text-white"
                    : "bg-[#06150F]/70 border-emerald-900/30 hover:border-emerald-700/50 text-neutral-400"
                }`}
              >
                <div className="flex items-center justify-between sm:justify-center gap-1.5">
                  <span
                    className={`text-[9px] font-mono tracking-widest uppercase font-semibold ${
                      isActive ? "text-amber-300" : "text-amber-400/70"
                    }`}
                  >
                    DAY 0{day.dayNumber}
                  </span>
                  {isDay2 && (
                    <span
                      className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full border uppercase font-semibold ${
                        isActive
                          ? "bg-amber-400/25 text-amber-300 border-amber-400/50"
                          : "bg-amber-400/10 text-amber-300/80 border-amber-400/30"
                      }`}
                    >
                      FLAGSHIP
                    </span>
                  )}
                </div>
                <div
                  className={`text-xs sm:text-sm font-serif font-medium mt-0.5 tracking-tight truncate ${
                    isActive ? "text-white" : "text-neutral-300"
                  }`}
                >
                  {day.date.split("2026")[0].trim()}
                </div>
              </button>
            );
          })}
        </div>

        {/* Day Header Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.dayNumber}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl p-4 sm:p-6 mb-6 sm:mb-10 bg-[#071912]/80 border border-emerald-800/25 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.18em] font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                    Day {currentDay.dayNumber} of 4
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-amber-400/80 uppercase">
                    • {currentDay.date}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-serif font-normal text-white tracking-tight leading-tight">
                  {currentDay.title.includes("&") ? (
                    <>
                      {currentDay.title.split("&")[0].trim()}
                      <span className="font-serif italic font-normal text-amber-300/90 mx-1.5 sm:mx-2">&amp;</span>
                      {currentDay.title.split("&")[1].trim()}
                    </>
                  ) : (
                    currentDay.title
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans text-neutral-300 bg-[#0A1D16] border border-emerald-900/50">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{currentDay.venue}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main Timeline Spine */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.dayNumber + "-list"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative pl-7 sm:pl-24 space-y-4 sm:space-y-6"
          >
            {/* Continuous vertical tracking line */}
            <div className="absolute left-2.5 sm:left-[72px] top-3 bottom-3 w-[1px] bg-emerald-800/30" />

            {currentDay.items.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline Indicator Dot */}
                <div
                  className={`absolute -left-[23px] sm:-left-[30px] top-4 w-2.5 h-2.5 rounded-full border-2 transition-transform z-10 ${
                    item.isFeatured
                      ? "border-amber-400 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                      : "border-emerald-400 bg-[#040D09] group-hover:scale-125 group-hover:border-amber-300"
                  }`}
                />

                {/* Desktop-only outer anchor label */}
                {item.timelineAnchor && (
                  <span className="hidden sm:block absolute -left-24 top-3.5 text-[11px] font-mono text-neutral-400 text-right w-16 uppercase tracking-wider">
                    {item.timelineAnchor}
                  </span>
                )}

                {/* Event Card */}
                <div
                  className={`rounded-xl p-4 sm:p-5 transition-all duration-200 ${
                    item.isFeatured
                      ? "bg-gradient-to-br from-amber-500/15 via-[#0A2218] to-[#061811] border-2 border-amber-400/50 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/20"
                      : "bg-[#071711]/85 border border-emerald-900/30 hover:border-emerald-500/30"
                  }`}
                >
                  {/* Mobile & Desktop Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-amber-300 font-semibold tracking-wide">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.timeRange}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.badge && (
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/35 px-2 py-0.5 rounded-full whitespace-nowrap">
                          <Trophy className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                          <span>{item.badge}</span>
                        </span>
                      )}
                      <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.14em] font-semibold px-2 py-0.5 rounded border ${getTagStyle(item.tag)}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h4
                    className={`text-sm sm:text-base font-sans font-medium tracking-tight leading-snug ${
                      item.isFeatured
                        ? "text-amber-100 font-semibold text-base sm:text-lg"
                        : "text-neutral-100"
                    }`}
                  >
                    {item.title}
                  </h4>

                  {item.subtitle && (
                    <p className="text-xs text-emerald-200/70 mt-1 leading-relaxed font-sans font-normal">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Mobile-Friendly Full-Width CTA */}
                  {item.registrationUrl && (
                    <div className="mt-3.5 pt-3 border-t border-amber-400/20">
                      <a
                        href={item.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span>Register Your Chapter</span>
                        <ExternalLink className="w-3.5 h-3.5 text-black shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/** Helper for styling tag pills */
function getTagStyle(tag: string): string {
  switch (tag.toUpperCase()) {
    case "KEYNOTE":
    case "CEREMONY":
      return "border-amber-400/40 bg-amber-400/15 text-amber-300";
    case "PRESENTATIONS":
    case "SUMMIT":
      return "border-amber-400/50 bg-amber-500/20 text-amber-300";
    case "PANEL":
    case "TECHNICAL":
    case "SESSIONS":
      return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
    case "DINNER":
    case "EVENT":
      return "border-purple-400/40 bg-purple-500/15 text-purple-300";
    case "BREAK":
      return "border-white/20 bg-white/5 text-white/60";
    case "TRAVEL":
    case "ARRIVAL":
    case "REPORTING":
    case "SETUP":
    case "REGISTRATION":
    default:
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  }
}
