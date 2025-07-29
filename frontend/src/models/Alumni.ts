import { Company } from "./Company";

interface Alumni {
  id: string;
  student_id: string;
  batch: number;
  name: string;
  email: string;
  industries: Company[];
  skills: string[];
  linked_in: string | null;
  facebook: string | null;
  github: string | null;
  role: string;
  sorting_order: number;
  profile_photo: string | null;
  approved: boolean;
  hometown: string;
}

export default Alumni;
