"use client";

import { useEffect, useState } from "react";
import {
  getSavedQueries,
  deleteSavedQuery,
} from "@/services/savedQueries";

export default function SavedPage() {
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getSavedQueries();
    setSaved(Array.isArray(data) ? data : []);
  }

  async function handleDelete(id: number) {
    await deleteSavedQuery(id);
    load();
  }

  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold mb-0 ">
        Saved Queries 
      </h1>

      <p className=" text-gray-500 dark:text-gray-400">
      Quickly access and re-run your important saved queries.
    </p>

      {saved.length > 0 ? (
        <div className="border rounded-xl bg-white overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left p-4">
                  Question
                </th>

                <th className="text-left p-4 w-64">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900">
              {saved.map((q) => (
                <tr
                  key={q.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {q.question}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          (window.location.href =
                            `/query?question=${encodeURIComponent(
                              q.question
                            )}`)
                        }
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                      >
                        Run Again
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(q.id)
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-500"
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
      ) : (
        <div className="border rounded-xl p-6 bg-white">
          <p className="text-gray-500">
            No saved queries found.
          </p>
        </div>
      )}
    </div>
  );
}