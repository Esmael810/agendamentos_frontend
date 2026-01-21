import { generateBlockShifts } from "@/utils/generateBlocks";
import { ShiftType, TimeBlock } from "../shiftTypes";

interface Props {
  shift: ShiftType;
  selectBlocks: TimeBlock[];

  onToggle: (blocks: TimeBlock[]) => void;
}

export default function TimeBlockSelector({
  shift,
  selectBlocks,
  onToggle,
}: Props) {
  const blocks = generateBlockShifts(shift);

  function toggle(block: TimeBlock) {
    const exist = selectBlocks.some(
      (b) => b.startTime === block.startTime && b.endTime === block.endTime
    );

    if (exist) {
      onToggle(
        selectBlocks.filter(
          (b) => b.startTime !== block.startTime || b.endTime !== block.endTime
        )
      );
    } else {
      onToggle([...selectBlocks, block]);
    }
  }
  return (
    <div className="grid grid-cols-2 gap-2 mt-2 ">
      {blocks.map((block) => {
        const selected = selectBlocks.some(
          (b) => b.startTime === block.startTime && b.endTime === block.endTime
        );

        return (
          <button
            key={`${block.startTime}-${block.endTime}`}
            onClick={() => toggle(block)}
            className={`text-xs p-2 rounded border cursor-pointer ${
              selected ? "bg-blue-600 text-white" : "hover:bg-blue-500"
            }`}
          >
            {block.startTime} - {block.endTime}
          </button>
        );
      })}
    </div>
  );
}
