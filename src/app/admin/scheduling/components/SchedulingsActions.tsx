import { cancelScheduling } from "@/app/services/schedulings/cancelShedulings";
import { finalizeScheduling } from "@/app/services/schedulings/finalizeSchedulings";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: number;
  onSuccess: (id: number) => void;
}

export default function SchedulingActions({ id, onSuccess }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<"concluir" | "cancelar" | null>(null);
  async function handleConclude() {
    setLoading("concluir");
    try {
      await finalizeScheduling(id);
      onSuccess(id);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao concluir");
    } finally {
      setLoading(null);
    }
  }

  async function handleCancel() {
    setLoading("cancelar");
    try {
      await cancelScheduling(id);
      onSuccess(id);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao cancelar");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleConclude}
        disabled={loading !== null}
        className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {loading === "concluir" ? " ..." : "Concluir"}
      </button>

      <button
        onClick={handleCancel}
        disabled={loading !== null}
        className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {loading === "cancelar" ? "..." : "Cancelar"}
      </button>

      <button onClick={() => router.push(`/admin/scheduling/edit/${id}`)} disabled={loading !== null}
      className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 cursor-pointer transition-colors"
        >
        Atualizar
      </button>
    </div>
  );
}
