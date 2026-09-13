import { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// =========================================================================
// REVERSE ORIGAMI UNFOLDING PHASES (Exactly reversing Steps 7 -> 1):
// Step 7: Completed paper airplane in flight & landing
// Step 6/5: Wings lift up & unfold flat from dihedral fold
// Step 4: Center spine opens flat like a book
// Step 3: Long diagonal edge flaps peel open outward
// Step 2: Top corner triangles peel open outward to corners
// Step 1: Fully flat rectangular paper sheet with revealed GIC dossier
// =========================================================================
type AnimationPhase =
  | "idle"           // 0.0s - 1.8s: Hero stabilizes
  | "step7-flying"   // 1.8s - 3.9s: Step 7 plane flies along curved trajectory
  | "step7-landing"  // 3.9s - 4.4s: Step 7 plane lands at top-right of countdown card
  | "step6-wings"    // 4.4s - 4.9s: [Reverse 7->5] Wings unfold flat from dihedral fold
  | "step4-spine"    // 4.9s - 5.5s: [Reverse 4->3] Center spine opens flat like opening a card
  | "step3-flaps"    // 5.5s - 6.1s: [Reverse 3->2] Long diagonal flaps peel outward
  | "step2-corners"  // 6.1s - 6.7s: [Reverse 2->1] Top corner triangles unfold to sheet corners
  | "step1-revealed"; // 6.7s+: [Step 1] Fully flat sheet reveals GIC announcement, docked

// Official GIC Website Palette (https://globalincubation.vercel.app/)
const GIC_THEME = {
  paper: "#F5F2E9",
  paperDark: "#E5DFC9",
  paperShadow: "#D8D0BA",
  ink: "#07090D",
  brick: "#DF2414",
  mustard: "#ECBE24",
  cobalt: "#0E30A5",
};

// 4-point Bézier calculation for flight curve coordinates & velocity tangent
function getBezierPoint(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
  const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;

  const dx =
    3 * uu * (p1.x - p0.x) +
    6 * u * t * (p2.x - p1.x) +
    3 * tt * (p3.x - p2.x);
  const dy =
    3 * uu * (p1.y - p0.y) +
    6 * u * t * (p2.y - p1.y) +
    3 * tt * (p3.y - p2.y);

  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle < 0) angle += 360;

  return { x, y, angle };
}

// Continuous angle unwrapping to prevent 180°/-180° boundary wrap flips
function unwrapAngle(currentAngle: number, previousAngle: number): number {
  let delta = currentAngle - previousAngle;
  while (delta < -180) delta += 360;
  while (delta > 180) delta -= 360;
  return previousAngle + delta;
}

