import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Bot, Sparkles, Brain, Network, Code, ArrowUpRight, Zap } from "lucide-react";

interface Pillar {
  id: string;
  title: string;
  category: string;
  description: string;
  topics: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
}

const pillarsData: Pillar[] = [
  {
    id: "autonomous-agents",
    title: "Autonomous Agents",
    category: "Pillar 01",
    description:
      "Multi-agent orchestration, autonomous decision frameworks, goal decomposition, and recursive self-improvement architectures.",
    topics: ["Agentic Workflows", "Swarm Intelligence", "Goal Decomposition", "Self-Improvement"],
    icon: Bot,
    accentColor: "from-amber-500/20 to-yellow-500/10",
  },
  {
    id: "human-ai-collab",
    title: "Human-AI Collaboration",
    category: "Pillar 02",
    description:
      "Designing high-bandwidth interfaces, trusted cognitive loops, and shared human-machine autonomy.",
    topics: [
      "Intelligent Interfaces",
      "Trust & Alignment",
      "Human-in-the-Loop",
      "Cognitive Augmentation",
    ],
    icon: Brain,
    accentColor: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "next-gen-computing",
    title: "Next-Gen Computing",
    category: "Pillar 03",
    description:
      "Neuromorphic architectures, quantum computing primitives, low-latency edge AI, and next-gen silicon.",
    topics: ["Quantum Primitives", "Edge AI Silicon", "Neuromorphic Chips", "Low-Latency Infra"],
    icon: Cpu,
    accentColor: "from-amber-500/20 to-emerald-500/10",
  },
  {
    id: "cybernetics-security",
    title: "Cybernetics & Security",
    category: "Pillar 04",
    description:
      "Adversarial robustness, zero-trust agent authentication, autonomous cyber defense, and AI governance.",
    topics: [
      "Adversarial Robustness",
      "Zero-Trust Agent Auth",
      "Autonomous Cyber Defense",
      "Ethics & Governance",
    ],
    icon: Network,
    accentColor: "from-teal-500/20 to-emerald-500/10",
  },
  {
    id: "ai-intelligent-systems",
    title: "AI & Intelligent Systems",
    category: "Pillar 05",
    description:
      "Frontier multimodal foundation models, computer vision, reinforcement learning, and large-scale model fine-tuning.",
    topics: [
      "Multimodal LLMs",
      "Reinforcement Learning",
      "Neural Architectures",
      "Model Distillation",
    ],
    icon: Sparkles,
    accentColor: "from-yellow-500/20 to-amber-500/10",
  },
  {
    id: "research-academia",
    title: "Research & Academia",
    category: "Pillar 06",
    description:
      "Peer-reviewed paper presentations, student research showcases, interdisciplinary academic grants, and IEEE publications.",
    topics: [
      "Paper Presentations",
      "Distinguished Lectures",
      "Academic Grants",
      "IEEE Publications",
    ],
    icon: Code,
    accentColor: "from-emerald-500/20 to-amber-500/10",
  },
];

const renderTitle = (title: string) => {
  if (title.includes(" & ")) {
    const parts = title.split(" & ");
    return (
      <>
        {parts[0]} <span className="text-[#E2B767]">&amp;</span> {parts[1]}
      </>
    );
  }
  return title;
};

function PillarCard3DTilt({ pillar }: { pillar: Pillar }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D card tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring response
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const IconComponent = pillar.icon;

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full min-h-0 sm:min-h-[440px] lg:min-h-[460px] glass-card glass-card-hover rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between cursor-pointer border border-white/10 group overflow-hidden"
      >
        {/* Ambient Gradient Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${pillar.accentColor} opacity-35 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Top Section */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#E2B767] uppercase font-semibold">
              {pillar.category}
            </span>
            <div className="p-2.5 sm:p-3 rounded-2xl glass-pill border border-white/10 text-[#E2B767] group-hover:scale-110 group-hover:text-[#F3D38C] transition-transform duration-300">
              <IconComponent size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-normal text-white group-hover:text-[#E2B767] transition-colors leading-snug">
            {renderTitle(pillar.title)}
          </h3>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-white/70 leading-relaxed font-sans line-clamp-3 sm:line-clamp-3">
            {pillar.description}
          </p>
        </div>

        {/* Bottom Section (Topics & Action link) */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 mt-5 sm:mt-6">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {pillar.topics.map((topic) => (
              <span
                key={topic}
                className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 transition-all duration-300 group-hover:border-[#E2B767]/30"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#E2B767] group-hover:text-[#F3D38C] transition-all duration-300 min-h-[36px]">
            <span className="relative overflow-hidden group-hover:underline decoration-[#E2B767] underline-offset-4">
              Explore Keynote Pillar
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Themes() {
  return (
    <section
      id="themes"
      className="relative scroll-mt-24 sm:scroll-mt-32 pt-8 sm:pt-12 md:pt-14 pb-14 sm:pb-20 overflow-hidden text-ivory"
    >
      <span id="pillars" className="absolute -top-32" />
      {/* Background Ambient Glows (Constrained for mobile) */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-pill border border-[#E2B767]/30 text-[11px] sm:text-xs font-mono text-[#E2B767] uppercase tracking-widest mb-3 sm:mb-4"
          >
            <Zap size={13} />
            <span>
              KEYNOTE PILLARS <span className="text-[#E2B767]">&amp;</span> THEMES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight text-balance"
          >
            6 Keynote Pillars{" "}
            <span className="font-serif italic text-amber-300">
              Defying Frontiers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto text-center mt-2.5 sm:mt-3 font-sans"
          >
            Six dedicated keynote pillars and distinguished lecture series exploring the frontier of
            agent architectures, intelligent infrastructure, and human-machine interaction.
          </motion.p>
        </div>

        {/* Keynote Pillars Grid (1-Column Stack on Mobile -> 2-col on Tablet -> 3-col on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {pillarsData.map((pillar) => (
            <PillarCard3DTilt key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
