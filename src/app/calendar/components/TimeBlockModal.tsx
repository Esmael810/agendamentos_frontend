import { SelectType, ShiftType, TimeBlock } from "../shiftTypes";
import TimeBlockSelector from "./TimeBlockSelector";

const SHIFTS: ShiftType[] = ["Turno_1", "Turno_2", "Turno_3"];

const SHIFT_LABELS: Record<ShiftType, string> = {
  Turno_1: "Turno 1 — 08h às 16h",
  Turno_2: "Turno 2 — 16h às 00h",
  Turno_3: "Turno 3 — 00h às 08h",
};

interface TimeBlockModalProps {
  selection: SelectType;
  onChangeBlocks: (blocks: TimeBlock[]) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function TimeBlockModal({
  selection,
  onChangeBlocks,
  onSave,
  onClose,
}: TimeBlockModalProps) {
  const totalHours = selection.blocks.length * 2;

  function blocksForShift(shift: ShiftType): TimeBlock[] {
    return selection.blocks.filter((b) => b.shift === shift);
  }

  function handleShiftToggle(shift: ShiftType, updated: TimeBlock[]) {
    const otherBlocks = selection.blocks.filter((b) => b.shift !== shift);
    onChangeBlocks([...otherBlocks, ...updated]);
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-blue-500 rounded-xl p-6 w-[390px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-black text-sm">{selection.date}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-red-500 font-bold"
          >
            x
          </button>
        </div>

        <div className="space-y-4 ">
          {SHIFTS.map((shift) => (
            <div key={shift}>
              <p className="text-xs font-bold text-black">
                {SHIFT_LABELS[shift]}
              </p>
              <TimeBlockSelector
                shift={shift}
                selectBlocks={blocksForShift(shift)}
                onToggle={(updated) => handleShiftToggle(shift, updated)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-white/80">
            {selection.blocks.length > 0
              ? `${selection.blocks.length} bloco${selection.blocks.length > 1 ? "s" : ""} (${totalHours}h)`
              : "Nenhum bloco seleccionado"}
          </span>
          <div className="flex gap-2 font-bold">
            <button
              onClick={onClose}
              className="cursor-pointer text-red-500 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              disabled={selection.blocks.length === 0}
              className="bg-blue-700 text-white px-3 py-1 rounded cursor-pointer text-sm disabled:opacity-40"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
