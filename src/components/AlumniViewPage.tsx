"use client";
import { useEffect, useState } from "react";
import { FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

interface Alumni {
  studentID: string;
  batch: string;
  name: string;
  email: string;
  linkedIn: string;
  facebook: string;
  currentIndustry?: string;
  jobTitle: string;
  skills: string[];
  photo: string;
}

export default function AlumniViewPage() {
  const [groupedAlumni, setGroupedAlumni] = useState<Record<string, Alumni[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBatches, setExpandedBatches] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/alumni/grouped");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        setGroupedAlumni(data);

        // Initialize all batches as collapsed
        const initialExpanded: Record<string, boolean> = {};
        Object.keys(data).forEach((batch) => (initialExpanded[batch] = false));
        setExpandedBatches(initialExpanded);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleBatch = (batch: string) => {
    setExpandedBatches((prev) => ({
      ...prev,
      [batch]: !prev[batch],
    }));
  };

  if (loading) return <div className="p-4">Loading alumni data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>

      {Object.entries(groupedAlumni).length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">No alumni data found</p>
          <p className="text-sm text-gray-500">Check your database connection</p>
        </div>
      ) : (
        Object.entries(groupedAlumni).map(([batch, alumni]) => (
          <div key={batch} className="mb-8 border border-red-800 rounded-lg p-3 bg-slate-100">
            <button
              onClick={() => toggleBatch(batch)}
              className="text-xl font-semibold w-full text-left flex justify-between items-center"
            >
              <span >Batch: {batch}</span>
              <span>{expandedBatches[batch] ? "🔺" : "🔻"}</span>
            </button>

            {expandedBatches[batch] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {alumni.map((alum) => (
                  <div key={alum.studentID} className="border border-red-800 rounded-lg p-4">
                    {alum.photo && (
                      <img
                        src={alum.photo}
                        alt={alum.name}
                        className="w-16 h-16 rounded-full object-cover mb-2"
                      />
                    )}
                    <h3 className="font-bold text-lg">{alum.name}</h3>
                    {alum.jobTitle && <p className="text-gray-600">{alum.jobTitle}</p>}

                    {alum.skills && alum.skills.length > 0 && (
                      <p className="text-sm mt-2">
                        <strong>Skills:</strong> {alum.skills.join(", ")}
                      </p>
                    )}

                    <div className="flex flex-col gap-2 mt-3 text-sm">
                      {alum.email && (
                        <a
                          href={`mailto:${alum.email}`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <FaEnvelope className="w-4 h-4" />
                          <span>{alum.email}</span>
                        </a>
                      )}
                      

                      {alum.linkedIn && (
                        <a
                          href={alum.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:underline"
                        >
                          <FaLinkedin className="w-4 h-4 text-blue-700" />
                          <span>{alum.linkedIn}</span>
                        </a>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
