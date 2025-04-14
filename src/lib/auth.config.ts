import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "@auth/core/providers/credentials";
import { db } from "./db";

export const authConfig = {
  adapter: PrismaAdapter(db),

  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@mbstu.ac.bd" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Credentials received:", credentials);
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        return credentials?.email === "jsmith@example.com" ? user : null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};