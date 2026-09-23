import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Landmark,
  PartyPopper,
  Expand,
  X,
  Compass,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export interface SneakPeekItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  description: string;
  imageSrc: string;
  fallbackSrc: string;
  imageAlt: string;
}

export const sneakPeeks: SneakPeekItem[] = [
  {
    id: "mahabalipuram",
    badge: "Exclusive Excursion",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    title: "The Heritage Expedition — UNESCO Marvels of Mahabalipuram",
    tagline: "Where 7th-century heritage meets modern innovation.",
    description:
      "Step away from the screens for a guided coastal excursion through the ancient rock-cut marvels and sea breezes of Mamallapuram.",
    imageSrc: "/images/sneak-peek/mahabalipuram.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "UNESCO World Heritage Shore Temple at Mahabalipuram",
  },
  {
    id: "venue",
    badge: "Flagship Venue",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "The Command Center — Hippocrates Hall, SRMIST",
    tagline: "World-class infrastructure for world-class builders.",
    description:
      "Four days of immersive keynotes, high-stakes project pitches, and agentic masterclasses inside SRMIST's premier auditorium.",
    imageSrc: "/images/sneak-peek/venue.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Auditorium venue and campus facilities at SRMIST",
  },
  {
    id: "cultural-night",
    badge: "Community & Culture",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    title: "The Gathering — Starlight Networking & Cultural Gala",
    tagline: "300+ delegates. One unforgettable Chennai evening.",
    description:
      "Forge lifelong peer connections across 20+ IEEE Sections over traditional Tamil cuisine, cultural performances, and informal mixer sessions.",
    imageSrc: "/images/sneak-peek/cultural-night.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Starlight networking dinner and cultural celebration",
  },
];

const itemMeta: Record<
  string,
  {
    icon: typeof Compass;
    features: string[];
    accentGlow: string;
    borderGlow: string;
  }
> = {
  mahabalipuram: {
    icon: Compass,
    features: [
      "UNESCO Heritage Site",
      "Coromandel Coast Excursion",
      "Architectural Photo Walks",
    ],
    accentGlow: "from-sky-500/20 via-sky-500/5 to-transparent",
    borderGlow: "group-hover:border-sky-500/40",
  },
  venue: {
    icon: Landmark,
    features: [
      "SRMIST Kattankulathur",
      "Air-Conditioned Auditorium",
      "High-Tech Audio/Visual Grid",
    ],
    accentGlow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderGlow: "group-hover:border-emerald-500/40",
  },
  "cultural-night": {
    icon: PartyPopper,
    features: [
      "Grand Banquets & Cuisine",
      "Live Musical Acts & Dance",
      "Pan-India IEEE Mixer",
    ],
    accentGlow: "from-amber-500/20 via-amber-500/5 to-transparent",
    borderGlow: "group-hover:border-amber-500/40",
  },
};

export function SneakPeek() {
  const [selectedItem, setSelectedItem] = useState<SneakPeekItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="sneak-peek"
      className="relative scroll-mt-24 sm:scroll-mt-32 py-20 sm:py-32 overflow-hidden text-ivory bg-[var(--obsidian)]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-sky-500/10 via-emerald-500/5 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-mono text-sky-400 uppercase tracking-widest mb-4 shadow-sm"
          >
            <Sparkles size={14} className="text-sky-400 animate-pulse" />
            <span>Sneak Peeks &amp; Highlights</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight"
          >
            Experience{" "}
            <span className="font-editorial italic font-normal text-[#E2B767]">
              AICSSYC
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-lg text-white/60 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            A sneak preview of the landmark destinations, premier auditoriums, and
            memorable cultural celebrations awaiting you at IEEE AICSSYC 2026.
          </motion.p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sneakPeeks.map((item, idx) => {
            const meta = itemMeta[item.id] || {
              icon: Compass,
              features: [],
              accentGlow: "from-white/10 to-transparent",
              borderGlow: "group-hover:border-white/30",
            };
            const ItemIcon = meta.icon;
            const isError = imageErrors[item.id];
            const displaySrc = isError ? item.fallbackSrc : item.imageSrc;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`group relative flex flex-col rounded-3xl overflow-hidden glass-card border border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${meta.borderGlow}`}
              >
                {/* Image Container with 16:10 aspect ratio */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50">
                  <img
                    src={displaySrc}
                    alt={item.imageAlt}
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Top Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a120e] via-[#0a120e]/30 to-black/40" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide uppercase backdrop-blur-md border ${item.badgeColor}`}
                    >
                      <ItemIcon size={12} />
                      {item.badge}
                    </span>
                  </div>

                  {/* Fullscreen Expand Action Button */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    type="button"
                    title="View Fullscreen"
                    aria-label={`View fullscreen photo of ${item.title}`}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <Expand size={15} />
                  </button>
                </div>

                {/* Content Body */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between relative z-10">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-[#E2B767] transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400/90 font-medium">
                      {item.tagline}
                    </p>

                    <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                    {meta.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 text-xs text-white/80"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-[#E2B767] shrink-0"
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Interactive Action */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="text-xs font-semibold text-white/90 group-hover:text-[#E2B767] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Highlight</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>

                    <span className="text-[11px] font-mono text-white/40 uppercase">
                      IEEE AICSSYC &apos;26
                    </span>
                  </div>
                </div>

                {/* Subtle Hover Glow at card bottom */}
                <div
                  className={`absolute -bottom-12 -left-12 -right-12 h-24 bg-gradient-to-t ${meta.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full blur-xl`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner with registration link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-950/20 via-black/40 to-amber-950/20"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-[#E2B767]/10 border border-[#E2B767]/30 items-center justify-center shrink-0">
              <MapPin className="text-[#E2B767]" size={22} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-serif text-white">
                All highlights included with full congress delegate passes
              </h4>
              <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                Experience keynotes, competitions, excursions, and cultural dinners under one ticket.
              </p>
            </div>
          </div>

          <a
            href="#tickets"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold btn-primary-gold flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-98"
          >
            <span>Reserve Your Delegate Seat</span>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      {/* Lightbox / Modal for Item Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl glass-card border border-white/20 bg-[#070a08] shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Image */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[380px] overflow-hidden bg-black">
                <img
                  src={
                    imageErrors[selectedItem.id]
                      ? selectedItem.fallbackSrc
                      : selectedItem.imageSrc
                  }
                  alt={selectedItem.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a08] via-transparent to-black/30" />

                <div className="absolute bottom-4 left-6 z-10">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase backdrop-blur-md border ${selectedItem.badgeColor}`}
                  >
                    {selectedItem.badge}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  {selectedItem.title}
                </h3>
                <p className="text-sm font-mono text-emerald-400 mt-1 uppercase tracking-wider">
                  {selectedItem.tagline}
                </p>
                <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed font-sans">
                  {selectedItem.description}
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-white/50 font-mono">
                    Official Highlight of AICSSYC 2026 • SRMIST Kattankulathur
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold btn-secondary-glass"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default SneakPeek;
