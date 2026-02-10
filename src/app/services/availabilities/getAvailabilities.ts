export async function getAvailabilities() {
  const response = await fetch("http://localhost:5281/api/v1/Availability",
 {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar disponibilidade");
  }
  return response.json();
}
