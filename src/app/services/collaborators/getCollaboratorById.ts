export async function getCollaboratorById(id: number) {
    const response = await fetch(`http://localhost:5281/api/v1/Collaborator/${id}`, {
        method: "GET",
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar colaborador");
    }
    return response.json();
}
