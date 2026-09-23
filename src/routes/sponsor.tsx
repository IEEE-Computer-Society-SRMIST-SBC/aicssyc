import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";
import { BackgroundFog } from "@/components/site/BackgroundFog";
import { Reveal, RevealGroup } from "@/components/site/Reveal";
import { SponsorFormModal } from "@/components/site/SponsorFormModal";

export const Route = createFileRoute("/sponsor")({
  component: SponsorComponent,
});

// Quick checkmark SVG component
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-gold shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SponsorComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure window is scrolled to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#04080e] text-ivory min-h-screen selection:bg-gold/30 selection:text-gold-soft overflow-x-hidden">
      <BackgroundFog />
      <SiteNav />

      <main className="relative pt-32 pb-40 md:pt-48 z-10">
        {/* HERO SECTION */}
        <div className="container-editorial mb-32">
          <Reveal direction="up">
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-6">
              Page 1: Why Partner With Us?
            </p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight text-balance mb-10">
              Why Collaborate with <br className="hidden md:block" />
              <em className="editorial-italic font-normal text-emerald">IEEE CS SBC?</em>
            </h1>
            <p className="text-ivory/80 text-lg md:text-xl max-w-3xl leading-[1.6]">
              Partnering with IEEE Computer Society Student Branch Chapter provides organizations
              with direct access to one of the most vibrant communities of students, researchers,
              innovators, and future technology leaders.
            </p>
          </Reveal>
        </div>

        {/* BENEFITS GRID */}
        <div className="container-editorial mb-32">
          <RevealGroup className="grid md:grid-cols-2 gap-12 md:gap-x-16 gap-y-16">
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-gold">Brand Visibility</h3>
              <ul className="space-y-3 text-ivory/70">
                <li className="flex gap-3">
                  <CheckIcon /> Reach 300+ delegates and attendees.
                </li>
                <li className="flex gap-3">
                  <CheckIcon /> Showcase your brand across event creatives, banners, standees,
                  merchandise, and digital platforms.
                </li>
                <li className="flex gap-3">
                  <CheckIcon /> Increase awareness among a highly targeted technology audience.
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-gold">Talent & Recruitment Access</h3>
              <ul className="space-y-3 text-ivory/70">
                <li className="flex gap-3">
                  <CheckIcon /> Interact directly with skilled students from engineering and
                  technology backgrounds.
                </li>
                <li className="flex gap-3">
                  <CheckIcon /> Promote internships, campus ambassador programs, training programs,
                  and career opportunities.
                </li>
                <li className="flex gap-3">
                  <CheckIcon /> Build a strong employer brand among future professionals.
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-gold">Community Engagement</h3>
              <ul className="space-y-3 text-ivory/70">
                <li className="flex gap-3">
                  <CheckIcon /> Conduct interactive activities and challenges.
                </li>
                <li className="flex gap-3">
                  <CheckIcon /> Build meaningful connections through direct student interaction.
                </li>
                <li className="flex gap-3">
                  <CheckIcon /> Generate product awareness through demonstrations and engagement
                  campaigns.
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-gold">Thought Leadership</h3>
              <ul className="space-y-3 text-ivory/70">
                <li className="flex gap-3">
                  <CheckIcon /> Share insights through keynote sessions, panel discussions, and
                  expert talks.
                </li>
                <li className="flex gap-3">
                  <CheckIcon /> Position your organization as an industry leader supporting
                  innovation and education.
                </li>
              </ul>
            </div>
          </RevealGroup>
        </div>

        {/* LETS COLLABORATE */}
        <div className="container-editorial mb-32 py-20 border-y border-ivory/10 bg-midnight-deep/30 backdrop-blur-md">
          <Reveal direction="up">
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-4">
              Page 2: Let's Collaborate!
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] mb-8">
              Let's Build Something <br />
              <em className="editorial-italic font-normal text-gold">Impactful</em> Together
            </h2>
            <div className="grid md:grid-cols-2 gap-10 text-ivory/80 leading-[1.7]">
              <div>
                <p className="mb-6">
                  We believe the best innovations emerge when industry and academia work together.
                  IEEE Computer Society Student Branch Chapter serves as a bridge between students
                  and industry by creating opportunities for learning, networking, and innovation.
                </p>
                <p className="font-semibold text-ivory mb-4">Your support will help us:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Organize impactful technical events.</li>
                  <li>Connect students with industry professionals.</li>
                  <li>Foster innovation and entrepreneurship.</li>
                  <li>Create career opportunities.</li>
                  <li>Enable meaningful industry-academia collaboration.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-ivory mb-4">
                  Together, we can provide students with:
                </p>
                <ul className="space-y-2 list-disc pl-5 mb-6">
                  <li>Real-world exposure & Industry insights.</li>
                  <li>Professional networking.</li>
                  <li>Internship opportunities.</li>
                  <li>Innovation-driven experiences.</li>
                </ul>
                <div className="p-6 border border-gold/20 bg-gold/5 rounded-xl">
                  <p className="text-gold font-medium italic">
                    "Your partnership is not merely sponsorship—it is an investment in the next
                    generation of engineers, researchers, entrepreneurs, and technology leaders."
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ENGAGEMENT OPPORTUNITIES */}
        <div className="container-editorial mb-32">
          <Reveal direction="up">
            <h2 className="font-display text-4xl mb-12">Sponsor Engagement Opportunities</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Sponsor Passport Challenge",
                desc: "Participants visit sponsor stalls and collect stamps or check-ins to unlock rewards and giveaways, increasing sponsor interaction and stall traffic.",
              },
              {
                title: "QR-Based Treasure Hunt",
                desc: "Interactive challenges using QR codes placed at sponsor locations, encouraging participants to explore sponsor offerings.",
              },
              {
                title: "Resume & Career Booths",
                desc: "Sponsors can provide resume reviews, career counseling, internship guidance, and mentorship opportunities.",
              },
              {
                title: "Interactive Stall Activities",
                desc: "Conduct coding challenges, quizzes, lucky draws, product showcases, demonstrations, and engagement activities.",
              },
              {
                title: "Exclusive Student Offers",
                desc: "Provide free trials, premium access, special discounts, and event-exclusive benefits.",
              },
              {
                title: "Social Media Campaigns",
                desc: "Expand digital visibility through dedicated posts, stories, contests, and sponsor-focused campaigns before and during the event.",
              },
            ].map((opp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-midnight-deep/50 border border-ivory/10 hover:border-gold/30 transition duration-300"
              >
                <h4 className="font-semibold text-gold mb-3">{opp.title}</h4>
                <p className="text-sm text-ivory/70 leading-relaxed">{opp.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </div>

        {/* PACKAGES */}
        <div className="container-editorial mb-32">
          <Reveal direction="up">
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-4">
              Page 3: Packages
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] mb-16">
              Sponsorship <em className="editorial-italic font-normal">Tiers</em>
            </h2>
          </Reveal>

          <div className="space-y-8">
            {/* TITLE SPONSOR */}
            <Reveal direction="up">
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-midnight-deep to-midnight border border-gold/30 shadow-[0_0_50px_rgba(212,166,60,0.15)] overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <h3 className="text-9xl font-display font-bold text-gold">01</h3>
                </div>
                <div className="md:flex justify-between items-end mb-10 border-b border-ivory/10 pb-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                      Official Title Sponsor / Powered By Partner
                    </span>
                    <h3 className="font-display text-4xl md:text-5xl text-ivory">Title Sponsor</h3>
                    <p className="text-ivory/60 mt-3 max-w-xl">
                      Maximum Visibility & Strategic Partnership. The highest level of visibility,
                      recognition, and engagement throughout the event.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <p className="text-4xl md:text-5xl font-light text-gold">₹2,00,000</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Official Event Naming Association ("Powered By" Recognition)
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Premium Logo Placement on All Event Creatives
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Top Website Placement & Premium Event Backdrop Branding
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Primary Merchandise Branding
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Integrated Promotional Campaign
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Prime Exhibition Stall Location
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Dedicated Demonstration Segment (10 Min Stage Address)
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Exclusive Sponsored Activity & Dedicated Recruitment Drive
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Premium Certificate Branding & Database Access
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Priority Future Collaboration Status
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* DIAMOND SPONSOR */}
            <Reveal direction="up">
              <div className="relative p-8 md:p-12 rounded-3xl bg-midnight-deep/60 backdrop-blur-md border border-ivory/15 hover:border-emerald/40 transition duration-500 overflow-hidden">
                <div className="md:flex justify-between items-end mb-10 border-b border-ivory/10 pb-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-emerald/10 text-emerald text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                      Strategic Industry Partner
                    </span>
                    <h3 className="font-display text-4xl text-ivory">Diamond Sponsor</h3>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <p className="text-3xl md:text-4xl font-light text-emerald">₹1,50,000</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Prominent Logo Placement on Event Creatives & Backdrop
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Premium Website Banner Placement
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Branding on Major Event Merchandise
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Premium Stall Location & Priority Demo Slot
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Sponsored Challenge or Activity
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Panel Participation & Enhanced Recruitment Visibility
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Featured Certificate Branding & Future Collaboration Preference
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* GOLD & SILVER GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* GOLD SPONSOR */}
              <Reveal direction="up">
                <div className="h-full p-8 rounded-3xl bg-midnight-deep/40 backdrop-blur-md border border-ivory/10 hover:border-ivory/30 transition">
                  <h3 className="font-display text-3xl text-ivory mb-2">Gold Sponsor</h3>
                  <p className="text-2xl font-light text-gold mb-8">₹1,00,000</p>
                  <div className="space-y-3">
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Medium Logo Placement on Creatives
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Preferred Stall Location & Product Display
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Contest / Giveaway Support
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> 3 Dedicated Sponsor Posts
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Internship Promotion Support
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* SILVER SPONSOR */}
              <Reveal direction="up" delay={0.1}>
                <div className="h-full p-8 rounded-3xl bg-midnight-deep/40 backdrop-blur-md border border-ivory/10 hover:border-ivory/30 transition">
                  <h3 className="font-display text-3xl text-ivory mb-2">Silver Sponsor</h3>
                  <p className="text-2xl font-light text-ivory/60 mb-8">₹50,000</p>
                  <div className="space-y-3">
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Small Logo Placement on Creatives
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Standard Stall Space & Product Display
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Dedicated Sponsor Social Media Post
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> General Sponsor Acknowledgement
                    </p>
                    <p className="flex gap-3 text-sm text-ivory/80">
                      <CheckIcon /> Limited Merchandise Branding
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* CUSTOMIZED SPONSOR */}
            <Reveal direction="up">
              <div className="p-8 md:p-10 rounded-3xl bg-ivory/5 border border-ivory/10 border-dashed">
                <div className="md:flex justify-between items-center mb-6">
                  <h3 className="font-display text-3xl text-ivory">
                    Community / Customized Sponsor
                  </h3>
                  <span className="inline-block px-4 py-2 mt-4 md:mt-0 bg-white/10 rounded-full text-sm font-medium">
                    Flexible Partnership Model
                  </span>
                </div>
                <p className="text-ivory/70 mb-8">
                  Suitable for Startups, Local Businesses, Food Partners, Merchandise Partners, and
                  Community Partners. Packages can be designed based on your goals, budget, and
                  preferred mode of support (e.g. Event Kits, Software Licenses, Food & Beverage).
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-midnight-deep rounded-md text-xs text-ivory/80">
                    T-Shirts & Merchandise
                  </span>
                  <span className="px-3 py-1.5 bg-midnight-deep rounded-md text-xs text-ivory/80">
                    Food & Beverage
                  </span>
                  <span className="px-3 py-1.5 bg-midnight-deep rounded-md text-xs text-ivory/80">
                    Printing Support
                  </span>
                  <span className="px-3 py-1.5 bg-midnight-deep rounded-md text-xs text-ivory/80">
                    Software Licenses
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="container-editorial mb-32">
          <Reveal direction="up">
            <h2 className="font-display text-3xl mb-8">Difference Between Sponsor Tiers</h2>
            <div className="overflow-x-auto rounded-2xl border border-ivory/10 bg-midnight-deep/50 backdrop-blur-md">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-ivory/10 bg-midnight-deep">
                    <th className="p-5 font-medium text-ivory/60 uppercase tracking-wider text-xs">
                      Benefit
                    </th>
                    <th className="p-5 font-bold text-gold">Title</th>
                    <th className="p-5 font-bold text-emerald">Diamond</th>
                    <th className="p-5 font-bold text-ivory">Gold</th>
                    <th className="p-5 font-bold text-ivory/60">Silver</th>
                    <th className="p-5 font-medium text-ivory/60">Customized</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-ivory/80 divide-y divide-ivory/5">
                  <tr className="hover:bg-ivory/5 transition">
                    <td className="p-5 font-medium text-ivory">Stage Time</td>
                    <td className="p-5 text-gold">10 min</td>
                    <td className="p-5 text-emerald">Panel Participation</td>
                    <td className="p-5">5 min</td>
                    <td className="p-5 text-ivory/50">Mention Only</td>
                    <td className="p-5 text-ivory/50">Optional</td>
                  </tr>
                  <tr className="hover:bg-ivory/5 transition">
                    <td className="p-5 font-medium text-ivory">Stall Position</td>
                    <td className="p-5 text-gold">Prime</td>
                    <td className="p-5 text-emerald">Premium</td>
                    <td className="p-5">Preferred</td>
                    <td className="p-5 text-ivory/50">Standard</td>
                    <td className="p-5 text-ivory/50">Depends</td>
                  </tr>
                  <tr className="hover:bg-ivory/5 transition">
                    <td className="p-5 font-medium text-ivory">Social Media</td>
                    <td className="p-5 text-gold">Integrated Campaign</td>
                    <td className="p-5 text-emerald">Enhanced Visibility</td>
                    <td className="p-5">3 Posts</td>
                    <td className="p-5 text-ivory/50">1 Post</td>
                    <td className="p-5 text-ivory/50">Mention</td>
                  </tr>
                  <tr className="hover:bg-ivory/5 transition">
                    <td className="p-5 font-medium text-ivory">Logo Size</td>
                    <td className="p-5 text-gold">Premium</td>
                    <td className="p-5 text-emerald">Prominent</td>
                    <td className="p-5">Medium</td>
                    <td className="p-5 text-ivory/50">Small</td>
                    <td className="p-5 text-ivory/50">Based on Contribution</td>
                  </tr>
                  <tr className="hover:bg-ivory/5 transition">
                    <td className="p-5 font-medium text-ivory">Event Naming Rights</td>
                    <td className="p-5 text-gold">Yes</td>
                    <td className="p-5 text-emerald">No</td>
                    <td className="p-5">No</td>
                    <td className="p-5 text-ivory/50">No</td>
                    <td className="p-5 text-ivory/50">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* FINAL CALL TO ACTION */}
        <div className="container-editorial text-center mb-20">
          <Reveal direction="up">
            <h2 className="font-display text-4xl mb-6">Ready to make an impact?</h2>
            <p className="text-ivory/60 mb-10 max-w-2xl mx-auto">
              Together, let's create an impactful experience that empowers students, drives
              innovation, and builds meaningful industry-academia partnerships. 🚀
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 bg-gold text-midnight px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-midnight hover:scale-105 transition duration-300 shadow-[0_0_40px_rgba(212,166,60,0.3)]"
            >
              Reach out to us
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </Reveal>
        </div>
      </main>

      <Footer />

      {/* RENDER MODAL */}
      <SponsorFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
