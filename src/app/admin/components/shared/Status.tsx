interface StatusProps {
  status: "PENDENTE" | "CONFIRMADA" | "CANCELADA" | "CONCLUIDO" | string;
}

const statusconfig: Record<string, { label: string; className: string }> = {
  PENDENTE: {
    label: "Pendente",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
  CONFIRMADO: {
    label: "Confirmada",
    className: "bg-green-100 text-green-700 border border-green-200",
  },
  CANCELADO: {
    label: "Cancelada",
    className: "bg-red-100 text-red-700 border border-red-200",
  },

  CONCLUIDO: {
    label: "Concluido",
    className: "bg-blue-100 text-blue-700 border border-green-200"
  }
};

export default function Status({ status }: StatusProps) {
  const config = statusconfig[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
