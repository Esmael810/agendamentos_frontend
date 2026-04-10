import { ToleranceType } from "@/app/admin/tolerancePoint/types";
import { apiFetch } from "@/lib/apiFetch";

export interface CreateTolerancePointPayload {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ToleranceType;
  islandId: number | null;
  municipalityId: number | null;
}

export async function createTolerancePoint(
  payload: CreateTolerancePointPayload,
) {
  return await apiFetch("http://localhost:5281/api/v1/TolerancePoint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
