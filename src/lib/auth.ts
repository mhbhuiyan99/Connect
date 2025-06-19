import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [

        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:8000/v1/auth/sign-in", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                            csrf: await getCsrfToken(),
                        }),
                    })
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.detail);
                    }
                    return {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                    }
                }
                catch {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log(token, user);
            if (user) {
                token.id = user.id;
                token.email = user.email as string;
            }
            return token;
        },

        async session({ session, token }) {
            // console.log(session, token);
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    id: token.id,
                    image: ""
                };
            };
            return session;
        }
    },
    pages: {
        signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET
}
