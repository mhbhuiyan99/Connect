"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Notice from "@/models/Notice";

interface NoticeRotatorProps {
    notices: Notice[];
    createdAtDate: (dateStr: string) => string;
}

export default function NoticeRotator({ notices, createdAtDate }: NoticeRotatorProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (notices.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % notices.length);
        }, 5000); // Rotate every 5 seconds
        return () => clearInterval(interval);
    }, [notices]);

    const notice = notices[currentIndex];

    return (
        <div key={notice.id} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out">
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

            <h3 className="text-xl font-semibold mb-2">
                {currentIndex + 1}. {notice.title}
            </h3>

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
    );
}
