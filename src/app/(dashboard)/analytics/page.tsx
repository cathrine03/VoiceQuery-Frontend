"use client";

import { useRouter } from "next/navigation";
import { getRole } from "@/lib/roleGuard";

import {
  useEffect,
  useState,
} from "react";

import {
  getAnalytics,
} from "@/services/analytics";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] =
    useState<any>(null);

  useEffect(() => {
    const role = getRole();

    if (role !== "admin") {
      router.push("/query");
    }
  }, [router]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const analytics =
      await getAnalytics();

    setData(analytics);
  }

  if (!data) {
    return (
      <div>
        Loading analytics...
      </div>
    );
  }

  
  return (
    <div className="text-black dark:text-white space-y-8 ">

  {/* TITLE */}
  <h1 className="text-3xl font-bold mb-6">
    Analytics Dashboard
  </h1>

  {/* KPI CARDS */}
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

    {[
      { label: "Total Users", value: data.total_users },
      { label: "Total Queries", value: data.total_queries },
      { label: "Avg Time", value: `${data.avg_time} ms` },
      { label: "Total Rows", value: data.total_rows },
      { label: "Success Rate", value: `${data.success_rate}%` },
    ].map((item, i) => (
      <div
        key={i}
        className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
          {item.label}
        </h3>

        <p className="text-3xl font-bold mt-1">
          {item.value}
        </p>
      </div>
    ))}

  </div>

  {/* CHART 1 */}
  <div className="border rounded-lg p-6 dark:border-gray-700 dark:bg-gray-900">

    <h2 className="text-xl font-semibold mb-4">
      Query Volume Trend
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

  {/* CHART 2 */}
  <div className="border rounded-lg p-6 dark:border-gray-700 dark:bg-gray-900">

    <h2 className="text-xl font-semibold mb-4">
      Response Time Trend
    </h2>

    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.response_time_trend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="avg_time" />
        </LineChart>
      </ResponsiveContainer>
    </div>

  </div>

  {/* ACTIVE USERS */}
  <div className="border rounded-lg p-6 dark:border-gray-700 dark:bg-gray-900">

    <h2 className="text-xl font-semibold mb-4">
      Most Active Users
    </h2>

    <div className="space-y-3">

      {data.active_users?.map((user: any, index: number) => (
        <div
          key={index}
          className="flex justify-between border rounded p-3 dark:border-gray-700"
        >
          <span className="text-gray-800 dark:text-gray-200">
            {user.email}
          </span>

          <span className="text-gray-600 dark:text-gray-400">
            {user.count}
          </span>
        </div>
      ))}

    </div>

  </div>

  {/* TOP QUESTIONS */}
  <div className="border rounded-lg p-6 dark:border-gray-700 dark:bg-gray-900">

    <h2 className="text-xl font-semibold mb-4">
      Top Questions
    </h2>

    <div className="space-y-3">

      {data.top_questions?.map((q: any, index: number) => (
        <div
          key={index}
          className="flex justify-between border rounded p-3 dark:border-gray-700"
        >
          <span className="text-gray-800 dark:text-gray-200">
            {q.question}
          </span>

          <span className="text-gray-600 dark:text-gray-400">
            {q.count}
          </span>
        </div>
      ))}

    </div>

  </div>

  {/* RECENT ACTIVITY TABLE */}
  <div className="border rounded-lg p-6 dark:border-gray-700 dark:bg-gray-900">

    <h2 className="text-xl font-semibold mb-4">
      Recent Activity
    </h2>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="border-b dark:border-gray-700">

            <th className="py-3 text-left text-gray-700 dark:text-gray-200">
              User
            </th>

            <th className="py-3 text-left text-gray-700 dark:text-gray-200">
              Question
            </th>

            <th className="py-3 text-left text-gray-700 dark:text-gray-200">
              Time
            </th>

            <th className="py-3 text-left text-gray-700 dark:text-gray-200">
              Date
            </th>

          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-900">

          {data.recent_activity?.map((activity: any, index: number) => (
            <tr
              key={index}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >

              <td className="py-3 text-gray-800 dark:text-gray-200">
                {activity.email}
              </td>

              <td className="py-3 text-gray-800 dark:text-gray-200">
                {activity.question}
              </td>

              <td className="py-3 text-gray-800 dark:text-gray-200">
                {activity.execution_time} ms
              </td>

              <td className="py-3 text-gray-800 dark:text-gray-200">
                {new Date(activity.created_at).toLocaleString()}
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
            
