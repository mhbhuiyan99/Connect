"use client";

import { useEffect, useState } from "react";
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
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "../ui/floating-input-file";
import { config } from "@/lib/config";
import CompanySection from "../CompanySection";

const AlumniInfoForm = () => {
  const [form, setForm] = useState({
    studentID: "",
    batch: "",
    name: "",
    email: "",
    linkedIn: "",
    facebook: "",
    github: "",
    skills: "",
  });

  const [companySections, setCompanySections] = useState([
    {
      industry: "",
      software: "",
      position: "",
      responsibilities: "",
      platform: "",
    },
  ]);

  const [showExtraFieldsFor, setShowExtraFieldsFor] = useState([false]);
  const [presetSkills, setPresetSkills] = useState<string[]>(["Python", "MongoDB"]);
  const [image, setImage] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      let imageUrl = "";
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

      const res = await fetch(`${config.apiBaseUrl}/v1/alumni/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: form.studentID,
          batch: form.batch,
          name: form.name,
          email: form.email,
          linked_in: form.linkedIn,
          facebook: form.facebook,
          profile_photo: imageUrl,
          industries: companySections,
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
      setImage(e.target.files[0]);
    }
  };

  const handleAddCompany = () => {
    setCompanySections([
      ...companySections,
      {
        industry: "",
        software: "",
        position: "",
        responsibilities: "",
        platform: "",
      },
    ]);
    setShowExtraFieldsFor([...showExtraFieldsFor, false]);
  };

  const handleRemoveCompany = (indexToRemove: number) => {
    const updated = companySections.filter((_, idx) => idx !== indexToRemove);
    const newShowFields = [...showExtraFieldsFor];
    newShowFields.splice(indexToRemove, 1);
    setCompanySections(updated);
    setShowExtraFieldsFor(newShowFields);
  };

  const presetIndustries = [
    "Google",
    "Microsoft",
    "Meta",
    "Amazon",
    "Tesla",
    "Robi Axiata",
    "Banglalink",
    "bKash",
    "Pathao",
  ];

  async function fetchPresetSkills() {
    try {
      const response = await fetch(`${config.apiBaseUrl}/v1/skills/preset`);
      const data = await response.json();
      if (!response.ok) return
      setPresetSkills(data);
    } catch (error) {
      console.error("Error fetching preset skills:", error);
    }
  }

  const toggleExtraFields = (index: number) => {
    const updated = [...showExtraFieldsFor];
    updated[index] = !updated[index];
    setShowExtraFieldsFor(updated);
  };

  useEffect(() => { fetchPresetSkills() }, [])

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
            {/* Basic Fields */}
            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="CE19000"
              label="Student ID"
              value={form.studentID}
              onChange={(e) => setForm({ ...form, studentID: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="17"
              label="Batch"
              value={form.batch}
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="Full Name"
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <FloatingInput
              type="email"
              disabled={pending}
              placeholder="Email"
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="Skills (Comma separated)"
              label="Skills"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              required
            />

            <FloatingInput
              type="url"
              disabled={pending}
              placeholder="Github Profile URL"
              label="Github 👩🏻‍💻"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
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

            {/* Profile Photo for alumni */}
            <div className="col-span-full">
              <FloatingFileInput label="Profile Photo" onChange={handleFileChange} />
            </div>

            {/* Company Sections */}
            {
              companySections.map((company, idx) => (
                <CompanySection
                  key={idx}
                  index={idx}
                  company={company}
                  pending={pending}
                  showExtraFields={showExtraFieldsFor[idx]}
                  toggleExtraFields={() => toggleExtraFields(idx)}
                  companySections={companySections}
                  setCompanySections={setCompanySections}
                  isCurrentCompany={idx === 0}
                  presetIndustries={presetIndustries}
                  onRemove={idx === 0 ? undefined : () => handleRemoveCompany(idx)}
                  isLastCompany={idx === companySections.length - 1}
                  handleAddCompany={handleAddCompany}
                />
              ))
            }

            {/* Submit Button */}
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
