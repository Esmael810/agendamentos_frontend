export type ShiftType = "Turno_1" | "Turno_2" | "Turno_3";

export interface TimeBlock {
  startTime: string;
  endTime: string;
  shift: ShiftType; //aqui
  // adiciona shifttype
}

export interface SelectType {
  date: string;
  //shift: ShiftType;
  blocks: TimeBlock[];
}
