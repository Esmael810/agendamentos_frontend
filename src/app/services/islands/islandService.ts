import { apiFetch } from "@/lib/apiFetch";

export interface Island {
    id: number
    name: string
}

export async function getIslands(): Promise<Island[]> {
return await apiFetch("http://localhost:5281/api/v1/Island");

}