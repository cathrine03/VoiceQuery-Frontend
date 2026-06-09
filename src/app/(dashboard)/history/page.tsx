"use client";

import { useEffect, useState } from "react";
import { getHistory } from "@/services/history";
import { saveQuery } from "@/services/savedQueries";
import { Fragment } from "react";
import { showToast } from "@/lib/toast";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] =
  useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory();

      setHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setHistory([]);
    }
  };

  async function handleSave(question: string) {
    try {
      await saveQuery(question);
      showToast("Query saved successfully");
    } catch (error: any) {
      showToast(error.message || "Failed to save query");
    }
  }

  const filteredHistory =
    history.filter((item) =>
      item.question
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="space-y-6  text-black dark:text-white">

  {/* HEADER */}
  <div>
    <h1 className="text-3xl font-bold">
      Query History
    </h1>

    <p className="text-gray-500 dark:text-gray-400">
      Previously executed AI queries.
    </p>
  </div>

  {/* SEARCH */}
  <div className="mt-4">
    <input
      type="text"
      placeholder="Search queries..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    />
  </div>

  {/* COUNT */}
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
    {filteredHistory.length} queries found
  </p>

  {/* TABLE */}
  {filteredHistory.length > 0 ? (
    <div className="border rounded-xl overflow-hidden dark:border-gray-700">

      <table className="w-full">

        {/* HEADER */}
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="border-b dark:border-gray-700">

            <th className="text-left p-4 text-gray-700 dark:text-gray-200">
              Question
            </th>

            <th className="text-left p-4 text-gray-700 dark:text-gray-200">
              Rows
            </th>

            <th className="text-left p-4 text-gray-700 dark:text-gray-200">
              Time
            </th>

            <th className="text-left p-4 text-gray-700 dark:text-gray-200">
              Date
            </th>

            <th className="text-left p-4 text-gray-700 dark:text-gray-200">
              Actions
            </th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-white dark:bg-gray-900">

          {filteredHistory.map((item) => (
            <Fragment key={item.id}>

              {/* MAIN ROW */}
              <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item.question}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item.row_count}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item.execution_time} ms
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {new Date(item.created_at).toLocaleString()}
                </td>

                <td className="p-4">

                  <div className="flex gap-2 flex-wrap">

                    {/* VIEW SQL */}
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === item.id
                            ? null
                            : item.id
                        )
                      }
                      className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      {expandedId === item.id
                        ? "Hide SQL"
                        : "View SQL"}
                    </button>

                    {/* RUN AGAIN */}
                    <button
                      onClick={() =>
                        (window.location.href =
                          `/query?question=${encodeURIComponent(
                            item.question
                          )}`)
                      }
                      className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      Run Again
                    </button>

                    {/* SAVE */}
                    <button
                      onClick={() =>
                        handleSave(item.question)
                      }
                      className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      ⭐ Save Query
                    </button>

                  </div>

                </td>

              </tr>

              {/* EXPANDED SQL ROW */}
              {expandedId === item.id && (
                <tr>

                  <td
                    colSpan={5}
                    className="p-4 bg-gray-50 dark:bg-gray-800"
                  >
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                      {item.sql}
                    </pre>
                  </td>

                </tr>
              )}

            </Fragment>
          ))}

        </tbody>

      </table>

    </div>
  ) : (
    <div className="border rounded-xl p-6 bg-white dark:bg-gray-900 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-400">
        No query history found.
      </p>
    </div>
  )}

</div>
      )}
  