import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthRequiredLayout({ children }: { children: React.ReactNode }) {
  const sessionToken = (await cookies()).get("session")?.value;
  if (!sessionToken) {
    return redirect("/sign-in");
  }

  return children;
}
