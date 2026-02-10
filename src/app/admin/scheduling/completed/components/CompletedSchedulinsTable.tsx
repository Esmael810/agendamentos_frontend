import { CompletedScheduling } from "../page";

interface CompletedSchedulingProps {
  data: CompletedScheduling[];
}

export default function CompletedSchedulingsTable({ data }: CompletedSchedulingProps) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Colaborador</th>
            <th className="p-2 text-left">Início</th>
            <th className="p-2 text-left">Fim</th>
            <th className="p-2 text-left">Descrição</th>
            <th className="p-2 text-left">Valor Calculado</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.collaboratorName}</td>

              <td className="p-2">{item.start}</td>
              <td className="p-2">{item.end}</td>

              <td className="p-2">{item.description}</td>

              <td className="p-2 font-semibold">{item.calculatedValue} CVE</td>

              <td className="p-2 text-green-700 font-bold">CONCLUÍDO</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
