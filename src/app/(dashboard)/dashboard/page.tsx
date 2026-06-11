"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboard
} from "@/services/dashboard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function DashboardPage() {
  const [data, setData] =
    useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const dashboard =
      await getDashboard();

    setData(dashboard);
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
  
   <div className="text-black dark:text-white space-y-8 ">

    <div className="bg-red-500 text-white p-10 text-5xl">
    TAILWIND TEST
  </div>

  {/* HEADER */}
  <div>
    <h1 className="text-3xl font-bold text-black dark:text-white">
      Welcome Back
    </h1>

    <p className="text-gray-500 dark:text-gray-400 mb-8">
      VoiceQuery AI Dashboard
    </p>
  </div>

  {/* TOP STATS */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

    {[
      { title: "Total Queries", value: data.total_queries },
      { title: "Avg Time", value: `${data.avg_time} ms` },
      { title: "Total Rows", value: data.total_rows },
      { title: "Last Query", value: data.last_query_time, small: true },
    ].map((item, i) => (
      <div
        key={i}
        className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
          {item.title}
        </h3>

        <p
          className={`mt-2 font-bold ${
            item.small
              ? "text-sm break-words"
              : "text-3xl"
          }`}
        >
          {item.value}
        </p>
      </div>
    ))}

  </div>

  {/* SECONDARY STATS */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        Most Used Query
      </h3>

      <p className="mt-2 font-semibold break-words text-gray-800 dark:text-gray-200">
        {data.most_used_query}
      </p>
    </div>

    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        Saved Queries
      </h3>

      <p className="text-3xl font-bold mt-2">
        {data.saved_queries}
      </p>
    </div>

    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        Avg Rows
      </h3>

      <p className="text-3xl font-bold mt-2">
        {data.avg_rows}
      </p>
    </div>

    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        This Week
      </h3>

      <p className="text-3xl font-bold mt-2">
        {data.queries_this_week}
      </p>
    </div>

  </div>

  {/* CHART */}
  <div className="border rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">

    <h2 className="text-xl font-semibold mb-4">
      Query Activity
    </h2>

    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.query_trend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" />
        </LineChart>
      </ResponsiveContainer>
    </div>

  </div>

  {/* TOP QUESTIONS */}
  <div className="space-y-3">

    <h2 className="text-xl font-semibold">
      Top Questions
    </h2>

    {data.top_questions?.map((item: any, index: number) => (
      <div
        key={index}
        className="border rounded-lg p-4 flex justify-between dark:border-gray-700 dark:bg-gray-900"
      >
        <span className="text-gray-800 dark:text-gray-200">
          {item.question}
        </span>

        <span className="font-semibold text-gray-600 dark:text-gray-400">
          {item.count}
        </span>
      </div>
    ))}

  </div>

  {/* RECENT QUERIES */}
  <div className="space-y-3">

    <h2 className="text-xl font-semibold">
      Recent Queries
    </h2>

    {data.recent_queries.map((query: any, index: number) => (
      <div
        key={index}
        className="border rounded-lg p-4 dark:border-gray-700 dark:bg-gray-900"
      >

        <p className="font-medium text-gray-800 dark:text-gray-200">
          {query.question}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ⚡ {query.execution_time} ms
        </p>

      </div>
    ))}

  </div>

</div>
  );
}