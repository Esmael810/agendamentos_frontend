

export async function confirmAvailability(id: number) {
  const response = await fetch(`http://localhost:5281/api/v1/Availability/${id}/confirm`,
 {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Erro ao confirmar disponibilidade");
  }
  return response.json();
}
