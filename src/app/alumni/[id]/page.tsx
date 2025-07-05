"use client";

import { useParams, useRouter } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import { config } from "@/lib/config";
import { useEffect, useState } from "react";
import Alumni from "@/models/Alumni";

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [alumni, setAlumni] = useState<Alumni>({
    student_id: "",
    batch: 1,
    name: "",
    email: "",
    linked_in: "",
    facebook: "",
    github: "",
    profile_photo: "/default-avatar.png",
    skills: [],
    industries: [],
    role: "alumni",
    sorting_order: 0,
    approved: true,
    id: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserById(id: string) {
      if (!id) throw new Error("User ID is required");

      const res = await fetch(`${config.apiBaseUrl}/v1/alumni/${id}`);
      if (!res.ok) throw new Error("Failed to fetch alumni data");
      return res.json();
    }

    getUserById(id as string)
      .then((data) => setAlumni(data))
      .catch(() => console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Alumni Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading && !alumni.student_id) {
    return router.push("/alumni");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Alumni Profile</h1>
      <ProfileCard {...alumni} />
    </div>
  );
}
