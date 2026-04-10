import { CalculateRule } from "../types";

interface CalculateRulesTableProps {
  rules: CalculateRule[];
  onEdit: (id: number) => void;
}

export default function CalculateRulesTable({
  rules,
  onEdit,
}: CalculateRulesTableProps) {
  if (rules.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20">
        <p>Nenhuma regra de remuneração</p>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Categoria
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Valor Base Diário
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Bonus Diurno (%)
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Bónus Noturno (%)
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Bónus Feriado (%)
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Bonus Feriado Noite (%)
            </th>

            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide">
              Bonus Tolerancia de Ponto (%)
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-black uppercase tracking-wide whitespace-nowrap">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, idx) => (
            <tr
              key={rule.id}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="py-3.5 px-4 font-semibold text-gray-800 whitespace-nowrap">
                {rule.categoryName}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {rule.dailyBaseValue} CVE
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {rule.dayBaseTime}%
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {rule.nightlyBaseBonus}%
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {rule.holidayBaseBonus}%
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {rule.baseBonusHolidayNight}%
              </td>

              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {rule.toleranceBaseBonus}%
              </td>
              <td className="py-3.5 px-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(rule.id)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                 Atualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
