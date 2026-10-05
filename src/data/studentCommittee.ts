import studentCommitteeJson from "./studentCommittee.json";

export interface StudentLeader {
  name: string;
  role: string;
  category: "CHAIR" | "VICE-CHAIR" | "CREATIVE_HEAD" | string;
  image: string;
}

export interface StudentOrganiser {
  name: string;
  role: string;
  image: string;
}

export interface StudentCommitteeData {
  leadership: StudentLeader[];
  organisers: StudentOrganiser[];
}

export const studentCommitteeData: StudentCommitteeData = studentCommitteeJson as StudentCommitteeData;

export default studentCommitteeData;
