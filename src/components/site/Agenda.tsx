import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import timelineData from "@/data/timeline.json";

const days = timelineData.days;

// --- Time Utilities ---
function parseSingleTime(str: string) {
  const match = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let [_, h, m, ampm] = match;
  let hours = parseInt(h);
  let minutes = parseInt(m);
  if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
  if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function parseTimeRange(timeStr: string) {
  const parts = timeStr.split(/[-–]/).map(s => s.trim());
  const start = parseSingleTime(parts[0]);
  const end = parts.length > 1 ? parseSingleTime(parts[1]) : start + 60;
  return { start, end };
}

// --- Layout Constants ---
const PPM = 8; // Pixels per minute - generous spacing for vertical
const TRUNK_X = 60; // X position of the main trunk (mobile friendly)
const TRUNK_X_DESKTOP = 120;
const TRACK_WIDTH = 280; // Width of each track lane
const PADDING_MINS = 45; // Padding at start and end of timeline

export function Agenda() {
  const [activeDay, setActiveDay] = useState(0);

  // --- Process Events ---
  const { processedEvents, minTime, maxTime, totalTracks } = useMemo(() => {
    const blocks = days[activeDay].blocks;
    let min = Infinity;
    let max = -Infinity;

    const parsedBlocks = blocks.map((block, idx) => {
      const { start, end } = parseTimeRange(block.time);
      min = Math.min(min, start);
      max = Math.max(max, end);
      return { originalIndex: idx, block, start, end };
    });

    // Sort by start time, then duration
    parsedBlocks.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return (b.end - b.start) - (a.end - a.start);
    });

    const tracks: (typeof parsedBlocks[0] & { trackIndex: number })[][] = [];
    
    for (const pb of parsedBlocks) {
      let placed = false;
      for (let i = 0; i < tracks.length; i++) {
        const lastEvent = tracks[i][tracks[i].length - 1];
        // Ensure visual padding between events on the same track
        // 15 minutes of padding = 120px gap
        if (lastEvent.end + 15 <= pb.start) {
          tracks[i].push({ ...pb, trackIndex: i });
          placed = true;
          break;
        }
      }
      if (!placed) {
        tracks.push([{ ...pb, trackIndex: tracks.length }]);
      }
    }

    return {
      processedEvents: tracks.flat().sort((a, b) => a.originalIndex - b.originalIndex),
      minTime: min,
      maxTime: max,
      totalTracks: tracks.length
    };
  }, [activeDay]);

  // --- Layout Calculations ---
  const containerHeight = (maxTime - minTime + PADDING_MINS * 2) * PPM;
  
  function getCoord(time: number) {
    return (time - minTime + PADDING_MINS) * PPM;
  }

  return (
    <section id="agenda" className="relative scroll-mt-24 sm:scroll-mt-32 py-24 overflow-hidden bg-[#050505]">
      {/* Premium Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 uppercase tracking-[0.2em] mb-6"
          >
            <Calendar size={14} />
            <span>Schedule</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight"
          >
            Organic <span className="font-editorial italic font-normal text-emerald-400">Flow</span>
          </motion.h2>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {days.map((day, idx) => (
            <button
              key={day.label}
              onClick={() => setActiveDay(idx)}
              className={`relative px-6 py-3 rounded-full text-sm transition-all duration-500 ${
                activeDay === idx ? "text-black" : "text-white/40 hover:text-white/80"
              }`}
            >
              {activeDay === idx && (
                <motion.div
                  layoutId="activeDayTab"
                  className="absolute inset-0 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center gap-1">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${activeDay === idx ? 'text-emerald-950/70' : 'text-white/30'}`}>
                  {day.label}
                </span>
                <span className="font-medium text-sm sm:text-base tracking-wide">
                  {day.date.split(" ")[0]} {day.date.split(" ")[1]}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* The Vertical Flowing Timeline Area */}
        <div className="relative w-full max-w-5xl mx-auto custom-scrollbar overflow-x-auto pb-12">
          {/* Header Info */}
          <div className="sticky left-0 min-w-[max-content] mb-12 px-4 sm:px-12 flex items-center gap-4 text-emerald-400/80">
            <Sparkles size={18} />
            <h3 className="text-xl font-serif text-white">{days[activeDay].title}</h3>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="flex items-center gap-1.5 text-sm font-mono tracking-wide">
              <MapPin size={14} />
              <span>{days[activeDay].venue}</span>
            </div>
          </div>

          {/* SVG Canvas & Cards Container */}
          <div 
            className="relative"
            style={{ 
              height: `${containerHeight}px`, 
              minWidth: `${TRUNK_X_DESKTOP + totalTracks * TRACK_WIDTH}px` 
            }}
          >
            {/* SVG Flow lines */}
            <svg 
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <linearGradient id="trunk-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0" />
                  <stop offset="10%" stopColor="#34d399" stopOpacity="0.8" />
                  <stop offset="90%" stopColor="#34d399" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur1" />
                  <feGaussianBlur stdDeviation="6" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <AnimatePresence mode="wait">
                <motion.g
                  key={`svg-lines-${activeDay}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Main Trunk Line */}
                  <motion.path
                    d={`M ${TRUNK_X_DESKTOP} 0 L ${TRUNK_X_DESKTOP} ${containerHeight}`}
                    fill="none"
                    stroke="url(#trunk-glow)"
                    strokeWidth="2"
                    filter="url(#neon-glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Branch Lines */}
                  {processedEvents.filter(e => e.trackIndex > 0).map((ev, idx) => {
                    const s = getCoord(ev.start);
                    const e = getCoord(ev.end);
                    const x = TRUNK_X_DESKTOP + ev.trackIndex * TRACK_WIDTH;
                    const cy = Math.min(80, (e - s) / 2); // Curve control length

                    const path = `
                      M ${TRUNK_X_DESKTOP} ${s}
                      C ${TRUNK_X_DESKTOP} ${s + cy/2}, ${x} ${s + cy/2}, ${x} ${s + cy}
                      L ${x} ${e - cy}
                      C ${x} ${e - cy/2}, ${TRUNK_X_DESKTOP} ${e - cy/2}, ${TRUNK_X_DESKTOP} ${e}
                    `;

                    return (
                      <motion.path
                        key={`branch-${idx}`}
                        d={path}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeOpacity="0.7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                      />
                    );
                  })}
                </motion.g>
              </AnimatePresence>
            </svg>

            {/* Event Cards & Nodes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cards-${activeDay}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {processedEvents.map((ev, idx) => {
                  const s = getCoord(ev.start);
                  const e = getCoord(ev.end);
                  const x = TRUNK_X_DESKTOP + ev.trackIndex * TRACK_WIDTH;
                  const cy = ev.trackIndex > 0 ? Math.min(80, (e - s) / 2) : 0;
                  
                  // Card positions
                  const cardTop = s + cy;
                  const cardLeft = x + 30; // 30px offset from the line
                  
                  return (
                    <motion.div key={`event-${idx}`}>
                      {/* Node at split point (on trunk) */}
                      {ev.trackIndex > 0 && (
                        <div 
                          className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                          style={{ top: `${s - 4}px`, left: `${TRUNK_X_DESKTOP - 4}px` }}
                        />
                      )}
                      
                      {/* Node at merge point (on trunk) */}
                      {ev.trackIndex > 0 && (
                        <div 
                          className="absolute w-2 h-2 rounded-full bg-white/50"
                          style={{ top: `${e - 4}px`, left: `${TRUNK_X_DESKTOP - 4}px` }}
                        />
                      )}

                      {/* Node next to card */}
                      <div 
                        className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] border-2 border-black"
                        style={{ top: `${cardTop - 1}px`, left: `${x - 5}px` }}
                      />

                      {/* Event Card */}
                      <motion.div
                        className="absolute p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-900/10 transition-all duration-300 group"
                        style={{ 
                          top: `${cardTop}px`, 
                          left: `${cardLeft}px`, 
                          width: `${TRACK_WIDTH - 50}px` 
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400/90 tracking-wider">
                            <Clock size={12} className="opacity-70" />
                            <span>{ev.block.time}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 uppercase tracking-widest group-hover:border-emerald-500/20 group-hover:text-emerald-300/80 transition-colors">
                            {ev.block.kind}
                          </span>
                        </div>
                        <h4 className="text-lg font-serif text-white/90 leading-tight mb-2 group-hover:text-white transition-colors">
                          {ev.block.title}
                        </h4>
                        
                        {/* Optional subtle duration line */}
                        <div className="absolute left-0 top-12 bottom-5 w-px bg-gradient-to-b from-emerald-500/30 to-transparent -ml-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
