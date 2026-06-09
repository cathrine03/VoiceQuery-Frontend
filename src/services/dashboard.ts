const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboard() {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/dashboard/`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load dashboard"
    );
  }

  return response.json();
}