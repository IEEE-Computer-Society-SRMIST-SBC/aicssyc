import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import partnersData from "@/data/partners.json";

type Partner = {
  name: string;
  tier?: string;
  url?: string;
  logo?: string;
};

const partners: Partner[] = partnersData.partners as Partner[];

export function Sponsors() {
  const hasPartners = partners.length > 0;

  return (
    <section id="sponsors" className="relative scroll-mt-24 sm:scroll-mt-32 py-20 sm:py-28 overflow-hidden bg-transparent">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

      {/* Subtle ambient warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[250px] sm:h-[350px] bg-[#E2B767]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight">
              Our Sponsors
            </h2>
            <p className="mt-3 sm:mt-4 text-white/70 text-sm sm:text-base md:text-lg font-sans">
              Thank you to our amazing sponsors who make this event possible
            </p>
          </motion.div>
        </div>

        {/* Sponsors Cards */}
        {hasPartners ? (
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 max-w-3xl mx-auto">
            {partners.map((p, idx) => {
              const CardInner = (
                <div className="group flex flex-col items-center cursor-pointer">
                  {/* White Logo Card */}
                  <div className="w-[260px] sm:w-[285px] h-[135px] sm:h-[150px] bg-white rounded-2xl sm:rounded-[22px] flex items-center justify-center px-6 py-4 shadow-lg shadow-black/30 group-hover:scale-[1.02] group-hover:shadow-xl transition-all duration-300">
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="max-h-12 sm:max-h-14 max-w-[85%] object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-serif text-3xl font-bold text-gray-800">
                        {p.name}
                      </span>
                    )}
                  </div>

                  {/* Sponsor Name */}
                  <h3 className="font-serif text-lg sm:text-xl text-white font-semibold mt-4 text-center group-hover:text-[#E2B767] transition-colors">
                    {p.name}
                  </h3>

                  {/* Sponsor Tier */}
                  {p.tier && (
                    <p className="text-[#E2B767] text-[11px] sm:text-xs font-mono tracking-widest uppercase mt-1 text-center font-medium">
                      {p.tier}
                    </p>
                  )}
                </div>
              );

              return (
                <motion.div
                  key={`${p.name}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2B767] rounded-2xl"
                    >
                      {CardInner}
                    </a>
                  ) : (
                    <div>{CardInner}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-serif italic text-2xl text-white/80">
              Sponsors will be announced soon.
            </p>
          </div>
        )}

        {/* Bottom CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-sm sm:text-base text-white/60 font-sans">
            Interested in supporting AICSSYC 2026?{" "}
            <Link
              to="/sponsor"
              className="text-[#E2B767] hover:text-[#f3cc7d] hover:underline font-medium transition-colors"
            >
              Become a sponsor →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
