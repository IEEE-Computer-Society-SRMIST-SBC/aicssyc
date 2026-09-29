import scheduleJson from "./schedule.json";

export interface ScheduleItem {
  time: string;
  activity: string;
  title?: string;
  speaker?: string;
  speakers?: string[];
  moderator?: string;
  panelists?: string[];
  coordinators?: string[];
  description?: string;
  venue?: string;
  category?: string;
  tag?: string;
}

export interface DaySchedule {
  day: string;
  dayLabel?: string;
  weekday?: string;
  date: string;
  title: string;
  venueHighlight: string;
  mainVenue?: string;
  schedule: ScheduleItem[];
}

export const timelineData: DaySchedule[] = scheduleJson.map((dayData: any) => ({
  day: dayData.dayLabel || `Day ${dayData.day}`,
  dayLabel: dayData.dayLabel,
  weekday: dayData.weekday,
  date: `${dayData.weekday}, ${dayData.date}`,
  title: dayData.title,
  venueHighlight: dayData.mainVenue,
  mainVenue: dayData.mainVenue,
  schedule: dayData.events.map((event: any) => ({
    time: event.time,
    activity: event.title,
    title: event.title,
    speaker: event.speakers ? event.speakers.join(", ") : undefined,
    speakers: event.speakers,
    moderator: event.moderator,
    panelists: event.panelists,
    coordinators: event.coordinators,
    description: event.description,
    venue: event.venue,
    category: event.category ? event.category.toLowerCase() : "general",
    tag: event.tag || (event.category === "KEYNOTE" ? "KEYNOTE" : event.category === "WORKSHOP" ? "WORKSHOP" : undefined),
  })),
}));

export default timelineData;
