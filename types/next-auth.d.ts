declare module "next-auth" {
  interface Session {
    user: { id: string; email: ?string; name: ?string; image: ?string };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
  }
}
