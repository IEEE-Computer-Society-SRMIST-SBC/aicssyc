import { motion } from "framer-motion";
import { Sparkles, Globe, Award } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 sm:scroll-mt-32 pt-6 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12 overflow-hidden text-ivory"
    >
      {/* Ambient background glow (Constrained for mobile) */}
      <div className="absolute top-1/3 right-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold-glow/20 rounded-full blur-3xl" />

              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-emerald-glow uppercase font-semibold flex items-center gap-2 mb-3 sm:mb-4">
                <Sparkles size={13} /> ✨ ABOUT AICSSYC 2026
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display leading-tight text-ivory">
                India's Flagship <br />
                <span className="text-gradient-gold">IEEE CS SYP Congress</span>
              </h3>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-mist leading-relaxed font-sans">
                Hosted at SRM Institute of Science and Technology, Kattankulathur, Chennai. Convening visionary delegates, researchers, and industry pioneers to explore the frontier where autonomous intelligence converges with human ingenuity.
              </p>

              {/* Metric Badges */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                  <div className="p-2.5 rounded-xl glass-pill text-emerald-glow border border-white/10 shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-ivory">🌐 Pan-India</div>
                    <div className="text-[11px] text-slate-mist">20+ IEEE Sections</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                  <div className="p-2.5 rounded-xl glass-pill text-gold-glow border border-white/10 shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-ivory">🏛️ IEEE Flagship</div>
                    <div className="text-[11px] text-slate-mist">SRMIST Chennai</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Narrative Content & Responsive Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display leading-tight">
              Where Human Ingenuity <br className="hidden sm:block" />
              Meets{" "}
              <span className="font-editorial italic font-normal text-gradient-emerald">
                Autonomous Intelligence
              </span>
              .
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 dark:text-slate-400 max-w-2xl leading-relaxed font-sans">
              India’s premier 4-day student and young professional congress, convening over 300 distinguished delegates, researchers, and technical visionaries across 20+ IEEE Sections. Engage in cutting-edge agentic masterclasses, visionary keynote addresses, and high-impact nationwide collaboration.
            </p>

            {/* Stats Grid with Full Responsive Text */}
            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-2.5 sm:gap-4">
              <div className="glass-card rounded-2xl p-3.5 sm:p-5 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold">
                  300+
                </div>
                <div className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-mist">
                  Delegates
                </div>
              </div>

              <div className="glass-card rounded-2xl p-3.5 sm:p-5 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-emerald">
                  4
                </div>
                <div className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-mist">
                  Days
                </div>
              </div>

              <div className="glass-card rounded-2xl p-3.5 sm:p-5 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-ivory">20+</div>
                <div className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-mist">
                  Sections
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
