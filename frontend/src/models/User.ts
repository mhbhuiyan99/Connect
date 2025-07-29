import { Company } from "./Company";

export default interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_photo: string | null;
  student_id: string;
  batch: number;
  industries: Company[];
  created_at: string;
  updated_at: string;
}
