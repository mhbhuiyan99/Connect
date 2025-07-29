"use client";

import Alumni from "@/models/Alumni";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminAlumniList } from "@/hooks/useAdminUser";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAlumni } from "@/lib/api/admin/alumni";

export default function AlumniTable() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(params.get("page") ?? "1");
  const limit = Number(params.get("limit") ?? "5");

  const { data, isPending } = useAdminAlumniList(page, limit);

  const changePage = (p: number) => {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    router.replace(`?${next.toString()}`);
  };

  const changeLimit = (l: number) => {
    const next = new URLSearchParams(params);
    next.set("limit", String(l));
    next.set("page", "1");
    router.replace(`?${next.toString()}`);
  };

  const deleteMutation = useMutation({
    mutationFn: (alumniId: string) => deleteAlumni(alumniId),
    onSuccess: async () => {
      toast.success("Alumni deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["adminAlumni", page, limit] });
    },
    onError: (error: Error) => {
      toast.error("Error deleting Alumni!" + error.message);
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Alumni?")) return;

    deleteMutation.mutate(id);
  };

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Alumni</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <p>Loading alumni...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Batch</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((a: Alumni) => (
            <tr
              key={a.id}
              className="border-t">
              <td className="p-3">
                <Link href={`/alumni/${a.id}`}>{a.name}</Link>
              </td>
              <td className="p-3">{a.batch}</td>
              <td className="p-3">{a.email}</td>
              <td className="p-3 text-right">
                <Button
                  onClick={() => handleDelete(a.id)}
                  variant="destructive">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="perPage">Per Page:</label>
          <select
            id="perPage"
            value={limit}
            onChange={(e) => changeLimit(Number(e.target.value))}
            className="border rounded px-2 py-1">
            {[10, 20, 50, 100].map((n) => (
              <option
                key={n}
                value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => changePage(page - 1)}
            disabled={page <= 1}>
            Prev
          </Button>
          <Button
            onClick={() => changePage(page + 1)}
            disabled={!data.has_next}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
