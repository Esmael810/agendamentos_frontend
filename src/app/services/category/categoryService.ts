import { apiFetch } from "@/lib/apiFetch";

export interface Category {
  id: number;
  name: string;
}

export async function getCategories(): Promise<Category[]> {
 return apiFetch("http://localhost:5281/api/v1/Category");
}
