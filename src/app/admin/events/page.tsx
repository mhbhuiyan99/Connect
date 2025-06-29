"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "@/components/ui/floating-input-file";
import { toast } from "sonner";
import { config } from "@/lib/config";

export default function AdminEventsPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      let imageUrl = "";

      if (image) {
        const imgFormData = new FormData();
        imgFormData.append("file", image);

        const res = await fetch(`${config.apiBaseUrl}/v1/image/upload`, {
          method: "POST",
          body: imgFormData,
        });

        const data = await res.json();
        imageUrl = `${config.apiBaseUrl}${data.image_url}`;
      }

      const eventRes = await fetch(`${config.apiBaseUrl}/v1/events/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          photo: imageUrl,
        }),
      });

      if (eventRes.ok) {
        toast.success("Event added successfully!");
        setFormData({
          title: "",
          date: "",
          location: "",
          description: "",
        });
        setImage(null);
      } else {
        const err = await eventRes.json();
        toast.error(err.message || "Failed to create event");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
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
          disabled={pending}
          required
        />

        <FloatingInput
          type="date"
          label="Event Date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          disabled={pending}
          required
        />

        <FloatingInput
          type="text"
          label="Location"
          placeholder="Event Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          disabled={pending}
        />

        <FloatingInput
          type="text"
          label="Short Description"
          placeholder="What is this event about?"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={pending}
        />

        <FloatingFileInput label="Event Banner (Image)" onChange={handleFileChange} />

        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Submit Event"}
        </Button>
      </form>
    </div>
  );
}
