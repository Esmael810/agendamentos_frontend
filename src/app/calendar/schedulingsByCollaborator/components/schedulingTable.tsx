import { CollaboratorScheduling } from "@/app/services/schedulings/getSchedulingByCollaborator";

const statusLabel: Record<string, string> = {
  CONFIRMADO: "Confirmado",
  CANCELADO: "Cancelado",
  CONCLUIDO: "Concluido",
};

const statusColor: Record<string, string> = {
  CONFIRMADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-600",
  CONCLUIDO: "bg-blue-100 text-blue-700",
};

interface CollaboratorSchedulingProps {
  schedulings: CollaboratorScheduling[];
  onCancel: (id: number) => void;
}

export default function CollaboratorSchedulingTable({
  schedulings,
  onCancel,
}: CollaboratorSchedulingProps) {
  if (schedulings.length === 0) {
    return (
      <p className="text-gray-400 text-sm py-8 text-center">
        Nenhum Turno encontrado
      </p>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Início
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Fim
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Valor
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Status
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {schedulings.map((s, idx) => (
            <tr
              key={s.id}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {new Date(s.start).toLocaleString("pt-CV")}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {new Date(s.end).toLocaleString("pt-CV")}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {s.calculatedValue} CVE
              </td>
              <td className="py-3.5 px-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[s.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {statusLabel[s.status] ?? s.status}
                </span>
              </td>
              <td className="py-3.5 px-4 whitespace-nowrap">
                {s.status === "CONFIRMADO" && (
                  <button
                    onClick={() => onCancel(s.id)}
                    className="bg-yellow-500 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-yellow-600 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
