import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Themes } from "@/components/site/Themes";
import { Speakers } from "@/components/site/Speakers";
import { Agenda } from "@/components/site/Agenda";
import { FeaturedEvents } from "@/components/site/FeaturedEvents";
import { SneakPeek } from "@/components/SneakPeek";
import { WhyAttend } from "@/components/site/WhyAttend";
import { Tickets } from "@/components/site/Tickets";
import { Sponsors } from "@/components/site/Sponsors";
import { Location } from "@/components/site/Location";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { CallToAction } from "@/components/site/CallToAction";
import { Footer } from "@/components/site/Footer";

import faqs from "@/data/faqs.json";

const title = "All India Computer Society Student & Young Professional Congress 2026";
const description =
  "IEEE Computer Society SYP Congress 2026 at SRM IST, Kattankulathur. Theme: Where Agents Meet Humans. 8–11 October 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        property: "og:title",
        content: "All India Computer Society Student & Young Professional Congress 2026",
      },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://aicssyc.ieeecssrm.in/" },
      { property: "og:image", content: "https://aicssyc.ieeecssrm.in/banner.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://aicssyc.ieeecssrm.in/banner.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://aicssyc.ieeecssrm.in/" },
      { rel: "alternate", href: "https://aicssyc.in/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "AICSSYC 2026 — IEEE Computer Society SYP Congress",
          startDate: "2026-10-08",
          endDate: "2026-10-11",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Hippocrates Hall, SRM Institute of Science and Technology",
            address: "Kattankulathur, Tamil Nadu, India",
          },
          description,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-ivory min-h-screen overflow-x-hidden w-full relative">
      <SiteNav />

      <main className="overflow-x-hidden w-full">
        <Hero />
        <About />
        <Themes />
        <Speakers />
        <Agenda />
        <FeaturedEvents />
        <SneakPeek />
        <WhyAttend />
        <Tickets />
        <Sponsors />
        <Location />
        <FAQ />
        <Contact />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
