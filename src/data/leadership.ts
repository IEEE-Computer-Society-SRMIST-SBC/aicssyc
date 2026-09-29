import leadershipJson from "./leadership.json";

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  image: string;
  tag: string;
}

export interface LeadershipData {
  chiefPatrons: LeadershipMember[];
  patrons: LeadershipMember[];
  advisoryCommittee: LeadershipMember[];
  convenor?: LeadershipMember;
}

export const leadershipData: LeadershipData = leadershipJson as LeadershipData;

export default leadershipData;
