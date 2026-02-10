export async function cancelScheduling(id: number) {
  const response = await fetch(
    `http://localhost:5281/api/v1/Sheduling/${id}/cancel`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao cancelar agendamento");
  }

  return response.json();
}
