import { apiFetch } from "@/lib/apiFetch";

export async function cancelScheduling(id: number) {
  return await apiFetch(
    `http://localhost:5281/api/v1/Sheduling/${id}/cancel`,
    {
      method: "PATCH",
    }
  );
}
