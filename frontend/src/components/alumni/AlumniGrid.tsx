"use client";

import { useAlumniBatchID } from "@/hooks/useAlumni";
import AlumniCard from "./AlumniCard";
import Alumni from "@/models/Alumni";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ImSpinner2 } from "react-icons/im";

function ErrorFallback({ error }: { error: Error }) {
  return <div className="text-center text-red-500 font-medium py-8">{error.message || "Something went wrong."}</div>;
}

export default function AlumniGridWrapper({ batchID }: { batchID: string }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
          </div>
        }>
        <MainAlumniGrid batchID={batchID} />
      </Suspense>
    </ErrorBoundary>
  );
}

export function MainAlumniGrid({ batchID }: { batchID: string }) {
  const { data } = useAlumniBatchID(Number(batchID), 1, 100);

  if (!data) {
    return <div className="text-center text-gray-500 font-medium py-8">No alumni found for this batch.</div>;
  }

  if (!data.items || data.items.length === 0) {
    return <div className="text-center text-gray-500 font-medium py-8">No alumni found for this batch.</div>;
  }

  const alumni: Alumni[] = data.items;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {alumni.map((alum) => (
        <AlumniCard
          key={alum.id || alum.student_id}
          alumni={alum}
        />
      ))}
    </div>
  );
}
