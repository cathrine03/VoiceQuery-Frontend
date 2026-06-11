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

  // Find first numeric column
  const yKey =
    columns.find(
      (key) => typeof data[0][key] === "number"
    ) || columns[columns.length - 1];

  if (!yKey) return null;

  // Find first non-numeric column
  const xKey =
    columns.find((key) => key !== yKey) ||
    columns[0];

  // Detect time-based chart
  const isDate =
    xKey.toLowerCase().includes("date") ||
    xKey.toLowerCase().includes("month") ||
    xKey.toLowerCase().includes("year");

  // Handle multi-column datasets
  const chartData = data.map((row) => {
    const labelColumns = columns.filter(
      (col) => col !== yKey
    );

    return {
      label:
        labelColumns.length > 1
          ? labelColumns
              .map((col) => row[col])
              .join(" - ")
          : row[xKey],

      value: Number(row[yKey]),
    };
  });

  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">
        Visualization
      </h2>

      <div className="h-[400px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          {isDate ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="label"
                angle={-30}
                textAnchor="end"
                height={70}
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="label"
                angle={-30}
                textAnchor="end"
                height={80}
                interval={0}
              />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}