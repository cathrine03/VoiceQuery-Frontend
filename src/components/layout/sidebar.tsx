"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRole } from "@/lib/roleGuard";
import { useTheme } from "@/context/theme-context";

export function Sidebar() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const [role, setRole] =
    useState<string | null>(null);

  useEffect(() => {
    setRole(getRole());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Query", href: "/query" },
    { label: "History", href: "/history" },
    { label: "Saved Queries", href: "/saved" },

    ...(role === "admin"
      ? [
          { label: "Analytics", href: "/analytics" },
          { label: "Users", href: "/users" },
        ]
      : []),
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r bg-white dark:bg-gray-900 dark:border-gray-800 p-4 flex flex-col">

      {/* TITLE */}
      <h1 className="text-xl font-bold mb-6 text-black dark:text-white">
        VoiceQuery AI
      </h1>

  
      {/* NAV */}
      <nav className="space-y-2 flex-1">

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-2 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {link.label}
          </Link>
        ))}

      </nav>

          {/* THEME TOGGLE */}
      <button
        onClick={toggleDarkMode}
        className="mb-3 w-full border border-gray-300 dark:border-gray-700 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full rounded bg-black dark:bg-white dark:text-black text-white p-2 hover:opacity-90"
      >
        Logout
      </button>

    </aside>
  );
}