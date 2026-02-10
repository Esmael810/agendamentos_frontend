"use client";
import { getAvailabilities } from "@/app/services/availabilities/getAvailabilities";
import { useEffect, useState } from "react";
import AvailabilityTable from "./components/AvailabilityTable";

export interface Availability {
  id: number;
  collaboratorName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDENTE" | "CONFIRMADA" | "CANCELADA";
  description: string;
  
}

export default function AdminAvailabilitiesPage() {
  const [data, setData] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getAvailabilities();

        const pendentes = all.filter(
          (item: Availability) => item.status === "PENDENTE",
        );
        setData(pendentes);
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
        Disponibilidades Pendentes
      </h1>

      <AvailabilityTable
        data={data}
        onRemove={(id) =>
          setData((prev) => prev.filter((item) => item.id !== id))
        }
      />
    </div>
  );
}
