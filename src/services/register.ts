const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function register(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
        error.detail || "Registration failed"
    );
    }
}