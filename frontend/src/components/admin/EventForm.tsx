"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "@/components/ui/floating-input-file";
import Image from "next/image";

interface EventFormProps {
  eventId?: string;
}

interface EventData {
  title: string;
  date: string;
  location: string;
  description: string;
  photo: string;
}

export default function EventForm({ eventId }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!eventId);

  const router = useRouter();

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`${config.apiBaseUrl}/v1/events/${eventId}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch event");

        const data: EventData = await res.json();
        setFormData({
          title: data.title,
          date: data.date.slice(0, 10), // Format for <input type="date">
          location: data.location,
          description: data.description,
        });
        setExistingPhotoUrl(data.photo || null);
      } catch (err) {
        toast.error("Couldn't load event for editing");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoUrl = existingPhotoUrl || "";

      if (photo) {
        const formDataImage = new FormData();
        formDataImage.append("file", photo);

        const uploadRes = await fetch(`${config.apiBaseUrl}/v1/image/upload`, {
          credentials: "include",
          method: "POST",
          body: formDataImage,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData = await uploadRes.json();
        photoUrl = `${config.apiBaseUrl}${uploadData.image_url}`;
      }

      const payload = {
        ...formData,
        photo: photoUrl,
      };

      const res = await fetch(
        eventId
          ? `${config.apiBaseUrl}/v1/events/${eventId}`
          : `${config.apiBaseUrl}/v1/events/create`,
        {
          credentials: "include",
          method: eventId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save event");

      toast.success(eventId ? "Event updated" : "Event created");
      router.push("/admin/events");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error submitting event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {eventId ? "Edit Event" : "Create Event"}
      </h2>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <FloatingInput
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <FloatingInput
            type="text"
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <FloatingInput
            type="text"
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <FloatingFileInput label="Event Photo (optional)" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />

          {existingPhotoUrl && (
            <Image
              src={existingPhotoUrl}
              alt="Existing event photo"
              width={200}
              height={200}
              className="rounded border mt-2"
            />
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}>
            {isSubmitting ? (eventId ? "Updating..." : "Submitting...") : eventId ? "Update Event" : "Create Event"}
          </Button>
        </form>
      )}
    </div>
  );
}
