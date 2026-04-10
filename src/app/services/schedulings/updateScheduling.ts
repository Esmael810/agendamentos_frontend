import { apiFetch } from "@/lib/apiFetch";

export interface UpdateSchedulingPayload {
  collaboratorId: number;
  start: string;
  end: string;
}

export async function UpdateScheduling(
  id: number,
  payload: UpdateSchedulingPayload,
) {
  return await apiFetch(`http://localhost:5281/api/v1/Sheduling/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
