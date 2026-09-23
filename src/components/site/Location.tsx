import { motion } from "framer-motion";
import { ScrollSection } from "./ScrollSection";
import { MapPin, Train, Bus, BusFront, Car, Clock } from "lucide-react";

export function Location() {
  return (
    <ScrollSection
      id="location"
      className="relative scroll-mt-24 sm:scroll-mt-32 section-rhythm bg-transparent text-ivory grain overflow-hidden"
    >
      <span id="venue" className="absolute -top-32" />
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 sm:mb-16 md:mb-20 text-center"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-none text-balance">
            Know your <span className="editorial-italic text-[#E2B767]">way!</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-ivory/60">
            SRM Institute of Science and Technology, Kattankulathur
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Map Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[280px] sm:h-[400px] lg:h-[650px] rounded-2xl overflow-hidden border border-ivory/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] static lg:sticky top-28"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.31305459385!2d80.0401831750242!3d12.82303298748386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f712b82a78d9%3A0xfdb944a3aee53831!2sSRM%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(100%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SRMIST Kattankulathur Google Map"
            ></iframe>
            {/* Overlay to give the map a slight tint matching our theme */}
            <div className="absolute inset-0 bg-[#060D0A]/20 pointer-events-none mix-blend-multiply" />
          </motion.div>

          {/* Directions Column */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Card 1: Railway Station */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-ivory/10 bg-[#0A120E]/70 backdrop-blur-md p-5 sm:p-7 md:p-8"
            >
              <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/5">
                <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-[#E2B767]/10 flex items-center justify-center shrink-0">
                  <Train className="w-5 sm:w-6 h-5 sm:h-6 text-[#E2B767]" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ivory">
                    From Chennai Central Railway Station
                  </h3>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <DirectionItem
                  icon={<Car />}
                  title="By Taxi/Cab"
                  desc="60-75 minutes, approx. ₹900-1200. (Fastest and most convenient option)"
                />
                <DirectionItem
                  icon={<Train />}
                  title="By Suburban Train"
                  desc="Take an EMU from Chennai Central / Beach Station → Tambaram → change to a local train towards Chengalpattu, get down at Potheri Station. SRM IST is a short walk or auto ride from Potheri."
                />
                <DirectionItem
                  icon={<Bus />}
                  title="By MTC Bus"
                  desc="MTC/SETC buses towards Chengalpattu / Mahabalipuram via GST Road. Get down at SRM College / Potheri stop."
                />
                <DirectionItem
                  icon={<BusFront className="text-[#E2B767]" />}
                  title="By Intercity / Outstation Bus"
                  desc={
                    <span>
                      Most government (SETC, TNSTC, KSRTC) and private omni-buses traversing GST Road (NH 45) offer direct boarding and drop-off right in front of the <strong className="text-ivory font-medium">SRM University / Potheri</strong> stop. If your bus terminates at <strong className="text-ivory font-medium">Kalaignar Centenary Bus Terminus (KCBT / Kilambakkam)</strong>, the campus is just 10 km away (~15–20 mins by cab, auto, or MTC bus).
                    </span>
                  }
                />
                <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory/5 border border-ivory/10 text-xs text-ivory/70">
                  <Clock className="w-3.5 h-3.5 text-[#E2B767]" />
                  <span>Est. Travel Time: 1.5-2 hours (public transit) • Direct drop for GST Road buses</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Airport */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-ivory/10 bg-[#0A120E]/70 backdrop-blur-md p-5 sm:p-7 md:p-8"
            >
              <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/5">
                <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ivory">
                    From Chennai International Airport
                  </h3>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <DirectionItem
                  icon={<Car />}
                  title="By Taxi/Cab"
                  desc="30-45 minutes, approx. ₹600-900. (Fastest and most convenient option)"
                />
                <DirectionItem
                  icon={<Train />}
                  title="By Suburban Train"
                  desc="From Tirusulam Station (near airport) → Tambaram → Chengalpattu line to Potheri Station → short walk/auto to campus."
                />
                <DirectionItem
                  icon={<Bus />}
                  title="By Bus"
                  desc="Airport buses towards Tambaram / Chengalpattu. Get down at SRM College / Potheri."
                />
                <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory/5 border border-ivory/10 text-xs text-ivory/70">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Est. Travel Time: 45-60 minutes</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Intercity & Outstation Buses */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-ivory/10 bg-[#0A120E]/70 backdrop-blur-md p-5 sm:p-7 md:p-8"
            >
              <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/5">
                <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-amber-400/10 flex items-center justify-center shrink-0">
                  <BusFront className="w-5 sm:w-6 h-5 sm:h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ivory">
                    From Kilambakkam (KCBT) &amp; Outstation Routes
                  </h3>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <DirectionItem
                  icon={<BusFront className="text-amber-300" />}
                  title="By Intercity / Outstation Bus"
                  desc={
                    <span>
                      Most state (SETC, TNSTC, KSRTC) and private omni-buses passing through GST Road (NH 45) provide direct passenger drops at the <strong className="text-ivory font-medium">SRM University / Potheri</strong> highway stop. If arriving at <strong className="text-ivory font-medium">KCBT (Kilambakkam Bus Terminus)</strong>, SRM IST is just 10 km away (~15–20 mins via auto, taxi, or local MTC bus).
                    </span>
                  }
                />
                <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory/5 border border-ivory/10 text-xs text-ivory/70">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Est. Travel Time: 15–20 mins from KCBT • Direct drop on GST Road</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}

function DirectionItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="flex gap-3.5 sm:gap-4">
      <div className="mt-1 shrink-0 text-ivory/40 [&>svg]:w-4 sm:[&>svg]:w-5 [&>svg]:h-4 sm:[&>svg]:h-5">
        {icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm font-medium text-ivory/90 mb-0.5">{title}</p>
        <div className="text-xs sm:text-sm text-ivory/60 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}
