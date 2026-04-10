import { ShiftType, TimeBlock } from "@/app/calendar/shiftTypes";

export function generateBlockShifts(shift: ShiftType ) : TimeBlock[]{
  switch (shift) {
    case "Turno_1":
      return [
        { startTime: "08:00", endTime: "10:00", shift },
        { startTime: "10:00", endTime: "12:00", shift },
        { startTime: "12:00", endTime: "14:00", shift },
        { startTime: "14:00", endTime: "16:00", shift },
      ];

    case "Turno_2":
      return [
        { startTime: "16:00", endTime: "18:00", shift },
        { startTime: "18:00", endTime: "20:00", shift },
        { startTime: "20:00", endTime: "22:00", shift },
        { startTime: "22:00", endTime: "00:00", shift },
      ];

    case "Turno_3":
      return [
        { startTime: "00:00", endTime: "02:00", shift },
        { startTime: "02:00", endTime: "04:00", shift },
        { startTime: "04:00", endTime: "06:00", shift },
        { startTime: "06:00", endTime: "08:00", shift },
      ];
  }
}
// adcionado  :TimeBlock e ,Shift
