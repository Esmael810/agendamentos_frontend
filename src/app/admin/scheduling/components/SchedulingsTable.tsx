import SchedulingActions from "./SchedulingsActions";

interface SchedulingProps {
  data: any[];
  onRemove: (id: number) => void;
}

export default function SchedulingTable({ data, onRemove }: SchedulingProps) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Colaborador</th>
            <th className="p-2 text-left">Data/Hora-Início</th>
            <th className="p-2 text-left">Data/Hora-Fim</th>
            <th className="p-2 text-left">Valor</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.collaboratorName}</td>

              <td className="p-2 font-mono">{item.start}</td>
              <td className="p-2 font-mono">{item.end}</td>

              <td className="p-2">{item.calculatedValue ?? "-"}</td>

              <td className="p-2">{item.status}</td>

              <td className="p-2">
                <SchedulingActions id={item.id} onSuccess={onRemove} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
