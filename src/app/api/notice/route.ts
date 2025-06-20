import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import connectDB from '@/lib/mongodb';
import Notice from '@/models/Notice';
import getSession from '@/providers/SessionProvider';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = promisify(fs.readFile);

interface UserSession {
  user?: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  };
  [key: string]: any;
}

// Helper to parse form data
function parseForm(req: any): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), '/public/uploads'),
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find().sort({ createdAt: -1 }).populate('createdBy', 'name email');
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getSession({
      children: null,
      request: req,
    } as any);

    if (!session || !(session as UserSession).user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fields, files } = await parseForm(req as any);
    const title = fields.title?.[0] || '';
    const content = fields.content?.[0] || '';
    const imageFile = files.image?.[0];

    let imageUrl = '';
    if (imageFile && imageFile.newFilename) {
      imageUrl = `/uploads/${imageFile.newFilename}`; // accessed via /public/uploads
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
