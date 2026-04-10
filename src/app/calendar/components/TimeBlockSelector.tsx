import { generateBlockShifts } from "@/utils/generateBlocks";
import { ShiftType, TimeBlock } from "../shiftTypes";

interface Props {
  shift: ShiftType;
  selectBlocks: TimeBlock[];
  onToggle: (blocks: TimeBlock[]) => void;
}

const FULL_SHIFT_STARTS: Record<ShiftType, string[]> = {
  Turno_1: ["08:00", "10:00", "12:00", "14:00"],
  Turno_2: ["16:00", "18:00", "20:00", "22:00"],
  Turno_3: ["00:00", "02:00", "04:00", "06:00"],
};

function isComplete(shift: ShiftType, blocks: TimeBlock[]): boolean {
  const expected = FULL_SHIFT_STARTS[shift];
  if (blocks.length !== expected.length) return false;
  const selected = blocks.map((b) => b.startTime).sort();
  return selected.every((s, i) => s === [...expected].sort()[i]);
}

export default function TimeBlockSelector({
  shift,
  selectBlocks,
  onToggle,
}: Props) {
  const blocks = generateBlockShifts(shift);
  const isFull = isComplete(shift, selectBlocks);

  function toggle(block: TimeBlock) {
    const exist = selectBlocks.some(
      (b) => b.startTime === block.startTime && b.endTime === block.endTime,
    );

    if (exist) {
      onToggle(
        selectBlocks.filter(
          (b) => b.startTime !== block.startTime || b.endTime !== block.endTime,
        ),
      );
    } else {
      onToggle([...selectBlocks, block]);
    }
  }

  function toggleFullShift() {
    if (isFull) {
      onToggle([]);
    } else {
      onToggle(blocks);
    }
  }

  const indicator = isFull
    ? " 1 registo de 8h"
    : selectBlocks.length > 0
      ? ` ${selectBlocks.length} registo${selectBlocks.length > 1 ? "s" : ""} de 2h`
      : null;

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <button
          onClick={toggleFullShift}
          className={`text-xs px-3 py-1 rounded border cursor-pointer transition-all duration-150
            ${
              isFull
                ? "bg-blue-700 text-white border-blue-800 font-bold"
                : "border-white/40 text-white/80 hover:bg-blue-600"
            }`}
        >
          {isFull ? "✓ 8h completo" : "+ 8h completo"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {blocks.map((block) => {
          const selected = selectBlocks.some(
            (b) =>
              b.startTime === block.startTime && b.endTime === block.endTime,
          );
          return (
            <button
              key={`${block.startTime}-${block.endTime}`}
              onClick={() => toggle(block)}
              className={`text-xs p-2 rounded border cursor-pointer transition-all duration-150
                ${
                  selected
                    ? "bg-blue-700 text-white border-blue-800 font-bold"
                    : "hover:bg-blue-600 hover:text-white border-white/30"
                }`}
            >
              {block.startTime} - {block.endTime}
            </button>
          );
        })}
      </div>

      {indicator && (
        <p className="text-xs text-white/70 text-right">{indicator}</p>
      )}
    </div>
  );
}
