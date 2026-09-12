import { useState } from "react";
import { Check, Sparkles, ArrowRight, Hotel } from "lucide-react";
import { motion } from "framer-motion";

type Tier = {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  requirement?: string;
  popular?: boolean;
};

import ticketsData from "@/data/tickets.json";

const tiers: Tier[] = ticketsData.tiers as Tier[];
const baseFeatures = ticketsData.baseFeatures;
const ACCOMMODATION_FEE = ticketsData.accommodationFee;

export function Tickets() {
  const [accommodation, setAccommodation] = useState(false);

  return (
    <section
      id="tickets"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm overflow-hidden text-ivory"
    >
      <span id="passes" className="absolute -top-32" />
      {/* Background glow (Constrained) */}
      <div className="absolute top-1/2 right-10 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

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
            <span>CONGRESS DELEGATE PASSES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight text-balance"
          >
            Choose Your{" "}
            <span className="font-editorial italic font-normal text-[#E2B767]">Pass</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto text-center mt-2.5 sm:mt-3 font-sans"
          >
            Full access to 4 days of keynotes, 6 technical tracks, delegate kit, meals,{" "}
            <span className="text-[#E2B767]">&amp;</span> IEEE certificates.
          </motion.p>
        </div>

        {/* Accommodation Toggle Bar */}
        <div className="mb-8 sm:mb-12 max-w-2xl mx-auto glass-card rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl glass-pill text-emerald-glow border border-white/10 shrink-0">
              <Hotel size={20} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-ivory">
                Hostel Accommodation Add-On
              </div>
              <div className="text-[11px] sm:text-xs text-slate-mist">
                Include 4-night stay on SRMIST Campus (+ ₹2,000)
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAccommodation(!accommodation)}
            className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 border flex items-center justify-center ${
              accommodation
                ? "bg-emerald-500/20 text-emerald-glow border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "glass-pill text-ivory/80 border-white/10 hover:text-ivory active:bg-white/10"
            }`}
          >
            {accommodation ? "✓ Stay Included (+₹2,000)" : "+ Add Stay (+₹2,000)"}
          </button>
        </div>

        {/* Passes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {tiers.map((t, i) => {
            const price = t.basePrice + (accommodation ? ACCOMMODATION_FEE : 0);
            const isPopular = t.popular;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative glass-card rounded-3xl p-6 sm:p-8 border flex flex-col justify-between ${
                  isPopular
                    ? "border-gold-glow/50 shadow-[0_0_40px_rgba(234,179,8,0.2)] bg-gradient-to-b from-[#101613] to-[#0b100d]"
                    : "border-white/10"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E2B767] text-[#070a08] text-[10px] uppercase font-bold tracking-widest shadow-md">
                    Most Popular Pass
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-xs font-mono tracking-widest text-emerald-glow uppercase font-semibold">
                      {t.name}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-mist mb-4 sm:mb-6 leading-relaxed">
                    {t.tagline}
                  </p>

                  <div className="flex items-baseline gap-1 my-4 sm:my-6">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient-gold">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-mist">/ delegate</span>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6 border-t border-white/10">
                    {baseFeatures.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-xs text-ivory/90 leading-relaxed"
                      >
                        <Check size={14} className="text-emerald-glow mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {accommodation && (
                      <li className="flex items-start gap-2.5 text-xs text-emerald-glow leading-relaxed font-medium">
                        <Check size={14} className="text-emerald-glow mt-0.5 shrink-0" />
                        <span>4-Night SRMIST Hostel Accommodation</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
                  <a
                    href="https://dashboard.eqvento.in/register/aicssyc26-lM0m3B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full min-h-[44px] py-3.5 px-4 rounded-full text-center text-xs font-semibold flex items-center justify-center gap-2 group transition-all duration-300 ${
                      isPopular ? "btn-primary-gold" : "btn-secondary-glass"
                    }`}
                  >
                    <span>Get Pass Now</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
