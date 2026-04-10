import { apiFetch } from "@/lib/apiFetch";

export async function getSchedulings() {
  return await apiFetch("http://localhost:5281/api/v1/Sheduling", {
    method: "GET",
    cache: "no-store",
  });
}
