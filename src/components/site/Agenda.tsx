import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import timelineData from "@/data/timeline.json";

const days = timelineData.days;

export function Agenda() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section
      id="agenda"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm overflow-hidden text-ivory"
    >
      {/* Ambient glow background */}
      <div className="absolute top-1/3 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-pill border border-[#E2B767]/30 text-[11px] sm:text-xs font-mono text-[#E2B767] uppercase tracking-widest mb-3 sm:mb-4"
          >
            <Calendar size={13} />
            <span>FOUR DAYS OF CONVERGENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight text-balance"
          >
            Congress{" "}
            <span className="font-editorial italic font-normal text-[#E2B767]">Schedule</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto text-center mt-2.5 sm:mt-3 font-sans"
          >
            Oct 8 – 11, 2026 • SRMIST, Kattankulathur, Chennai
          </motion.p>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {days.map((day, idx) => (
            <button
              key={day.label}
              onClick={() => setActiveDay(idx)}
              className={`relative px-4 sm:px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeDay === idx ? "text-ivory" : "text-white/50 hover:text-white/80"
              }`}
            >
              {activeDay === idx && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/80">
                  {day.label}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {day.date.split(" ")[0]} {day.date.split(" ")[1]}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="relative glass-card rounded-3xl p-6 sm:p-10 border border-white/10 max-w-4xl mx-auto min-h-[400px]">
          <div className="mb-10 pb-6 border-b border-white/10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <motion.h3 
                key={`title-${activeDay}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl sm:text-2xl font-serif text-gold-glow"
              >
                {days[activeDay].title}
              </motion.h3>
              <motion.div 
                key={`venue-${activeDay}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-slate-mist"
              >
                <MapPin size={14} className="text-emerald-400" />
                <span>{days[activeDay].venue}</span>
              </motion.div>
            </div>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[11px] sm:left-[140px] top-3 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 sm:space-y-10"
              >
                {days[activeDay].blocks.map((block, bIdx) => (
                  <div key={bIdx} className="relative flex flex-col sm:flex-row gap-2 sm:gap-8 group">
                    {/* Timeline Dot */}
                    <div className="absolute left-[8px] sm:left-[137px] top-[14px] sm:top-[6px] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] ring-4 ring-[#0a0a0a] group-hover:scale-125 transition-transform duration-300 z-10" />
                    
                    {/* Time (Left side on desktop, top on mobile) */}
                    <div className="pl-8 sm:pl-0 sm:w-[120px] sm:text-right shrink-0 pt-3 sm:pt-0.5">
                      <div className="flex items-center sm:justify-end gap-1.5 font-mono text-xs sm:text-sm text-emerald-glow font-medium">
                        <Clock size={12} className="hidden sm:block opacity-70" />
                        <span>{block.time}</span>
                      </div>
                    </div>

                    {/* Content (Right side) */}
                    <div className="pl-8 sm:pl-0 flex-1 pb-1">
                      <h4 className="text-base sm:text-lg font-semibold text-ivory mb-1.5 leading-snug">
                        {block.title}
                      </h4>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-slate-mist uppercase tracking-wider">
                        {block.kind}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
