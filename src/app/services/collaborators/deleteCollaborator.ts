import { apiFetch } from "@/lib/apiFetch";

export async function deleteCollaborator(id: number) {
  await apiFetch(`http://localhost:5281/api/v1/Collaborator/${id}`, {
    method: "DELETE",
  });
  return true;
}