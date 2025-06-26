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
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "../ui/floating-input-file";
import { config } from "@/lib/config";

const AlumniInfoForm = () => {
  const [form, setForm] = useState({
    studentID: "",
    batch: "",
    name: "",
    email: "",
    linkedIn: "",
    facebook: "",
  });

  const [companySections, setCompanySections] = useState([
    {
      currentIndustry: "",
      skills: "",
      position: "",
      responsibilities: "",
      platform: "",
    },
  ]);

  const [showExtraFieldsFor, setShowExtraFieldsFor] = useState([false]);

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

  const toggleExtraFields = (index: number) => {
    const updated = [...showExtraFieldsFor];
    updated[index] = !updated[index];
    setShowExtraFieldsFor(updated);
  };

  const addCompanySection = () => {
    setCompanySections([
      ...companySections,
      {
        currentIndustry: "",
        skills: "",
        position: "",
        responsibilities: "",
        platform: "",
      },
    ]);
    setShowExtraFieldsFor([...showExtraFieldsFor, false]);
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

            {/* Current Company Section (first company only) */}
            {companySections.length > 0 && (
              <div
                key={0}
                className="col-span-full bg-muted/10 border p-4 rounded-xl mb-6"
              >
                <h3 className="text-base font-semibold mb-2">Current Company</h3>

                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <input
                    list="industry-options"
                    type="text"
                    className="w-full p-3 border rounded-md mt-1 text-sm"
                    placeholder="Type or select"
                    disabled={pending}
                    value={companySections[0].currentIndustry}
                    onChange={(e) => {
                      const updated = [...companySections];
                      updated[0].currentIndustry = e.target.value;
                      setCompanySections(updated);
                    }}
                    required
                  />
                  <datalist id="industry-options">
                    {presetIndustries.map((company, idx) => (
                      <option key={idx} value={company} />
                    ))}
                  </datalist>
                </div>

                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toggleExtraFields(0)}
                  >
                    {showExtraFieldsFor[0] ? "Hide Company Info" : "Add Company Info"}
                  </Button>
                </div>

                {showExtraFieldsFor[0] && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Skills (separated by comma)"
                      label="Skills"
                      value={companySections[0].skills}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[0].skills = e.target.value;
                        setCompanySections(updated);
                      }}
                    />

                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Position"
                      label="Position"
                      value={companySections[0].position}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[0].position = e.target.value;
                        setCompanySections(updated);
                      }}
                    />

                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Key Responsibilities"
                      label="Responsibilities"
                      value={companySections[0].responsibilities}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[0].responsibilities = e.target.value;
                        setCompanySections(updated);
                      }}
                    />

                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Platform"
                      label="Platform"
                      value={companySections[0].platform}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[0].platform = e.target.value;
                        setCompanySections(updated);
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Previous Companies Section(s) */}
            {companySections.slice(1).map((section, index) => (
              <div
                key={index + 1}
                className="col-span-full bg-muted/10 border p-4 rounded-xl mb-6"
              >
                <h3 className="text-base font-semibold mb-2">{`Previous Company ${index + 1}`}</h3>

                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <input
                    list="industry-options"
                    type="text"
                    className="w-full p-3 border rounded-md mt-1 text-sm"
                    placeholder="Type or select"
                    disabled={pending}
                    value={section.currentIndustry}
                    onChange={(e) => {
                      const updated = [...companySections];
                      updated[index + 1].currentIndustry = e.target.value;
                      setCompanySections(updated);
                    }}
                    required
                  />
                  <datalist id="industry-options">
                    {presetIndustries.map((company, idx) => (
                      <option key={idx} value={company} />
                    ))}
                  </datalist>
                </div>

                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toggleExtraFields(index + 1)}
                  >
                    {showExtraFieldsFor[index + 1]
                      ? "Hide Company Info"
                      : "Add Company Info"}
                  </Button>
                </div>

                {showExtraFieldsFor[index + 1] && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Skills (separated by comma)"
                      label="Skills"
                      value={section.skills}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[index + 1].skills = e.target.value;
                        setCompanySections(updated);
                      }}
                    />

                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Position"
                      label="Position"
                      value={section.position}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[index + 1].position = e.target.value;
                        setCompanySections(updated);
                      }}
                    />

                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Key Responsibilities"
                      label="Responsibilities"
                      value={section.responsibilities}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[index + 1].responsibilities = e.target.value;
                        setCompanySections(updated);
                      }}
                    />

                    <FloatingInput
                      type="text"
                      disabled={pending}
                      placeholder="Platform"
                      label="Platform"
                      value={section.platform}
                      onChange={(e) => {
                        const updated = [...companySections];
                        updated[index + 1].platform = e.target.value;
                        setCompanySections(updated);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Previous Company button */}
            <div className="col-span-full -mt-5">
              <Button type="button" variant="outline" onClick={addCompanySection}>
                Add Previous Company
              </Button>
            </div>

            {/* LinkedIn, Facebook, Profile Photo below company sections */}
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

            <FloatingFileInput label="Profile Photo" onChange={handleFileChange} />

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
