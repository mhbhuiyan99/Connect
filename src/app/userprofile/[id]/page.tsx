import ProfileCard from "@/components/ProfileCard";

export default function UserProfilePage() {
  // Dummy or fetched data — replace with actual backend logic if needed
  const alumni = {
    studentID: "CE19001",
    batch: "17",
    name: "Hasan Karim",
    email: "hasan@example.com",
    linkedIn: "https://linkedin.com/in/hasankarim",
    facebook: "https://facebook.com/hasankarim",
    profilePhoto: "/default-avatar.png",
    industries: [
      {
        currentIndustry: "Google",
        skills: "React, TypeScript",
        position: "Frontend Engineer",
        responsibilities: "UI Development",
        platform: "Web",
      },
      {
        currentIndustry: "Meta",
        position: "Intern",
        skills: "JavaScript, GraphQL",
      },
    ],
  };

  return (
    <div className="p-6 flex justify-center">
      <ProfileCard {...alumni} />
    </div>
  );
}
