"use client";

import NoticeList from "@/components/notice/NoticeList";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotices } from "@/hooks/useNotices";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function NoticePage() {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page") ?? "1");
  const limit = Number(params.get("limit") ?? "10");

  const { data, isLoading } = useNotices(page, limit);

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

  if (isLoading) {
    return <LoadingAnimation />;
  } else if (!data) {
    return router.push("/404");
  } else if (data.items.length === 0 && data.max_page !== 0 && page > 1) {
    return router.push("/notice");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notice Board</h1>

      <div className="grid gap-8">
        <NoticeList
          notices={data.items}
          page={page}
          limit={limit}
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="perPage">Per Page:</label>
            <select
              id="perPage"
              value={limit}
              onChange={(e) => changeLimit(Number(e.target.value))}
              className="border rounded px-2 py-1">
              {[10, 20, 50].map((n) => (
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
      </div>
    </div>
  );
}
