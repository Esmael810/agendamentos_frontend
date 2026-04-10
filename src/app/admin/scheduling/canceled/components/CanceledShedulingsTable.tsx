import Status from "@/app/admin/components/shared/Status";
import { Scheduling } from "../../type";


interface CanceledSchedulingProps {
  data: Scheduling[];
}

export default function CanceledSchedulingsTable({ data }: CanceledSchedulingProps) {

  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">
        Nenhum turno cancelado nesta categoria.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">Colaborador</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">Início</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">Fim</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">Descrição</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">Valor</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">Status</th>
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
              <td className="py-3.5 px-4 font-semibold text-gray-800">{item.collaboratorName}</td>
              <td className="py-3.5 px-4 text-gray-600 font-mono text-xs">{new Date(item.start).toLocaleString("pt-CV")}</td>
              <td className="py-3.5 px-4 text-gray-600 font-mono text-xs">{new Date(item.end).toLocaleString("pt-CV")}</td>
              <td className="py-3.5 px-4 text-gray-500 text-xs">{item.description}</td>
              <td className="py-3.5 px-4 text-gray-500">
                {item.calculatedValue}
              </td>
              <td className="py-3.5 px-4">
                <Status status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
