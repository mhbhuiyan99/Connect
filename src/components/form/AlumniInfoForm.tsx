"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "../ui/floating-input-file";
import { config } from "@/lib/config";

const AlumniInfoForm = () => {
  const [form, setForm] = useState({
    studentID: "",
    batch: "",
    name: "",
    email: "",
    currentIndustry: "",
    jobTitle: "",
    skills: "",
    linkedIn: "",
    facebook: "",
    photo: "",
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/alumni/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "student_id": form.studentID,
          "batch": form.batch,
          "name": form.name,
          "email": form.email,
          "current_industry": form.currentIndustry,
          "job_title": form.jobTitle,
          "skills": form.skills,
          "linked_in": form.linkedIn,
          "facebook": form.facebook,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Alumni information submitted successfully!");
        router.push("/");
      } else {
        setError(data.message || "Failed to submit alumni information");
      }
    } catch (err) {
      setError("An error occurred while submitting the form");
    } finally {
      setPending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card className="w-[80%] max-w-4xl p-6">
        <CardHeader>
          <CardTitle className="text-center">Alumni Information</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Please fill your information
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
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          >
            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="CS19000"
              label="Student ID"
              value={form.studentID}
              onChange={(e) => setForm({ ...form, studentID: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="19"
              value={form.batch}
              label="Batch"
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="Full Name"
              value={form.name}
              label="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <FloatingInput
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.email}
              label="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="Current Industry"
              value={form.currentIndustry}
              label="Industry"
              onChange={(e) =>
                setForm({ ...form, currentIndustry: e.target.value })
              }
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="Job Title"
              value={form.jobTitle}
              label="Job Title"
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="Skills (comma separated)"
              label="Skills"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              required
            />

            <FloatingInput
              type="url"
              disabled={pending}
              placeholder="LinkedIn Profile URL"
              label="LinkedIn"
              value={form.linkedIn}
              onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
            />

            <FloatingInput
              type="url"
              disabled={pending}
              placeholder="Facebook Profile URL"
              label="Facebook"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
            />

            <FloatingFileInput
              label="Profile Photo"
              onChange={handleFileChange}
            />

            <Button
              className="col-span-full justify-self-center w-full md:w-1/2 mt-6"
              size="lg"
              disabled={pending}
            >
              {pending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumniInfoForm;
