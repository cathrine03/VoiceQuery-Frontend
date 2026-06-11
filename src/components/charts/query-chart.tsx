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
  Legend,
} from "recharts";

interface Props {
  data: any[];
}

export default function QueryChart({
  data,
}: Props) {
  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  // ---------- 2 COLUMN CHART ----------
  if (columns.length === 2) {
    const xKey = columns[0];
    const yKey = columns[1];

    const isDate =
      xKey.toLowerCase().includes("date") ||
      xKey.toLowerCase().includes("month") ||
      xKey.toLowerCase().includes("year");

    return (
      <div className="border rounded-xl p-6 bg-white dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">
          📊 Visualization
        </h2>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {isDate ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey={yKey}
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey={yKey}
                  fill="#6366F1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // ---------- 3 COLUMN CHART ----------
  if (columns.length === 3) {
    const categoryKey = columns[0];
    const seriesKey = columns[1];
    const valueKey = columns[2];

    const groupedData: any = {};

    data.forEach((row) => {
      const category = row[categoryKey];

      if (!groupedData[category]) {
        groupedData[category] = {
          [categoryKey]: category,
        };
      }

      groupedData[category][row[seriesKey]] =
        row[valueKey];
    });

    const chartData = Object.values(groupedData);

    const uniqueSeries = [
      ...new Set(data.map((d) => d[seriesKey])),
    ];

    const colors = [
      "#6366F1", // Indigo
      "#06B6D4", // Cyan
      "#10B981", // Emerald
      "#F59E0B", // Amber
      "#EF4444", // Red
      "#8B5CF6", // Violet
      "#EC4899", // Pink
      "#14B8A6", // Teal
    ];

    return (
      <div className="border rounded-xl p-6 bg-white dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">
          📊 Visualization
        </h2>

        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={categoryKey} />
              <YAxis />
              <Tooltip />
              <Legend />

              {uniqueSeries.map((series, index) => (
                <Bar
                  key={String(series)}
                  dataKey={String(series)}
                  fill={
                    colors[index % colors.length]
                  }
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-6 bg-white dark:bg-gray-900 dark:border-gray-700">
      <p className="text-gray-500">
        Chart visualization supports 2-3 column query
        results.
      </p>
    </div>
  );
}