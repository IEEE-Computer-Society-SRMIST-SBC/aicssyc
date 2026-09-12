import { motion } from "framer-motion";
import { Linkedin, Sparkles } from "lucide-react";
import speakersData from "@/data/speakers.json";

const photoMap: Record<string, string> = {
  andrew: "/andrew.jpeg",
  eric: "/eric.jpeg",
  biswarup: "/biswarup.jpeg",
  utkarsh: "/utkarsh.jpeg",
  shivam: "/shivam.jpeg",
  nikky: "/nikky.jpeg",
  sarun: "/sarun.png",
  mini: "/mini.jpeg",
  mohamed: "/mohamed.jpeg",
  himani: "/himani.jpeg",
};

const featured = speakersData.featured;
const speakerPool = [
  {
    name: featured.name,
    org: featured.role,
    focus: featured.topic,
    initials: featured.initials,
    photo: featured.photo,
    linkedin: featured.linkedin,
  },
  ...speakersData.speakers,
];

const displayOrder = [
  "eric",
  "andrew",
  "biswarup",
  "mini",
  "mohamed",
  "himani",
  "shivam",
  "utkarsh",
  "nikky",
  "sarun",
];
const allSpeakers = displayOrder
  .map((key) => speakerPool.find((s) => s.photo === key))
  .filter((s): s is (typeof speakerPool)[number] => Boolean(s));

export function Speakers() {
  return (
    <section
      id="speakers"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm overflow-hidden text-ivory"
    >
      {/* Background glow (Constrained for mobile) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] lg:w-[700px] h-[320px] sm:h-[600px] lg:h-[700px] bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-pill border border-[#E2B767]/30 text-[11px] sm:text-xs font-mono text-[#E2B767] uppercase tracking-widest mb-3 sm:mb-4"
          >
            <Sparkles size={13} />
            <span>
              KEYNOTE SPEAKERS <span className="text-[#E2B767]">&amp;</span> LUMINARIES
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
            World-class researchers, founders, engineers, and IEEE leaders shaping autonomous
            systems.
          </motion.p>
        </div>

        {/* Adaptive Speakers Grid: 2-col on mobile -> 3-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {allSpeakers.map((speaker, i) => {
            const photoUrl = speaker.photo ? photoMap[speaker.photo] : undefined;
            return (
              <motion.div
                key={speaker.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass-card glass-card-hover rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-white/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden mb-1.5 sm:mb-2 bg-white/[0.03] border border-white/10">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={speaker.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-2xl sm:text-4xl text-[#E2B767]">
                        {speaker.initials}
                      </div>
                    )}
                  </div>

                  <h3 className="text-base sm:text-xl font-serif text-white mt-2.5 sm:mt-4 group-hover:text-[#E2B767] transition-colors leading-tight">
                    {speaker.name}
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-[#E2B767] tracking-wider uppercase font-mono leading-tight">
                    {speaker.org}
                  </p>

                  <p className="mt-2 text-xs text-white/60 leading-relaxed font-sans line-clamp-2 sm:line-clamp-none">
                    {speaker.focus}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs min-h-[44px]">
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#E2B767] active:text-[#E2B767] transition-colors py-2"
                    aria-label={`${speaker.name} LinkedIn Profile`}
                  >
                    <Linkedin size={14} className="shrink-0" />
                    <span className="hidden sm:inline">LinkedIn Profile</span>
                    <span className="sm:hidden text-[11px]">LinkedIn</span>
                  </a>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-white/40">
                    Keynote
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
