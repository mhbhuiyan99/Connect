"use client";
import AlumniBatchSelector from '@/components/AlumniBatchSelector';
import AlumniCard, { Alumni } from '@/components/AlumniCard';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/lib/useDebounce';
import { FaSearch, FaFilter } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { config } from "@/lib/config";

const FILTERS = {
  NAME: "name",
  SKILLS: "skills",
  COMPANY: "company",
};

export default function AlumniViewPagePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState(FILTERS.NAME);

  // Replace with your fetched alumni
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    const fetchAlumni = async () => {
      setError(null);
      setAlumni([]);
      setLoading(true);
      try {
        const res = await fetch(
          `${config.apiBaseUrl}/v1/alumni/search?page=1&limit=100&filter_by=` +
          `${filterBy}&query=${encodeURIComponent(debouncedSearchTerm)}`
        );
        if (!res.ok) throw new Error("Failed to fetch alumni");
        const data = await res.json();
        setAlumni(data.items);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [debouncedSearchTerm, filterBy]);


  const searchBar = (
    <div className="bg-white shadow-md rounded-xl p-4 mb-8 border border-gray-200">
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {/* Search input with icon */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder={`Search by ${filterBy.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <FaFilter />
          </span>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-48"
          >
            <option value={FILTERS.NAME}>Name</option>
            <option value={FILTERS.SKILLS}>Skills</option>
            <option value={FILTERS.COMPANY}>Company</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (!searchTerm) {
    return (
      <div className="w-full">
        {searchBar}
        <AlumniBatchSelector />
      </div>
    )
  }

  return (
    <div className="w-full">
      {searchBar}
      {loading && !error ? (
        <div className="flex justify-center items-center py-20">
          <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
        </div>
      ) : (
        // Render all alumni here
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md text-center">
              ⚠️ {error}
            </div>
          )}

          {!error && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumni.length > 0 ? (
              alumni.map((alum) => (
                <AlumniCard key={alum.student_id} alumni={alum} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No alumni found.</p>
            )}
          </div>}
        </div>
      )}
    </div>
  );
}