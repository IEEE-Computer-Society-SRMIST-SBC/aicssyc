import { Instagram, Mail, Phone, Linkedin } from "lucide-react";
import { Reveal } from "./Reveal";

import contactData from "@/data/contact.json";

const pointsOfContact = contactData;

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm bg-transparent"
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 sm:gap-16 lg:gap-24 items-start">
          <Reveal direction="up" distance={25}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-tight text-ivory text-balance">
              Get in touch
              <br />
              <span className="editorial-italic text-emerald-400">with the organisers.</span>
            </h2>
            <p className="mt-4 sm:mt-8 text-sm sm:text-base text-ivory/70 leading-relaxed prose-narrow">
              For delegate queries, partnership requests, press or institutional collaboration — the
              AICSSYC 2026 team responds within two working days.
            </p>
          </Reveal>

          <Reveal direction="up" distance={20} delay={0.1}>
            <ul className="hairline-top">
              <li className="border-b border-white/10">
                <a
                  href="mailto:ieeecomputersocietysrmist@gmail.com"
                  className="group flex items-center justify-between gap-4 py-5 sm:py-7 transition hover:pl-2 min-h-[56px]"
                >
                  <span className="flex items-center gap-4">
                    <Mail size={20} className="text-[#E2B767] shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-[#E2B767]/80 font-mono">
                        Email
                      </span>
                      <span className="block mt-1 font-display text-base sm:text-lg md:text-xl text-ivory break-all sm:break-normal">
                        ieeecomputersocietysrmist@gmail.com
                      </span>
                    </span>
                  </span>
                  <span className="text-ivory/60 group-hover:text-[#E2B767] transition-transform group-hover:translate-x-1 shrink-0">
                    →
                  </span>
                </a>
              </li>

              <li className="border-b border-white/10">
                <a
                  href="https://www.instagram.com/ieeecs_srmist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 sm:py-7 transition hover:pl-2 min-h-[56px]"
                >
                  <span className="flex items-center gap-4">
                    <Instagram size={20} className="text-emerald-400 shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-mono">
                        Instagram
                      </span>
                      <span className="block mt-1 font-display text-base sm:text-lg md:text-xl text-ivory">
                        @ieeecs_srmist
                      </span>
                    </span>
                  </span>
                  <span className="text-ivory/60 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1 shrink-0">
                    →
                  </span>
                </a>
              </li>

              <li className="border-b border-white/10">
                <a
                  href="https://www.instagram.com/ieeecssyp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 sm:py-7 transition hover:pl-2 min-h-[56px]"
                >
                  <span className="flex items-center gap-4">
                    <Instagram size={20} className="text-[#E2B767] shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-[#E2B767] font-mono">
                        Instagram
                      </span>
                      <span className="block mt-1 font-display text-base sm:text-lg md:text-xl text-ivory">
                        @ieeecssyp
                      </span>
                    </span>
                  </span>
                  <span className="text-ivory/60 group-hover:text-[#E2B767] transition-transform group-hover:translate-x-1 shrink-0">
                    →
                  </span>
                </a>
              </li>

              <li className="border-b border-white/10">
                <a
                  href="https://www.linkedin.com/company/ieee-computer-society-syp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 sm:py-7 transition hover:pl-2 min-h-[56px]"
                >
                  <span className="flex items-center gap-4">
                    <Linkedin size={20} className="text-emerald-400 shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-mono">
                        LinkedIn
                      </span>
                      <span className="block mt-1 font-display text-base sm:text-lg md:text-xl text-ivory">
                        IEEE CS SYP
                      </span>
                    </span>
                  </span>
                  <span className="text-ivory/60 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1 shrink-0">
                    →
                  </span>
                </a>
              </li>

              <li className="border-b border-white/10">
                <a
                  href="https://www.linkedin.com/company/ieee-computer-society-srmist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 sm:py-7 transition hover:pl-2 min-h-[56px]"
                >
                  <span className="flex items-center gap-4">
                    <Linkedin size={20} className="text-[#E2B767] shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-[#E2B767] font-mono">
                        LinkedIn
                      </span>
                      <span className="block mt-1 font-display text-base sm:text-lg md:text-xl text-ivory">
                        IEEE CS SRMIST
                      </span>
                    </span>
                  </span>
                  <span className="text-ivory/60 group-hover:text-[#E2B767] transition-transform group-hover:translate-x-1 shrink-0">
                    →
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="up" distance={20} delay={0.15}>
          <div className="mt-16 sm:mt-24 lg:mt-32">
            <div className="flex items-baseline justify-between gap-8 mb-8 sm:mb-10">
              <h3 className="font-display text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.05] tracking-tight text-ivory">
                Points of contact
                <span className="block editorial-italic text-emerald-400 text-base md:text-lg mt-1.5 sm:mt-2">
                  speak to the team directly.
                </span>
              </h3>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-[#E2B767]/80 font-mono">
                Direct line
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl">
              {pointsOfContact.map((poc) => (
                <article
                  key={poc.name}
                  className="group relative overflow-hidden rounded-2xl border border-ivory/10 bg-[#0A120E]/95 backdrop-blur-sm p-5 sm:p-6 transition hover:border-[#E2B767]/40"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#E2B767]/80 font-mono">
                      {poc.role}
                    </p>
                    <p className="mt-1.5 sm:mt-2 font-display text-lg sm:text-xl text-ivory truncate">
                      {poc.name}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 border-t border-ivory/10 pt-4 space-y-2.5">
                    <a
                      href={`tel:${poc.phoneHref}`}
                      className="min-h-[44px] flex items-center gap-2.5 text-ivory/85 transition hover:text-[#E2B767] py-1"
                    >
                      <Phone size={14} className="text-[#E2B767] shrink-0" />
                      <span className="tracking-wide text-xs sm:text-sm">{poc.phone}</span>
                    </a>
                    <a
                      href={`mailto:${poc.email}`}
                      className="min-h-[44px] flex items-center gap-2.5 text-ivory/70 transition hover:text-emerald-400 py-1"
                    >
                      <Mail size={14} className="text-emerald-400 shrink-0" />
                      <span className="text-xs sm:text-sm truncate">{poc.email}</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
