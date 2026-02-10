export async function updateCategory(id: number, name: string) {
  const res = await fetch(`http://localhost:5281/api/v1/Category/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Erro ao atualizar categoria");
}
