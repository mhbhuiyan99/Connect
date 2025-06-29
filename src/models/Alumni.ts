interface Alumni {
  id: string;
  student_id: string;
  batch: number;
  name: string;
  email: string;
  industries: {
    industry: string;
    position: string;
    responsibilities: string;
    platform: string;
  }[];
  skills: string[];
  linked_in: string | null;
  facebook: string | null;
  role: string;
  sorting_order: number;
  profile_photo: string | null;
  approved: boolean;
}

export default Alumni;