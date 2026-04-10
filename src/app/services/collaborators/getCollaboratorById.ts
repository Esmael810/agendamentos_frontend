import { apiFetch } from "@/lib/apiFetch";

export async function getCollaboratorById(id: number) {
    return await apiFetch(`http://localhost:5281/api/v1/Collaborator/${id}`, {
        method: "GET",
        cache: "no-store",
    });
}
