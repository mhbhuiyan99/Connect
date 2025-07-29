import { Suspense } from "react";
import AlumniGrid from "@/components/alumni/AlumniGrid";
import { ImSpinner2 } from "react-icons/im";

export default async function BatchDetailsPage({ params }: { params: Promise<{ batchID: string }> }) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
          🎓 Alumni from Batch {(await params).batchID}
        </h1>
        <p className="text-gray-500 text-sm md:text-base">Explore the graduates and professionals from this batch.</p>
        <div className="mt-3 w-20 h-1 bg-blue-600 rounded-full" />
      </div>

      <Suspense fallback={<LoadingAnimator />}>
        <AlumniGrid batchID={(await params).batchID} />
      </Suspense>
    </div>
  );
}

function LoadingAnimator() {
  return (
    <div className="flex justify-center items-center py-20">
      <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
    </div>
  );
}
