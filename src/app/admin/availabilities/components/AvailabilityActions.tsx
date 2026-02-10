import { cancelAvailability } from "@/app/services/availabilities/cancelAvailabilities";
import { confirmAvailability } from "@/app/services/availabilities/confirmAvailabilities";

interface AvailabilityActionsProps {
  id: number;
  onSuccess: (id: number) => void;
}

export default function AvailabilityActions({
  id,
  onSuccess,
}: AvailabilityActionsProps) {
  async function handleConfirm() {
    await confirmAvailability(id);
    onSuccess(id);
  }

  async function handleCancel() {
    await cancelAvailability(id);
    onSuccess(id);
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleConfirm}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
      >
        Confirmar
      </button>

      <button
        onClick={handleCancel}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
      >
        Cancelar
      </button>
    </div>
  );
}
