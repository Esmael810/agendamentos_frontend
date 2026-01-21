export async function deleteCollaborator(id: number) {
  try {
    const response = await fetch(`http://localhost:5281/api/v1/Collaborator/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Falha ao Deletar o Colaborador");
    }
    return true;
  } catch (err) {
    console.error("Erro ao deletar colaborador:", err);
    throw err;
  }
}
