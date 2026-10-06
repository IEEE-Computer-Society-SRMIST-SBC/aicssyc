import studentCommitteeJson from "./studentCommittee.json";

export interface StudentLeader {
  name: string;
  role: string;
  category: "CHAIR" | "STUDENT_ADVISOR" | "VICE-CHAIR" | "CREATIVE_HEAD" | string;
  image: string;
}

export interface StudentOrganiser {
  name: string;
  role: string;
  image: string;
}

export interface StudentCommitteeData {
  chair?: StudentLeader;
  studentAdvisor?: StudentLeader;
  leadership: StudentLeader[];
  organisers: StudentOrganiser[];
}

export const studentCommitteeData: StudentCommitteeData = studentCommitteeJson as StudentCommitteeData;

export default studentCommitteeData;
