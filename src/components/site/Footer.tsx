import { Link } from "@tanstack/react-router";
import siteConfig from "@/data/site-config.json";

const quickNav = siteConfig.navigation;

export function Footer() {
  return (
    <footer className="relative bg-[#060D0A] text-ivory border-t border-white/10 overflow-hidden">
      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="AICSSYC 2026"
                className="h-8 sm:h-10 w-auto object-contain shrink-0"
              />
              <div className="h-6 sm:h-8 w-px bg-white/20 shrink-0" />
              <a
                href="https://www.srmist.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="/srm.png"
                  alt="SRM IST"
                  className="h-7 sm:h-8 w-auto object-contain shrink-0"
                />
              </a>
            </div>
            <p className="mt-3 sm:mt-4 text-xs text-slate-mist leading-relaxed font-sans">
              All India Computer Society Student &amp; Young Professional Congress 2026. Hosted at
              SRMIST, Kattankulathur, Chennai.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-glow mb-3 sm:mb-4 font-semibold">
              Venue &amp; Dates
            </h4>
            <p className="text-xs text-slate-mist leading-relaxed font-sans">
              Hippocrates Hall &amp; Vendhar Square
              <br />
              SRM Institute of Science and Technology
              <br />
              Kattankulathur, Chennai, Tamil Nadu
              <br />
              <span className="text-[#E2B767] font-semibold mt-2 block">October 8–11, 2026</span>
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-glow mb-3 sm:mb-4 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-mist">
              {quickNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-1 text-slate-mist hover:text-[#E2B767] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-glow mb-3 sm:mb-4 font-semibold">
              IEEE CS SYP
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-mist">
              <li>
                <a
                  href="https://www.instagram.com/ieeecs_srmist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 hover:text-[#E2B767] transition-colors"
                >
                  Instagram @ieeecs_srmist
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/ieee-computer-society-srmist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 hover:text-[#E2B767] transition-colors"
                >
                  LinkedIn IEEE CS SRMIST
                </a>
              </li>
              <li>
                <a
                  href="mailto:ieeecomputersocietysrmist@gmail.com"
                  className="inline-block py-1 hover:text-[#E2B767] transition-colors break-all"
                >
                  ieeecomputersocietysrmist@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-mist text-center sm:text-left">
          <p>© 2026 AICSSYC • IEEE Computer Society SYP • SRMIST Chennai</p>
          <div className="flex items-center gap-6">
            <Link to="/code-of-conduct" className="hover:text-ivory transition-colors py-1">
              Code of Conduct
            </Link>
            <Link to="/privacy" className="hover:text-ivory transition-colors py-1">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
