export default interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_photo: string | null;
  student_id: string;
  batch: number;
  industries: {
    industry: string;
    position: string;
    responsibilities: string;
    platform: string;
  }[];
}
