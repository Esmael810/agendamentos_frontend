import { SelectType, TimeBlock } from "@/app/calendar/shiftTypes";

export function buildAvailabilities(
  collaboratorId: number,
  selectShift: {
    date: string;
    blocks: TimeBlock[];
  }
) {
  return selectShift.blocks.map((block: TimeBlock) => ({
    CollaboratorId: collaboratorId,
    Date: selectShift.date,
    StartTime: `${block.startTime}:00`,
    EndTime: `${block.endTime}:00`,
  }));
}
