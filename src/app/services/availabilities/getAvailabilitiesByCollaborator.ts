import { CollaboratorAvailability } from "@/app/calendar/availabilitiesByCollaborator/types";
import { apiFetch } from "@/lib/apiFetch";

export async function getAvailabilitiesByCollaborator(
  collaboratorId: number,
): Promise<CollaboratorAvailability[]> {
  try {
    return await apiFetch(
      `http://localhost:5281/api/v1/Availability/collaborator/${collaboratorId}`,
      { cache: "no-store" },
    );
  } catch {
    return [];
  }
}
