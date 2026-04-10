import { apiFetch } from "@/lib/apiFetch";

export interface UpdateCalculateRulePayload {
  id: number;
  categoryId: number;
  dailyBaseValue: number;
  dayBaseTime: number;
  nightlyBaseBonus: number;
  holidayBaseBonus: number;
  baseBonusHolidayNight: number;
  toleranceBaseBonus: number;
}

export async function updateCalculateRule(payload: UpdateCalculateRulePayload) {
  return await apiFetch(
    `http://localhost:5281/api/v1/CalculateRule/${payload.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  
}