import { apiFetch } from "@/lib/apiFetch";

export async function finalizeScheduling(id: number) {
  return await apiFetch(
    `http://localhost:5281/api/v1/Sheduling/${id}/finalize`,
    {
      method: "POST",
    },
  );

}
