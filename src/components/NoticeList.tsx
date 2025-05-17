// components/NoticeList.tsx
'use client';

import Image from 'next/image';

export default function NoticeList({ notices }: { notices: any[] }) {
  return (
    <div className="space-y-6">
      {notices.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No notices yet. Be the first to post one!
        </div>
      ) : (
        notices.map((notice) => (
          <div key={notice._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <Image
                  src={notice.createdBy?.image || '/default-avatar.png'}
                  alt={notice.createdBy?.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{notice.createdBy?.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notice.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">{notice.content}</p>
            
            {notice.imageUrl && (
              <div className="mt-4">
                <Image
                  src={notice.imageUrl}
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