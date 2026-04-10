import {
  TolerancePoint,
  ToleranceType,
} from "@/app/admin/tolerancePoint/types";
import { apiFetch } from "@/lib/apiFetch";

export async function getTolerancePoint(): Promise<TolerancePoint[]> {
  return await apiFetch("http://localhost:5281/api/v1/TolerancePoint", {
    cache: "no-store",
  });
}
