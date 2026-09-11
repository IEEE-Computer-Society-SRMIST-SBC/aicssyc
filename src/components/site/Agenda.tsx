import { useState, useEffect, useMemo } from "react";
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
  if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function parseTimeRange(timeStr: string) {
  const parts = timeStr.split(/[-–]/).map((s) => s.trim());
  const start = parseSingleTime(parts[0]);
  const end = parts.length > 1 ? parseSingleTime(parts[1]) : start + 60;
  return { start, end };
}

// --- Layout Constants ---
const PPM_DESKTOP = 4; // Pixels per minute
const PPM_MOBILE = 3;
const MAIN_AXIS_DESKTOP = 120; // Y position of main trunk on desktop
const MAIN_AXIS_MOBILE = 60; // X position of main trunk on mobile
const TRACK_SPACING_DESKTOP = 180; // Y offset for branches on desktop
const TRACK_SPACING_MOBILE = 200; // X offset for branches on mobile
const PADDING_MINS = 60;

export function Agenda() {
  const [activeDay, setActiveDay] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

    // Greedy interval scheduling for tracks
    parsedBlocks.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return b.end - b.start - (a.end - a.start); // Longest first
    });

    const tracks: ((typeof parsedBlocks)[0] & { trackIndex: number })[][] = [];

    for (const pb of parsedBlocks) {
      let placed = false;
      for (let i = 0; i < tracks.length; i++) {
        const lastEvent = tracks[i][tracks[i].length - 1];
        // Allow placing in same track if it starts exactly when the last one ends (or later)
        if (lastEvent.end <= pb.start) {
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
      totalTracks: tracks.length,
    };
  }, [activeDay]);

  // --- Layout Calculations ---
  const PPM = isMobile ? PPM_MOBILE : PPM_DESKTOP;
  const MAIN_AXIS = isMobile ? MAIN_AXIS_MOBILE : MAIN_AXIS_DESKTOP;
  const TRACK_SPACING = isMobile ? TRACK_SPACING_MOBILE : TRACK_SPACING_DESKTOP;

  const containerSize = (maxTime - minTime + PADDING_MINS * 2) * PPM;
  const crossSize = MAIN_AXIS + (totalTracks > 0 ? (totalTracks - 1) * TRACK_SPACING : 0) + 200; // Extra padding

  function getCoord(time: number) {
    return (time - minTime + PADDING_MINS) * PPM;
  }

  function generateBranchPath(startT: number, endT: number, trackIndex: number) {
    const s = getCoord(startT);
    const e = getCoord(endT);
    const currentAxis = MAIN_AXIS + trackIndex * TRACK_SPACING;
    const curveLen = 60; // Fixed curve length for branching

    if (isMobile) {
      return `
        M ${MAIN_AXIS} ${s - curveLen}
        C ${MAIN_AXIS} ${s - curveLen / 2}, ${currentAxis} ${s - curveLen / 2}, ${currentAxis} ${s}
        L ${currentAxis} ${e}
        C ${currentAxis} ${e + curveLen / 2}, ${MAIN_AXIS} ${e + curveLen / 2}, ${MAIN_AXIS} ${e + curveLen}
      `;
    } else {
      return `
        M ${s - curveLen} ${MAIN_AXIS}
        C ${s - curveLen / 2} ${MAIN_AXIS}, ${s - curveLen / 2} ${currentAxis}, ${s} ${currentAxis}
        L ${e} ${currentAxis}
        C ${e + curveLen / 2} ${currentAxis}, ${e + curveLen / 2} ${MAIN_AXIS}, ${e + curveLen} ${MAIN_AXIS}
      `;
    }
  }

  const trunkStart = getCoord(minTime - PADDING_MINS + 20);
  const trunkEnd = getCoord(maxTime + PADDING_MINS - 20);
  const trunkPath = isMobile
    ? `M ${MAIN_AXIS} ${trunkStart} L ${MAIN_AXIS} ${trunkEnd}`
    : `M ${trunkStart} ${MAIN_AXIS} L ${trunkEnd} ${MAIN_AXIS}`;

  return (
    <section
      id="agenda"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm overflow-hidden text-ivory"
    >
      {/* Ambient glow background */}
      <div className="absolute top-1/3 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
            Organic{" "}
            <span className="font-editorial italic font-normal text-[#E2B767]">Timeline</span>
          </motion.h2>
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

        {/* The Flowing Timeline Area */}
        <div className="relative w-full rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-gold-glow">
                {days[activeDay].title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-mist">
                <MapPin size={14} className="text-emerald-400" />
                <span>{days[activeDay].venue}</span>
              </div>
            </div>
            <Sparkles className="text-emerald-500/50" size={24} />
          </div>

          <div
            className={`relative w-full ${isMobile ? "h-[80vh] overflow-y-auto" : "overflow-x-auto custom-scrollbar pb-4"}`}
          >
            <div
              className="relative"
              style={{
                width: isMobile ? "100%" : `${containerSize}px`,
                height: isMobile ? `${containerSize}px` : `${crossSize}px`,
                minHeight: isMobile ? "auto" : "400px",
              }}
            >
              {/* SVG Flow lines */}
              <svg
                className="absolute inset-0 pointer-events-none"
                style={{ width: "100%", height: "100%" }}
              >
                <defs>
                  <linearGradient id="emerald-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <AnimatePresence mode="wait">
                  <motion.g
                    key={`svg-${activeDay}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Trunk Line */}
                    <motion.path
                      d={trunkPath}
                      fill="none"
                      stroke="url(#emerald-glow)"
                      strokeWidth="3"
                      filter="url(#glow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Branch Lines */}
                    {processedEvents
                      .filter((e) => e.trackIndex > 0)
                      .map((ev, idx) => (
                        <motion.path
                          key={`branch-${idx}`}
                          d={generateBranchPath(ev.start, ev.end, ev.trackIndex)}
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="2"
                          strokeOpacity="0.6"
                          filter="url(#glow)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                        />
                      ))}
                  </motion.g>
                </AnimatePresence>
              </svg>

              {/* Event Cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cards-${activeDay}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {processedEvents.map((ev, idx) => {
                    const sCoord = getCoord(ev.start);
                    const eCoord = getCoord(ev.end);
                    const currentAxis = MAIN_AXIS + ev.trackIndex * TRACK_SPACING;

                    // Card Positioning
                    const cardStyle: React.CSSProperties = isMobile
                      ? {
                          top: `${sCoord + 20}px`,
                          left: `${currentAxis + 20}px`,
                          width: `calc(100% - ${currentAxis + 40}px)`,
                          maxWidth: "280px",
                        }
                      : {
                          left: `${sCoord + 20}px`,
                          top: `${currentAxis + 20}px`,
                          width: `${Math.max(160, eCoord - sCoord - 40)}px`,
                        };

                    return (
                      <motion.div
                        key={idx}
                        className="absolute glass-card bg-black/40 border border-emerald-500/20 rounded-xl p-4 shadow-xl hover:bg-emerald-900/20 hover:border-emerald-400/40 transition-colors group z-10"
                        style={cardStyle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                      >
                        {/* Node point on the line */}
                        <div
                          className="absolute bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                          style={
                            isMobile
                              ? {
                                  width: "8px",
                                  height: "8px",
                                  left: "-24px",
                                  top: "16px",
                                }
                              : {
                                  width: "8px",
                                  height: "8px",
                                  top: "-24px",
                                  left: "16px",
                                }
                          }
                        />

                        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-emerald-400 mb-2">
                          <Clock size={12} className="opacity-80" />
                          <span>{ev.block.time}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-ivory mb-2 leading-snug">
                          {ev.block.title}
                        </h4>
                        <span className="inline-block px-2 py-1 rounded bg-emerald-950/50 border border-emerald-500/20 text-[10px] font-mono text-emerald-200/70 uppercase tracking-wider">
                          {ev.block.kind}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
