"use client";
import { useEffect, useState } from "react";

interface Alumni {
  studentID: string;
  batch: string;
  name: string;
  email: string;
  currentIndustry?: string;
  jobTitle?: string;
  skills: string[];
  photo?: string;
}

export default function AlumniViewPage() {
  const [groupedAlumni, setGroupedAlumni] = useState<Record<string, Alumni[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/alumni/grouped');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("API Response Data:", data); // Debug
        
        // Verify data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format received');
        }
        
        setGroupedAlumni(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading alumni data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>
      
      {Object.entries(groupedAlumni).length > 0 ? (
        Object.entries(groupedAlumni).map(([batch, alumni]) => (
          <div key={batch} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Batch: {batch}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alumni.map((alum) => (
                <div key={alum.studentID} className="border rounded-lg p-4">
                  {alum.photo && (
                    <img 
                      src={alum.photo} 
                      alt={alum.name}
                      className="w-16 h-16 rounded-full object-cover mb-2"
                    />
                  )}
                  <h3 className="font-bold text-lg">{alum.name}</h3>
                  <p><strong>ID:</strong> {alum.studentID || 'N/A'}</p>
                  <p><strong>Email:</strong> {alum.email || 'Not provided'}</p>
                  <p><strong>Job:</strong> {alum.jobTitle || 'Not specified'}</p>
                  <p><strong>Skills:</strong> {alum.skills?.join(", ") || "None listed"}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-lg">No alumni data found</p>
          <p className="text-sm text-gray-500">Check your database connection</p>
        </div>
      )}
    </div>
  );
}