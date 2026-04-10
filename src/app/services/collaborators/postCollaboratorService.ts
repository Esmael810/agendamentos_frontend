import { apiFetch } from "@/lib/apiFetch";

export interface CreateCollaboratorPayload {
  name: string;
  email: string;
  nif: string;
  contact: string;
  categoryId: number;
  municipalityId: number;
  islandId: number;
  identificationCode: string;
}

export async function createCollaborator(payload: CreateCollaboratorPayload) {

    return await apiFetch("http://localhost:5281/api/v1/Collaborator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( payload ),
    });
}
