import { motion } from "framer-motion";
import { Sparkles, Trophy, Rocket, CheckCircle2 } from "lucide-react";

const events = [
  {
    id: "battle-of-chapters",
    title: "Battle of Chapters",
    subtitle: "Showcase Your Events",
    description:
      "Present your chapter's best events, initiatives, and overall impact. Compete against the top IEEE student chapters across the region for the ultimate title and a chance to win exciting prizes worth $500!",
    icon: Trophy,
    posterUrl: "/boc-poster.png",
    links: [
      { label: "Register & Submit", url: "https://forms.gle/czdMqi8EezL7VKT17", primary: true },
      { label: "Presentation Template", url: "https://docs.google.com/presentation/d/1FwPDBm1MhVFbtlkgK4KKYSjEL1Mi4HPgN3vipOmjFR4/edit?slide=id.p1", primary: false },
      { label: "Guidelines", url: "https://docs.google.com/document/d/1lUTj9XXF_HvvTalngT9cXYA7OdWo9HsPcii4k3yKX4w/edit?tab=t.0", primary: false }
    ],
    gradient: "from-emerald-500/20 to-teal-500/0",
    glow: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    highlights: [
      "Win $500 Prize Pool",
      "Present Your Best Events",
      "Cross-chapter Networking",
      "Ultimate Regional Title"
    ]
  },
  {
    id: "startup-summit",
    title: "Global Incubation Committee",
    subtitle: "Startup Summit & Pitching",
    description:
      "Pitch your innovative ideas to industry leaders, prominent mentors, and active investors at our dedicated Startup Summit. Compete to secure vital incubation support, feedback, and seed funding to take your startup project to the next level.",
    icon: Rocket,
    previewUrl: "https://globalincubation.vercel.app/",
    links: [
      { label: "Explore Global Incubation Committee", url: "https://globalincubation.vercel.app/", primary: true }
    ],
    gradient: "from-yellow-500/20 to-orange-500/0",
    glow: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/20",
    highlights: [
      "Seed Funding & Incubation",
      "Live Pitching to Investors",
      "1-on-1 Mentorship Sessions",
      "Industry Leader Feedback"
    ]
  }
];

export function FeaturedEvents() {
  return (
    <section id="featured-events" className="relative scroll-mt-24 sm:scroll-mt-32 py-24 sm:py-32 overflow-hidden bg-[var(--obsidian)]">
      {/* Ambient background */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} />
            <span>Premium Experiences</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight"
          >
            Major <span className="font-editorial italic font-normal text-emerald-400">Highlights</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white/60 font-sans"
          >
            Beyond the technical talks, immerse yourself in our exclusive flagship events designed to challenge, inspire, and reward you.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {events.map((ev, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={ev.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
              >
                {/* Graphic Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`w-full lg:w-1/2 relative aspect-square max-h-[450px] rounded-[2rem] overflow-hidden group ${ev.previewUrl ? 'p-2 glass-card border border-white/10' : 'glass-card border border-white/5'}`}
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
                          style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left' }}
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
                      <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110" style={{ backgroundImage: `url(${ev.posterUrl})` }} />
                      
                      {/* Actual poster */}
                      <img 
                        src={ev.posterUrl} 
                        alt={ev.title} 
                        className="w-full h-full object-contain relative z-10 scale-95 group-hover:scale-100 transition-transform duration-700 ease-out drop-shadow-2xl" 
                      />
                    </div>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${ev.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
                      <div className={`absolute -bottom-10 -right-10 w-64 h-64 ${ev.glow} rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000 ease-out`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ev.icon 
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
                  <div className={`inline-block px-3 py-1 rounded-full border ${ev.borderColor} bg-white/5 text-xs font-mono tracking-widest uppercase mb-6 w-max ${ev.iconColor}`}>
                    {ev.subtitle}
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
                    {ev.title}
                  </h3>
                  
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    {ev.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ev.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-3">
                        <CheckCircle2 size={18} className={`${ev.iconColor} opacity-80`} />
                        <span className="text-white/80 font-medium text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-4">
                    {ev.links && ev.links.length > 0 ? (
                      ev.links.map((link, lIdx) => (
                        <a 
                          key={lIdx} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`inline-flex px-6 py-3 rounded-full font-medium text-sm transition-all items-center gap-2 group/btn ${
                            link.primary 
                              ? 'bg-white/10 hover:bg-white/20 text-white' 
                              : 'border border-white/10 hover:border-white/30 bg-transparent hover:bg-white/5 text-white/80 hover:text-white'
                          }`}
                        >
                          <span>{link.label}</span>
                          <span className="transition-transform group-hover/btn:translate-x-1 font-bold">→</span>
                        </a>
                      ))
                    ) : (
                      <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all flex items-center gap-2 group/btn">
                        <span>View Details</span>
                        <span className="transition-transform group-hover/btn:translate-x-1 font-bold">→</span>
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
