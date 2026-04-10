import { ShiftType } from "@/app/calendar/shiftTypes";

export interface Shiftime {
  startTime: string;
  endTime: string;
}

export function mapShiftTime(shift: ShiftType): Shiftime {
  switch (shift) {
    case "Turno_1":
      return { startTime: "08:00", endTime: "16:00" };

    case "Turno_2":
      return { startTime: "16:00", endTime: "00:00" };

    case "Turno_3":
      return { startTime: "00:00", endTime: "08:00" };

    default:
      throw new Error("Turno invalido");
  }
}
