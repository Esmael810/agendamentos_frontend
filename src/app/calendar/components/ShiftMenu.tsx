"use client";
import { format } from "date-fns";
import { ShiftType } from "../shiftTypes";

interface ShiftMenuProps {
  date: Date;
  onSelect: (date: Date, shift: ShiftType) => void;
  onClose: () => void;
}

export default function ShiftMenu({ date, onSelect, onClose }: ShiftMenuProps) {
  return (
    <div className=" absolute top-1/2 left-1/2 z-50  w-60 rounded-lg  bg-blue-500 border p-2  shadow-lg  text-xs font-bold text-center ">
      <p>{format(date, "dd/MM/yyyy")}</p>

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600 cursor-pointer "
      >
        X
      </button>

      <div className="space-y-1 text-black text-center">
        <div
          className="cursor-pointer hover:bg-pink-100 p-1 rounded"
          onClick={() => {
            onSelect(date, "Turno_1");
          }}
        >
          Turno 1 (08h00 - 16h00)
        </div>

        <div
          className="cursor-pointer hover:bg-blue-100 p-1 rounded"
          onClick={() => onSelect(date, "Turno_2")}
        >
          Turno 2 (16h00 - 00h00)
        </div>

        <div
          className="cursor-pointer hover:bg-blue-100 p-1 rounded"
          onClick={() => onSelect(date, "Turno_3")}
        >
          Turno 3 (00h00 - 08h00 )
        </div>
      </div>
    </div>
  );
}
