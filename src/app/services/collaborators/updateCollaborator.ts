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
  try {
    const response = await fetch(`http://localhost:5281/api/v1/Collaborator/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Falha ao atualizar colaborador");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
