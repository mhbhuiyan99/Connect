import { useSuspenseQuery } from "@tanstack/react-query";
import { getAlumniByBatchID, getAlumniByID } from "@/lib/api/alumni";

export function useAlumniBatchID(batchId: number, page: number, limit: number) {
  return useSuspenseQuery({
    queryKey: ["alumni", batchId, page, limit],
    queryFn: () => getAlumniByBatchID(String(batchId)),
    retry: false,
  });
}

export function useAlumniByID(id: string) {
  return useSuspenseQuery({
    queryKey: ["alumni", id],
    queryFn: () => getAlumniByID(id),
    retry: false,
  });
}
