import { apiFetch } from "@/lib/apiFetch";

export async function updateCategory(id: number, name: string) {
  return await apiFetch(`http://localhost:5281/api/v1/Category/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}
