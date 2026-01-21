import { ShiftType } from "@/app/calendar/shiftTypes";

export interface Shiftime {
  startTime: string;
  endTime: string;
}

export function mapShiftTime(shift: ShiftType): Shiftime {
  switch (shift) {
    case "Manhã":
      return { startTime: "06:00", endTime: "12:00" };

    case "Tarde":
      return { startTime: "12:00", endTime: "22:00" };

    case "Noite":
      return { startTime: "22:00", endTime: "06:00" };

    default:
      throw new Error("Turno invalido");
  }
}
