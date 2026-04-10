import { apiFetch } from "@/lib/apiFetch";

export async function getSummary(collaboratorId: number) {
  return await apiFetch(
    `http://localhost:5281/api/v1/Collaborator/summary/${collaboratorId}`,
    { cache: "no-store" }
  );
  
}




















