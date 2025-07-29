"use server";

import AlumniInfoForm from "@/components/form/AlumniInfoForm";
import { getMyAlumniProfile } from "../server";

export default async function UpdateProfilePage() {
  const profile = await getMyAlumniProfile();
  return (
    <AlumniInfoForm
      mode="update"
      initialData={profile}
    />
  );
}
