import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  User,
  Trophy,
  Compass,
  Cpu,
  MessageSquare,
  Mic,
  Tag,
  Music,
} from "lucide-react";
import { timelineData, ScheduleItem, DaySchedule } from "@/data/timelineData";

function getCategoryConfig(category?: ScheduleItem["category"]) {
  switch (category) {
    case "keynote":
      return {
        label: "Keynote",
        icon: Mic,
        badgeClass: "text-amber-300 bg-amber-400/10 border-amber-400/30",
        dotColor: "border-amber-400 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]",
      };
    case "workshop":
      return {
        label: "Workshop",
        icon: Cpu,
        badgeClass: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
        dotColor: "border-cyan-400 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
      };
    case "panel":
      return {
        label: "Panel Discussion",
        icon: MessageSquare,
        badgeClass: "text-purple-300 bg-purple-500/10 border-purple-500/30",
        dotColor: "border-purple-400 bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]",
      };
    case "competition":
      return {
        label: "Challenge",
        icon: Trophy,
        badgeClass: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        dotColor: "border-amber-400 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]",
      };
    case "networking":
      return {
        label: "Networking",
        icon: Sparkles,
        badgeClass: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
        dotColor: "border-emerald-400 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
      };
    case "excursion":
      return {
        label: "Excursion",
        icon: Compass,
        badgeClass: "text-teal-300 bg-teal-500/10 border-teal-500/30",
        dotColor: "border-teal-400 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]",
      };
    case "general":
    default:
      return {
        label: "General",
        icon: Clock,
        badgeClass: "text-neutral-300 bg-white/5 border-white/10",
        dotColor: "border-emerald-500/60 bg-[#040D09]",
      };
  }
}

