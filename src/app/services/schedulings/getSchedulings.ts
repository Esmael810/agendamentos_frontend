export async function getSchedulings() {
  const response = await fetch("http://localhost:5281/api/v1/Sheduling");

  if (!response.ok) {
    throw new Error("Erro ao buscar schedulings");
  }

  return response.json();
}
