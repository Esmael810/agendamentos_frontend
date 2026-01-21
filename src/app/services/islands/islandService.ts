export interface Island {
    id: number
    name: string
}

export async function getIslands(): Promise<Island[]> {
    const response = await fetch("http://localhost:5281/api/v1/Island");
    if (!response.ok) {
        throw new Error("Erro ao buscar ilhas");
    }
    return response.json();
}