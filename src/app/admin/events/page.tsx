"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "@/components/ui/floating-input-file";

// Optional: add this if you're using environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function AdminEventsPage() {
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

      // Step 1: Upload image to image API
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("file", image);

        const uploadRes = await fetch(`${API_BASE_URL}/v1/image/upload`, {
          method: "POST",
          body: formDataImage,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData = await uploadRes.json();
        photoUrl = `${API_BASE_URL}${uploadData.image_url}`;
      }

      // Step 2: Submit event data to backend
      const res = await fetch(`${API_BASE_URL}/v1/events/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <AdminLayout>
      <div className="p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-6"
        >
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

          <FloatingFileInput label="Event Banner (Image)" onChange={handleFileChange} />

          <Button type="submit" className="w-full mt-6" size="lg" disabled={loading}>
            {loading ? "Submitting..." : "Submit Event"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
