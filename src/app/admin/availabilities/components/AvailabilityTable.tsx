import { Availability } from "../types";
import AvailabilityActions from "./AvailabilityActions";
import Status from "../../components/shared/Status";

interface AvailabilityProps {
  data: Availability[];
  onRemove: (id: number) => void;
}
export default function AvailabilityTable({
  data,
  onRemove,
}: AvailabilityProps) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">
        Nenhuma disponibilidade pendente para essa categoria
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Colaborador
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Data
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Horário
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Período
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Status
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.id}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="py-3.5 px-4 font-semibold text-gray-800">
                {item.collaboratorName}
              </td>
              <td className="py-3.5 px-4 text-gray-600"> {new Date(item.date).toLocaleDateString("pt-CV")}</td>
              <td className="py-3.5 px-4 text-gray-600 font-mono text-xs">
                {item.startTime} - {item.endTime}
              </td>
              <td className="py-3.5 px-4 text-gray-500 text-xs">
                {item.description || "-"}
              </td>
              <td className="py-3.5 px-4">
                <Status status={item.status} />
              </td>
              <td className="py-3.5 px-4">
                <AvailabilityActions
                  id={item.id}
                  status={item.status}
                  onSuccess={onRemove}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
