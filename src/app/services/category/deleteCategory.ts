export async function deleteCategory(id: number) {
  const res = await fetch(``, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao eliminar categoria");
}
