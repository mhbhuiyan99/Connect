"use client";

import { useState, useEffect, useMemo } from "react";
import AlumniBatchSelector from "@/components/AlumniBatchSelector";
import AlumniCard from "@/components/alumni/AlumniCard";
import { useDebounce } from "@/lib/useDebounce";
import { FaSearch } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { config } from "@/lib/config";
import Alumni from "@/models/Alumni";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FilterKey = "name" | "skills" | "company" | "student_id";

const FILTERS: Record<FilterKey, string> = {
  name: "Name",
  skills: "Skills",
  company: "Company",
  student_id: "Student ID",
};

export default function AlumniViewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState<FilterKey>("name");
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    const fetchAlumni = async () => {
      if (!debouncedSearchTerm.trim()) return;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${config.apiBaseUrl}/v1/alumni/search?page=1&limit=100&filter_by=${filterBy}&query=${encodeURIComponent(
            debouncedSearchTerm
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch alumni");

        const data = await res.json();
        setAlumni(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setAlumni([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [debouncedSearchTerm, filterBy]);

  const searchBar = useMemo(
    () => (
      <div className="bg-white shadow-md rounded-xl px-6 py-5 mb-8 border border-gray-200 space-y-4 sm:space-y-0 sm:flex sm:items-end sm:justify-between sm:gap-6">
        {/* Search input */}
        <div className="flex-1 space-y-1">
          <Label htmlFor="alumni-search">Search</Label>
          <div className="relative">
            <Input
              id="alumni-search"
              placeholder={`Search by ${FILTERS[filterBy].toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              <FaSearch />
            </span>
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black px-1 h-auto"
                onClick={() => setSearchTerm("")}>
                ×
              </Button>
            )}
          </div>
        </div>

        {/* Filter dropdown */}
        <div className="w-full sm:w-52 space-y-1">
          <Label htmlFor="filter-by">Filter by</Label>
          <Select
            value={filterBy}
            onValueChange={(val) => setFilterBy(val as FilterKey)}>
            <SelectTrigger id="filter-by">
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(FILTERS).map(([key, label]) => (
                <SelectItem
                  key={key}
                  value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
    [searchTerm, filterBy]
  );

  return (
    <div className="w-full">
      {searchBar}

      {!searchTerm.trim() && <AlumniBatchSelector />}

      {searchTerm.trim() && (
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
            </div>
          ) : error ? (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md text-center">
              ⚠️ {error}
            </div>
          ) : alumni.length === 0 ? (
            <p className="text-gray-500 text-center">No alumni found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {alumni.map((alum) => (
                <AlumniCard
                  key={alum.student_id}
                  alumni={alum}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
