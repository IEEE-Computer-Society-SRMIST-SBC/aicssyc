import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Pillars", href: "#pillars" },
  { label: "Speakers", href: "#speakers" },
  { label: "Schedule", href: "#schedule" },
  { label: "Highlights", href: "#highlights" },
  { label: "Passes", href: "#passes" },
  { label: "Venue", href: "#venue" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const isProgrammaticScroll = useRef(false);
  const scrollLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isAmbassadorRoute = location.pathname === "/ambassador";
  const isHome = location.pathname === "/" || location.pathname === "";

  // Accurate Scroll-Spy using getBoundingClientRect with triggerZone (upper 35% of screen)
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      // Ignore all scroll events triggered by programmatic clicks
      if (isProgrammaticScroll.current) return;

      const triggerZone = window.innerHeight * 0.35;
      const sectionIds = navItems.map((item) => item.href.replace("#", ""));

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when the section top has crossed into the upper third of screen
          if (rect.top <= triggerZone) {
            if (activeSection !== sectionIds[i]) {
              setActiveSection(sectionIds[i]);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, activeSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { href: string; label: string },
  ) => {
    if (!isHome) return; // Allow normal route change if on another page
    e.preventDefault();
    const id = item.href.replace("#", "");

    // 1. Immediately lock scroll-spy & set active tab
    isProgrammaticScroll.current = true;
    setActiveSection(id);

    if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);

    // 2. Smoothly scroll to target
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    // 3. Unlock scroll-spy only after smooth scrolling has settled
    const unlockScroll = () => {
      isProgrammaticScroll.current = false;
      window.removeEventListener("scrollend", unlockScroll);
    };

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", unlockScroll, { once: true });
    }

    // Fallback timer in case browser doesn't fire scrollend
    scrollLockTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 md:px-8 max-w-6xl mx-auto pointer-events-none">
        {/* Unified Outer Floating Pill */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-xl bg-[#060D0A]/90 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.7)] transition-all duration-300 w-full"
        >
          {/* 1. Logos (Left) */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group py-1">
              <img
                src="/logo.png"
                alt="AICSSYC 2026"
                className="h-6 sm:h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="h-4 sm:h-6 md:h-7 w-px bg-white/20 shrink-0" />
              <img
                src="/srm.png"
                alt="SRM IST"
                className="h-5 sm:h-7 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* 2. Center Links: Enclosed pill with Framer Motion LayoutGroup and Pure GPU Transforms */}
          <LayoutGroup id="navbarTabs">
            <nav className="hidden min-[73rem]:flex items-center gap-0.5 min-w-0 bg-white/[0.03] border border-white/10 rounded-full px-2 py-1.5">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = isHome && activeSection === id;
                const targetHref = isHome ? item.href : `/${item.href}`;

                return (
                  <a
                    key={item.label}
                    href={targetHref}
                    onClick={(e) => handleNavClick(e, item)}
                    /* Note: No CSS transition-* classes here to avoid fighting Framer Motion */
                    className={`relative px-2.5 py-1.5 text-xs font-medium rounded-full cursor-pointer select-none whitespace-nowrap will-change-transform ${
                      isActive
                        ? "text-amber-300 font-semibold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavbarPill"
                        className="absolute inset-0 rounded-full border border-amber-400/50 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.15)] transform-gpu"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                          mass: 0.5,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </LayoutGroup>

          {/* 3. Action Buttons (Right Desktop) */}
          <div className="hidden min-[73rem]:flex items-center gap-2 shrink-0">
            <Link
              to="/ambassador"
              className="px-3.5 py-2 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[40px] text-white/90 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-[#E2B767]/50"
            >
              <span>Ambassador</span>
            </Link>
            <a
              href={isHome ? "#passes" : "/#passes"}
              className="bg-[#E2B767] hover:bg-[#d6aa5a] text-[#060D0A] font-semibold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all shadow-[0_0_20px_rgba(226,183,103,0.3)] hover:shadow-[0_0_28px_rgba(226,183,103,0.5)] min-h-[40px] group"
            >
              <span>Get Passes</span>
              <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
            </a>
          </div>

          {/* 4. Mobile / Tablet Controls (< 73rem) */}
          <div className="flex min-[73rem]:hidden items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/ambassador"
              className="hidden sm:inline-flex items-center text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap text-white/90 bg-white/[0.06] border border-white/15 hover:bg-white/10"
            >
              Ambassador
            </Link>

            <a
              href={isHome ? "#passes" : "/#passes"}
              className="bg-[#E2B767] hover:bg-[#d6aa5a] text-[#060D0A] font-semibold text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full inline-flex items-center gap-1 shadow-[0_0_12px_rgba(226,183,103,0.3)] min-h-[34px] sm:min-h-[36px] whitespace-nowrap shrink-0 active:scale-95 transition-transform"
            >
              <span>Passes</span>
              <span className="font-bold text-xs">→</span>
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
              aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} className="text-[#E2B767]" /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Slide-Over Sheet / Full Backdrop Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-Down / Slide-Over Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-16 sm:top-20 z-50 lg:hidden mx-auto max-w-xl rounded-3xl p-5 sm:p-6 bg-[#060D0A]/95 backdrop-blur-xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.9)] max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="flex flex-col gap-4">
                {/* Header inside Sheet */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2B767] font-mono flex items-center gap-2">
                    <Sparkles size={13} /> AICSSYC 2026 Menu
                  </span>
                  <button
                    onClick={closeMenu}
                    className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-white/70 hover:text-white"
                    aria-label="Close Menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 py-1">
                  {navItems.map((item) => {
                    const isActive = isHome && activeSection === item.href.replace("#", "");
                    const targetHref = isHome ? item.href : `/${item.href}`;

                    return (
                      <a
                        key={item.href}
                        href={targetHref}
                        onClick={(e) => {
                          closeMenu();
                          handleNavClick(e, item);
                        }}
                        className={`min-h-[44px] px-4 py-2.5 rounded-2xl text-sm font-medium transition-all flex items-center justify-between ${
                          isActive
                            ? "bg-[#E2B767]/15 text-[#E2B767] font-semibold border border-[#E2B767]/30"
                            : "text-white/85 hover:text-white hover:bg-white/5 active:bg-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#E2B767]" : "bg-white/20"}`}
                          />
                          {item.label}
                        </span>
                        <span className="text-xs text-[#E2B767] font-bold">→</span>
                      </a>
                    );
                  })}
                </nav>

                {/* Bottom Sheet CTAs */}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                  <Link
                    to="/ambassador"
                    onClick={closeMenu}
                    className={`min-h-[44px] font-semibold py-3 px-5 rounded-2xl text-center text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(226,183,103,0.15)] ${
                      isAmbassadorRoute
                        ? "bg-[#E2B767]/25 text-[#E2B767] border border-[#E2B767]/60"
                        : "bg-[#E2B767]/15 hover:bg-[#E2B767]/25 text-[#E2B767] border border-[#E2B767]/40"
                    }`}
                  >
                    <span>Campus Ambassador Program</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href={isHome ? "#tickets" : "/#tickets"}
                    onClick={closeMenu}
                    className="min-h-[44px] bg-[#E2B767] hover:bg-[#d6aa5a] text-[#060D0A] font-semibold py-3 px-5 rounded-2xl text-center text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(226,183,103,0.35)]"
                  >
                    <span>Get Delegate Passes</span>
                    <ArrowRight size={15} />
                  </a>

                  <Link
                    to="/sponsor"
                    onClick={closeMenu}
                    className="min-h-[44px] btn-secondary-glass py-3 px-5 rounded-2xl text-center text-xs font-medium flex items-center justify-center gap-2"
                  >
                    <span>Partner &amp; Sponsor</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
