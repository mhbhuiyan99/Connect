"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import User from "@/models/User";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminUsersList } from "@/hooks/useAdminUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { demoteUser, promoteUser } from "@/lib/api/admin/users";

export default function UsersTable() {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page") ?? "1");
  const limit = Number(params.get("limit") ?? "10");

  const { data, isPending } = useAdminUsersList(page, limit);
  const { user } = useAuthStore();

  const queryClient = useQueryClient();

  const changePage = (p: number) => {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    router.replace(`?${next.toString()}`);
  };

  const changeLimit = (l: number) => {
    const next = new URLSearchParams(params);
    next.set("limit", String(l));
    next.set("page", "1");
    router.replace(`?${next.toString()}`);
  };

  const promoteMutation = useMutation({
    mutationFn: (userId: string) => promoteUser(userId),
    onSuccess: async () => {
      toast.success("User promoted successfully");
      await queryClient.invalidateQueries({
        queryKey: ["adminUsers", page, limit],
      });
    },
    onError: () => {
      toast.error("Error promoting user!");
    },
  });

  const demoteMutation = useMutation({
    mutationFn: (userId: string) => demoteUser(userId),
    onSuccess: async () => {
      toast.success("User demoted successfully");
      await queryClient.invalidateQueries({
        queryKey: ["adminUsers", page, limit],
      });
    },
    onError: () => {
      toast.error("Error demoting user!");
    },
  });

  const handlePromote = async (userId: string) => {
    if (user?.role !== "superadmin") {
      return toast.error("Only superadmin can promote users");
    }

    promoteMutation.mutate(userId);
  };

  const handleDemote = async (userId: string) => {
    if (user?.role !== "superadmin") {
      return toast.error("Only superadmin can demote users");
    }

    demoteMutation.mutate(userId);
  };

  if (isPending) {
    return null;
  }

  // GENERATE BUTTON FROM USER
  const userActionButton = (user: User) => {
    if (user.role === "student") {
      return (
        <Button
          variant={"outline"}
          onClick={() => handleDemote(user.id)}
          disabled={promoteMutation.isPending || demoteMutation.isPending}>
          Promote
        </Button>
      );
    }

    if (user.role === "alumni") {
      return (
        <Button
          variant={"outline"}
          onClick={() => handlePromote(user.id)}
          disabled={promoteMutation.isPending || demoteMutation.isPending}>
          Promote
        </Button>
      );
    }

    return (
      <Button
        variant={"outline"}
        onClick={() => handleDemote(user.id)}
        disabled={promoteMutation.isPending || demoteMutation.isPending}>
        Demote
      </Button>
    );
  };

  return (
    <>
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Student ID</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((user: User) => (
            <tr
              key={user.id}
              className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.student_id}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td>{userActionButton(user)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="perPage">Per Page:</label>
          <select
            id="perPage"
            value={limit}
            onChange={(e) => changeLimit(Number(e.target.value))}
            className="border rounded px-2 py-1">
            {[10, 20, 50, 100].map((n) => (
              <option
                key={n}
                value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => changePage(page - 1)}
            disabled={page <= 1}>
            Prev
          </Button>
          <Button
            onClick={() => changePage(page + 1)}
            disabled={!data.has_next}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
