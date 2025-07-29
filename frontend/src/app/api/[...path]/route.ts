import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8000";

async function handleRequest(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const method = req.method;
  const path = (await params).path.join("/");
  const query = req.nextUrl.search;
  let targetUrl = "";
  if (query) {
    targetUrl = `${API_BASE_URL}/${path}/${query}`;
  } else {
    targetUrl = `${API_BASE_URL}/${path}${query}`;
  }

  const headers = new Headers(req.headers);
  headers.delete("host");

  const bufferedBody = req.body ? await req.arrayBuffer() : undefined;

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: ["GET", "HEAD"].includes(method) ? undefined : bufferedBody,
    credentials: "include",
    redirect: "manual",
  };

  let res = await fetch(targetUrl, fetchOptions);
  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get("location") || targetUrl;
    if (location.indexOf("http") === -1) {
      res = await fetch(`${API_BASE_URL}${location}`, fetchOptions);
    } else {
      res = await fetch(location, fetchOptions);
    }
  }

  const responseBody = await res.arrayBuffer();

  const response = new NextResponse(responseBody, {
    status: res.status,
  });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "*");
  response.headers.set("Access-Control-Allow-Headers", "*");
  response.headers.set("Content-Type", res.headers.get("content-type") || "application/json");

  return response;
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
export const OPTIONS = handleRequest;
export const HEAD = handleRequest;
