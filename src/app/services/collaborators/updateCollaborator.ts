import { apiFetch } from "@/lib/apiFetch";

export interface UpdateCollaboratorDTO {
  id: number;
  name: string;
  email: string;
  contact: string;
  nif: string;
  categoryId: number;
  municipalityId: number;
  islandId: number;
}

export async function updateCollaborator(payload: UpdateCollaboratorDTO) {
   await apiFetch(
    `http://localhost:5281/api/v1/Collaborator/${payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return true;
}
