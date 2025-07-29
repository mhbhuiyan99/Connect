"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Company = {
  industry: string;
  software?: string;
  position?: string;
  responsibilities?: string;
  platform?: string;
};

type AlumniProfileProps = {
  student_id: string;
  batch: number;
  name: string;
  email: string;
  linked_in: string | null;
  facebook: string | null;
  github: string | null;
  skills: string[];
  profile_photo: string | null;
  industries: Company[];
  includeEditButton?: boolean;
  hometown: string;
};

const ProfileCard = ({
  student_id,
  batch,
  name,
  email,
  linked_in,
  facebook,
  github,
  skills,
  profile_photo,
  industries,
  hometown,
  includeEditButton = false,
}: AlumniProfileProps) => {
  const currentCompany = industries[0];
  const previousCompanies = industries.slice(1);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-24 h-24">
          <Image
            src={profile_photo || "/default_user.png"}
            alt="Profile Photo"
            fill
            className="rounded-full object-cover border"
          />
        </div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">Student ID: {student_id}</p>
        <p className="text-sm text-gray-600">Batch: {batch}</p>
        <p className="text-sm text-gray-600">Email: {email}</p>
        {skills && (
          <p className="text-sm text-gray-600">
            <strong>Skills:</strong> {skills.join(", ")}
          </p>
        )}
        {hometown && (
          <p className="text-sm text-gray-600">
            <strong>Hometown:</strong> {hometown}
          </p>
        )}
      </div>

      {/* Current Company */}
      {currentCompany?.industry && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Current Company</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Industry:</strong> {currentCompany.industry}
            </p>
            {currentCompany.position && (
              <p>
                <strong>Position:</strong> {currentCompany.position}
              </p>
            )}
            {currentCompany.responsibilities && (
              <p>
                <strong>Responsibilities:</strong> {currentCompany.responsibilities}
              </p>
            )}
            {currentCompany.platform && (
              <p>
                <strong>Platform:</strong> {currentCompany.platform}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Previous Companies */}
      {previousCompanies.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Previous Companies</h3>
          <div className="space-y-4">
            {previousCompanies.map((company, index) => (
              <div
                key={index}
                className="text-sm text-gray-700 border p-3 rounded-lg">
                <p>
                  <strong>Industry:</strong> {company.industry}
                </p>
                {company.position && (
                  <p>
                    <strong>Position:</strong> {company.position}
                  </p>
                )}
                {company.responsibilities && (
                  <p>
                    <strong>Responsibilities:</strong> {company.responsibilities}
                  </p>
                )}
                {company.platform && (
                  <p>
                    <strong>Platform:</strong> {company.platform}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        <TooltipProvider>
          {linked_in && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700">
                  <a
                    href={linked_in}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Linkedin className="mr-1 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View LinkedIn Profile</p>
              </TooltipContent>
            </Tooltip>
          )}

          {facebook && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700">
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Facebook className="mr-1 h-4 w-4" />
                    Facebook
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Facebook Profile</p>
              </TooltipContent>
            </Tooltip>
          )}

          {github && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Github className="mr-1 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View GitHub Profile</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>

      {/* Edit Button */}
      {includeEditButton && (
        <div className="mt-6 flex justify-center">
          <Link
            href="/profile/update"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition">
            Edit Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
