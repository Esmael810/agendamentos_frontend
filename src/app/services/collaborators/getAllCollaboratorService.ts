export interface CollaboratorDTO {
  id: number;
  name: string;
  email: string;
  contact: string;
  nif: string;
  municipality: string;
  island: string;
  category: string;
}

export async function getAllCollaborator(): Promise<CollaboratorDTO[]> {
  const response = await fetch("http://localhost:5281/api/v1/Collaborator", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar Colaboradores");
  }
  const data = await response.json();
  return data;
}
