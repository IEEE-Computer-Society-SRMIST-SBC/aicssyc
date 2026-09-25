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

const UNTIERED = "Partners";

/**
 * Group partners by tier, preserving the order tiers first appear in
 * partners.json — so the running order is controlled from the data, not here.
 */
function groupByTier(list: Partner[]) {
  const groups = new Map<string, Partner[]>();
  for (const p of list) {
    const tier = p.tier?.trim() || UNTIERED;
    const bucket = groups.get(tier);
    if (bucket) bucket.push(p);
    else groups.set(tier, [p]);
  }
  return [...groups.entries()];
}

/**
 * One sponsor tile: a uniform ivory plate with the logo contained inside it.
 *
 * The plate is deliberate rather than decorative — the supplied logo files
 * carry baked-in white backgrounds (eqvento.png has no alpha channel at all),
 * so putting every mark on the same plate reads as a design choice instead of
 * two mismatched white rectangles. Swap in transparent assets and this still
 * works; drop `bg-ivory` at that point if you'd rather they float.
 *
 * Fixing the plate size also normalises optical weight: a 1:1 mark and a
 * 2.4:1 wordmark end up carrying the same visual mass.
 */
function SponsorTile({ partner }: { partner: Partner }) {
  const inner = (
    <>
      <div className="flex h-24 w-44 items-center justify-center rounded-xl bg-ivory p-4 shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-ivory/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.55)] group-hover:ring-gold-bright/60 sm:h-28 sm:w-52">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="font-display text-3xl text-[#07090D]/40">{partner.name[0]}</span>
        )}
      </div>
      <p className="mt-3 text-center font-display text-sm font-semibold tracking-tight text-ivory/90 transition-colors group-hover:text-ivory">
        {partner.name}
      </p>
      {partner.tier && (
        <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-gold-bright/80">
          {partner.tier}
        </p>
      )}
    </>
  );

  // The blurb stays available as a native tooltip rather than as a permanent
  // line only some sponsors have — keeps the wall visually even.
  const title = partner.description;

  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="group flex flex-col items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {inner}
    </a>
  ) : (
    <div title={title} className="group flex flex-col items-center">
      {inner}
    </div>
  );
}

export function Sponsors() {
  const hasPartners = partners.length > 0;
  // Tier grouping drives running order only: sponsors sharing a tier sit
  // together in the wall. Separate tier header rows read worse here — with one
  // sponsor per tier they produced a tall stack of single-logo rows.
  const ordered = groupByTier(partners).flatMap(([, group]) => group);

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
