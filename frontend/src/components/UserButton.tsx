"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useAuthStore } from "@/store/authStore";

const UserButton = () => {
  const router = useRouter();

  const { user, logout } = useAuthStore();

  const avatarFallback = user?.name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  if (!user) {
    return (
      <Link
        className={buttonVariants()}
        href="/sign-in">
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
        <div className="flex gap-4 items-center">
          <span>{user?.name}</span>
          <Avatar className="size-10 hover:opacity-75 transition">
            <AvatarImage
              className="size-10 hover:opacity-75 transition"
              src={user?.profile_photo || "/default_user.png"}
            />
            <AvatarFallback className="bg-red-800 text-white">{avatarFallback}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="bottom"
        className="w-50">
        {user.role !== "student" && (
          <DropdownMenuItem
            asChild
            className="h-10">
            <Link
              href="/profile"
              className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
        )}

        {(user.role === "admin" || user.role === "superadmin") && (
          <DropdownMenuItem
            asChild
            className="h-10">
            <Link
              href="/admin/dashboard"
              className="w-full">
              Admin Panel
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="h-10"
          onClick={() => handleSignOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
