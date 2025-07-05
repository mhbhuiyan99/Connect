"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import Notice from "@/models/Notice";
import NoticeRotator from "./NoticeRotator";

export default function NoticeBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);

  const fetchNotices = async (pageNumber: number, limit: number = 5) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/notice/?page=${pageNumber}&limit=${limit}`);
      const data = await res.json();

      if (data.items.length === 0) {
        throw new Error("No more notices");
      } else {
        setNotices([...data.items].slice(0, 5));
      }
    } catch (err) {
      console.error("Error fetching notices:", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNotices(1);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-3 border-b pb-2">Notice Board</h2>
        <p>Loading notices...</p>
      </div>
    );
  }

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
