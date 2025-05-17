import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb"; 
import Alumni from "@/models/Alumni"; 

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); 
    const data = await req.json();

    const existing = await Alumni.findOne({
      $or: [{ StudentID: data.StudentID }, { Email: data.Email }],
    });

    if (existing) {
      return NextResponse.json({ error: "StudentID or Email already exists" }, { status: 409 });
    }

    const newAlumni = new Alumni(data);
    await newAlumni.save();

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
