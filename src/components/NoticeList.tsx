// components/NoticeList.tsx
'use client';

import Image from 'next/image';
import { format } from "date-fns";

function createdAtDate(createdAt: string) {
  return <p>{format(new Date(createdAt), "yyyy-MM-dd")}</p>
}

export default function NoticeList({ notices }: { notices: any[] }) {
  return (
    <div className="space-y-6">
      {notices.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No notices yet. Be the first to post one!
        </div>
      ) : (
        notices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <Image
                  src={notice.author_profile_photo || '/default-avatar.png'}
                  alt={notice.author_name || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{notice.author_name}</p>
                <span className="text-sm text-gray-500">{createdAtDate(notice.created_at)}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{notices.indexOf(notice) + 1}. {notice.title}</h3>
            {/* <p className="text-gray-700 mb-4 whitespace-pre-line">{notice.content}</p> */}
            <p className="text-gray-700 mb-4 whitespace-pre-wrap break-words overflow-hidden">{notice.content}</p>

            {notice.image_url && (
              <div className="mt-4">
                <Image
                  src={notice.image_url}
                  alt="Notice image"
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}