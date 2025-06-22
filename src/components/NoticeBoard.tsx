'use client';

import Link from 'next/link';

export default function NoticeBoard({ notices }: { notices: any[] }) {
  const safeNotices = Array.isArray(notices) ? notices : [];

  const latest = [...safeNotices]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-3 border-b pb-2">Notice Board</h2>
      <ul className="space-y-2">
        {latest.map((notice) => (
          <li key={notice.id}>
            <Link
              href={`/notice/${notice.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              {notice.title}
            </Link>
            <p className="text-xs text-gray-500">
              {new Date(notice.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/notice"
        className="block text-right text-blue-500 text-sm mt-3 hover:underline"
      >
        View all notices →
      </Link>
    </div>
  );
}
