export interface ScheduleItem {
  time: string;
  activity: string;
  speaker?: string;
  venue?: string;
  category?: "keynote" | "workshop" | "panel" | "competition" | "networking" | "excursion" | "general";
  tag?: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  title: string;
  venueHighlight: string;
  schedule: ScheduleItem[];
}

export const timelineData: DaySchedule[] = [
  {
    day: "Day 1",
    date: "Thursday, 8th October 2026",
    title: "Inauguration & Visionary Keynotes",
    venueHighlight: "T.P Ganesan Auditorium",
    schedule: [
      {
        time: "2:00 PM",
        activity: "Guest Arrival",
        venue: "T.P Ganesan Auditorium",
        category: "general"
      },
      {
        time: "2:30 PM – 3:30 PM",
        activity: "Inauguration Ceremony",
        venue: "T.P Ganesan Auditorium",
        category: "general"
      },
      {
        time: "3:30 PM – 4:30 PM",
        activity: "Keynote Session 1",
        speaker: "Mr. Shivam Shivam",
        venue: "T.P Ganesan Auditorium",
        category: "keynote"
      },
      {
        time: "4:30 PM – 4:40 PM",
        activity: "Break (Guests Only) & Lucky Draw",
        venue: "T.P Ganesan Auditorium",
        category: "general"
      },
      {
        time: "5:00 PM – 6:30 PM",
        activity: "Expert Panel Discussion: 'AI empowering our future or weakening our thinking'",
        speaker: "Mr. Shivam Shivam",
        venue: "T.P Ganesan Auditorium",
        category: "panel"
      },
      {
        time: "6:30 PM – 7:00 PM",
        activity: "Networking for Participants",
        category: "networking"
      },
      {
        time: "7:00 PM – 8:30 PM",
        activity: "Dinner (for external participants only)",
        venue: "External Participants' Venue",
        category: "networking"
      }
    ]
  },
  {
    day: "Day 2",
    date: "Friday, 9th October 2026",
    title: "Workshops, Chapter Showdown & Cultural Night",
    venueHighlight: "Hippocrates Hall & Vendhar Square",
    schedule: [
      {
        time: "8:00 AM",
        activity: "Registration & Check-In (ID & Gift distribution)",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "8:00 AM",
        activity: "Arrival & Reporting – All Team Members & Participants",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "8:15 AM – 8:30 AM",
        activity: "Lucky Draw for Participants",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "9:00 AM",
        activity: "Guest Arrival & Reporting",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "9:00 AM – 1:00 PM",
        activity: "Workshop: Agentic AI & DRDO (Paid)",
        speaker: "TBD",
        venue: "Hippocrates Hall",
        category: "workshop",
        tag: "Paid Track"
      },
      {
        time: "10:30 AM – 10:45 AM",
        activity: "Morning Refreshment Break",
        category: "general"
      },
      {
        time: "10:45 AM – 12:30 PM",
        activity: "Battle of Chapters: Chapter Presentations",
        venue: "Medical Hall",
        category: "competition",
        tag: "Flagship"
      },
      {
        time: "1:00 PM – 2:00 PM",
        activity: "Lunch Break",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "2:00 PM – 3:30 PM",
        activity: "Treasure Hunt (Open to participating delegates)",
        venue: "SRMIST KTR Campus",
        category: "competition"
      },
      {
        time: "2:00 PM – 3:30 PM",
        activity: "Prompt Wars",
        venue: "Hippocrates Hall",
        category: "competition"
      },
      {
        time: "3:30 PM – 3:45 PM",
        activity: "Afternoon Break",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "3:45 PM – 5:30 PM",
        activity: "Treasure Hunt (Open to participating delegates)",
        venue: "SRMIST KTR Campus",
        category: "competition"
      },
      {
        time: "3:45 PM – 5:30 PM",
        activity: "Prompt Wars",
        venue: "Hippocrates Hall",
        category: "competition"
      },
      {
        time: "6:00 PM – 7:00 PM",
        activity: "Cultural Night",
        venue: "Inside Vendhar Square",
        category: "networking",
        tag: "Cultural Gala"
      },
      {
        time: "7:00 PM – 8:30 PM",
        activity: "DJ Night (Paid SRM Students)",
        venue: "Inside Vendhar Square",
        category: "networking",
        tag: "Live DJ"
      },
      {
        time: "7:30 PM – 9:00 PM",
        activity: "Networking Dinner",
        venue: "VIP Lane",
        category: "networking"
      },
      {
        time: "9:00 PM – 10:00 PM",
        activity: "Event Wind-Up & Closing of Day 2",
        venue: "VIP Lane / Vendhar Square",
        category: "general"
      }
    ]
  },
  {
    day: "Day 3",
    date: "Saturday, 10th October 2026",
    title: "Deep-Tech Talks, Startup Summit & Valedictory",
    venueHighlight: "Hippocrates Hall",
    schedule: [
      {
        time: "8:00 AM",
        activity: "Arrival & Reporting – All Team Members & Participants",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "8:15 AM – 8:30 AM",
        activity: "Lucky Draw for Participants",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "9:00 AM – 10:15 AM",
        activity: "Technical Talk: SPACECRAFT MISSION DEFINITION (The Journey from Mission Concept to Orbit)",
        speaker: "Himani Saini",
        venue: "Hippocrates Hall",
        category: "keynote"
      },
      {
        time: "10:15 AM – 10:30 AM",
        activity: "Morning Refreshment Break",
        category: "general"
      },
      {
        time: "10:30 AM – 11:30 AM",
        activity: "Technical Talk: The Role of Decision Intelligence in the Age of AI",
        speaker: "Balaji Sir",
        venue: "Hippocrates Hall",
        category: "keynote"
      },
      {
        time: "11:30 AM – 1:00 PM",
        activity: "Global Incubation Committee (GIC) – Startup Summit",
        speaker: "Nikky Kumar Jha",
        venue: "Hippocrates Hall",
        category: "workshop",
        tag: "Innovation"
      },
      {
        time: "1:00 PM – 2:00 PM",
        activity: "Lunch Break",
        venue: "Hippocrates Hall",
        category: "general"
      },
      {
        time: "2:00 PM – 3:00 PM",
        activity: "Technical Workshop",
        speaker: "Dr. Mini Ulanat",
        venue: "Hippocrates Hall",
        category: "workshop"
      },
      {
        time: "3:00 PM – 3:30 PM",
        activity: "Micro Mentoring Session",
        venue: "Hippocrates Hall",
        category: "networking"
      },
      {
        time: "3:30 PM – 4:00 PM",
        activity: "CSS Session & Quiz",
        venue: "Hippocrates Hall",
        category: "competition"
      },
      {
        time: "4:00 PM – 5:00 PM",
        activity: "Valedictory Session: Closing Remarks, Appreciation, Acknowledgements & Conclusion",
        venue: "Hippocrates Hall",
        category: "general",
        tag: "Concluding Ceremony"
      }
    ]
  },
  {
    day: "Day 4",
    date: "Sunday, 11th October 2026",
    title: "Mahabalipuram Heritage Excursion",
    venueHighlight: "Mahabalipuram UNESCO World Heritage Site",
    schedule: [
      {
        time: "7:00 AM",
        activity: "Reporting of All Participants",
        venue: "SRMIST KTR Campus",
        category: "excursion"
      },
      {
        time: "8:00 AM",
        activity: "Pickup & Bus Departure from SRMIST KTR",
        venue: "SRMIST KTR Campus",
        category: "excursion"
      },
      {
        time: "10:40 AM",
        activity: "Arrival at Mahabalipuram",
        venue: "Mahabalipuram",
        category: "excursion"
      },
      {
        time: "10:40 AM – 11:30 AM",
        activity: "Shore Temple Guided Visit",
        venue: "Mahabalipuram",
        category: "excursion",
        tag: "UNESCO Site"
      },
      {
        time: "11:30 AM – 12:30 PM",
        activity: "Krishna's Butter Ball Exploration",
        venue: "Mahabalipuram",
        category: "excursion"
      },
      {
        time: "12:30 PM – 12:45 PM",
        activity: "Return & Regroup Near the Buses (All participants must report by 12:30 PM)",
        venue: "Mahabalipuram Parking Bay",
        category: "excursion"
      },
      {
        time: "12:45 PM – 1:30 PM",
        activity: "Delegates Lunch",
        venue: "Mahabalipuram",
        category: "general"
      },
      {
        time: "1:30 PM",
        activity: "Departure from Mahabalipuram",
        venue: "Mahabalipuram",
        category: "excursion"
      },
      {
        time: "~3:30 PM – 4:00 PM",
        activity: "Arrival & Dispersal at SRMIST KTR Campus",
        venue: "SRMIST KTR Campus",
        category: "general"
      }
    ]
  }
];
