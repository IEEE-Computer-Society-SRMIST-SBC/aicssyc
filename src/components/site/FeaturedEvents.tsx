import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Rocket,
  CheckCircle2,
  Building2,
  Calendar,
  ExternalLink,
  Users,
  Award,
  Globe2,
} from "lucide-react";
import { majorHighlights, MajorHighlight } from "@/data/highlights";

function getEventIcon(id: string) {
  switch (id) {
    case "battle-of-chapters":
      return Trophy;
    case "startup-summit":
      return Rocket;
    case "call-for-host-2027":
      return Building2;
    default:
      return Sparkles;
  }
}

export function FeaturedEvents() {
  return (
    <section
      id="featured-events"
      className="relative scroll-mt-24 sm:scroll-mt-32 py-16 sm:py-28 overflow-hidden bg-[var(--obsidian)]"
    >
      <span id="highlights" className="absolute -top-32" />
      {/* Ambient background */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4"
          >
            <Sparkles size={14} />
            <span>Premium Experiences &amp; Initiatives</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight"
          >
            Major{" "}
            <span className="font-editorial italic font-normal text-emerald-400">
              Highlights
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-lg text-white/60 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Beyond keynotes, immerse yourself in our flagship competitions, incubation summits, and
            national leadership opportunities shaping the future of computing.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {majorHighlights.map((ev: MajorHighlight, idx: number) => {
            const isEven = idx % 2 === 0;
            const Icon = getEventIcon(ev.id);

            return (
              <div
                key={ev.id}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-10 lg:gap-16 items-center`}
              >
                {/* Graphic Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`w-full lg:w-1/2 relative aspect-square max-h-[460px] rounded-[2rem] overflow-hidden group ${
                    ev.previewUrl
                      ? "p-2 glass-card border border-white/10"
                      : "glass-card border border-white/10"
                  }`}
                >
                  {ev.previewUrl ? (
                    <div className="w-full h-full rounded-3xl overflow-hidden flex flex-col bg-[#F3F2EE] relative z-10 shadow-2xl">
                      {/* Browser Tab UI */}
                      <div className="h-10 bg-[#E8E6E1] border-b border-black/5 flex items-center px-4 gap-2 shrink-0">
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="mx-auto bg-white/60 px-4 py-1 rounded-md text-[11px] font-sans font-semibold text-black/60 shadow-sm border border-black/5 truncate max-w-[250px]">
                          {ev.title}
                        </div>
                        <div className="w-8 shrink-0" />
                      </div>
                      {/* Live Iframe with 2x Scaling to prevent responsive cutoff */}
                      <div className="flex-1 w-full relative overflow-hidden bg-[#F3F2EE]">
                        <iframe
                          src={ev.previewUrl}
                          className="absolute top-0 left-0 border-none bg-[#F3F2EE]"
                          style={{
                            width: "200%",
                            height: "200%",
                            transform: "scale(0.5)",
                            transformOrigin: "top left",
                          }}
                          title={ev.title}
                          loading="lazy"
                        />
                      </div>
                      {/* Overlay to prevent scroll trapping */}
                      <div className="absolute inset-0 top-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-300" />
                    </div>
                  ) : ev.posterUrl ? (
                    <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden bg-black/40">
                      {/* Blurred ambient background based on the poster itself */}
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110"
                        style={{ backgroundImage: `url(${ev.posterUrl})` }}
                      />

                      {/* Actual poster */}
                      <img
                        src={ev.posterUrl}
                        alt={ev.title}
                        className="w-full h-full object-contain relative z-10 scale-95 group-hover:scale-100 transition-transform duration-700 ease-out drop-shadow-2xl"
                      />
                    </div>
                  ) : ev.id === "call-for-host-2027" ? (
                    /* Custom Interactive Poster Graphic for Call for Host 2027 */
                    <div className="w-full h-full relative z-10 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-[#0B261C] via-[#061912] to-[#040D09] overflow-hidden">
                      {/* Ambient Glows */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/15 rounded-full blur-[70px] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-[70px] pointer-events-none" />

                      {/* Top Bar */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold text-amber-300 bg-amber-400/15 border border-amber-400/40">
                          <Building2 size={12} className="text-amber-300" />
                          <span>{ev.edition || "AICSSYC 2027"}</span>
                        </span>
                        {ev.badge && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300/90 bg-black/40 px-2.5 py-1 rounded-full border border-amber-400/30">
                            {ev.badge}
                          </span>
                        )}
                      </div>

                      {/* Center Graphic */}
                      <div className="relative z-10 text-center my-auto py-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-400/20 via-emerald-500/20 to-transparent border border-amber-400/40 flex items-center justify-center mb-4 shadow-xl shadow-amber-500/10 group-hover:scale-110 transition-transform duration-500">
                          <Globe2 size={42} className="text-amber-300 animate-pulse" />
                        </div>
                        <h4 className="text-xl sm:text-2xl font-serif text-white font-normal tracking-tight">
                          Host the Flagship Congress
                        </h4>
                        <p className="text-xs sm:text-sm text-emerald-200/70 mt-1 font-sans max-w-xs mx-auto">
                          Bring IEEE Computer Society's premier national congress to your campus
                        </p>
                      </div>

                      {/* Bottom Key Badges */}
                      <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
                        <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                          <Users size={14} className="mx-auto text-amber-300 mb-0.5" />
                          <div className="text-[11px] font-bold text-white">300+</div>
                          <div className="text-[8px] font-mono text-white/50 uppercase">Delegates</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                          <Award size={14} className="mx-auto text-emerald-300 mb-0.5" />
                          <div className="text-[11px] font-bold text-white">Pan-India</div>
                          <div className="text-[8px] font-mono text-white/50 uppercase">Reach</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                          <Calendar size={14} className="mx-auto text-amber-300 mb-0.5" />
                          <div className="text-[11px] font-bold text-white">Oct 1</div>
                          <div className="text-[8px] font-mono text-white/50 uppercase">Deadline</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${ev.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`}
                      />
                      <div
                        className={`absolute -bottom-10 -right-10 w-64 h-64 ${ev.glow} rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000 ease-out`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon
                          size={140}
                          strokeWidth={1}
                          className={`${ev.iconColor} opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out`}
                        />
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Text Side */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div
                      className={`inline-block px-3 py-1 rounded-full border ${ev.borderColor} bg-white/5 text-xs font-mono tracking-widest uppercase ${ev.iconColor}`}
                    >
                      {ev.highlightTag || ev.subtitle}
                    </div>
                    {ev.deadline && (
                      <span className="text-xs font-mono text-amber-300/90 font-medium bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                        ⏳ Deadline: {ev.deadline}
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight">
                    {ev.title}
                  </h3>

                  <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6 font-sans">
                    {ev.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {ev.highlights.map((highlight: string, hIdx: number) => (
                      <div key={hIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className={`${ev.iconColor} shrink-0 opacity-90`} />
                        <span className="text-white/80 font-medium text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                    {ev.links && ev.links.length > 0 ? (
                      ev.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex px-6 py-3 rounded-full font-bold text-sm transition-all items-center gap-2 group/btn cursor-pointer ${
                            link.primary
                              ? "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-110 shadow-lg shadow-amber-500/20 active:scale-98"
                              : "border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white"
                          }`}
                        >
                          <span>{link.label}</span>
                          <span className="transition-transform group-hover/btn:translate-x-1 font-bold">
                            →
                          </span>
                        </a>
                      ))
                    ) : (
                      <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all flex items-center gap-2 group/btn">
                        <span>View Details</span>
                        <span className="transition-transform group-hover/btn:translate-x-1 font-bold">
                          →
                        </span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
