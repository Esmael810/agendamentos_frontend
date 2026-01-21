export interface Municipality {
  id: number;
  name: string;
}

export async function getMunicipalities(
  islandId?: number
): Promise<Municipality[]> {
    const url = islandId
      ? `http://localhost:5281/api/v1/Municipality?islandId=${islandId}`
      : "http://localhost:5281/api/v1/Municipality";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar municípios");
    }
    return response.json();
}
