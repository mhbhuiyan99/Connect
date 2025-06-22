"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AlumniCard, { Alumni } from "@/components/AlumniCard";
import { ImSpinner2 } from "react-icons/im";
import { config } from "@/lib/config";
const sampleAlumni: Alumni = {
  name: "Hasibul Kabir",
  email: "hasibul@example.com",
  linked_in: "https://linkedin.com/in/hasibulkabir",
  facebook: "https://facebook.com/hasibulkabir",
  skills: ["JavaScript", "React", "Next.js"],
  profile_photo: "/default-avatar.png", // fallback to default if empty
  student_id: "ce25003",
  batch: 0,
  current_industry: "Baper Hotel Pvt. Ltd.",
  job_title: "Software Engineer",
  role: "alumni",
  sorting_order: 25003,
};

export default function BatchDetailsPage() {
  const { batchID } = useParams(); // For App Router
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      const res = await fetch(
        `${config.apiBaseUrl}/v1/alumni/?batch=${batchID}`
      );
      const data = await res.json();
      if (res.ok) {
        setAlumni(data.items);
      } else {
        setAlumni([]);
      }
      setLoading(false);
    };
    fetchAlumni();
  }, [batchID]);

  const alumniInfo = (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
        🎓 Alumni from Batch {batchID}
      </h1>
      <p className="text-gray-500 text-sm md:text-base">
        Explore the graduates and professionals from this batch.
      </p>
      <div className="mt-3 w-20 h-1 bg-blue-600 rounded-full" />
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        {alumniInfo}
        <div className="flex justify-center items-center py-20">
          <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {alumniInfo}
      {/* Render Alumni */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {alumni.map((alum) => (
          <AlumniCard key={alum.student_id + Math.random()} alumni={alum} />
        ))}
      </div>
    </div>
  );
}
