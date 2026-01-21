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
    <div className=" absolute top-1/2 left-1/2 z-50  w-60 rounded-lg  bg-blue-500 border p-2  shadow-lg  text-xs font-bold ">
      <p>{format(date, "yyyy/MM/dd")}</p>

      <button onClick={onClose} className="absolute top-1 right-1 text-red-500 hover:text-red-600 cursor-pointer ">
        x
      </button>

      <div className="space-y-1 text-black">
        <div
          className="cursor-pointer hover:bg-pink-100 p-1 rounded"
          onClick={() => {
           
            onSelect(date, "Manhã");
          }}
        >
          Periodo da Manhã (06h : 14h)
        </div>

        <div
          className="cursor-pointer hover:bg-blue-100 p-1 rounded"
          onClick={() => onSelect(date, "Tarde")}
        >
          Periodo da Tarde (14h : 22h)
        </div>

        <div
          className="cursor-pointer hover:bg-blue-100 p-1 rounded"
          onClick={() => onSelect(date, "Noite")}
        >
          Periodo da Noite (22h : 06h)
        </div>
      </div>
    </div>
  );
}
