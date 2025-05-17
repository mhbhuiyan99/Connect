"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

const AlumniInfoForm = () => {
  const [form, setForm] = useState({
    StudentID: "",
    Batch: "",
    Name: "",
    Email: "",
    CurrentIndustry: "",
    JobTitle: "",
    Skills: "",
    Photo: "",
    LinkedIn: "",
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const res = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setPending(false);
        toast.success("Alumni information submitted successfully!");
        router.push("/"); // Redirect after successful submission
      } else {
        setError(data.message || "Failed to submit alumni information");
        setPending(false);
      }
    } catch (err) {
      setError("An error occurred while submitting the form");
      setPending(false);
      }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, Photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-slate-300">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Alumni Information</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Please fill in your alumni information
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              disabled={pending}
              placeholder="Student ID"
              value={form.StudentID}
              onChange={(e) => setForm({ ...form, StudentID: e.target.value })}
              required
            />

            <Input
              type="text"
              disabled={pending}
              placeholder="Batch"
              value={form.Batch}
              onChange={(e) => setForm({ ...form, Batch: e.target.value })}
              required
            />

            <Input
              type="text"
              disabled={pending}
              placeholder="Full Name"
              value={form.Name}
              onChange={(e) => setForm({ ...form, Name: e.target.value })}
              required
            />

            <Input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.Email}
              onChange={(e) => setForm({ ...form, Email: e.target.value })}
              required
            />

            <Input
              type="text"
              disabled={pending}
              placeholder="Current Industry"
              value={form.CurrentIndustry}
              onChange={(e) =>
                setForm({ ...form, CurrentIndustry: e.target.value })
              }
              required
            />

            <Input
              type="text"
              disabled={pending}
              placeholder="Job Title"
              value={form.JobTitle}
              onChange={(e) => setForm({ ...form, JobTitle: e.target.value })}
              required
            />

            <Input
              type="text"
              disabled={pending}
              placeholder="Skills (comma separated)"
              value={form.Skills}
              onChange={(e) => setForm({ ...form, Skills: e.target.value })}
              required
            />

            <Input
              type="text"
              disabled={pending}
              placeholder="LinkedIn Profile URL"
              value={form.LinkedIn}
              onChange={(e) => setForm({ ...form, LinkedIn: e.target.value })}
            />

            <div className="space-y-1">
              <label className="text-sm font-medium">Profile Photo</label>
              <Input
                type="file"
                disabled={pending}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <Button className="w-full" size="lg" disabled={pending}>
              {pending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumniInfoForm;