const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHistory() {
  const token =
    localStorage.getItem("token");

  console.log("HISTORY TOKEN =", token);

  const response = await fetch(
    `${API_URL}/history/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load history"
    );
  }

  return response.json();
}