"use server";

import ProfileCard from "@/components/ProfileCard";
import { getMyAlumniProfile } from "./server";

export default async function ProfilePage() {
  const profile = await getMyAlumniProfile();

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Alumni Profile</h1>
      <ProfileCard
        {...profile}
        includeEditButton={true}
      />
    </div>
  );
}
