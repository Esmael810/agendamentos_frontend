
interface CollaboratorSummaryData {
  reservedShiftsCount: number;
  completedShiftsCount: number;
  resevedShiftsTotalValue: number;
  completedShiftsTotalvalue: number;
  turno8hCount: number;
  turno6hCount: number;
  turno4hCount: number;
  turno2hCount: number;
  sub15DayTotal: number;
  sub20NightTotal: number;
  sub200HolidayDayTimeTotal: number;
  sub220HolidayNightTotal: number;
}

interface CollaboratorSummaryProps {
  summary: CollaboratorSummaryData;
}

export default function CollaboratorSummary({
  summary,
}: CollaboratorSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-3">
        <h2 className="text-center text-lg font-bold text-gray-800 mb-4">
          Resumo de Turnos
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Turnos Reservados
            </p>
            <p className="text-3xl font-extrabold text-blue-600">
              {summary.reservedShiftsCount}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {summary.resevedShiftsTotalValue} CVE
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Turnos Concluídos
            </p>
            <p className="text-3xl font-extrabold text-green-600">
              {summary.completedShiftsCount}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {summary.completedShiftsTotalvalue} CVE
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-3">
        <h2 className="text-center text-lg font-bold text-gray-800 mb-4">
          Turnos por Duração
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Turnos 8 Horas", count: summary.turno8hCount },
            { label: "Turnos 6 Horas", count: summary.turno6hCount },
            { label: "Turnos 4 Horas", count: summary.turno4hCount },
            { label: "Turnos 2 Horas", count: summary.turno2hCount },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 rounded-lg p-3 text-center"
            >
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-2xl font-extrabold text-gray-700">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-3">
        <h2 className="text-center text-sm font-bold text-gray-800 mb-4">
          Detalhes de Valores
        </h2>
        <div className="space-y-2">
          {[
            { label: "Valor Diurno", value: summary.sub15DayTotal },
            { label: "Valor Noturno (20%)", value: summary.sub20NightTotal },
            {
              label: "Valor Feriado Diurno (200%)",
              value: summary.sub200HolidayDayTimeTotal,
            },
            {
              label: "Valor Feriado Noturno (220%)",
              value: summary.sub220HolidayNightTotal,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center gap-3 py-2 border-b border-gray-100 last:border-0"
            >
              <span className="text-[13px] text-gray-600 shrink-0">{item.label}</span>
              <span className="text-[10px] font-semibold text-gray-800 whitespace-nowrap">
                {item.value} CVE
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
