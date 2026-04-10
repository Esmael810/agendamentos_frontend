import { apiFetch } from "@/lib/apiFetch";


export async function confirmAvailability(id: number) {
  return await apiFetch(`http://localhost:5281/api/v1/Availability/${id}/confirm`,
 {
    method: "PATCH",
  });
}
