export interface Category {
  id: number;
  name: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch("http://localhost:5281/api/v1/Category");
  if (!response.ok) {
    throw new Error("Erro ao buscar Categorias");
  }
  return response.json();
}
