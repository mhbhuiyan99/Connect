'use client';

import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { config } from '@/lib/config';
import { useRouter } from 'next/navigation';

interface Notice {
  id: string;
  title: string;
  author_name: string;
}

export default function AdminNoticeEditPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${config.apiBaseUrl}/v1/notice`);
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setNotices(data.items);
        } else {
          setNotices([]);
        }
      } catch (err) {
        console.error(err);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notice?')) return;

        try {
            const res = await fetch(`${config.apiBaseUrl}/v1/notice/${id}`, {
                method: 'DELETE',
                credentials: 'include', // Auth cookie must be sent
            });

            if (res.ok) {
                setNotices((prev) => prev.filter((notice) => notice.id !== id));
            } else if (res.status === 401) {
                alert('Unauthorized: You must be logged in to delete this notice.');
            } else if (res.status === 403) {
                alert('Forbidden: Only the original author (admin) can delete this notice.');
            } else {
                const error = await res.json();
                alert(`Error: ${error.detail || 'Failed to delete notice.'}`);
            }
        } catch (err) {
            console.error('Error deleting notice:', err);
            alert('Error deleting notice. Please try again later.');
        }
    };


  const handleEdit = (id: string) => {
    router.push(`/admin/notice/edit/${id}`);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Edit Notices</h1>
        {loading ? (
          <p>Loading...</p>
        ) : notices.length === 0 ? (
          <p>No notices found.</p>
        ) : (
          <ul className="space-y-3">
            {notices.map((notice, index) => (
              <li
                key={notice.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{index + 1}. {notice.title}</p>
                  <p className="text-sm text-gray-500">By: {notice.author_name}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(notice.id)} variant="outline">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(notice.id)} variant="destructive">
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
