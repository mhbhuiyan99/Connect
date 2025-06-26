"use client";

import Image from "next/image";
import Link from "next/link";

type Company = {
  currentIndustry: string;
  skills?: string;
  position?: string;
  responsibilities?: string;
  platform?: string;
};

type AlumniProfileProps = {
  studentID: string;
  batch: string;
  name: string;
  email: string;
  linkedIn?: string;
  facebook?: string;
  profilePhoto?: string;
  industries: Company[];
};

const ProfileCard = ({
  studentID,
  batch,
  name,
  email,
  linkedIn,
  facebook,
  profilePhoto,
  industries,
}: AlumniProfileProps) => {
  const currentCompany = industries[0];
  const previousCompanies = industries.slice(1);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-24 h-24">
          <Image
            src={profilePhoto || "/default-avatar.png"}
            alt="Profile Photo"
            fill
            className="rounded-full object-cover border"
          />
        </div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">Student ID: {studentID}</p>
        <p className="text-sm text-gray-600">Batch: {batch}</p>
        <p className="text-sm text-gray-600">Email: {email}</p>
      </div>

      {/* Current Company */}
      {currentCompany?.currentIndustry && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Current Company</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Industry:</strong> {currentCompany.currentIndustry}</p>
            {currentCompany.position && <p><strong>Position:</strong> {currentCompany.position}</p>}
            {currentCompany.skills && <p><strong>Skills:</strong> {currentCompany.skills}</p>}
            {currentCompany.responsibilities && <p><strong>Responsibilities:</strong> {currentCompany.responsibilities}</p>}
            {currentCompany.platform && <p><strong>Platform:</strong> {currentCompany.platform}</p>}
          </div>
        </div>
      )}

      {/* Previous Companies */}
      {previousCompanies.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Previous Companies</h3>
          <div className="space-y-4">
            {previousCompanies.map((company, index) => (
              <div key={index} className="text-sm text-gray-700 border p-3 rounded-lg">
                <p><strong>Industry:</strong> {company.currentIndustry}</p>
                {company.position && <p><strong>Position:</strong> {company.position}</p>}
                {company.skills && <p><strong>Skils:</strong> {company.skills}</p>}
                {company.responsibilities && <p><strong>Responsibilities:</strong> {company.responsibilities}</p>}
                {company.platform && <p><strong>Platform:</strong> {company.platform}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      <div className="mt-6 flex justify-center gap-6">
        {linkedIn && (
          <Link href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm underline">
            LinkedIn
          </Link>
        )}
        {facebook && (
          <Link href={facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm underline">
            Facebook
          </Link>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href="/edit-profile"
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
