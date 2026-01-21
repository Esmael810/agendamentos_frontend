import { SelectType, TimeBlock } from "../shiftTypes";
import TimeBlockSelector from "./TimeBlockSelector";

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
  return (
    <div className=" absolute top-1/2 right-1/3 z-50 w-[360px]">
      <div className="bg-blue-500 rounded-xl p-6 w-[400px]">
        <h2 className="font-bold mb-2 text-black">
          {selection.date} - {selection.shift}
        </h2>

        <TimeBlockSelector
          shift={selection.shift}
          selectBlocks={selection.blocks}
          onToggle={onChangeBlocks}
        />

        <div className="flex justify-end gap-2 mt-4 font-bold">
          <button onClick={onClose} className="cursor-pointer text-red-500">
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
