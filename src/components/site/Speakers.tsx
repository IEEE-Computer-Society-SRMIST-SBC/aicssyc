import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Sparkles, Layers } from "lucide-react";
import { speakersData, Speaker } from "@/data/speakers";

export type { Speaker };
export { speakersData };

interface SpeakerCategory {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  speakers: Speaker[];
}

export const speakerCategories: SpeakerCategory[] = [
  {
    id: "global",
    title: "Global Leadership & Keynotes",
    subtitle: "Row 1 • International Leaders & Keynotes",
    tagline: "Visionary leadership from the global stage of IEEE and cutting-edge tech industry",
    speakers: speakersData.slice(0, 6),
  },
  {
    id: "research",
    title: "Research, Industry & Regional Leadership",
    subtitle: "Row 2 • Founders, Scientists & Technical Visionaries",
    tagline: "Trailblazing innovators across space exploration, life sciences, and startups",
    speakers: speakersData.slice(6, 12),
  },
  {
    id: "academic",
    title: "Academic Visionaries & Section Leadership",
    subtitle: "Row 3 • Academic Chairs & Section Presidents",
    tagline: "Distinguished academic deans, principals, and IEEE regional section heads",
    speakers: speakersData.slice(12, 18),
  },
];

export function Speakers() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedCategories =
    activeTab === "all"
      ? speakerCategories
      : speakerCategories.filter((cat) => cat.id === activeTab);

  return (
    <section
      id="speakers"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm overflow-hidden text-ivory content-auto"
      style={{
        contain: "content",
        contentVisibility: "auto",
        containIntrinsicSize: "1px 800px",
      }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] lg:w-[850px] h-[350px] sm:h-[650px] lg:h-[850px] bg-emerald-500/10 rounded-full blur-[110px] sm:blur-[180px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#E2B767]/5 rounded-full blur-[140px] pointer-events-none transform-gpu will-change-transform" />

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-pill border border-[#E2B767]/30 text-[11px] sm:text-xs font-mono text-[#E2B767] uppercase tracking-widest mb-3 sm:mb-4"
          >
            <Sparkles size={13} />
            <span className="inline-flex items-center gap-1.5">
              <span>OFFICIAL CONGRESS SPEAKERS</span>
              <span className="text-[#E2B767]">&amp;</span>
              <span>LUMINARIES</span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight text-balance"
          >
            Voices at the{" "}
            <span className="font-editorial italic font-normal text-[#E2B767]">Frontier</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto text-center mt-2.5 sm:mt-3 font-sans"
          >
            18 world-class researchers, founders, engineers, and IEEE leaders shaping autonomous systems across 3 official congress poster tracks.
          </motion.p>

          {/* Row Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === "all"
                  ? "bg-[#E2B767] text-neutral-950 font-semibold shadow-lg shadow-[#E2B767]/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <Layers size={12} />
              <span>All 18 Speakers</span>
            </button>
            {speakerCategories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-[#E2B767] text-neutral-950 font-semibold shadow-lg shadow-[#E2B767]/20"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <span>Row {idx + 1}: {cat.title.split("&")[0].trim()}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Rows of 6 Speakers Each */}
        <div className="space-y-12 sm:space-y-16">
          <AnimatePresence mode="wait">
            {displayedCategories.map((category, catIdx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                className="relative"
              >
                {/* Row Subheader */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5 sm:mb-6 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#E2B767]/90 font-semibold">
                      {category.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 max-w-md sm:text-right hidden md:block">
                    {category.tagline}
                  </p>
                </div>

                {/* Grid: 2 cols on mobile, 3 cols on tablet, 6 cols on XL desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-4">
                  {category.speakers.map((speaker, idx) => {
                    const globalIdx = speakersData.findIndex((s) => s.id === speaker.id);
                    return (
                      <motion.div
                        key={speaker.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="glass-card glass-card-hover rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-[#E2B767]/40 group flex flex-col justify-between transition-all duration-300"
                      >
                        <div>
                          {/* Photo Frame */}
                          <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2.5 bg-neutral-900/60 border border-white/10">
                            {speaker.image ? (
                              <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-serif text-2xl text-[#E2B767] bg-white/[0.02]">
                                {speaker.initials || "SP"}
                              </div>
                            )}

                            {/* Poster Sequence Badge */}
                            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-[#070c09]/95 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-white/70">
                              #{globalIdx + 1}
                            </div>

                            {/* Tag Badge */}
                            {speaker.tag && (
                              <div className="absolute bottom-2 inset-x-2">
                                <span className="block truncate text-center px-1.5 py-0.5 rounded-md bg-[#070c09]/95 backdrop-blur-sm border border-[#E2B767]/30 text-[9px] font-mono text-[#E2B767] uppercase tracking-wide">
                                  {speaker.tag}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Speaker Name */}
                          <h4 className="text-sm sm:text-base font-serif text-white font-medium group-hover:text-[#E2B767] transition-colors leading-tight line-clamp-2">
                            {speaker.name}
                          </h4>

                          {/* Role */}
                          <p className="mt-1 text-[10px] sm:text-[11px] text-[#E2B767] font-mono uppercase tracking-wider leading-snug line-clamp-2">
                            {speaker.role}
                          </p>

                          {/* Affiliation */}
                          <p className="mt-1.5 text-[11px] sm:text-xs text-white/60 leading-relaxed font-sans line-clamp-2">
                            {speaker.affiliation}
                          </p>
                        </div>

                        {/* Card Footer: LinkedIn */}
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                          {speaker.linkedin ? (
                            <a
                              href={speaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-white/60 hover:text-[#E2B767] transition-colors py-1 text-[11px]"
                              aria-label={`${speaker.name} LinkedIn Profile`}
                            >
                              <Linkedin size={12} className="shrink-0 text-[#E2B767]" />
                              <span>LinkedIn</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-white/30 font-mono">IEEE SYP</span>
                          )}

                          <span className="text-[9px] font-mono text-white/40 uppercase">
                            Keynote
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Speakers;
