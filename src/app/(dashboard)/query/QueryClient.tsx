"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { generateQuery } from "@/services/query";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { exportToCSV } from "@/utils/exportCsv";
import { explainSql } from "@/services/explain";
import { saveQuery } from "@/services/savedQueries";
import { showToast } from "@/lib/toast";
import QueryChart from "@/components/charts/query-chart";

export default function QueryClient() {
  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [aiTime, setAiTime] = useState<number | null>(null);
  const [dbTime, setDbTime] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [rowCount, setRowCount] = useState<number | null>(null);

  const [explanation, setExplanation] = useState("");

  const searchParams = useSearchParams();
  const { isListening, startListening } = useSpeechRecognition();

  useEffect(() => {
    const questionFromUrl = searchParams.get("question");

    if (questionFromUrl) {
      setQuestion(questionFromUrl);
      runQuery(questionFromUrl);
    }
  }, [searchParams]);

  const runQuery = async (query: string) => {
    setLoading(true);

    try {
      const data = await generateQuery(query);

      if (!query || query.trim() === "") return;

      setSql(data?.sql ?? "");
      setResults(Array.isArray(data?.results) ? data.results : []);

      setAiTime(data?.timings?.ai_ms ?? null);
      setDbTime(data?.timings?.db_ms ?? null);
      setTotalTime(data?.timings?.total_ms ?? null);
      setRowCount(data?.row_count ?? null);

      setExplanation("");
    } catch (error: any) {
        console.error("QUERY ERROR:", error);
        setSql(error.message || "Failed to generate query.");
        setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!question.trim()) return;
    await runQuery(question);
  };

  const handleSave = async () => {
    if (!question.trim() || !sql) {
      showToast("Generate a query first");
      return;
    }

    try {
      await saveQuery(question);
      showToast("Saved successfully");
    } catch (err: any) {
      showToast(err.message);
    }
  };

  const handleExportCSV = () => {
    const today = new Date().toISOString().split("T")[0];
    exportToCSV(results, `sales_report_${today}.csv`);
  };

  const columns = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className="space-y-6  text-black dark:text-white">

  {/* HEADER */}
  <div>
    <h1 className="text-3xl font-bold">
      Query Studio
    </h1>

    <p className="text-gray-500 dark:text-gray-400">
      Ask questions about your data in natural language.
    </p>
  </div>

  {/* INPUT SECTION */}
  <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-6">

    <label className="block mb-2 font-medium">
      Ask a Question
    </label>

    {/* VOICE INPUT */}
    <div className="border dark:border-gray-700 rounded-lg p-4 mb-4">

      <h3 className="font-semibold mb-2">
        Voice Input
      </h3>

      <button
        onClick={() =>
          startListening((transcript) =>
            setQuestion(transcript)
          )
        }
        className="px-4 py-2 border rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isListening
          ? "🎙️ Listening..."
          : "🎤 Start Recording"}
      </button>

    </div>

    {/* TEXTAREA */}
    <textarea
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Show monthly revenue by region"
      className="w-full min-h-[120px] border rounded-lg p-3 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    />

    {/* BUTTON */}
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="mt-4 px-6 py-3 bg-black dark:bg-white dark:text-black text-white rounded-lg disabled:opacity-50"
    >
      {loading ? "Generating..." : "Generate Query"}
    </button>

  </div>

  {/* SQL OUTPUT */}
  <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-6">

    <h2 className="font-semibold mb-2">
      Generated SQL
    </h2>

    {sql ? (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
        {sql}
      </pre>
    ) : (
      <p className="text-gray-400">
        No SQL generated yet.
      </p>
    )}

    {/* METRICS */}
    {(totalTime !== null || rowCount !== null) && (
      <div className="flex flex-wrap gap-4 mt-4">

        <div className="p-3 border rounded-lg dark:border-gray-700">
          AI: {aiTime} ms
        </div>

        <div className="p-3 border rounded-lg dark:border-gray-700">
          DB: {dbTime} ms
        </div>

        <div className="p-3 border rounded-lg dark:border-gray-700">
          Total: {totalTime} ms
        </div>

        <div className="p-3 border rounded-lg dark:border-gray-700">
          Rows: {rowCount}
        </div>

      </div>
    )}

    {/* SAVE BUTTON */}
    {sql && (
      <button
        onClick={handleSave}
        className="mt-4 px-3 py-2 border rounded dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        ⭐ Save Query
      </button>
    )}

  </div>

  {/* EXPLAIN */}
  {sql && (
    <>
      <button
        onClick={async () => {
          const data = await explainSql(sql);
          if (!sql || sql.trim() === "") return;
          setExplanation(data.explanation);
        }}
        className="px-4 py-2 border rounded-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Explain Query
      </button>

      {explanation && (
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 dark:border-gray-700">

          <h3 className="font-semibold mb-2">
            AI Explanation
          </h3>

          <p className="text-gray-700 dark:text-gray-300">
            {explanation}
          </p>

        </div>
      )}
    </>
  )}

  <QueryChart data={results} />

  {/* RESULTS */}
  {results.length > 0 && (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-6">

      <h2 className="font-semibold mb-2">
        Results
      </h2>

      {/* EXPORT */}
      <button
        onClick={handleExportCSV}
        className="mb-4 px-4 py-2 border rounded dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        📄 Export CSV
      </button>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="border-b dark:border-gray-700">

              {columns.map((key) => (
                <th
                  key={key}
                  className="border p-2 text-left text-gray-700 dark:text-gray-200 dark:border-gray-700"
                >
                  {key}
                </th>
              ))}

            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900">

            {results.map((row, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >

                {columns.map((col) => (
                  <td
                    key={col}
                    className="border p-2 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {String(row[col])}
                  </td>
                ))}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )}

</div>
  );
};