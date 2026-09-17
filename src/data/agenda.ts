export interface ScheduleBlock {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  kind: string;
  isParallel?: boolean;
  parallelSlot?: "left" | "right";
  isFeatured?: boolean;
  badge?: string;
  registrationUrl?: string;
  details?: string[];
}

export interface DayTimeline {
  dayNumber: number;
  label: string;
  date: string;
  title: string;
  venue: string;
  badge?: string;
  blocks: ScheduleBlock[];
}

export const timelineData: DayTimeline[] = [
  {
    dayNumber: 1,
    label: "Day 1",
    date: "8 October 2026",
    title: "Inauguration & Keynotes",
    venue: "TP Ganesan Auditorium",
    blocks: [
      { id: "d1-1", time: "12:30 PM", title: "Registration setup", kind: "Setup" },
      { id: "d1-2", time: "1:00 PM", title: "Registration check-in, ID & Gifts distribution", kind: "Registration" },
      { id: "d1-3", time: "2:30 PM", title: "Guests arrive", kind: "Arrival" },
      {
        id: "d1-4",
        time: "2:30 PM – 3:15 PM",
        title: "Inauguration Ceremony",
        subtitle: "Lamp Lighting · Welcome Address (Godfrey Sir) · Guest Felicitation · Chair Address · Event Briefing",
        kind: "Ceremony"
      },
      { id: "d1-5", time: "3:15 PM – 3:50 PM", title: "Keynote Session (1)", kind: "Keynote" },
      { id: "d1-6", time: "3:50 PM – 4:00 PM", title: "Break (only for guests)", kind: "Break" },
      { id: "d1-7", time: "4:00 PM – 4:50 PM", title: "Keynote Session (2)", kind: "Keynote" },
      { id: "d1-8", time: "5:00 PM – 6:00 PM", title: "Expert Panel Discussion", kind: "Panel" },
      { id: "d1-9", time: "7:30 PM – 8:30 PM", title: "Networking Dinner & Evening Session", kind: "Dinner" }
    ]
  },
  {
    dayNumber: 2,
    label: "Day 2",
    date: "9 October 2026",
    title: "Technical Talks & Cultural Event",
    venue: "Multiple halls",
    badge: "FLAGSHIP",
    blocks: [
      { id: "d2-1", time: "8:00 AM", title: "All team members / participants reporting", kind: "Reporting" },
      { id: "d2-2", time: "9:00 AM", title: "Guest arrival", kind: "Arrival" },
      { id: "d2-3", time: "9:30 AM", title: "Opening Address", kind: "Address" },
      { id: "d2-4", time: "9:45 AM", title: "Day 2 Briefing", kind: "Briefing" },

      // Morning Parallel Track (10:00 AM - 1:00 PM)
      {
        id: "d2-boc-morning",
        time: "10:00 AM – 1:00 PM",
        title: "Battle of Chapters",
        subtitle: "The Ultimate Chapter Showdown · Showcase your events and impact",
        kind: "Flagship",
        badge: "Prizes Worth $500",
        isFeatured: true,
        isParallel: true,
        parallelSlot: "left",
        registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdiiY58U8j74rQVQKuI1vyOCrdUaXSPEKV-D8aXNGF0mq65nw/viewform?usp=send_form"
      },
      { id: "d2-t1", time: "10:00 AM – 10:50 AM", title: "Technical Talk 1", kind: "Technical", isParallel: true, parallelSlot: "right" },
      { id: "d2-t2", time: "11:00 AM – 11:50 AM", title: "Technical Talk 2", kind: "Technical", isParallel: true, parallelSlot: "right" },
      { id: "d2-t3", time: "12:00 PM – 12:50 PM", title: "Technical Talk 3", kind: "Technical", isParallel: true, parallelSlot: "right" },

      { id: "d2-lunch", time: "1:00 PM – 2:30 PM", title: "Lunch Break", kind: "Break" },

      // Afternoon Parallel Track (2:30 PM - 7:00 PM)
      {
        id: "d2-boc-afternoon",
        time: "2:30 PM – 4:45 PM",
        title: "Battle of Chapters (Presentations Continue)",
        subtitle: "The Ultimate Chapter Showdown · Chapter presentations and judging",
        kind: "Flagship",
        badge: "Prizes Worth $500",
        isFeatured: true,
        isParallel: true,
        parallelSlot: "left",
        registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdiiY58U8j74rQVQKuI1vyOCrdUaXSPEKV-D8aXNGF0mq65nw/viewform?usp=send_form"
      },
      { id: "d2-break", time: "4:45 PM – 5:15 PM", title: "Break", kind: "Break", isParallel: true, parallelSlot: "left" },
      { id: "d2-t4", time: "3:40 PM – 4:10 PM", title: "Technical Talk 4", kind: "Technical", isParallel: true, parallelSlot: "right" },
      { id: "d2-t5", time: "4:10 PM – 5:00 PM", title: "Technical Talk 5", kind: "Technical", isParallel: true, parallelSlot: "right" },
      { id: "d2-cultural", time: "5:00 PM – 7:00 PM", title: "Cultural Event", kind: "Event", isParallel: true, parallelSlot: "right" },

      { id: "d2-dinner", time: "7:00 PM – 8:30 PM", title: "Networking Dinner", kind: "Dinner" }
    ]
  },
  {
    dayNumber: 3,
    label: "Day 3",
    date: "10 October 2026",
    title: "GIC / Startup Summit & Valedictory",
    venue: "Multiple halls",
    blocks: [
      { id: "d3-1", time: "8:00 AM", title: "Team reporting", kind: "Reporting" },
      { id: "d3-2", time: "9:00 AM", title: "Participants / Guest reporting", kind: "Reporting" },
      { id: "d3-3", time: "10:30 AM – 1:00 PM", title: "GIC / Startup Summit", kind: "Summit" },
      { id: "d3-4", time: "1:00 PM – 2:30 PM", title: "Lunch break", kind: "Break" },
      { id: "d3-5a", time: "2:30 PM – 4:00 PM", title: "Continue GIC / Startup Summit", kind: "Summit", isParallel: true, parallelSlot: "left" },
      { id: "d3-5b", time: "3:00 PM – 4:00 PM", title: "Technical Talks", kind: "Technical", isParallel: true, parallelSlot: "right" },
      {
        id: "d3-6",
        time: "4:00 PM – 5:00 PM",
        title: "Valedictory Session",
        subtitle: "Closing & Ending · Awards & Appreciation Ceremony",
        kind: "Ceremony"
      }
    ]
  },
  {
    dayNumber: 4,
    label: "Day 4",
    date: "11 October 2026",
    title: "Departure",
    venue: "Off-site",
    blocks: [
      { id: "d4-1", time: "7:00 AM", title: "Reporting", kind: "Reporting" },
      { id: "d4-2", time: "8:00 AM – 3:30 PM", title: "Departure", kind: "Travel" },
      { id: "d4-3", time: "3:30 PM", title: "Return to SRM", kind: "Travel" }
    ]
  }
];

// Alias for backward compatibility
export const congressAgenda = timelineData;
