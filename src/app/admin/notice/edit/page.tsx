"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Notice from "@/models/Notice";

export default function AdminNoticeEditPage() {
  const router = useRouter();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { accessToken, authLoading } = useAuthStore();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchNotices(pageNumber: number) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/v1/notice?page=${pageNumber}&limit=${limit}`);
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setNotices(data.items);
          setHasMore(data.items.length === limit);
        } else {
          setNotices([]);
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices(page);
  }, [page, limit]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/notice/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        setNotices((prev) => prev.filter((notice) => notice.id !== id));
      } else if (res.status === 401) {
        alert("Unauthorized: You must be logged in to delete this notice.");
      } else if (res.status === 403) {
        alert("Forbidden: Only the original author (admin) can delete this notice.");
      } else {
        const error = await res.json();
        alert(`Error: ${error.detail || "Failed to delete notice."}`);
      }
    } catch (err) {
      console.error("Error deleting notice:", err);
      alert("Error deleting notice. Please try again later.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/notice/edit/${id}`);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Notices</h1>

        {loading || authLoading ? (
          <p>Loading...</p>
        ) : notices.length === 0 ? (
          <p>No notices found.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {notices.map((notice, index) => (
                <li
                  key={notice.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {(page - 1) * limit + index + 1}. {notice.title}
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

            <div className="flex justify-between mt-6">
              <Button
                disabled={page === 1}
                onClick={handlePrev}>
                Previous
              </Button>
              <Button
                disabled={!hasMore}
                onClick={handleNext}>
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
