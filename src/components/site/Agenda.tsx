import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import timelineData from "@/data/timeline.json";

const days = timelineData.days;

// Helper to parse time string for sorting
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

export function Agenda() {
  const [activeDay, setActiveDay] = useState(0);

  const currentDay = days[activeDay];
  
  // Group events by overlapping time blocks (clusters)
  const groupedClusters = (() => {
    // 1. Parse and sort: start time ascending, then duration descending (longest first)
    const parsed = currentDay.blocks.map(block => {
      const { start, end } = parseTimeRange(block.time);
      return { ...block, start, end };
    }).sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return (b.end - b.start) - (a.end - a.start);
    });

    // 2. Merge overlapping events into clusters
    const clusters: { start: number; end: number; displayStart: string; events: typeof parsed }[] = [];
    parsed.forEach(ev => {
      const lastCluster = clusters[clusters.length - 1];
      // If no cluster or this event starts exactly at or after the last cluster ends, new cluster
      if (!lastCluster || ev.start >= lastCluster.end) {
        clusters.push({
          start: ev.start,
          end: ev.end,
          displayStart: ev.time.split("–")[0].trim(),
          events: [ev]
        });
      } else {
        // Overlaps with current cluster, add and extend the end boundary if necessary
        lastCluster.events.push(ev);
        lastCluster.end = Math.max(lastCluster.end, ev.end);
      }
    });

    // 3. For each cluster, distribute events into parallel tracks to avoid overlaps within a column
    return clusters.map(cluster => {
      const tracks: (typeof parsed)[] = [];
      cluster.events.forEach(ev => {
        let placed = false;
        for (const track of tracks) {
          const lastInTrack = track[track.length - 1];
          if (ev.start >= lastInTrack.end) {
            track.push(ev);
            placed = true;
            break;
          }
        }
        if (!placed) {
          tracks.push([ev]);
        }
      });
      return { ...cluster, tracks };
    });
  })();

  return (
    <section id="agenda" className="relative scroll-mt-24 sm:scroll-mt-32 py-24 sm:py-32 overflow-hidden bg-[var(--obsidian)]">
      {/* Subtle Ambient Background */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6"
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
            Event <span className="font-editorial italic font-normal text-emerald-400">Agenda</span>
          </motion.h2>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {days.map((day, idx) => (
            <button
              key={day.label}
              onClick={() => setActiveDay(idx)}
              className={`relative px-6 py-3 rounded-full text-sm transition-all duration-500 border ${
                activeDay === idx 
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]" 
                  : "border-white/5 bg-white/[0.02] text-white/50 hover:bg-white/[0.05] hover:text-white/80"
              }`}
            >
              <span className="relative z-10 flex flex-col items-center gap-1">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${activeDay === idx ? 'text-emerald-400/80' : 'text-white/40'}`}>
                  {day.label}
                </span>
                <span className="font-medium text-sm sm:text-base tracking-wide whitespace-nowrap">
                  {day.date}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Timeline Area */}
        <div className="max-w-5xl mx-auto relative">
          
          {/* Day Meta Header */}
          <motion.div 
            key={`meta-${activeDay}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 p-6 sm:px-8 rounded-2xl glass-card"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">{currentDay.title}</h3>
              <div className="flex items-center gap-2 text-sm text-white/60 font-mono">
                <MapPin size={16} className="text-emerald-400" />
                <span>{currentDay.venue}</span>
              </div>
            </div>
          </motion.div>

          {/* Timeline List */}
          <div className="relative border-l border-white/10 ml-4 sm:ml-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-10 pb-12"
              >
                {groupedClusters.map((cluster, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="relative pl-8 sm:pl-12 group"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-[-6px] top-2.5 w-3 h-3 rounded-full bg-[var(--obsidian)] border-2 border-emerald-500/50 shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all duration-300 group-hover:scale-125 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                    
                    {/* Desktop Time Positioned Left */}
                    <div className="hidden sm:block absolute left-[-155px] top-1.5 w-[120px] text-right">
                      <span className="text-sm font-mono text-white/60 group-hover:text-emerald-400 transition-colors duration-300">
                        {cluster.displayStart}
                      </span>
                    </div>

                    {/* Tracks Container */}
                    <div 
                      className="grid gap-4 sm:gap-6"
                      style={{
                        gridTemplateColumns: cluster.tracks.length > 1 ? `repeat(auto-fit, minmax(280px, 1fr))` : '1fr'
                      }}
                    >
                      {cluster.tracks.map((track, trackIdx) => (
                        <div key={trackIdx} className="flex flex-col gap-4">
                          {track.map((ev, evIdx) => (
                            <div key={evIdx} className="p-6 rounded-2xl glass-card glass-card-hover group/card flex-1 flex flex-col justify-center">
                              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm font-mono text-emerald-400">
                                  <Clock size={14} />
                                  <span>{ev.time}</span>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest group-hover/card:border-emerald-500/30 group-hover/card:text-emerald-300 transition-colors">
                                  {ev.kind}
                                </span>
                              </div>
                              <h4 className="text-lg sm:text-xl font-medium text-white/90 group-hover/card:text-white transition-colors">
                                {ev.title}
                              </h4>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
