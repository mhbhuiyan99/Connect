"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminEventList } from "@/hooks/useEvents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteEvent } from "@/lib/api/admin/event";

export default function EventsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(params.get("page") ?? "1");
  const limit = Number(params.get("limit") ?? "10");

  const { data, isPending } = useAdminEventList(page, limit);

  const deleteMutation = useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: async () => {
      toast.success("Event deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["adminEvents", page, limit] });
    },
    onError: (error: Error) => {
      toast.error("Error deleting event: " + error.message);
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    deleteMutation.mutate(id);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/events/edit/${id}`);
  };

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

  if (isPending) {
    return <div className="p-6">Loading events...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {data.items.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {data.items.map((event, index) => (
              <li
                key={event.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {(page - 1) * limit + index + 1}. {event.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleEdit(event.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(event.id)}
                    disabled={deleteMutation.isPending}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="perPage">Per Page:</label>
              <select
                id="perPage"
                value={limit}
                onChange={(e) => changeLimit(Number(e.target.value))}
                className="border rounded px-2 py-1">
                {[10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button disabled={page === 1} onClick={() => changePage(page - 1)}>
                Previous
              </Button>
              <Button disabled={!data.has_next} onClick={() => changePage(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
