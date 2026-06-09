import { saveAs } from "file-saver";

export function exportToCSV(
  data: any[],
  filename = "query_results.csv"
) {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) =>
          JSON.stringify(row[header] ?? "")
        )
        .join(",")
    ),
  ];

  const csvString =
    csvRows.join("\n");

  const blob = new Blob(
    [csvString],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  saveAs(blob, filename);
}