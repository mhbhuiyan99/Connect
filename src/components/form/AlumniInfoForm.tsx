"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "../ui/floating-input-file";
import { config } from "@/lib/config";
import CompanySection from "../CompanySection";
import { useAuthStore } from "@/store/authStore";
import Alumni from "@/models/Alumni";
import Image from "next/image";

interface AlumniInfoFormProps {
  mode?: "insert" | "update";
  initialData?: Alumni;
}

const AlumniInfoForm = ({ mode = "insert", initialData }: AlumniInfoFormProps) => {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  const [form, setForm] = useState({
    student_id: initialData?.student_id || "",
    batch: initialData?.batch || "",
    name: initialData?.name || "",
    email: initialData?.email || "",
    linked_in: initialData?.linked_in || "",
    facebook: initialData?.facebook || "",
    github: initialData?.github || "",
    skills: (initialData?.skills || []).join(", ") || "",
    profile_photo: initialData?.profile_photo || "",
  });

  const [companySections, setCompanySections] = useState(
    initialData?.industries?.length
      ? initialData.industries
      : [
          {
            industry: "",
            software: "",
            position: "",
            responsibilities: "",
            platform: "",
          },
        ]
  );

  const [showExtraFieldsFor, setShowExtraFieldsFor] = useState(initialData?.industries?.map(() => true) || [false]);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.profile_photo || "");

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presetIndustries = ["Google", "Microsoft", "Meta", "Amazon", "Tesla", "Banglalink", "bKash", "Pathao"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
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

  const handleRemoveCompany = (index: number) => {
    const updated = companySections.filter((_: any, i: number) => i !== index);
    const updatedVisibility = showExtraFieldsFor.filter((_: any, i: number) => i !== index);
    setCompanySections(updated);
    setShowExtraFieldsFor(updatedVisibility);
  };

  const toggleExtraFields = (index: number) => {
    const updated = [...showExtraFieldsFor];
    updated[index] = !updated[index];
    setShowExtraFieldsFor(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      let imageUrl = initialData?.profile_photo || "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const res = await fetch(`${config.apiBaseUrl}/v1/image/upload`, {
          method: "POST",
          body: formData,
        });
        const imgData = await res.json();
        imageUrl = `${config.apiBaseUrl}${imgData.image_url}`;
      }

      const res = await fetch(`${config.apiBaseUrl}/v1/alumni/${mode}`, {
        method: mode === "update" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          student_id: form.student_id,
          batch: form.batch,
          name: form.name,
          email: form.email,
          linked_in: form.linked_in,
          facebook: form.facebook,
          github: form.github,
          profile_photo: imageUrl,
          industries: companySections,
          skills: form.skills,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422) {
          data.detail.forEach((err: { msg: string; loc: string[] }) => toast.error(`${err.msg} ${err.loc.join(" ")}`));
          setError("Validation error");
        } else {
          setError(data.message || "Submission failed");
        }
      } else {
        toast.success("Profile saved successfully");
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card className="w-[80%] max-w-4xl p-6">
        <CardHeader>
          <CardTitle className="text-center">{mode === "update" ? "Update Profile" : "Alumni Information"}</CardTitle>
          <CardDescription className="text-center">
            {mode === "update" ? "Modify your existing profile" : "Please fill your information"}
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <FloatingInput
              type="text"
              disabled={pending || mode === "update"}
              placeholder="CE19000"
              label="Student ID"
              value={form.student_id}
              onChange={(e) => setForm({ ...form, student_id: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending || mode === "update"}
              placeholder="17"
              label="Batch"
              value={form.batch.toString()}
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
              value={form.linked_in}
              onChange={(e) => setForm({ ...form, linked_in: e.target.value })}
            />

            <FloatingInput
              type="url"
              disabled={pending}
              placeholder="Facebook Profile URL"
              label="Facebook"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
            />

            <div className="col-span-full">
              <FloatingFileInput
                label="Profile Photo"
                onChange={handleFileChange}
              />
            </div>

            {imagePreview && (
              <div className="flex flex-col items-center gap-2 col-span-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={24}
                  height={24}
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}

            {companySections.map((company: any, idx: number) => (
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
            ))}

            <Button
              className="col-span-full justify-self-center w-full md:w-1/2 mt-6"
              size="lg"
              disabled={pending}>
              {pending ? "Saving..." : mode === "update" ? "Update" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumniInfoForm;
