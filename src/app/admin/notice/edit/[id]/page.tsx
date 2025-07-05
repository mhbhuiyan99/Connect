"use client";

import { useParams } from "next/navigation";
import NoticeForm from "@/components/admin/NoticeForm";

export default function EditNoticePage() {
  let { id } = useParams();
  if (id instanceof Array) id = id[0];
  return <NoticeForm noticeId={id} />;
}
