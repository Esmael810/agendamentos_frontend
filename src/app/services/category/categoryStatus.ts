import { CategoryStatus } from "@/app/calendar/calendarTypes";
import { apiFetch } from "@/lib/apiFetch";

export interface CategoryStatusResponse {
    categoryId: number;
    status : string;
}
export async function getCategoryStatusByDate(
    date: string
): Promise<CategoryStatusResponse[]> {
     return apiFetch(
    `http://localhost:5281/api/v1/category/status?date=${date}`
  );
}