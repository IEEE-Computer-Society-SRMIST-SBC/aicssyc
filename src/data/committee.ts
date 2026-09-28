import committeeList from "./committee.json";

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  team: string;
  tag: string;
  image: string;
  profileUrl: string;
}

export const committeeData: CommitteeMember[] = committeeList as CommitteeMember[];

export default committeeData;
