"use client";

import ProfileCard from "@/components/ProfileCard";
import { useAlumniByID } from "@/hooks/useAlumni";

import { useParams } from "next/navigation";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ImSpinner2 } from "react-icons/im";

function ErrorFallback({ error }: { error: Error }) {
  return <div className="text-center text-red-500 font-medium py-8">{error.message || "Something went wrong."}</div>;
}

export default function ProfilePage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
          </div>
        }>
        <MainProfilePage />
      </Suspense>
    </ErrorBoundary>
  );
}

export function MainProfilePage() {
  let { id } = useParams();
  if (id instanceof Array) id = id[0];

  const { data: alumni } = useAlumniByID(id ?? "");

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Alumni Profile</h1>
      <ProfileCard {...alumni} />
    </div>
  );
}
