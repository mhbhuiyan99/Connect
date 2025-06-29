'use client';

import { useState, useEffect, useRef } from 'react';
import NoticeForm from '@/components/NoticeForm';
import NoticeList from '@/components/NoticeList';
import { useAuth } from '@/providers/AuthProvider';
import { config } from '@/lib/config';
import { useAuthStore } from '@/store/authStore';

interface Notice {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  // Add other properties as needed
}

export default function NoticePage() {
  const { accessToken, user } = useAuthStore();

  const [page, setPage] = useState(1);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (!didFetchRef.current) {
      didFetchRef.current = true;
      fetchNotices(page);
    }
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) { fetchNotices(page) }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef.current, page, user]);


  const fetchNotices = async (pageNumber: number, limit: number = 10) => {
    if (!hasMore) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/notice/?page=${pageNumber}&limit=${limit}`);
      const data = await res.json();
      if (data.items.length === 0) {
        setHasMore(false);
      } else {
        setNotices((prev) => [...prev, ...data.items]);
        setPage(pageNumber + 1);
      }
    } catch (err) {
      console.error("Error fetching notices:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notice Board</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <NoticeList notices={notices} />
          {hasMore && <div ref={loaderRef} className="h-10" />}
        </div>

        {user && <div className="lg:col-span-1">
          <NoticeForm onNewNotice={(n) => setNotices((prev) => [n, ...prev])} />
        </div>}
      </div>
    </div>
  );
}