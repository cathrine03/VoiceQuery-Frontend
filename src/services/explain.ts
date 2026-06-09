const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function explainSql(
  sql: string
) {
  const response = await fetch(
    `${API_URL}/explain/`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        sql,
      }),
    }
  );

  return response.json();
}