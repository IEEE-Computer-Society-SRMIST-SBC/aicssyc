"use client";

import { useState, useEffect, useRef } from "react";
import { motion, LayoutGroup } from "framer-motion";

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

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("About");
  const isProgrammaticScroll = useRef(false);
  const scrollLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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
            const match = navItems.find((n) => n.href === `#${sectionIds[i]}`);
            if (match && match.label !== activeTab) {
              setActiveTab(match.label);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string }
  ) => {
    e.preventDefault();

    // 1. Immediately lock scroll-spy & set active tab
    isProgrammaticScroll.current = true;
    setActiveTab(item.label);

    if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);

    // 2. Smoothly scroll to target
    const target = document.querySelector(item.href);
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

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between w-full max-w-[1220px] rounded-full border border-white/10 bg-[#060a08]/85 px-6 py-2.5 backdrop-blur-xl shadow-2xl">
        
        {/* Left: Branding Logos */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AICSSYC 2026"
              className="h-7 w-auto object-contain"
            />
            <span className="h-5 w-px bg-white/20" />
            <img
              src="/srm.png"
              alt="SRM IST"
              className="h-7 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center: Nav Links with Single Shared Layout Indicator */}
        <LayoutGroup id="navbarTabs">
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer select-none whitespace-nowrap will-change-transform ${
                    isActive ? "text-amber-300 font-semibold" : "text-slate-300 hover:text-white"
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

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://aicssyc.ieeecssrm.in/ambassador"
            className="px-5 py-2 text-sm font-medium text-slate-200 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Ambassador
          </a>
          <a
            href="#passes"
            className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-black rounded-full bg-[#E5B869] hover:bg-[#d8a858] transition-all shadow-md whitespace-nowrap"
          >
            <span>Get Passes</span>
            <span>&rarr;</span>
          </a>
        </div>

      </div>
    </header>
  );
}
export { Navbar };
