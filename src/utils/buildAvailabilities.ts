import { SelectType, ShiftType, TimeBlock } from "@/app/calendar/shiftTypes";

interface BuildInput {
  date: string;
  blocks: TimeBlock[];
}

interface AvailabilityPayload {
  collaboratorId: number;
  date: string;
  startTime: string;
  endTime: string;
  shiftType: ShiftType;
}

export function buildAvailabilities(
  collaboratorId: number,
  input: BuildInput,
): AvailabilityPayload[] {
  return input.blocks.map((block) => ({
    collaboratorId,
    date: input.date,
    startTime: toTimeSpan(block.startTime),
    endTime: toTimeSpan(block.endTime),
    shiftType: block.shift,
  }));
}

function toTimeSpan(time: string): string {
  return `${time}:00`;
}
