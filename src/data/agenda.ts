export interface AgendaItem {
  id: string;
  timeRange: string;
  timelineAnchor?: string; // e.g., "8:00 AM", "10:00 AM" for the vertical rail
  title: string;
  subtitle?: string;
  tag: string;
  isParallel?: boolean;
  parallelSlot?: "left" | "right";
  isFeatured?: boolean;
  badge?: string;
  registrationUrl?: string;
}

export interface DayAgenda {
  dayNumber: number;
  date: string;
  tabLabel: string;
  title: string;
  venue: string;
  items: AgendaItem[];
}

export const congressAgenda: DayAgenda[] = [
  {
    dayNumber: 1,
    date: "8 October 2026",
    tabLabel: "8 October 2026",
    title: "Inauguration & Keynotes",
    venue: "TP Ganesan Auditorium",
    items: [
      { id: "d1-1", timelineAnchor: "12:30 PM", timeRange: "12:30 PM – 1:00 PM", title: "Registration setup", tag: "SETUP" },
      { id: "d1-2", timelineAnchor: "1:00 PM", timeRange: "1:00 PM – 2:00 PM", title: "Registration check-in, ID & Gifts distribution", tag: "REGISTRATION" },
      { id: "d1-3", timelineAnchor: "2:00 PM", timeRange: "2:00 PM – 2:30 PM", title: "Guests arrive", tag: "ARRIVAL" },
      { id: "d1-4", timelineAnchor: "2:30 PM", timeRange: "2:30 PM – 3:15 PM", title: "Inauguration (Lamp Lighting, Welcome Address, Felicitation, Chair Address, Event Briefing)", tag: "CEREMONY" },
      { id: "d1-5", timelineAnchor: "3:15 PM", timeRange: "3:15 PM – 3:50 PM", title: "Keynote Session (1)", tag: "KEYNOTE" },
      { id: "d1-6", timelineAnchor: "3:50 PM", timeRange: "3:50 PM – 4:00 PM", title: "Break (only for guests)", tag: "BREAK" },
      { id: "d1-7", timelineAnchor: "4:00 PM", timeRange: "4:00 PM – 4:50 PM", title: "Keynote Session (2)", tag: "KEYNOTE" },
      { id: "d1-8", timelineAnchor: "5:00 PM", timeRange: "5:00 PM – 6:00 PM", title: "Expert Panel Discussion", tag: "PANEL" },
      { id: "d1-9", timelineAnchor: "7:30 PM", timeRange: "7:30 PM – 8:30 PM", title: "Dinner starts (External participant venue)", tag: "DINNER" }
    ]
  },
  {
    dayNumber: 2,
    date: "9 October 2026",
    tabLabel: "9 October 2026",
    title: "Technical Talks & Cultural Event",
    venue: "Multiple halls",
    items: [
      { id: "d2-1", timelineAnchor: "8:00 AM", timeRange: "8:00 AM – 9:00 AM", title: "All team members / participants reporting", tag: "REPORTING" },
      { id: "d2-2", timelineAnchor: "9:00 AM", timeRange: "9:00 AM – 9:30 AM", title: "Guest arrival", tag: "ARRIVAL" },
      { id: "d2-3", timelineAnchor: "9:30 AM", timeRange: "9:30 AM – 9:45 AM", title: "Opening Address", tag: "ADDRESS" },
      { id: "d2-4", timelineAnchor: "9:45 AM", timeRange: "9:45 AM – 10:00 AM", title: "Day 2 Briefing", tag: "BRIEFING" },

      // Morning Parallel Track (10:00 AM - 1:00 PM)
      {
        id: "d2-boc-1",
        timelineAnchor: "10:00 AM",
        timeRange: "10:00 AM – 1:00 PM",
        title: "Battle of Chapters",
        subtitle: "The Ultimate Chapter Showdown · Showcase your events and impact",
        tag: "PRESENTATIONS",
        badge: "Prizes Worth $500",
        isFeatured: true,
        isParallel: true,
        parallelSlot: "left",
        registrationUrl: "https://forms.gle/czdMqi8EezL7VKT17"
      },
      { id: "d2-t1", timeRange: "10:00 AM – 10:50 AM", title: "Technical Talk 1", tag: "TECHNICAL", isParallel: true, parallelSlot: "right" },
      { id: "d2-t2", timeRange: "11:00 AM – 11:50 AM", title: "Technical Talk 2", tag: "TECHNICAL", isParallel: true, parallelSlot: "right" },
      { id: "d2-t3", timeRange: "12:00 PM – 12:50 PM", title: "Technical Talk 3", tag: "TECHNICAL", isParallel: true, parallelSlot: "right" },

      { id: "d2-lunch", timelineAnchor: "1:00 PM", timeRange: "1:00 PM – 2:30 PM", title: "Lunch Break", tag: "BREAK" },

      // Afternoon Parallel Track (2:30 PM - 7:00 PM)
      {
        id: "d2-boc-2",
        timelineAnchor: "2:30 PM",
        timeRange: "2:30 PM – 4:45 PM",
        title: "Battle of Chapters (Presentations Continue)",
        subtitle: "Chapter defense and final judging rounds",
        tag: "PRESENTATIONS",
        badge: "Prizes Worth $500",
        isFeatured: true,
        isParallel: true,
        parallelSlot: "left",
        registrationUrl: "https://forms.gle/czdMqi8EezL7VKT17"
      },
      { id: "d2-brk", timeRange: "4:45 PM – 5:15 PM", title: "Break", tag: "BREAK", isParallel: true, parallelSlot: "left" },
      { id: "d2-t4", timeRange: "3:40 PM – 4:10 PM", title: "Technical Talk 4", tag: "TECHNICAL", isParallel: true, parallelSlot: "right" },
      { id: "d2-t5", timeRange: "4:10 PM – 5:00 PM", title: "Technical Talk 5", tag: "TECHNICAL", isParallel: true, parallelSlot: "right" },
      { id: "d2-cult", timeRange: "5:00 PM – 7:00 PM", title: "Cultural Event", tag: "EVENT", isParallel: true, parallelSlot: "right" },

      { id: "d2-dinner", timelineAnchor: "7:00 PM", timeRange: "7:00 PM – 8:30 PM", title: "Networking Dinner", tag: "DINNER" }
    ]
  },
  {
    dayNumber: 3,
    date: "10 October 2026",
    tabLabel: "10 October 2026",
    title: "GIC / Startup Summit & Valedictory",
    venue: "Multiple halls",
    items: [
      { id: "d3-1", timelineAnchor: "8:00 AM", timeRange: "8:00 AM – 9:00 AM", title: "Team reporting", tag: "REPORTING" },
      { id: "d3-2", timelineAnchor: "9:00 AM", timeRange: "9:00 AM – 10:30 AM", title: "Participant / Guest reporting", tag: "REPORTING" },
      { id: "d3-3", timelineAnchor: "10:30 AM", timeRange: "10:30 AM – 1:00 PM", title: "GIC / Startup Summit", tag: "SUMMIT" },
      { id: "d3-4", timelineAnchor: "1:00 PM", timeRange: "1:00 PM – 2:30 PM", title: "Lunch Break", tag: "BREAK" },

      // Afternoon Parallel Track
      { id: "d3-5a", timelineAnchor: "2:30 PM", timeRange: "2:30 PM – 4:00 PM", title: "Continue GIC / Startup Summit", tag: "SUMMIT", isParallel: true, parallelSlot: "left" },
      { id: "d3-5b", timeRange: "3:00 PM – 4:00 PM", title: "Technical Talks", tag: "SESSIONS", isParallel: true, parallelSlot: "right" },

      { id: "d3-6", timelineAnchor: "4:00 PM", timeRange: "4:00 PM – 5:00 PM", title: "Valedictory Session (Closing & Appreciation)", tag: "CEREMONY" }
    ]
  },
  {
    dayNumber: 4,
    date: "11 October 2026",
    tabLabel: "11 October 2026",
    title: "Departure",
    venue: "Off-site",
    items: [
      { id: "d4-1", timelineAnchor: "7:00 AM", timeRange: "7:00 AM – 8:00 AM", title: "Reporting", tag: "REPORTING" },
      { id: "d4-2", timelineAnchor: "8:00 AM", timeRange: "8:00 AM – 3:30 PM", title: "Departure & Event out", tag: "TRAVEL" },
      { id: "d4-3", timelineAnchor: "3:30 PM", timeRange: "3:30 PM – 4:30 PM", title: "Return to SRM", tag: "TRAVEL" }
    ]
  }
];
