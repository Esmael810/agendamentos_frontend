import { Availability } from "../page";
import AvailabilityActions from "./AvailabilityActions";

interface AvailabilityProps {
  data: Availability[];
  onRemove: (id: number) => void;
}
export default function AvailabilityTable({
  data,
  onRemove,
}: AvailabilityProps) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Colaborador</th>
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">Horário</th>
            <th className="p-2 text-left">Período</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.collaboratorName}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">
                {item.startTime} - {item.endTime}
              </td>
              <td className="p-2">
                {item.description} 
              </td>
              <td className="p-2">
                <AvailabilityActions id={item.id} onSuccess={onRemove} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
