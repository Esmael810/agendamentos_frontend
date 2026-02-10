export async function finalizeScheduling(id: number) {
  const response = await fetch(
    `http://localhost:5281/api/v1/Sheduling/${id}/finalize`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao finalizar agendamento");
  }

  return response.json();
}
