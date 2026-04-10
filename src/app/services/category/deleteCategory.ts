import { apiFetch } from "@/lib/apiFetch";

export async function deleteCategory(id: number) {
  return await apiFetch(`http://localhost:5281/api/v1/Category/${id}`, {
    method: "DELETE",
  });
}
