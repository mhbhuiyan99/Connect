"use server";

import { cookies } from "next/headers";
import Link from "next/link";

export default async function HeroSection() {
  const sessionToken = (await cookies()).get("session")?.value;

  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center py-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to CSE,MBSTU Alumni Network</h1>
      <p className="text-lg">Connecting past, present, and future of our proud alumni.</p>
      {!sessionToken && (
        <button className="mt-6 px-6 py-3 bg-white text-blue-800 font-semibold rounded shadow">
          <Link href="/sign-in">
            <span>Sign In</span>
          </Link>
        </button>
      )}
    </section>
  );
}
