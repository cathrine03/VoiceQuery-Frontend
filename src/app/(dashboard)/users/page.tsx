"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getRole } from "@/lib/roleGuard";
import { showToast } from "@/lib/toast";

import {
  getUsers,
  updateUserRole,
  deleteUser
} from "@/services/users";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] =
    useState<any[]>([]);

  useEffect(() => {
    console.log("TOKEN:", localStorage.getItem("token"));
    console.log("API:", process.env.NEXT_PUBLIC_API_URL);

    if (getRole() !== "admin") {
      router.push("/query");
      return;
    }

    loadUsers();
  }, []);

  async function loadUsers() {
    const data =
      await getUsers();

    setUsers(data);
  }


  async function handleRole(
    userId: number
    ) {
    try {
        await updateUserRole(
        userId
        );

        loadUsers();
    } catch (error: any) {
        showToast(error.message);
    }
    }

  async function handleDelete(
    userId: number
    ) {
    const confirmed =
        confirm(
        "Delete this user?"
        );

    if (!confirmed) return;

    try {
        await deleteUser(userId);

        loadUsers();
    } catch (error: any) {
        showToast(error.message);
    }
    }



  return (
   <div className="min-h-screen  text-black dark:text-white">

      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="border rounded-lg overflow-hidden dark:border-gray-700">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className="border-b dark:border-gray-700">

                <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  ID
                </th>

                <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Username
                </th>

                <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Email
                </th>

                <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Role
                </th>

                <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Actions
                </th>

              </tr>
            </thead>

            {/* BODY */}
            <tbody className="bg-white dark:bg-gray-900">

              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >

                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    {user.id}
                  </td>

                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    {user.username}
                  </td>

                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    {user.email}
                  </td>

                  <td className="py-3 px-4">

                    <span
                      className={
                        user.role === "admin"
                          ? "px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm"
                          : "px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-sm"
                      }
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="py-3 px-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          handleRole(user.id)
                        }
                        className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        {user.role === "admin"
                          ? "Demote"
                          : "Promote"}
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
