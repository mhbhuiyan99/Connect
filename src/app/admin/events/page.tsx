"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "@/components/ui/floating-input-file";

export default function AdminEventsPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Event Data:", formData);
    console.log("Selected Image:", image);
    alert("Event submitted! Check console for values.");

    // Reset form
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
    });
    setImage(null);
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

          <Button type="submit" className="w-full mt-6" size="lg">
            Submit Event
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
