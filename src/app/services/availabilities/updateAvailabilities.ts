import { ShiftType } from "@/app/calendar/shiftTypes";
import { apiFetch } from "@/lib/apiFetch";

export interface UpdateAvailabilityPayload {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  isAvailability: boolean;
   shiftType: ShiftType;
}
export async function updateAvailability(payload: UpdateAvailabilityPayload) {
  return await apiFetch(
    `http://localhost:5281/api/v1/Availability/${payload.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
}
