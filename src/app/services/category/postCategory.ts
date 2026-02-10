export async function createCategory(name: string) {
  const response = await fetch("http://localhost:5281/api/v1/Category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar categoria");
  }

  return response.json();
}
