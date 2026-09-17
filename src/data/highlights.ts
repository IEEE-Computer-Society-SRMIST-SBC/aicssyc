export interface HighlightLink {
  label: string;
  url: string;
  primary: boolean;
}

export interface MajorHighlight {
  id: string;
  badge?: string;
  edition?: string;
  title: string;
  subtitle: string;
  description: string;
  highlightTag?: string;
  deadline?: string;
  ctaText?: string;
  ctaUrl?: string;
  isFeatured?: boolean;
  qrCodeUrl?: string;
  posterUrl?: string;
  previewUrl?: string;
  links: HighlightLink[];
  gradient: string;
  glow: string;
  iconColor: string;
  borderColor: string;
  highlights: string[];
}

export const majorHighlights: MajorHighlight[] = [
  {
    id: "battle-of-chapters",
    title: "Battle of Chapters",
    subtitle: "Showcase Your Events",
    description:
      "Present your chapter's best events, initiatives, and overall impact. Compete against the top IEEE student chapters across the region for the ultimate title and a chance to win exciting prizes worth $500!",
    posterUrl: "/boc-poster.png",
    links: [
      {
        label: "Register & Submit",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdiiY58U8j74rQVQKuI1vyOCrdUaXSPEKV-D8aXNGF0mq65nw/viewform?usp=send_form",
        primary: true,
      },
      {
        label: "Presentation Template",
        url: "https://docs.google.com/presentation/d/1FwPDBm1MhVFbtlkgK4KKYSjEL1Mi4HPgN3vipOmjFR4/edit?slide=id.p1",
        primary: false,
      },
      {
        label: "Guidelines",
        url: "https://docs.google.com/document/d/1lUTj9XXF_HvvTalngT9cXYA7OdWo9HsPcii4k3yKX4w/edit?tab=t.0",
        primary: false,
      },
    ],
    gradient: "from-emerald-500/20 to-teal-500/0",
    glow: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    highlights: [
      "Win $500 Prize Pool",
      "Present Your Best Events",
      "Cross-chapter Networking",
      "Ultimate Regional Title",
    ],
  },
  {
    id: "startup-summit",
    title: "Global Incubation Committee",
    subtitle: "Startup Summit & Pitching",
    description:
      "Pitch your innovative ideas to industry leaders, prominent mentors, and active investors at our dedicated Startup Summit. Compete to secure vital incubation support, feedback, and seed funding to take your startup project to the next level.",
    previewUrl: "https://globalincubation.vercel.app/",
    links: [
      {
        label: "Explore Global Incubation Committee",
        url: "https://globalincubation.vercel.app/",
        primary: true,
      },
    ],
    gradient: "from-yellow-500/20 to-orange-500/0",
    glow: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/20",
    highlights: [
      "Seed Funding & Incubation",
      "Live Pitching to Investors",
      "1-on-1 Mentorship Sessions",
      "Industry Leader Feedback",
    ],
  },
  {
    id: "call-for-host-2027",
    badge: "DEADLINE: 1 OCTOBER",
    edition: "AICSSYC 2027",
    title: "Call for Host",
    subtitle: "All India Computer Society Student & Young Professional Congress 2027",
    description:
      "Step forward and bring India's flagship IEEE Computer Society congress to your institution. Lead the next convergence of 300+ student leaders, researchers, and innovators.",
    highlightTag: "HOSTING APPLICATION",
    deadline: "1 October 2026",
    ctaText: "Apply to Host AICSSYC 2027",
    ctaUrl: "https://docs.google.com/forms/d/e/1FAIpQLScMSV4uBZ5evBHPNZne6F32s49el7YWaA6ycsrEgUEAYos-6Q/viewform",
    posterUrl: "/call-for-host-poster.png",
    isFeatured: true,
    links: [
      {
        label: "Apply to Host AICSSYC 2027",
        url: "https://docs.google.com/forms/d/e/1FAIpQLScMSV4uBZ5evBHPNZne6F32s49el7YWaA6ycsrEgUEAYos-6Q/viewform",
        primary: true,
      },
    ],
    gradient: "from-amber-500/20 to-emerald-500/0",
    glow: "bg-amber-500/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    highlights: [
      "Host 300+ Delegates & IEEE Leaders",
      "Pan-India Visibility for Your Institution",
      "Shape the 2027 Congress Theme & Tracks",
      "Official IEEE Computer Society Flagship Event",
    ],
  },
];
