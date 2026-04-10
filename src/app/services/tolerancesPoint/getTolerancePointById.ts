import { TolerancePoint } from "@/app/admin/tolerancePoint/types";
import { apiFetch } from "@/lib/apiFetch";

export async function getTolerancePointById(id: number): Promise<TolerancePoint>{
    return await apiFetch(`http://localhost:5281/api/v1/TolerancePoint/${id}`,{
        cache: "no-store"
    })
}