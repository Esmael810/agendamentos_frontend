
import { cancelScheduling } from "@/app/services/schedulings/cancelShedulings";
import { finalizeScheduling } from "@/app/services/schedulings/finalizeSchedulings";

interface Props {
  id: number;
  onSuccess: (id: number) => void;
}

export default function SchedulingActions({ id, onSuccess }: Props) {
  async function handleConclude() {
    await finalizeScheduling(id);
    onSuccess(id);
  }

  async function handleCancel() {
    await cancelScheduling(id);
    onSuccess(id);
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleConclude}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
      >
        Concluir
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
