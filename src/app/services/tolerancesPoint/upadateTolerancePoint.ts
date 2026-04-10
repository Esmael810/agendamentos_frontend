import { ToleranceType } from "@/app/admin/tolerancePoint/types";
import { apiFetch } from "@/lib/apiFetch";

export interface UpdateTolerancePointPayload {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ToleranceType;
  islandId: number | null;
  municipalityId: number | null;
}

export async function updateTolerancePoint(
  payload: UpdateTolerancePointPayload,
) {
  return await apiFetch(`http://localhost:5281/api/v1/TolerancePoint/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
