import { apiFetch } from "@/lib/apiFetch";

export async function deleteTolerancePoint(id: number) {
  return apiFetch(`http://localhost:5281/api/v1/TolerancePoint/${id}`, {
    method: "DELETE",
  });
}
