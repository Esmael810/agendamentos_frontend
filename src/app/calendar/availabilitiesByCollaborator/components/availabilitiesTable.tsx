import { useRouter } from "next/navigation";
import { CollaboratorAvailability } from "../types";

const statusLabel: Record<string, string> = {
  PENDENTE: "Pendente",
  CONFIRMADO: "Confirmado",
  CANCELADO: "Cancelado",
};

const statusColor: Record<string, string> = {
  PENDENTE: "bg-yellow-100 text-yellow-700",
  CONFIRMADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-600",
};

interface AvailabilityTableProps {
  availabilities: CollaboratorAvailability[];
  onCancel: (id: number) => void;
  onDelete: (id: number) => void;
  showAction: boolean;
}

export default function AvailabilityTable({
  availabilities,
  onCancel,
  onDelete,
  showAction,
}: AvailabilityTableProps) {
  const router = useRouter();

  if (availabilities.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20">
        <p className="text-gray-400 text-sm py-12 text-center">
          Nenhuma disponibilidade encontrada.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Data
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Início
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Fim
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Período
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Status
            </th>
            {showAction && (
              <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {availabilities.map((a, idx) => (
            <tr
              key={a.id}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="py-3.5 px-4  text-gray-600 whitespace-nowrap">
                {new Date(a.date).toLocaleDateString("pt-CV")}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {a.startTime}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {a.endTime}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {a.description}
              </td>
              <td className="py-3.5 px-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[a.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {statusLabel[a.status] ?? a.status}
                </span>
              </td>
              {showAction && (
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/calendar/availabilitiesByCollaborator/edit/${a.id}`,
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Atualizar
                    </button>
                    <button
                      onClick={() => onCancel(a.id)}
                      className="bg-yellow-500 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => onDelete(a.id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
