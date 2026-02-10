"use client";
import { useEffect, useState } from "react";
import { getSchedulings } from "@/app/services/schedulings/getSchedulings";
import CompletedSchedulingsTable from "./components/CompletedSchedulinsTable";

export interface CompletedScheduling {
  id: number;
  collaboratorName: string;
  start: string;
  end: string;
  calculatedValue: number;
  status: "CONCLUIDO";
  description: string;
}

export default function AdminSchedulingsCompletedPage() {
  const [data, setData] = useState<CompletedScheduling[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getSchedulings();

        const concluidos = all.filter(
          (item: CompletedScheduling) => item.status === "CONCLUIDO",
        );

        setData(concluidos);
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
      Turnos Concluídos
      </h1>

      <CompletedSchedulingsTable data={data} />
    </div>
  );
}