export function GICAnnouncementAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [rocketPos, setRocketPos] = useState({ x: 230, y: -340, angle: 85, scale: 0.85 });
  const landingAnchorRef = useRef<HTMLDivElement>(null);
  const filterId = useId();

  const continuousAngleRef = useRef<number | null>(null);
  const lockedHeadingRef = useRef<number>(175);

  useEffect(() => {
    // Accessibility check: immediately show final Step 1 state if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPhase("step1-revealed");
      return;
    }

    let animationFrameId: number;
    let flightStartTime = 0;
    const FLIGHT_DURATION = 1100; // ms (swift aerodynamic glide)

    // Delay start until hero entrance animations have settled
    const startFlightTimer = setTimeout(() => {
      setPhase("step7-flying");

      // Calculate curve points relative to landing anchor
      let startX = 230;
      let startY = -340;

      if (landingAnchorRef.current) {
        const rect = landingAnchorRef.current.getBoundingClientRect();
        startX = Math.min(270, Math.max(160, window.innerWidth - rect.right - 20));
        startY = Math.max(-380, -rect.top + 20);
      }

      // Smooth sweeping trajectory curve
      const p0 = { x: startX, y: startY };
      const p1 = { x: startX + 15, y: startY + (-startY) * 0.45 };
      const p2 = { x: startX * 0.4, y: 0 };
      const p3 = { x: 0, y: 0 };

      const animateFlight = (timestamp: number) => {
        if (!flightStartTime) flightStartTime = timestamp;
        const elapsed = timestamp - flightStartTime;
        const rawProgress = Math.min(1, elapsed / FLIGHT_DURATION);

        const easedProgress =
          rawProgress < 0.5
            ? 4 * rawProgress * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

        const { x, y, angle } = getBezierPoint(p0, p1, p2, p3, easedProgress);

        let angleToUse: number;

        // HEADING LOCK: Freeze rotation at 85% progress to eliminate zero-delta singularity
        if (rawProgress < 0.85) {
          if (continuousAngleRef.current === null) {
            continuousAngleRef.current = angle;
          } else {
            continuousAngleRef.current = unwrapAngle(angle, continuousAngleRef.current);
          }

          const approachDampen = Math.max(0, 1 - Math.max(0, (rawProgress - 0.5) / 0.3));
          const bankTilt = Math.sin(easedProgress * Math.PI) * -4 * approachDampen;
          const flutter = Math.sin(elapsed * 0.015) * 0.9 * approachDampen;

          angleToUse = continuousAngleRef.current + bankTilt + flutter;
          lockedHeadingRef.current = angleToUse;
        } else {
          angleToUse = lockedHeadingRef.current;
        }

        const scale = 0.85 + 0.15 * easedProgress;

        setRocketPos({
          x,
          y,
          angle: angleToUse,
          scale,
        });

        if (rawProgress < 1) {
          animationFrameId = requestAnimationFrame(animateFlight);
        } else {
          // Landing sequence: rocket reaches (0, 0) at locked heading
          setRocketPos((prev) => ({ ...prev, x: 0, y: 0, angle: lockedHeadingRef.current, scale: 1 }));
          setPhase("step7-landing");

          // -----------------------------------------------------------------
          // EXACT REVERSE UNFOLDING SEQUENCE (Steps 7 -> 1)
          // -----------------------------------------------------------------
          // Step 6/5: Wings lift & unfold flat from dihedral fold (Step 7 -> 5)
          setTimeout(() => {
            setPhase("step6-wings");
          }, 280);

          // Step 4: Center spine opens flat like a card opening (Step 4 -> 3)
          setTimeout(() => {
            setPhase("step4-spine");
          }, 540);

          // Step 3: Long diagonal edge flaps peel open outward (Step 3 -> 2)
          setTimeout(() => {
            setPhase("step3-flaps");
          }, 800);

          // Step 2: Top corner triangles peel open to corners (Step 2 -> 1)
          setTimeout(() => {
            setPhase("step2-corners");
          }, 1060);

          // Step 1: Fully flat sheet reveals GIC message inside, permanently docked
          setTimeout(() => {
            setPhase("step1-revealed");
          }, 1350);
        }
      };

      animationFrameId = requestAnimationFrame(animateFlight);
    }, 1200);

    return () => {
      clearTimeout(startFlightTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={landingAnchorRef}
      className="absolute -top-[88px] sm:-top-[92px] lg:-top-[96px] right-4 sm:right-6 lg:right-6 z-30 select-none pointer-events-none"
      style={{ perspective: 1200 }}
    >
      {/* ========================================================================= */}
      {/* STEP 7: ASSEMBLED PLAIN PAPER AIRPLANE (Flight & Landing)                 */}
      {/* Completely plain on the exterior — matches Step 7 in the tutorial drawing  */}
      {/* ========================================================================= */}
      {(phase === "step7-flying" || phase === "step7-landing") && (
        <div
          className="absolute top-0 right-0 z-50 pointer-events-none"
          style={{
            transform: `translate3d(${rocketPos.x}px, ${rocketPos.y}px, 0) rotate(${rocketPos.angle}deg)`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <motion.div
            initial={{ scale: 0.85 }}
            animate={
              phase === "step7-landing"
                ? {
                  y: [0, 5, -2, 0],
                  scaleY: [1, 0.92, 1.02, 1],
                  scaleX: [1, 1.04, 0.99, 1],
                }
                : { scale: rocketPos.scale }
            }
            transition={
              phase === "step7-landing"
                ? { duration: 0.28, times: [0, 0.25, 0.65, 1], ease: "easeOut" }
                : { duration: 0.05, ease: "linear" }
            }
            className="relative"
          >
            {/* Soft Organic Paper Drop Shadow */}
            <div
              className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/40 rounded-full blur-[3px] pointer-events-none"
              style={{ transform: `scale(${0.8 + 0.2 * rocketPos.scale})` }}
            />

            {/* Plain Step 7 Paper Airplane SVG */}
            <PlainStep7AirplaneSVG filterId={filterId} />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6/5: WINGS LIFT & UNFOLD FLAT (Reverse 7 -> 5)                       */}
      {/* Wings lift from dihedral fold and unfold flat away from the center keel   */}
      {/* ========================================================================= */}
      {phase === "step6-wings" && (
        <div
          className="absolute top-0 right-0 z-40 pointer-events-none"
          style={{
            transform: `translate3d(0px, 0px, 0) rotate(${lockedHeadingRef.current}deg)`,
            transformOrigin: "center center",
            perspective: 900,
          }}
        >
          <motion.div
            initial={{ rotateX: 30, scale: 1 }}
            animate={{ rotateX: 0, scale: 1.04 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <PlainStep7AirplaneSVG filterId={filterId} isWingsLifting />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: CENTER SPINE OPENS FLAT (Reverse 4 -> 3)                          */}
      {/* The plane was folded in half down the center; it now opens flat like a     */}
      {/* book, revealing the long triangular folded nose of Step 3                 */}
      {/* ========================================================================= */}
      {phase === "step4-spine" && (
        <div
          className="absolute top-0 right-0 z-40 pointer-events-none"
          style={{
            transform: `translate3d(0px, 0px, 0)`,
            transformOrigin: "center right",
            perspective: 1000,
          }}
        >
          <motion.div
            initial={{ rotateY: 45, scale: 1 }}
            animate={{ rotateY: 0, scale: 1.06 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Step3FoldedSheetSVG filterId={filterId} />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: LONG DIAGONAL FLAPS PEEL OUTWARD (Reverse 3 -> 2)                 */}
      {/* The long sloping edge flaps unfold outward away from the center crease,   */}
      {/* transitioning the shape from Step 3 to Step 2                             */}
      {/* ========================================================================= */}
      {phase === "step3-flaps" && (
        <div
          className="absolute top-0 right-0 z-40 pointer-events-none"
          style={{
            transform: `translate3d(0px, 0px, 0)`,
            transformOrigin: "center right",
            perspective: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 0.25 }}
          >
            <Step2FlapsOpeningSVG filterId={filterId} />
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: TOP CORNER TRIANGLES PEEL OPEN (Reverse 2 -> 1)                   */}
      {/* The top two corner triangles peel open outward to the corners, expanding   */}
      {/* into the completely flat rectangular paper sheet of Step 1               */}
      {/* ========================================================================= */}
      {phase === "step2-corners" && (
        <motion.div
          initial={{ width: 120, height: 60, opacity: 1 }}
          animate={{
            width: [120, 185, 255],
            height: [60, 62, 64],
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 right-0 z-40 overflow-hidden border-2 border-[#07090D] shadow-[3px_3px_0px_0px_#07090D] p-1.5 flex items-center"
          style={{
            transformStyle: "preserve-3d",
            backgroundColor: GIC_THEME.paper,
          }}
        >
          {/* Authentic Archival Paper Texture on the unfolding sheet */}
          <div
            className="absolute inset-0 opacity-12 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#07090D 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Left Corner Triangle Peeling Open Outward */}
          <motion.div
            initial={{ rotateZ: 0, rotateX: 0 }}
            animate={{ rotateZ: -120, rotateX: -160 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-14 h-10 border-r border-b border-[#07090D]/40 origin-top-left shadow-sm"
            style={{
              backgroundColor: GIC_THEME.paperDark,
              transformStyle: "preserve-3d",
            }}
          />

          {/* Right Corner Triangle Peeling Open Outward */}
          <motion.div
            initial={{ rotateZ: 0, rotateX: 0 }}
            animate={{ rotateZ: 120, rotateX: 160 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-14 h-10 border-l border-b border-[#07090D]/40 origin-top-right shadow-sm"
            style={{
              backgroundColor: GIC_THEME.paperDark,
              transformStyle: "preserve-3d",
            }}
          />

          {/* Vertical center crease line from Step 1 */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#07090D]/30" />
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: FULLY FLAT RECTANGULAR SHEET WITH REVEALED GIC DOSSIER            */}
      {/* Reduced size + slow weightless float + minimal AICSSYC glowing border     */}
      {/* ========================================================================= */}
      {phase === "step1-revealed" && (
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [-0.3, 0.4, -0.3],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative pointer-events-auto"
        >
          {/* Minimal AICSSYC Subtle Glowing Border Frame */}
          <div className="relative p-[1px] bg-gradient-to-r from-emerald-500/20 via-[#E2B767]/25 to-emerald-500/20 shadow-[0_0_4px_rgba(226,183,103,0.08)] transition-shadow duration-300 hover:shadow-[0_0_8px_rgba(226,183,103,0.15)]">
            <motion.a
              href="https://globalincubation.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 pr-3 sm:pr-3.5 cursor-pointer group overflow-hidden border-2 border-[#07090D] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{
                backgroundColor: GIC_THEME.paper,
                color: GIC_THEME.ink,
                boxShadow: "3.5px 3.5px 0 0 #07090D, 0 6px 16px rgba(0,0,0,0.45)",
              }}
              aria-label="Global Incubation Committee - IEEE Computer Society - Official Announcement"
            >
              {/* Subtle GIC Archival Dot Grid Texture on the unfolded sheet */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: "radial-gradient(#07090D 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Vertical Center Crease Line from Step 1 of Paper Airplane Diagram */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#07090D]/15 pointer-events-none" />

              {/* Official GIC Logo Emblem Container */}
              <div className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 border-2 border-[#07090D] bg-[#F5F2E9] p-0.5 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-[1.5px_1.5px_0_0_#07090D]">
                <img
                  src="/gic-logo.png"
                  alt="Global Incubation Committee (GIC)"
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>

              {/* GIC Archival Typography Revealed on the Unfolded Sheet */}
              <div className="flex flex-col relative z-10 text-left min-w-0">
                {/* Top Eyebrow Tag: GIC Mustard Pill + Blinking Brick Dot */}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-[#07090D] bg-[#ECBE24] text-[#07090D] font-mono text-[8px] sm:text-[8.5px] font-bold uppercase tracking-widest leading-none shadow-[1px_1px_0_0_#07090D]">
                    <span className="h-1.5 w-1.5 bg-[#DF2414] animate-pulse shrink-0" />
                    <span>COMING SOON</span>
                  </span>
                  <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-widest text-[#07090D]/60 hidden sm:inline">
                    FILE № 001
                  </span>
                </div>

                {/* Main Headline: Archivo Black with Signature Brick Red Block */}
                <div
                  className="text-[11px] sm:text-[12.5px] font-black uppercase tracking-tight leading-none text-[#07090D] flex items-center gap-1"
                  style={{ fontFamily: "'Archivo Black', 'Inter', system-ui, sans-serif" }}
                >
                  <span>Global Incubation</span>
                  <span className="bg-[#DF2414] text-[#F5F2E9] px-1 py-0.5 text-[9.5px] sm:text-[10.5px] font-black inline-block tracking-normal border border-[#07090D]">
                    Committee
                  </span>
                </div>

                {/* Sub-credit / Affiliation Line in JetBrains Mono */}
                <div
                  className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-widest text-[#07090D]/75 mt-0.5 flex items-center justify-between gap-2"
                  style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                >
                  <span className="font-semibold">IEEE·CS / AICSSYC 2026</span>
                  <span className="inline-flex items-center text-[#DF2414] font-bold group-hover:translate-x-0.5 transition-transform duration-200">
                    <ArrowUpRight size={9.5} strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// =========================================================================
// SVG 1: STEP 7 ASSEMBLED PAPER AIRPLANE (Flight & Landing)
// Completely plain exterior matching Step 7 of the user's folding tutorial.
// =========================================================================
interface PlainStep7AirplaneSVGProps {
  filterId: string;
  isWingsLifting?: boolean;
}

function PlainStep7AirplaneSVG({ filterId, isWingsLifting }: PlainStep7AirplaneSVGProps) {
  return (
    <svg
      width="88"
      height="58"
      viewBox="0 0 88 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
    >
      <defs>
        <linearGradient id={`step7-top-${filterId}`} x1="8" y1="7" x2="86" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F8F5EE" />
          <stop offset="100%" stopColor="#ECE6D8" />
        </linearGradient>

        <linearGradient id={`step7-bottom-${filterId}`} x1="8" y1="51" x2="86" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAE3D4" />
          <stop offset="60%" stopColor="#DDD4C2" />
          <stop offset="100%" stopColor="#CFC5B1" />
        </linearGradient>

        <linearGradient id={`step7-keel-${filterId}`} x1="26" y1="29" x2="86" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BDB29B" />
          <stop offset="100%" stopColor="#9E937C" />
        </linearGradient>

        <pattern id={`step7-grain-${filterId}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 2L4 2M2 0L2 4" stroke="rgba(0,0,0,0.025)" strokeWidth="0.5" />
          <circle cx="1" cy="3" r="0.3" fill="rgba(0,0,0,0.03)" />
        </pattern>
      </defs>

      {/* Underbody Keel (Step 7) */}
      {!isWingsLifting && (
        <>
          <polygon points="86,29 26,29 20,35" fill={`url(#step7-keel-${filterId})`} opacity="0.85" />
          <polygon points="86,29 26,29 20,23" fill={`url(#step7-keel-${filterId})`} opacity="0.55" />
        </>
      )}

      {/* Upper Wing Panel */}
      <polygon
        points="86,29 8,7 26,29"
        fill={`url(#step7-top-${filterId})`}
        stroke="#4A4335"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon points="86,29 8,7 26,29" fill={`url(#step7-grain-${filterId})`} />

      {/* Lower Wing Panel */}
      <polygon
        points="86,29 26,29 8,51"
        fill={`url(#step7-bottom-${filterId})`}
        stroke="#4A4335"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon points="86,29 26,29 8,51" fill={`url(#step7-grain-${filterId})`} />

      {/* Rear Profile Notch */}
      <polygon points="26,29 8,7 16,29 8,51" fill="#DDD4C2" stroke="#4A4335" strokeWidth="0.9" opacity="0.35" />

      {/* Center Spine Crease Line */}
      <line x1="8" y1="29" x2="86" y2="29" stroke="#3D372B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="28" x2="82" y2="28" stroke="rgba(255,255,255,0.85)" strokeWidth="0.75" />

      {/* Folded Paper Nose Tip */}
      <polygon points="86,29 76,26 78,29 76,32" fill="#C5BBA4" stroke="#3D372B" strokeWidth="0.8" />
    </svg>
  );
}

// =========================================================================
// SVG 2: STEP 3 FOLDED PAPER SHEET (Reverse Step 4 -> 3)
// Flat paper sheet with central vertical crease line and long triangular nose
// matching Step 3 of the user's folding diagram.
// =========================================================================
function Step3FoldedSheetSVG({ filterId }: { filterId: string }) {
  return (
    <svg
      width="110"
      height="70"
      viewBox="0 0 110 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
    >
      <defs>
        <linearGradient id={`step3-bg-${filterId}`} x1="0" y1="0" x2="110" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F5F2E9" />
          <stop offset="100%" stopColor="#E5DFC9" />
        </linearGradient>
      </defs>

      {/* Main Base Paper Sheet */}
      <polygon
        points="55,2 104,22 104,68 6,68 6,22"
        fill={`url(#step3-bg-${filterId})`}
        stroke="#07090D"
        strokeWidth="1.5"
      />

      {/* Left Inward Diagonal Fold Flap (Step 3) */}
      <polygon
        points="55,2 55,68 28,68 28,34"
        fill="#E8E2D2"
        stroke="#07090D"
        strokeWidth="1.2"
      />

      {/* Right Inward Diagonal Fold Flap (Step 3) */}
      <polygon
        points="55,2 55,68 82,68 82,34"
        fill="#DDD5C2"
        stroke="#07090D"
        strokeWidth="1.2"
      />

      {/* Central Valley Fold Line (Step 1-4) */}
      <line x1="55" y1="2" x2="55" y2="68" stroke="#07090D" strokeWidth="1.8" strokeLinecap="round" />

      {/* Dashed guidelines showing where flaps fold inward from Step 2 */}
      <line x1="6" y1="22" x2="55" y2="68" stroke="#07090D" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <line x1="104" y1="22" x2="55" y2="68" stroke="#07090D" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
    </svg>
  );
}

// =========================================================================
// SVG 3: STEP 2 FLAPS PEELING OPEN (Reverse Step 3 -> 2)
// The diagonal flaps peel outward, leaving only the top corner triangles
// folded down, matching Step 2 of the user's folding diagram.
// =========================================================================
function Step2FlapsOpeningSVG({ filterId }: { filterId: string }) {
  return (
    <svg
      width="128"
      height="72"
      viewBox="0 0 128 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
    >
      <defs>
        <linearGradient id={`step2-bg-${filterId}`} x1="0" y1="0" x2="128" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F2E9" />
          <stop offset="100%" stopColor="#E5DFC9" />
        </linearGradient>
      </defs>

      {/* Rectangular Sheet Base with Center Crease */}
      <rect x="14" y="6" width="100" height="62" fill={`url(#step2-bg-${filterId})`} stroke="#07090D" strokeWidth="1.5" />

      {/* Left Corner 45° Triangle Folded Down (Step 2) */}
      <polygon points="64,6 64,36 34,6" fill="#DDD5C2" stroke="#07090D" strokeWidth="1.2" />

      {/* Right Corner 45° Triangle Folded Down (Step 2) */}
      <polygon points="64,6 64,36 94,6" fill="#DDD5C2" stroke="#07090D" strokeWidth="1.2" />

      {/* Diagonal dashed fold lines showing where corner triangles fold down from Step 1 */}
      <line x1="14" y1="6" x2="64" y2="36" stroke="#07090D" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.45" />
      <line x1="114" y1="6" x2="64" y2="36" stroke="#07090D" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.45" />

      {/* Central Valley Fold Line */}
      <line x1="64" y1="6" x2="64" y2="68" stroke="#07090D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
