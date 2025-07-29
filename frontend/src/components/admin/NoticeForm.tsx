"use client";

import { config } from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNotice, getNoticeById, updateNotice } from "@/lib/api/notice";

export default function NoticeForm({ noticeId }: { noticeId?: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const router = useRouter();

  const { data, isFetching, error } = useQuery({
    queryKey: ["notice", noticeId],
    queryFn: () => getNoticeById(noticeId!),
    enabled: !!noticeId,
  });

  const createMutation = useMutation({
    mutationFn: ({ title, content, image_url }: { title: string; content: string; image_url: string }) =>
      createNotice(title, content, image_url),
    onSuccess: async () => {
      toast.success("Notice created successfully");
      router.push("/admin/notice");
    },
    onError: (error: Error) => {
      toast.error("Error creating notice: " + error.message);
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({
      noticeId,
      title,
      content,
      image_url,
    }: {
      noticeId: string;
      title: string;
      content: string;
      image_url: string;
    }) => updateNotice(noticeId, title, content, image_url),
    onSuccess: async () => {
      toast.success("Notice updated successfully");
      router.back();
    },
    onError: async (error: Error) => {
      toast.error("Error while updating notice: " + error.message);
    },
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setContent(data.content || "");
      setExistingImageUrl(data.image_url || null);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = existingImageUrl || "";

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const uploadedImage = await fetch(`${config.apiBaseUrl}/v1/image/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const imgData = await uploadedImage.json();
      imageUrl = `${config.apiBaseUrl}${imgData.image_url}`;
    }

    if (!noticeId) {
      createMutation.mutate({ title, content, image_url: imageUrl });
    } else {
      updateMutation.mutate({ noticeId, title, content, image_url: imageUrl });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{noticeId ? "Edit Notice" : "Post a Notice"}</h2>

      {isFetching ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10">Error: {error.message}</div>
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
            disabled={createMutation.isPending || updateMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {createMutation.isPending || updateMutation.isPending
              ? noticeId
                ? "Updating..."
                : "Posting..."
              : noticeId
              ? "Update Notice"
              : "Post Notice"}
          </button>
        </form>
      )}
    </div>
  );
}
