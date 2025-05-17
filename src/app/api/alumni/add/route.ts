import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import  Alumni  from "@/models/Alumni";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    await Alumni.create(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
