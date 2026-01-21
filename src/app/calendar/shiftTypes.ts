export type ShiftType = "Manhã" | "Tarde" | "Noite";

export interface TimeBlock {
  startTime: string;
  endTime: string;
}

export interface SelectType {
  date: string;
  shift: ShiftType;
  blocks: TimeBlock[];
}
