// app/api/notice/route.ts
import { NextResponse } from 'next/server';
import Notice from '@/models/Notice';
import connectDB from '@/lib/mongodb';
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';

interface UserSession {
  user?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    role?: string;
    // Add any additional user properties your app uses
    [key: string]: any; // Optional catch-all for additional properties
  };
  expires?: string; // Common in session implementations
  // Add any other session-related properties you need
}
export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find().sort({ createdAt: -1 });
    return NextResponse.json(notices);
  } catch (error) {
    console.log('Error fetching notices:', error);
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    // Create a minimal React-like context to satisfy the SessionProvider
    const session = await getServerSession(authOptions);

    if (!session || !(session as UserSession).user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl = '';
    if (imageFile) {
      // Implement your image upload logic here
      // imageUrl = await uploadImage(imageFile);
    }

    const notice = new Notice({
      title,
      content,
      imageUrl,
      createdBy: (session as UserSession).user?.id,
    });

    await notice.save();
    return NextResponse.json(notice);
  } catch (error) {
    console.error('Error creating notice:', error);
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}