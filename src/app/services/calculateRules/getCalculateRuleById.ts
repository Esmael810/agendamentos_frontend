import { apiFetch } from "@/lib/apiFetch";

export async function getCalculateRuleById(id: number) {
   return await apiFetch(
    `http://localhost:5281/api/v1/CalculateRule/${id}`,
    {
      cache: "no-store",
    },
  );
 
}
