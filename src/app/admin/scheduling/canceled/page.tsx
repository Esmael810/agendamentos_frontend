"use client";

import { useEffect, useState } from "react";
import { getSchedulings } from "@/app/services/schedulings/getSchedulings";
import CanceledSchedulingsTable from "./components/CanceledShedulingsTable";

export interface CanceledScheduling {
  id: number;
  collaboratorName: string;
  start: string;
  end: string;
  calculatedValue: number | null;
  status: "CANCELADO";
  description: string;
}

export default function AdminSchedulingsCanceledPage() {
  const [data, setData] = useState<CanceledScheduling[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getSchedulings();

        const cancelados = all.filter(
          (item: CanceledScheduling) => item.status === "CANCELADO",
        );

        setData(cancelados);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-white">
      Turnos Cancelados
      </h1>

      <CanceledSchedulingsTable data={data} />
    </div>
  );
}
