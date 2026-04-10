import { apiFetch } from "@/lib/apiFetch";

export async function createCategory(name: string) {
  return await apiFetch("http://localhost:5281/api/v1/Category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
}
