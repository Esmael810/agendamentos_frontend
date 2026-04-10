import { apiFetch } from "@/lib/apiFetch";

export async function getCalculateRules() {
 return await apiFetch("http://localhost:5281/api/v1/CalculateRule", {
    cache: "no-store",
  });
   
}