import { apiFetch } from "@/lib/apiFetch";

export interface CollaboratorDTO {
  id: number;
  name: string;
  email: string;
  contact: string;
  nif: string;
  municipality: string;
  island: string;
  category: string;
  categoryId: number;
}

export async function getAllCollaborator(): Promise<CollaboratorDTO[]> {
  return await apiFetch("http://localhost:5281/api/v1/Collaborator", {
    method: "GET",
    cache: "no-store",
  });
}
