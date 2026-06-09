const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_URL:", API_URL); 
export async function generateQuery(question: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/query/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      question,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Query generation failed");
  }

  return data;
}