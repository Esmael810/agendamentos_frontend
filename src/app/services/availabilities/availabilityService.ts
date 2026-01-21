import { buildAvailabilities } from "@/utils/buildAvailabilities";
import { TimeBlock } from "../../calendar/shiftTypes";
import { format } from "date-fns";

export async function saveAvailabilities(
  collaboratorId: number,
  date: Date,
  blocks: TimeBlock[]
) {
  if (!blocks.length) {
    return;
  }

  const payloads = buildAvailabilities(collaboratorId, {
    date: format(date, "yyyy-MM-dd"),
    // shift,
    blocks,
  });
  // konsole para ver payload enviados
  //console.log("Payloads que vou enviar:", JSON.stringify(payloads, null, 2));

  try {
    for (const payload of payloads) {
      const response = await fetch(
        "http://localhost:5281/api/v1/Availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Falha ao guardar`);
      }
    }
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
