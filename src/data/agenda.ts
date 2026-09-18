export interface ScheduleBlock {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  venue?: string;
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
  dayOfWeek: string;
  title: string;
  venue: string;
  badge?: string;
  blocks: ScheduleBlock[];
}

export const timelineData: DayTimeline[] = [
  {
    dayNumber: 1,
    label: "Day 1",
    dayOfWeek: "Wednesday",
    date: "8 October 2026",
    title: "Inauguration & Keynotes",
    venue: "Hippocrates Hall",
    blocks: [
      { id: "d1-1", time: "12:30 PM", title: "Registration Setup", venue: "Hippocrates Hall", kind: "Setup" },
      { id: "d1-2", time: "1:00 PM – 2:00 PM", title: "Registration & Check-in", subtitle: "ID & Gift Distribution", venue: "Hippocrates Hall", kind: "Registration" },
      { id: "d1-3", time: "2:30 PM", title: "Guest Arrival", venue: "Hippocrates Hall", kind: "Arrival" },
      {
        id: "d1-4",
        time: "2:30 PM – 3:15 PM",
        title: "Inauguration Ceremony",
        subtitle: "Lamp Lighting · Welcome Address (Dr. Godfrey Winster S.) · Guest Felicitation · Chair Address · Event Briefing · Cake Cutting for IEEE CS Day",
        venue: "Hippocrates Hall",
        kind: "Ceremony"
      },
      { id: "d1-5", time: "3:15 PM – 3:50 PM", title: "Keynote Session 1", venue: "Hippocrates Hall", kind: "Keynote" },
      { id: "d1-6", time: "3:50 PM – 4:00 PM", title: "Break (Guests Only)", venue: "Hippocrates Hall", kind: "Break" },
      { id: "d1-7", time: "4:00 PM – 4:50 PM", title: "Keynote Session 2", venue: "Hippocrates Hall", kind: "Keynote" },
      { id: "d1-8", time: "5:00 PM – 6:00 PM", title: "Expert Panel Discussion", venue: "Hippocrates Hall", kind: "Panel" },
      { id: "d1-9", time: "7:30 PM – 8:30 PM", title: "Networking Dinner", venue: "External Participants' Venue", kind: "Dinner" }
    ]
  },
  {
    dayNumber: 2,
    label: "Day 2",
    dayOfWeek: "Thursday",
    date: "9 October 2026",
    title: "Technical Talks, Battle of Chapters & Cultural Night",
    venue: "Hippocrates Hall & Vendhar Square",
    badge: "FLAGSHIP",
    blocks: [
      { id: "d2-1", time: "8:00 AM", title: "Arrival & Reporting", subtitle: "All Team Members & Participants", venue: "Hippocrates Hall", kind: "Reporting" },
      { id: "d2-2", time: "8:15 AM – 8:30 AM", title: "Lucky Draw for Participants", venue: "Hippocrates Hall", kind: "Event" },
      { id: "d2-3", time: "9:00 AM", title: "Guest Arrival & Reporting", venue: "Hippocrates Hall", kind: "Arrival" },

      // Morning Parallel Sessions
      {
        id: "d2-workshop",
        time: "9:00 AM – 1:00 PM",
        title: "Hands-on Technical Workshop",
        subtitle: "Deep-dive technical workshop session",
        venue: "TP2-702/712",
        kind: "Workshop",
        isParallel: true,
        parallelSlot: "left"
      },
      {
        id: "d2-boc",
        time: "10:00 AM – 12:30 PM",
        title: "Battle of Chapters",
        subtitle: "The Ultimate Chapter Showdown · Showcase your events and impact",
        venue: "Hippocrates Hall",
        kind: "Flagship",
        badge: "Prizes Worth $500",
        isFeatured: true,
        isParallel: true,
        parallelSlot: "right",
        registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdiiY58U8j74rQVQKuI1vyOCrdUaXSPEKV-D8aXNGF0mq65nw/viewform?usp=send_form"
      },

      { id: "d2-lunch", time: "2:00 PM – 3:30 PM", title: "Lunch Break", venue: "Hippocrates Hall", kind: "Break" },

      // Afternoon & Evening Sessions
      { id: "d2-talk1", time: "3:30 PM – 4:30 PM", title: "Technical Talk - 1", venue: "Hippocrates Hall", kind: "Technical" },
      { id: "d2-cultural", time: "5:00 PM – 7:00 PM", title: "Cultural Night", venue: "Inside Vendhar Square", kind: "Event" },
      { id: "d2-dj", time: "7:00 PM – 9:00 PM", title: "DJ Night", venue: "Inside Vendhar Square", kind: "Event", isFeatured: true },
      { id: "d2-dinner", time: "8:00 PM – 9:00 PM", title: "Networking Dinner", venue: "VIP Lane", kind: "Dinner" },
      { id: "d2-closing", time: "9:00 PM – 10:00 PM", title: "Event Wind-Up & Closing of Day 2", venue: "VIP Lane / Vendhar Square", kind: "Ceremony" }
    ]
  },
  {
    dayNumber: 3,
    label: "Day 3",
    dayOfWeek: "Friday",
    date: "10 October 2026",
    title: "GIC Startup Summit & Valedictory",
    venue: "Hippocrates Hall & Campus",
    blocks: [
      { id: "d3-1", time: "8:00 AM", title: "Arrival & Reporting", subtitle: "All Team Members & Participants", venue: "Hippocrates Hall", kind: "Reporting" },
      { id: "d3-2", time: "8:15 AM – 8:30 AM", title: "Lucky Draw for Participants", venue: "Hippocrates Hall", kind: "Event" },

      // Morning Parallel Track
      {
        id: "d3-treasure",
        time: "10:00 AM – 12:30 PM",
        title: "Fun Event / Treasure Hunt",
        subtitle: "Open to participants who wish to join",
        venue: "SRMIST KTR Campus",
        kind: "Event",
        isParallel: true,
        parallelSlot: "left"
      },
      {
        id: "d3-gic",
        time: "10:30 AM – 12:30 PM",
        title: "Global Incubation Committee (GIC) - Startup Summit",
        subtitle: "Pitch stage for early-stage deep-tech founders, VCs, and mentors",
        venue: "Hippocrates Hall",
        kind: "Summit",
        isParallel: true,
        parallelSlot: "right",
        isFeatured: true
      },

      { id: "d3-lunch", time: "1:00 PM – 2:30 PM", title: "Lunch Break", venue: "Hippocrates Hall", kind: "Break" },

      // Afternoon Sessions
      { id: "d3-css", time: "2:30 PM – 3:00 PM", title: "CSS Session & Quiz", venue: "Hippocrates Hall", kind: "Technical" },
      { id: "d3-mentor", time: "3:00 PM – 3:30 PM", title: "Micro Mentoring Session", venue: "Hippocrates Hall", kind: "Mentorship" },
      { id: "d3-talk2", time: "3:30 PM – 4:00 PM", title: "Technical Talk - 2", venue: "Hippocrates Hall", kind: "Technical" },
      {
        id: "d3-valedictory",
        time: "4:00 PM – 5:00 PM",
        title: "Valedictory Session",
        subtitle: "Closing Remarks · Appreciation & Acknowledgements · Conclusion of AICSSYC 2026",
        venue: "Hippocrates Hall",
        kind: "Ceremony"
      }
    ]
  },
  {
    dayNumber: 4,
    label: "Day 4",
    dayOfWeek: "Saturday",
    date: "11 October 2026",
    title: "Mahabalipuram Cultural Excursion",
    venue: "Mahabalipuram Heritage Site",
    blocks: [
      { id: "d4-1", time: "7:00 AM", title: "Reporting of All Participants", venue: "SRMIST KTR", kind: "Reporting" },
      { id: "d4-2", time: "8:00 AM", title: "Pickup & Departure from SRMIST KTR", venue: "SRMIST KTR", kind: "Travel" },
      { id: "d4-3", time: "10:40 AM", title: "Arrival at Mahabalipuram", venue: "Mahabalipuram", kind: "Arrival" },
      { id: "d4-4", time: "10:40 AM – 11:30 AM", title: "Shore Temple Visit", venue: "Mahabalipuram", kind: "Excursion" },
      { id: "d4-5", time: "11:30 AM – 12:30 PM", title: "Krishna's Butter Ball Visit", venue: "Mahabalipuram", kind: "Excursion" },
      { id: "d4-6", time: "12:30 PM – 12:45 PM", title: "Return & Regroup Near the Buses", subtitle: "All participants must assemble by 12:30 PM", venue: "Mahabalipuram", kind: "Reporting" },
      { id: "d4-7", time: "12:45 PM – 1:30 PM", title: "Lunch", venue: "Mahabalipuram", kind: "Break" },
      { id: "d4-8", time: "1:30 PM", title: "Departure from Mahabalipuram", venue: "Mahabalipuram", kind: "Travel" },
      { id: "d4-9", time: "~3:30 PM – 4:00 PM", title: "Arrival at SRMIST KTR", venue: "SRMIST KTR", kind: "Arrival" }
    ]
  }
];

// Alias for backward compatibility
export const congressAgenda = timelineData;
