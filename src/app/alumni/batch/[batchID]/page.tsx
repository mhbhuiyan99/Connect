"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AlumniCard from "@/components/alumni/AlumniCard";
import { ImSpinner2 } from "react-icons/im";
import { config } from "@/lib/config";
import Alumni from "@/models/Alumni";

export default function BatchDetailsPage() {
  const { batchID } = useParams();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlumni() {
      setAlumni([]);
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${config.apiBaseUrl}/v1/alumni/?batch=${batchID}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load alumni.");
        }

        setAlumni(data.items || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
        setAlumni([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAlumni();
  }, [batchID]);

  const AlumniHeader = () => (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
        🎓 Alumni from Batch {batchID}
      </h1>
      <p className="text-gray-500 text-sm md:text-base">Explore the graduates and professionals from this batch.</p>
      <div className="mt-3 w-20 h-1 bg-blue-600 rounded-full" />
    </div>
  );

  const LoadingAnimator = () => (
    <div className="flex justify-center items-center py-20">
      <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
    </div>
  );

  return (
    <div className="p-6">
      <AlumniHeader />

      {loading && <LoadingAnimator />}

      {!loading && error && <div className="text-center text-red-600 font-medium py-8">{error}</div>}

      {!loading && !error && alumni.length === 0 && (
        <div className="text-center text-gray-500 font-medium py-8">No alumni found for this batch.</div>
      )}

      {!loading && !error && alumni.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumni.map((alum) => (
            <AlumniCard
              key={alum.id || alum.student_id}
              alumni={alum}
            />
          ))}
        </div>
      )}
    </div>
  );
}
