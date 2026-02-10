
export async function cancelAvailability(id: number) {
  const response = await fetch( `http://localhost:5281/api/v1/Availability/${id}/cancel`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error("Erro ao cancelar disponibilidade");
  }
  return response.json();
}
