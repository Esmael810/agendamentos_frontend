import { apiFetch } from "@/lib/apiFetch";

export interface CreateCalculateRulePayload {
  categoryId: number;
  dailyBaseValue: number;
  dayBaseTime: number;
  nightlyBaseBonus: number;
  holidayBaseBonus: number;
  baseBonusHolidayNight: number;
  toleranceBaseBonus: number;
}

export async function creataCalculaterule(payload: CreateCalculateRulePayload) {
  return await apiFetch("http://localhost:5281/api/v1/CalculateRule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
 
}
