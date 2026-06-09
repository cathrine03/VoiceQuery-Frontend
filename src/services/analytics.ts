import { getRole } from "@/lib/roleGuard";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getAnalytics() {
  const token =
    localStorage.getItem("token");

  console.log("ANALYTICS TOKEN =", token);

  const response = await fetch(
    `${API_URL}/analytics/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(
    "ANALYTICS STATUS =",
    response.status
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.log(
      "ANALYTICS ERROR =",
      errorText
    );

    throw new Error(
      "Failed to load analytics"
    );
  }

  return response.json();
}
