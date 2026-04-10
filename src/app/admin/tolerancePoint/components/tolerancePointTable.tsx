import { TolerancePoint } from "../types";

interface TolerancePointProps {
  tolerancePoint: TolerancePoint[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TolorencePointTable({
  tolerancePoint,
  onEdit,
  onDelete,
}: TolerancePointProps) {
  if (tolerancePoint.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20">
        <p className="text-gray-400 text-sm py-12 text-center">
          Nenhuma Tolerancia de ponto registrada ainda.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              {" "}
              Nome
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              {" "}
              Data
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              {" "}
              Inicio
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              {" "}
              Fim
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              {" "}
              Tipo
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">
              {" "}
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {tolerancePoint.map((tp, idx) => (
            <tr
              key={tp.id}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="py-3.5 px-4 font-semibold text-gray-800 whitespace-nowrap">
                {tp.name}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {new Date(tp.date).toLocaleDateString("pt-CV")}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {tp.startTime}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {tp.endTime}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {tp.type === "NACIONAL" && "Nacional"}
                {tp.type === "ISLAND" && tp.islandName}
                {tp.type === "MUNICIPALITY" &&
                  `${tp.municipalityName} (${tp.islandName})`}
              </td>
              <td className="py-3.5 px-4 whitespace-nowrap flex gap-2">
                <button
                  onClick={() => onEdit(tp.id)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(tp.id)}
                  className="bg-red-500 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
