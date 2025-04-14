import { Auth } from "@auth/core";
import { authConfig } from "@/lib/auth.config";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return Auth(req, authConfig);
}

export async function POST(req: NextRequest) {
  return Auth(req, authConfig);
}
