// app/notice/page.tsx
'use client';

import { useState, useEffect } from 'react';
import NoticeForm from '@/components/NoticeForm';
import NoticeList from '@/components/NoticeList';

interface Notice {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  // Add other properties as needed
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notice');
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewNotice = (newNotice: Notice) => {
    setNotices([newNotice, ...notices]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notice Board</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <NoticeList notices={notices} />
          )}
        </div>
        
        <div className="lg:col-span-1">
          <NoticeForm onNewNotice={handleNewNotice} />
        </div>
      </div>
    </div>
  );
}