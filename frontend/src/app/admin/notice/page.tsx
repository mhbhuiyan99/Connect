"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminNotices } from "@/hooks/useNotices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotice } from "@/lib/api/admin/notice";
import { toast } from "sonner";

export default function AdminNoticeEditPage() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(params.get("page") ?? "1");
  const limit = Number(params.get("limit") ?? "10");

  const { data, isLoading } = useAdminNotices(page, limit);

  const deleteMutation = useMutation({
    mutationFn: (noticeId: string) => deleteNotice(noticeId),
    onSuccess: async () => {
      toast.success("Notice deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["adminNotices", page, limit] });
    },
    onError: (error: Error) => {
      toast.error("Error deleting notice!" + error.message);
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    deleteMutation.mutate(id);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/notice/edit/${id}`);
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Notices</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <p>Loading notices...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Notices</h1>
        {data.items.length === 0 ? (
          <p>No notices found.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {data.items.map((notice, index) => (
                <li
                  key={notice.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {(data.page - 1) * data.limit + index + 1}. {notice.title}
                    </p>
                    <p className="text-sm text-gray-500">By: {notice.author_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(notice.id)}
                      variant="outline">
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(notice.id)}
                      variant="destructive">
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
                  disabled={page === 1}
                  onClick={() => changePage(page - 1)}>
                  Previous
                </Button>
                <Button
                  disabled={!data.has_next}
                  onClick={() => changePage(page + 1)}>
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
