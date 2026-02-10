"use client";

export interface Scheduling {
  id: number;

  collaboratorId: number;

  start: string;
  end: string;

  calculatedValue: number;

  status: "CONFIRMADO" | "CONCLUIDO" | "CANCELADO";

  description: string;
}

import { useEffect, useState } from "react";
import SchedulingTable from "./components/SchedulingsTable";
import { getSchedulings } from "@/app/services/schedulings/getSchedulings";

export default function AdminSchedulingsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getSchedulings();

        const ativos = all.filter((item: any) => item.status === "CONFIRMADO");

        setData(ativos);
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
        Turnos Confirmados
      </h1>

      <SchedulingTable
        data={data}
        onRemove={(id) =>
          setData((prev) => prev.filter((item) => item.id !== id))
        }
      />
    </div>
  );
}
