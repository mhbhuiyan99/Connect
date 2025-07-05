"use client";

import { config } from "@/lib/config";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Notice {
  id: string;
  title: string;
  content: string;
  image_url?: string;
}

export default function NoticeForm({ noticeId }: { noticeId?: string }) {
  const { accessToken, authLoading } = useAuthStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!noticeId);

  const router = useRouter();

  useEffect(() => {
    if (!noticeId || authLoading) return;

    const fetchNotice = async () => {
      try {
        const res = await fetch(`${config.apiBaseUrl}/v1/notice/${noticeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch notice");
        const data: Notice = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setExistingImageUrl(data.image_url || null);
      } catch {
        toast.error("Couldn't load notice for editing");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotice();
  }, [noticeId, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("You must be logged in to post a notice");
      return;
    }
    setIsSubmitting(true);

    try {
      let imageUrl = existingImageUrl || "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadedImage = await fetch(`${config.apiBaseUrl}/v1/image/upload`, {
          method: "POST",
          body: formData,
        });
        const imgData = await uploadedImage.json();
        imageUrl = `${config.apiBaseUrl}${imgData.image_url}`;
      }

      const payload = { title, content, image_url: imageUrl };

      const res = await fetch(
        noticeId ? `${config.apiBaseUrl}/v1/notice/${noticeId}` : `${config.apiBaseUrl}/v1/notice/`,
        {
          method: noticeId ? "PUT" : "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        toast.success(noticeId ? "Notice updated" : "Notice posted");
        if (!noticeId) {
          setTitle("");
          setContent("");
          setImage(null);
          setExistingImageUrl(null);
        }
        router.push("/admin/notice/edit");
      } else {
        toast.error("Failed to save notice");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{noticeId ? "Edit Notice" : "Post a Notice"}</h2>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium mb-1">
              Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {existingImageUrl && (
              <Image
                src={existingImageUrl}
                alt="Existing"
                width={200}
                height={200}
                className="mt-2 rounded w-40 h-auto border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting ? (noticeId ? "Updating..." : "Posting...") : noticeId ? "Update Notice" : "Post Notice"}
          </button>
        </form>
      )}
    </div>
  );
}
