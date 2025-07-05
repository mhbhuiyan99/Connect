"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "@/components/ui/floating-input-file";
import { config } from "@/lib/config";
import { useAuthStore } from "@/store/authStore";

export default function AdminEventsPage() {
  const { accessToken } = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = "";

      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("file", image);

        const uploadRes = await fetch(`${config.apiBaseUrl}/v1/image/upload`, {
          method: "POST",
          body: formDataImage,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData = await uploadRes.json();
        photoUrl = `${config.apiBaseUrl}${uploadData.image_url}`;
      }

      const res = await fetch(`${config.apiBaseUrl}/v1/events/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          ...formData,
          photo: photoUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Event creation error:", data);
        alert(data.detail || "Event submission failed.");
        return;
      }

      alert("✅ Event submitted successfully!");

      // Reset form
      setFormData({
        title: "",
        date: "",
        location: "",
        description: "",
      });
      setImage(null);
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Submission failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Add New Event</h1>

          <FloatingInput
            type="text"
            label="Event Title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <FloatingInput
            type="date"
            label="Event Date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <FloatingInput
            type="text"
            label="Location"
            placeholder="Event Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <FloatingInput
            type="text"
            label="Short Description"
            placeholder="What is this event about?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <FloatingFileInput
            label="Event Banner (Image)"
            onChange={handleFileChange}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            size="lg"
            disabled={loading}>
            {loading ? "Submitting..." : "Submit Event"}
          </Button>
        </form>
      </div>
    </>
  );
}
