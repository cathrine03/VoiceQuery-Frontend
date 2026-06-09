const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("API_URL missing");
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await fetch(`${API_URL}/users/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  console.log("RAW RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data.detail || "Failed to load users");
  }

  return data;
}

export async function updateUserRole(
  userId: number
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/users/${userId}/role`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to update role"
    );
  }

  return data;
}

export async function deleteUser(
  userId: number
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();

    throw new Error(
      data.detail || "Failed to delete user"
    );
  }

  // Handles 204 No Content responses
  return true;
}