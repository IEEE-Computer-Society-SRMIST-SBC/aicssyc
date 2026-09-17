import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Calendar, Layers, Sparkles } from "lucide-react";
import { timelineData, ScheduleBlock, DayTimeline } from "@/data/agenda";

type ScheduleSection =
  | { type: "single"; block: ScheduleBlock }
  | { type: "parallel"; left: ScheduleBlock[]; right: ScheduleBlock[] };

function groupScheduleBlocks(blocks: ScheduleBlock[]): ScheduleSection[] {
  const sections: ScheduleSection[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (!block.isParallel) {
      sections.push({ type: "single", block });
      i++;
    } else {
      const parallelBlocks: ScheduleBlock[] = [];
      while (i < blocks.length && blocks[i].isParallel) {
        parallelBlocks.push(blocks[i]);
        i++;
      }
      const left = parallelBlocks.filter((b) => b.parallelSlot === "left");
      const right = parallelBlocks.filter((b) => b.parallelSlot === "right");
      sections.push({ type: "parallel", left, right });
    }
  }
  return sections;
}

function BlockCard({
  block,
  trackLabel,
}: {
  block: ScheduleBlock;
  trackLabel?: string;
}) {
  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between ${
        block.isFeatured
          ? "bg-gradient-to-r from-amber-500/10 via-[#0A2218] to-[#071711] border border-amber-400/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30"
          : "bg-[#071711]/90 border border-emerald-900/40 hover:border-emerald-500/40 shadow-md"
      }`}
    >
      <div>
        {/* Header: Time, Track Label, Prize Badge & Category Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-amber-300 font-semibold tracking-wide">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{block.time}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {trackLabel && (
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/15 text-neutral-300">
                <Layers className="w-2.5 h-2.5 text-emerald-400" />
                {trackLabel}
              </span>
            )}

            {block.badge && (
              <span className="text-[9px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/35 px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm shadow-amber-500/10">
                🏆 {block.badge}
              </span>
            )}

            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
              {block.kind}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4
          className={`font-sans text-sm sm:text-base tracking-tight leading-snug ${
            block.isFeatured
              ? "font-semibold text-amber-100"
              : "font-medium text-neutral-100"
          }`}
        >
          {block.title}
        </h4>

        {/* Subtitle / Description */}
        {block.subtitle && (
          <p className="text-xs sm:text-sm text-emerald-100/75 mt-1.5 leading-relaxed font-sans font-normal">
            {block.subtitle}
          </p>
        )}
      </div>

      {/* Direct Link CTA */}
      {block.registrationUrl && (
        <div className="mt-2 pt-2 border-t border-amber-400/20">
          <a
            href={block.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 mt-3 w-full sm:w-auto px-4 py-2 rounded-full text-xs font-bold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 active:scale-98 transition-all"
          >
            <span>Register Your Chapter</span>
            <span>→</span>
          </a>
        </div>
      )}
    </div>
  );
}

export function Agenda() {
  // Default Active Day: Initialize state to Day 1
  const [activeDay, setActiveDay] = useState(1);
  const currentDay: DayTimeline =
    timelineData.find((d) => d.dayNumber === activeDay) || timelineData[0];
  const sections = groupScheduleBlocks(currentDay.blocks);

  return (
    <section
      id="agenda"
      className="relative w-full py-10 sm:py-16 px-3.5 sm:px-6 lg:px-8 bg-[#040D09] text-emerald-50 overflow-hidden overflow-x-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[650px] h-[320px] bg-emerald-600/10 blur-[100px] sm:blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[260px] sm:w-[480px] h-[260px] bg-amber-500/5 blur-[90px] sm:blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-10">
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
            <span className="font-serif italic text-amber-300">
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

        {/* Day Selector Tabs (Mobile Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1 pb-2 mb-6 sm:justify-center">
          {timelineData.map((day) => {
            const isActive = activeDay === day.dayNumber;
            const isDay2 = day.dayNumber === 2;

            return (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDay(day.dayNumber)}
                className={`snap-start shrink-0 min-w-[110px] sm:min-w-[145px] p-2.5 rounded-xl border transition-all duration-200 cursor-pointer text-left sm:text-center ${
                  isActive
                    ? "bg-[#092218] border-amber-400/80 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/40 text-white"
                    : "bg-[#061610]/80 border-emerald-900/30 text-neutral-400 hover:border-emerald-700/50"
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
            className="rounded-2xl p-4 sm:p-6 mb-6 sm:mb-10 bg-[#071912]/85 border border-emerald-800/30 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.18em] font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                    Day 0{currentDay.dayNumber} of 04
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-amber-400/90 uppercase">
                    • {currentDay.date}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-serif font-normal text-white">
                  {currentDay.title.includes("&") ? (
                    <>
                      {currentDay.title.split("&")[0].trim()}
                      <span className="font-serif italic text-amber-300 mx-1.5">&amp;</span>
                      {currentDay.title.split("&")[1].trim()}
                    </>
                  ) : (
                    currentDay.title
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans text-neutral-300 bg-[#0A1D16] border border-emerald-900/50">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
            className="relative pl-4 sm:pl-6 border-l border-emerald-800/30 space-y-4 sm:space-y-6"
          >
            {sections.map((section, sIdx) => {
              if (section.type === "single") {
                const block = section.block;
                return (
                  <div key={block.id} className="relative group">
                    {/* Timeline Indicator Dot */}
                    <div
                      className={`absolute -left-[21px] sm:-left-[29px] top-5 w-2.5 h-2.5 rounded-full border-2 transition-transform z-10 ${
                        block.isFeatured
                          ? "border-amber-400 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                          : "border-emerald-400 bg-[#040D09] group-hover:scale-125 group-hover:border-amber-300"
                      }`}
                    />

                    <BlockCard block={block} />
                  </div>
                );
              }

              // Parallel Section (Track A & Track B)
              return (
                <div key={`parallel-${sIdx}`} className="relative group">
                  {/* Timeline Indicator Dot */}
                  <div className="absolute -left-[21px] sm:-left-[29px] top-5 w-2.5 h-2.5 rounded-full border-2 border-amber-400 bg-amber-400 shadow-[0_0_8px_#f59e0b] z-10" />

                  {/* Parallel Tracks Container */}
                  <div className="rounded-2xl p-3 sm:p-5 bg-[#05140E]/90 border border-emerald-800/40 shadow-lg">
                    {/* Parallel Header banner */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-emerald-800/30">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300">
                          <Sparkles size={13} />
                        </span>
                        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                          Parallel Sessions Active
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">
                        Choose Your Track
                      </span>
                    </div>

                    {/* Dual Column Layout (Stacked on mobile, 2 cols on md+) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {/* Left Track (Flagship / Summit) */}
                      <div className="space-y-3 flex flex-col">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold px-1">
                          Track A · Flagship &amp; Main Stage
                        </div>
                        {section.left.map((block) => (
                          <BlockCard
                            key={block.id}
                            block={block}
                            trackLabel="Track A"
                          />
                        ))}
                      </div>

                      {/* Right Track (Technical Talks & Cultural) */}
                      <div className="space-y-3 flex flex-col">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 font-semibold px-1">
                          Track B · Technical Talks &amp; Events
                        </div>
                        {section.right.map((block) => (
                          <BlockCard
                            key={block.id}
                            block={block}
                            trackLabel="Track B"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
