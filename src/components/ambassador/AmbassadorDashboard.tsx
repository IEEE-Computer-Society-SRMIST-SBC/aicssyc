import { useEffect, useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Award,
  Gift,
  FileCheck,
  Users,
  Trophy,
  DollarSign,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

const FORM_URL = "https://forms.gle/czdMqi8EezL7VKT17";

/* ─── Interactive Constellation & Node Canvas ─── */
function InteractiveConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * (window.devicePixelRatio || 1);
      canvas.height = height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 55; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
      });
    }

    const onMouseMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 183, 103, 0.4)";
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        // Connect to mouse
        const dxMouse = nodes[i].x - mouseX;
        const dyMouse = nodes[i].y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.4 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Connect to other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(226, 183, 103, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Expandable Reason Accordion ─── */
function ExpandableReason({
  reason,
}: {
  reason: { emoji: string; title: string; desc: string };
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="group rounded-2xl bg-[#061912]/80 backdrop-blur-md border border-emerald-500/20 hover:border-amber-400/40 transition-all duration-300 cursor-pointer overflow-hidden p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-emerald-500/20 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
            {reason.emoji}
          </div>
          <h3 className="text-base sm:text-lg font-serif font-normal text-white group-hover:text-amber-300 transition-colors">
            {reason.title}
          </h3>
        </div>
        <ChevronDown
          size={18}
          className={`text-white/40 group-hover:text-amber-400 transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="pt-3 text-xs sm:text-sm text-white/70 font-sans leading-relaxed pl-14"
          >
            {reason.desc}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── 6 Key Perks ─── */
const perks = [
  {
    icon: TicketIcon,
    title: "Free Passes",
    desc: "Achieve registration milestones to unlock 100% delegate pass and accommodation fee refunds.",
    highlight: "100% Refundable",
  },
  {
    icon: Gift,
    title: "Official Swag Kit",
    desc: "Receive the exclusive AICSSYC 2026 Ambassador kit, custom tees, delegate badge, and event memorabilia.",
    highlight: "Exclusive Kit",
  },
  {
    icon: FileCheck,
    title: "IEEE CS Certificate & LOR",
    desc: "Earn an official IEEE Computer Society Ambassador Certificate and Letter of Recommendation.",
    highlight: "IEEE Credential",
  },
  {
    icon: Users,
    title: "VIP Networking",
    desc: "Direct access to keynote speakers, global IEEE leadership, industry CXOs, and startup mentors.",
    highlight: "Executive Access",
  },
  {
    icon: Trophy,
    title: "Stage Recognition",
    desc: "Public recognition and felicitation on the main stage during the grand Valedictory Ceremony.",
    highlight: "National Honor",
  },
  {
    icon: DollarSign,
    title: "Performance Cashbacks",
    desc: "Unlock lucrative cash rewards and tier-based incentives for driving exceptional campus participation.",
    highlight: "Cash Rewards",
  },
];

function TicketIcon(props: { size?: number; className?: string }) {
  return <Sparkles {...props} />;
}

/* ─── Milestone Ladder ─── */
const milestoneTiers = [
  {
    name: "Bronze Tier",
    badge: "5 Registrations",
    color: "from-amber-700/30 to-amber-900/20 border-amber-600/40",
    accent: "text-amber-400",
    rewards: [
      "Official Campus Ambassador Certificate",
      "Exclusive AICSSYC 2026 Digital Badge",
      "Welcome Ambassador Swag & Sticker Pack",
    ],
  },
  {
    name: "Silver Tier",
    badge: "10 Registrations",
    color: "from-slate-400/20 to-slate-700/20 border-slate-300/40",
    accent: "text-slate-200",
    rewards: [
      "100% Event Registration Fee Refund",
      "Official Certificate of Excellence",
      "Silver Ambassador Recognition",
      "Priority Entry to Flagship Workshops",
    ],
  },
  {
    name: "Gold Tier",
    badge: "20 Registrations",
    color: "from-amber-400/20 to-yellow-600/20 border-amber-400/60 ring-1 ring-amber-400/30 shadow-lg shadow-amber-500/10",
    accent: "text-amber-300",
    popular: true,
    rewards: [
      "100% Event Registration Fee Refund",
      "100% Accommodation Fee Refund",
      "Exclusive IEEE CS Letter of Recommendation",
      "VIP Delegate Badge & Special Mention",
    ],
  },
  {
    name: "Platinum Tier",
    badge: "35+ Registrations",
    color: "from-emerald-400/20 via-amber-400/15 to-[#061912] border-emerald-400/60 shadow-2xl shadow-emerald-500/15 ring-1 ring-emerald-400/40",
    accent: "text-emerald-300",
    rewards: [
      "Full Registration + Accommodation Refunds",
      "On-Stage Felicitation at Valedictory Ceremony",
      "VIP Dinner with IEEE Leadership & Speakers",
      "Direct Internship & Mentorship Consideration",
    ],
  },
];

/* ─── 6 Steps ─── */
const steps = [
  {
    emoji: "📝",
    title: "1. Register Your Interest",
    desc: "Fill out the official Campus Ambassador application form with your background, college, and leadership interests.",
  },
  {
    emoji: "✉️",
    title: "2. Get Shortlisted & Onboarded",
    desc: "Our team reviews applications and shortlists ambassadors. You will receive an official confirmation and briefing pack.",
  },
  {
    emoji: "🎟️",
    title: "3. Register for AICSSYC 2026",
    desc: "Secure your initial delegate registration to confirm your commitment to representing your institution.",
  },
  {
    emoji: "👥",
    title: "4. Join the Exclusive Guild",
    desc: "Gain entry to private ambassador communication channels, promotional toolkits, and mentor syncs.",
  },
  {
    emoji: "🔗",
    title: "5. Get Your Referral Code",
    desc: "Receive your custom referral code offering delegates a 10% discount while tracking your milestone progress.",
  },
  {
    emoji: "🚀",
    title: "6. Mobilize & Unlock Rewards",
    desc: "Spread the word across your campus, hit registration tiers, and claim full refunds plus VIP rewards.",
  },
];

const eligibility = [
  "Undergraduate Students",
  "Postgraduate Students",
  "Research Scholars",
  "IEEE Student Branch Officers",
  "Technical Club Leads",
  "Community Organizers",
  "Campus Influencers",
  "Tech Enthusiasts",
];

const reasons = [
  {
    emoji: "🎯",
    title: "Leadership & Real-World Experience",
    desc: "Develop high-demand skills in event marketing, public speaking, community building, and campaign management that make your portfolio stand out to employers.",
  },
  {
    emoji: "🌐",
    title: "Pan-India Professional Network",
    desc: "Connect directly with hundreds of student leaders, IEEE fellows, industry researchers, and tech founders from across India.",
  },
  {
    emoji: "🏅",
    title: "Official IEEE Computer Society Recognition",
    desc: "Receive credentials, merit certificates, and formal recommendations signed by IEEE Computer Society leadership.",
  },
  {
    emoji: "💡",
    title: "Drive Campus Impact",
    desc: "Empower your peers with exposure to cutting-edge autonomous AI, high-performance computing, and career-defining opportunities.",
  },
];

const notices = [
  "Ambassador positions are selective — only shortlisted applicants are onboarded.",
  "Selected ambassadors complete delegate registration to confirm active participation.",
  "Fee refunds and rewards are processed promptly following verified milestone audits.",
  "Only completed, verified delegate registrations count towards milestones.",
];

export function AmbassadorDashboard() {
  return (
    <div className="relative bg-[#040D09] min-h-screen text-ivory font-sans selection:bg-amber-400/30 selection:text-amber-300 overflow-hidden pb-28">
      <InteractiveConstellationCanvas />

      {/* Atmospheric Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>• CAMPUS AMBASSADOR PROGRAM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight leading-[1.05]"
        >
          Lead the charge.
          <br />
          <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            Own your campus.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-sm sm:text-lg text-white/75 max-w-2xl mx-auto font-sans leading-relaxed font-normal"
        >
          Become the official representative of India's flagship IEEE Computer Society congress.
          Build your network, unlock exclusive perks, and lead your institution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black font-sans font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-xl shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Apply Now as Ambassador</span>
            <ExternalLink size={15} className="shrink-0" />
          </a>
          <a
            href="#perks"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all"
          >
            <span>Explore Perks &amp; Tiers</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </section>

      {/* ── 2. PERKS GRID (6 CARDS) ── */}
      <section id="perks" className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto scroll-mt-28">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-semibold">
            AMBASSADOR ADVANTAGES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white mt-2 tracking-tight">
            Perks <span className="font-editorial italic text-amber-300">&amp;</span> Privileges
          </h2>
          <p className="text-xs sm:text-base text-white/60 max-w-xl mx-auto mt-2.5 font-sans font-normal">
            Gain executive access, financial rewards, and verified credentials from the IEEE Computer Society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-2xl p-6 bg-gradient-to-b from-[#09241B]/70 via-[#061912]/80 to-[#040D09]/90 border border-emerald-500/20 hover:border-amber-400/40 backdrop-blur-xl shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all">
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30">
                      {p.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-normal text-white group-hover:text-amber-200 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 font-sans mt-2 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 3. MILESTONE TIERS (LADDER) ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-400 font-semibold">
            PERFORMANCE LADDER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white mt-2 tracking-tight">
            Milestone <span className="font-editorial italic text-emerald-400">Tiers</span>
          </h2>
          <p className="text-xs sm:text-base text-white/60 max-w-xl mx-auto mt-2.5 font-sans font-normal">
            The more delegates you inspire, the greater the rewards and refunds you unlock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {milestoneTiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`rounded-2xl p-5 sm:p-6 bg-gradient-to-b ${tier.color} backdrop-blur-xl border flex flex-col justify-between relative overflow-hidden`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <span className="px-3 py-1 rounded-bl-xl bg-amber-400 text-black text-[9px] font-mono font-bold uppercase tracking-wider shadow-md">
                    POPULAR
                  </span>
                </div>
              )}

              <div>
                <span className={`text-[11px] font-mono uppercase tracking-[0.18em] font-semibold ${tier.accent}`}>
                  {tier.badge}
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mt-1">
                  {tier.name}
                </h3>

                <div className="h-px bg-white/10 my-4" />

                <ul className="space-y-3">
                  {tier.rewards.map((reward, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-xs text-white/80 font-sans leading-snug">
                      <CheckCircle2 size={14} className={`${tier.accent} shrink-0 mt-0.5`} />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block text-center">
                  Tier 0{idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. HOW IT WORKS / THE JOURNEY ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-semibold">
            ONBOARDING ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white mt-2 tracking-tight">
            The <span className="font-editorial italic text-amber-300">Journey</span>
          </h2>
          <p className="text-xs sm:text-base text-white/60 max-w-md mx-auto mt-2.5 font-sans font-normal">
            Six structured milestones to lead your campus and earn recognition.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-emerald-400/50 before:via-emerald-500/25 before:to-emerald-500/5">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="relative group"
            >
              <div className="absolute -left-[29px] sm:-left-[33px] top-4 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-[#040D09] shadow-[0_0_10px_#10b981] group-hover:scale-125 transition-transform" />

              <div className="rounded-2xl p-4 sm:p-6 bg-[#061912]/80 border border-emerald-500/15 hover:border-emerald-500/35 transition-all shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-3xl p-2 rounded-xl bg-white/[0.03] border border-white/10 shrink-0">
                  {s.emoji}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-normal text-white group-hover:text-amber-200 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-sans mt-1 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5. WHO CAN APPLY & NOTICES ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Why Join Accordion */}
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-400 font-semibold">
              WHY BECOME AN AMBASSADOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white mt-2 mb-6 tracking-tight">
              More than a referral <span className="font-editorial italic text-emerald-400">program.</span>
            </h2>
            <div className="space-y-3">
              {reasons.map((r, i) => (
                <ExpandableReason key={r.title} reason={r} index={i} />
              ))}
            </div>
          </div>

          {/* Eligibility & Notices */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#061912]/90 border border-emerald-500/20 p-6 sm:p-8 backdrop-blur-xl">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-semibold">
                WHO IS ELIGIBLE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mt-1 mb-4">
                Open to all passionate student leaders
              </h3>
              <div className="flex flex-wrap gap-2">
                {eligibility.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-emerald-500/25 text-xs text-white/80 font-sans"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-rose-950/40 via-[#061912] to-[#040D09] border border-rose-500/30 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
                <ShieldCheck size={16} />
                <span>Program Guidelines</span>
              </div>
              <ul className="space-y-3">
                {notices.map((n, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75 font-sans leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA BANNER ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-amber-500/15 via-[#09241B] to-[#061912] border-2 border-amber-400/50 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-amber-300 bg-amber-400/15 border border-amber-400/30 mb-4">
            <Sparkles size={11} className="text-amber-400" />
            <span>APPLICATIONS NOW OPEN</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white tracking-tight">
            Ready to lead your <span className="font-editorial italic text-amber-300">campus?</span>
          </h2>

          <p className="text-xs sm:text-base text-white/70 max-w-lg mx-auto mt-3 font-sans font-normal leading-relaxed">
            Take the first step toward representing AICSSYC 2026. Submit your application today.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black font-sans font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-xl shadow-amber-400/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Apply Now as Ambassador</span>
              <ExternalLink size={15} className="shrink-0" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
