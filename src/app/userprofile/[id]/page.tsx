"use client";

import ProfileCard from "@/components/ProfileCard";
import { config } from "@/lib/config";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function UserProfilePage() {
  const { id }: { id: string } = useParams();

  const [alumni, setAlumni] = useState({
    student_id: "CE19001",
    batch: "17",
    name: "Hasan Karim",
    email: "hasan@example.com",
    linkedIn: "https://linkedin.com/in/hasankarim",
    facebook: "https://facebook.com/hasankarim",
    github: "https://github.com/hasankarim",
    profile_photo: "/default-avatar.png",
    skills: ["React", "TypeScript", "JavaScript", "GraphQL"],
    industries: [
      {
        industry: "Google",
        position: "Frontend Engineer",
        responsibilities: "UI Development",
        platform: "Web",
      },
      {
        industry: "Meta",
        position: "Intern",
        responsibilities: "Contributed to frontend features",
        platform: "Mobile",
      },
    ],
  });

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch(`${config.apiBaseUrl}/v1/alumni/${id}`);
        if (!res.ok) throw new Error("Failed to fetch alumni");
        const data = await res.json();
        setAlumni(data)
      } catch (err) {
        console.error(err);
      }
    }
    fetchAlumni()
  }, []);

  return (
    <div className="p-6 flex justify-center">
      <ProfileCard {...alumni} />
    </div>
  );
}
