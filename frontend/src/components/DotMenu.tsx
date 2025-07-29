"use client";

import { useState, useRef, useEffect } from "react";

export default function DotMenu({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-gray-100">
        Action
        {/* <DotsHorizontalIcon className="h-5 w-5" /> */}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-10 border text-sm">
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100">
              ✏️ Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
              🗑 Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
