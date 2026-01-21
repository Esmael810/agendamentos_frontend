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
  try {
    const response = await fetch("http://localhost:5281/api/v1/Collaborator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( payload ),
    });

    if (!response.ok) {
      throw new Error("Falaha ao criar collaborador");
    }
    const date = await response.json();
    return date;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
