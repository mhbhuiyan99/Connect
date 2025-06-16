'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { IUser } from "@/models/user"
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useAuth } from "@/providers/AuthProvider";


const UserButton = () => {
  const { session, setSession } = useAuth();

  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const accessToken = session?.accessToken;
      const res = await fetch("http://localhost:8000/v1/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Login check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = user?.name?.charAt(0).toUpperCase();
  const handleSignOut = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setSession(null);
    router.push("/");
  }


  if (!session) {
    return (
      <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
    )
  } else {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
          <div className="flex gap-4 items-center">
            <span>{user?.name}</span>
            <Avatar className="size-10 hover:opacity-75 transition">
              <AvatarImage
                className="size-10 hover:opacity-75 transition"
                src={user?.profilePhoto || "undefined"}
              />
              <AvatarFallback className="bg-red-800 text-white">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="bottom" className="w-50">
          <DropdownMenuItem className="h-10" onClick={() => handleSignOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
};

export default UserButton;