function ScheduleCard({ item }: { item: ScheduleItem }) {
  const config = getCategoryConfig(item.category);
  const CategoryIcon = config.icon;
  const isHighPriority =
    Boolean(item.tag) ||
    item.category === "keynote" ||
    item.category === "panel" ||
    item.category === "competition";

  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between ${
        isHighPriority
          ? "bg-gradient-to-br from-[#092218]/90 via-[#071912]/90 to-[#040E0A]/95 border border-amber-400/30 hover:border-amber-400/60 shadow-lg shadow-black/40 hover:shadow-amber-500/10"
          : "bg-[#061811]/80 hover:bg-[#082017]/90 border border-emerald-900/40 hover:border-emerald-600/40 shadow-md shadow-black/30"
      }`}
    >
      <div>
        {/* Top Meta: Time + Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-amber-300 font-semibold tracking-wide">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{item.time}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {item.tag && (
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 border border-amber-400/40 shadow-sm">
                <Tag className="w-2.5 h-2.5 text-amber-400" />
                {item.tag}
              </span>
            )}

            <span
              className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${config.badgeClass}`}
            >
              <CategoryIcon className="w-2.5 h-2.5" />
              {config.label}
            </span>
          </div>
        </div>

        {/* Activity Title */}
        <h4
          className={`font-sans text-sm sm:text-base tracking-tight leading-snug ${
            isHighPriority
              ? "font-semibold text-white"
              : "font-medium text-neutral-100"
          }`}
        >
          {item.activity}
        </h4>

        {/* Speaker / Moderator / Resource Person */}
        {item.speaker && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/25 text-xs font-sans text-emerald-200">
            <User className="w-3 h-3 text-[#E2B767] shrink-0" />
            <span className="font-semibold text-[#E2B767]">Speaker:</span>
            <span className="font-medium text-emerald-100">{item.speaker}</span>
          </div>
        )}

        {/* Venue Info */}
        {item.venue && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-300/80">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>{item.venue}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Agenda() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const currentDay: DaySchedule = timelineData[activeDayIndex] || timelineData[0];

  return (
    <section
      id="agenda"
      className="relative w-full py-12 sm:py-20 px-3.5 sm:px-6 lg:px-8 bg-[#040D09] text-emerald-50 overflow-hidden overflow-x-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      <span id="schedule" className="absolute -top-32" />
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[650px] h-[320px] bg-emerald-600/10 blur-[100px] sm:blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[260px] sm:w-[480px] h-[260px] bg-amber-500/5 blur-[90px] sm:blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold text-amber-300 bg-emerald-950/60 border border-emerald-500/25 mb-3 shadow-md shadow-emerald-950/50"
          >
            <Calendar size={13} className="text-amber-400" />
            <span>OFFICIAL 4-DAY EVENT TIMELINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white"
          >
            Congress{" "}
            <span className="font-serif italic text-amber-300">Schedule</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base text-white/70 max-w-xl mx-auto text-center mt-2.5 font-sans leading-relaxed font-normal"
          >
            8–11 October 2026 • T.P Ganesan Auditorium, Hippocrates Hall, Vendhar Square &amp; Mahabalipuram
          </motion.p>
        </div>

        {/* Day Selector Tabs (Mobile Scrollable with Snap) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1 pb-3 mb-6 sm:justify-center">
          {timelineData.map((dayItem, idx) => {
            const isActive = activeDayIndex === idx;

            return (
              <button
                key={dayItem.day}
                onClick={() => setActiveDayIndex(idx)}
                className={`snap-start shrink-0 min-w-[120px] sm:min-w-[155px] p-3 rounded-xl border transition-all duration-200 cursor-pointer text-left sm:text-center ${
                  isActive
                    ? "bg-[#092218] border-amber-400/80 shadow-md shadow-amber-500/15 ring-1 ring-amber-400/40 text-white"
                    : "bg-[#061610]/80 border-emerald-900/30 text-neutral-400 hover:border-emerald-700/50 hover:text-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between sm:justify-center gap-1.5">
                  <span
                    className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
                      isActive ? "text-amber-300" : "text-amber-400/70"
                    }`}
                  >
                    {dayItem.day}
                  </span>
                </div>
                <div
                  className={`text-xs sm:text-sm font-serif font-medium mt-1 tracking-tight truncate ${
                    isActive ? "text-white" : "text-neutral-300"
                  }`}
                >
                  {dayItem.date.split(",")[1]?.trim() || dayItem.date}
                </div>
                <div className="text-[10px] font-sans text-emerald-300/60 hidden sm:block truncate mt-0.5">
                  {dayItem.date.split(",")[0]?.trim()}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Day Header Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl p-4 sm:p-6 mb-6 sm:mb-10 bg-gradient-to-r from-[#071D14]/90 via-[#051710]/90 to-[#040E0A]/95 border border-emerald-800/40 backdrop-blur-md shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.18em] font-bold bg-emerald-950/90 border border-emerald-500/30 text-emerald-300">
                    {currentDay.day} • {currentDay.date.split(",")[0]}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-amber-400/90 uppercase">
                    • {currentDay.date.split(",")[1]?.trim() || currentDay.date}
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
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-emerald-200 bg-[#0A2218] border border-emerald-700/50 px-3.5 py-1.5 rounded-full shadow-sm">
                  <span>📍</span>
                  <span>{currentDay.venueHighlight}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main Schedule List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.day + "-schedule"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative pl-4 sm:pl-6 border-l border-emerald-800/40 space-y-3.5 sm:space-y-4"
          >
            {currentDay.schedule.map((item, itemIdx) => {
              const config = getCategoryConfig(item.category);

              return (
                <div key={`${currentDay.day}-${itemIdx}`} className="relative group">
                  {/* Timeline Indicator Dot */}
                  <div
                    className={`absolute -left-[21px] sm:-left-[29px] top-5 w-2.5 h-2.5 rounded-full border-2 transition-transform z-10 ${config.dotColor}`}
                  />

                  <ScheduleCard item={item} />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
export default Agenda;
