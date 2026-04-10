import { apiFetch } from "@/lib/apiFetch";

export interface CollaboratorScheduling {
  id: number;
  collaboratorId: number;
  start: string;
  end: string;
  calculatedValue: number;
  status: string;
}

export async function getSchedulingsByCollaborator(
  collaboratorId: number,
): Promise<CollaboratorScheduling[]> {
  try {
    return await apiFetch(
      `http://localhost:5281/api/v1/Sheduling/collaborator/${collaboratorId}`,
      { cache: "no-store" },
    );
  } catch {
    return [];
  }
}
