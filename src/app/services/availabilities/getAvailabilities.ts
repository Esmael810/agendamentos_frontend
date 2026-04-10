import { apiFetch } from "@/lib/apiFetch";

export async function getAvailabilities() {
  return await apiFetch("http://localhost:5281/api/v1/Availability",
 {
    cache: "no-store",
  });
}
