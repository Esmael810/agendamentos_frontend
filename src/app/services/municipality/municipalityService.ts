import { apiFetch } from "@/lib/apiFetch";

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
    return await apiFetch(url);
   
}
