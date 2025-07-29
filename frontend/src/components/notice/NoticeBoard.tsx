"use client";

import Link from "next/link";
import Notice from "@/models/Notice";
import NoticeRotator from "./NoticeRotator";
import { useNotices } from "@/hooks/useNotices";

export default function NoticeBoard() {
  const { data, isLoading } = useNotices(1, 10);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-3 border-b pb-2">Notice Board</h2>
        <p>Loading notices...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-3 border-b pb-2">Notice Board</h2>
        <p>Error loading notices</p>
      </div>
    );
  }

  const notices = data.items as Notice[];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-3 border-b pb-2">Notice Board</h2>
      <NoticeRotator
        notices={notices}
        createdAtDate={(dateStr) => new Date(dateStr).toLocaleString()}
      />
      <Link
        href="/notice"
        className="block text-right text-blue-500 text-sm mt-3 hover:underline">
        View all notices →
      </Link>
    </div>
  );
}
