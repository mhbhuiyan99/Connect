'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { TriangleAlert } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function NoticeForm({ onNewNotice }: { onNewNotice: (notice: any) => void }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('/api/notice', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newNotice = await response.json();
        onNewNotice(newNotice);
        setTitle('');
        setContent('');
        setImage(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to post notice');
      }
    } catch (err) {
      setError('An error occurred while posting the notice');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-slate-100">
      <Card className="w-[100%] max-w-4xl p-6">
        <CardHeader>
          <CardTitle className="text-center">Post a Notice</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Only admins can post notices
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-6"
          >
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />

            <textarea
              placeholder="Content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <div className="space-y-1">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                disabled={isSubmitting}
              />
              <label className="text-sm font-medium">Optional Image</label>
            </div>

            <Button
              className="justify-self-center w-full md:w-1/2 mt-6"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Notice'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
