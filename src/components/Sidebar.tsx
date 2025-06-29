"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/alumni", label: "Alumni" },
    {
        label: "Notice",
        children: [
            { href: "/admin/notice/create", label: "Create Notice" },
            { href: "/admin/notice", label: "Notice List" },
        ],
    },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/approval", label: "Approval" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (label: string) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <aside className="w-64 bg-white shadow-lg p-4">
            <h2 className="font-bold text-lg mb-4">🎓 Admin Panel</h2>
            <ul className="space-y-2">
                {links.map((link) =>
                    "children" in link ? (
                        <li key={link.label}>
                            <button
                                onClick={() => toggleMenu(link.label)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 font-semibold text-gray-700"
                            >
                                <span>{link.label}</span>
                                {openMenus[link.label] ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </button>

                            {openMenus[link.label] && (
                                <ul className="ml-4 mt-1 space-y-1">
                                    {link.children?.map((sublink) => (
                                        <li key={sublink.href}>
                                            <Link
                                                href={sublink.href}
                                                className={`block px-3 py-1 rounded text-sm ${pathname === sublink.href
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                                    }`}
                                            >
                                                {sublink.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`block px-3 py-2 rounded ${pathname === link.href
                                    ? "bg-blue-100 text-blue-700"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </aside>
    );
}
