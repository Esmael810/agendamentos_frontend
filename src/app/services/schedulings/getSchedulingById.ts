import { apiFetch } from "@/lib/apiFetch";

export async function getSchedulingById(id: number) {
  return apiFetch(`http://localhost:5281/api/v1/Sheduling/${id}`, {
    method: "GET",
    cache: "no-store",
  });
}
