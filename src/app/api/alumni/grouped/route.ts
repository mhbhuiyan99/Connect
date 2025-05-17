import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Alumni, { IAlumniDocument } from "@/models/Alumni";

interface NormalizedAlumni {
  studentID: string;
  batch: string;
  name: string;
  email: string;
  currentIndustry?: string;
  jobTitle?: string;
  skills: string[];
  linkedIn?: string;
  facebook?: string;
  photo?: string;
}

export async function GET() {
  try {
    await connectToDatabase();
    
    const alumni = await Alumni.find({ batch: { $exists: true } }).exec();
    

    // Initialize with proper type
    const groupedData: Record<string, NormalizedAlumni[]> = {};

    alumni.forEach((alum: IAlumniDocument) => {
      // Convert skills to array if needed
      const skills = Array.isArray(alum.skills) 
        ? alum.skills.filter(skill => skill.trim().length > 0)
        : [];

      const normalized: NormalizedAlumni = {
        studentID: alum.studentID,
        batch: alum.batch,
        name: alum.name,
        email: alum.email,
        currentIndustry: alum.currentIndustry,
        jobTitle: alum.jobTitle,
        skills,
        linkedIn: alum.linkedIn,
        facebook: alum.facebook,
        photo: alum.photo
      };

      const batchKey = normalized.batch || 'Unknown';
      if (!groupedData[batchKey]) {
        groupedData[batchKey] = [];
      }
      groupedData[batchKey].push(normalized);
    });

    return NextResponse.json(groupedData);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}