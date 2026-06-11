"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: any[];
}

export default function QueryChart({
  data,
}: Props) {
  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  if (columns.length !== 2) {
    return null;
  }

  const xKey = columns[0];
  const yKey = columns[1];

  const isDate =
    xKey.toLowerCase().includes("date") ||
    xKey.toLowerCase().includes("month");

  return (
    <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4">
        Visualization
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">

          {isDate ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={yKey}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={yKey} />
            </BarChart>
          )}

        </ResponsiveContainer>
      </div>
    </div>
  );
}