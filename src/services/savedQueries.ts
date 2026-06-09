const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function saveQuery(question: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/saved-queries/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  return response.json();
}

export async function getSavedQueries() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/saved-queries/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function deleteSavedQuery(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/saved-queries/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}