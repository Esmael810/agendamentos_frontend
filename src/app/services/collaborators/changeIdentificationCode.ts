import { apiFetch } from "@/lib/apiFetch";

export async function changeIdentificationCode(
    collaboratorId : number,
    newCode : string
) : Promise<void>{
    await apiFetch(
    `http://localhost:5281/api/v1/collaborator/${collaboratorId}/change-identification-code`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newIdentificationCode: newCode }),
    }
  );
}