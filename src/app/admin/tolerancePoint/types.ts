export type ToleranceType = "NACIONAL" | "ISLAND" | "MUNICIPALITY";

export interface TolerancePoint {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ToleranceType;
  islandId: number | null;
  municipalityId: number | null;
  islandName?: string;
  municipalityName?: string;
}
