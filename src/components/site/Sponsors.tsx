import { Link } from "@tanstack/react-router";
import partnersData from "@/data/partners.json";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type Partner = {
  name: string;
  tier?: string;
  url?: string;
  logo?: string;
  description?: string;
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
    <section id="sponsors" className="relative section-rhythm bg-transparent">
      {/* Subtle grid background to match the requested style */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none"></div>

      <div className="container-editorial relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <Reveal direction="up" className="max-w-3xl mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-tight text-ivory font-bold mb-4">
              Our <span className="text-gold">Sponsors</span>
            </h2>
            <p className="text-ivory/60 text-lg">
              Thank you to our amazing sponsors who make this event possible
            </p>
          </Reveal>
        </div>

        {hasPartners ? (
          <>
            {/* A centred logo wall rather than a fixed column grid: two sponsors
                self-centre exactly the same way twelve do, so the section never
                reads as a grid with holes in it. */}
            <RevealGroup className="mx-auto max-w-5xl">
              <ul className="flex flex-wrap items-start justify-center gap-x-10 gap-y-12 sm:gap-x-14">
                {ordered.map((p, idx) => (
                  <li key={`${p.name}-${idx}`}>
                    <RevealItem custom={idx}>
                      <SponsorTile partner={p} />
                    </RevealItem>
                  </li>
                ))}
              </ul>
            </RevealGroup>

            <Reveal direction="up" className="mt-16 text-center">
              <p className="text-sm text-ivory/50">
                Interested in supporting AICSSYC 2026?{" "}
                <Link
                  to="/sponsor"
                  className="group inline-flex items-center gap-1.5 font-medium text-gold-bright underline-offset-4 hover:underline"
                >
                  Become a sponsor
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </p>
            </Reveal>
          </>
        ) : (
          <div className="mt-16 grid md:grid-cols-[1fr_auto] items-end gap-10 hairline-top pt-12">
            <p className="font-editorial italic text-2xl md:text-3xl text-ivory/85 leading-snug prose-measure">
              Founding partners, principal sponsors and programme partners for the 2026 edition will
              be unveiled in the coming weeks.
            </p>
            <Link
              to="/sponsor"
              className="group inline-flex items-center gap-2 rounded-sm bg-ivory/10 border border-ivory/20 px-6 py-3 text-sm font-medium text-ivory hover:bg-ivory/20 hover:border-gold/50 transition whitespace-nowrap"
            >
              Become a sponsor
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
