"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { config } from "@/lib/config";
import AlumniInfoForm from "@/components/form/AlumniInfoForm";
import Alumni from "@/models/Alumni";
import { useRouter } from "next/navigation";

export default function UpdateProfilePage() {
  const { user, authLoading } = useAuthStore();
  const [alumni, setAlumni] = useState<Alumni>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    async function getAlumniById(id: string) {
      if (!id) throw new Error("User ID is required");

      const res = await fetch(`${config.apiBaseUrl}/v1/alumni/student/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch alumni data");
      return res.json();
    }

    getAlumniById(user?.student_id ?? "")
      .then((data) => setAlumni(data))
      .catch(() => console.error)
      .finally(() => setIsLoading(false));
  }, [authLoading, user?.student_id]);

  if (isLoading) return <div>Loading...</div>;
  if (!isLoading && !alumni && !user) router.push("/sign-in");

  return (
    <AlumniInfoForm
      mode="update"
      initialData={alumni}
    />
  );
}
