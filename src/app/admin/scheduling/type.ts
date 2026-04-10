export interface Scheduling {
  id: number;
  collaboratorId: number;
  collaboratorName: string;
  categoryId: number;
  categoryName: string;
  start: string;
  end: string;
  calculatedValue: number | null;
  status: "CONFIRMADO" | "CONCLUIDO" | "CANCELADO";
  description: string;
}

export interface SchedulingCategoryGroup {
  categoryId: number;
  categoryName: string;
  scheduling: Scheduling[];
}
export function groupSchedulingByCategory(
  data: Scheduling[],
): SchedulingCategoryGroup[] {
  const map = new Map<number, SchedulingCategoryGroup>();

  for (const item of data) {
    if (!map.has(item.categoryId)) {
      map.set(item.categoryId, {
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        scheduling: [],
      });
    }
    map.get(item.categoryId)!.scheduling.push(item);
  }

  for (const group of map.values()) {
    group.scheduling.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
  }

  return Array.from(map.values());
}
