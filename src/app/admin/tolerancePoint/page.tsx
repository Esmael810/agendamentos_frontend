"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TolerancePoint } from "./types";
import { getTolerancePoint } from "@/app/services/tolerancesPoint/getTolerancePoint";
import { deleteTolerancePoint } from "@/app/services/tolerancesPoint/deleteTolerancePoint";
import TolorencePointTable from "./components/tolerancePointTable";

export default function TolerancePointPage() {
  const router = useRouter();
  const [tolerancePoints, setTolerancePoints] = useState<TolerancePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTolerancePoint();
        setTolerancePoints(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja eliminar esta tolerância de ponto?")) return;
    await deleteTolerancePoint(id);
    setTolerancePoints((prev) => prev.filter((tp) => tp.id !== id));
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-200 text-sm animate-pulse">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-white text-xl">Tolerâncias de Ponto</h1>
        <button
          onClick={() =>
            router.push("/admin/tolerancePoint/createTolerancePoint")
          }
            className="cursor-pointer text-green-400 font-bold transition-all duration-200 hover:scale-110 hover:text-green-500"
        >
          Criar Tolerâncias de Ponto
        </button>
      </div>
      <TolorencePointTable
        tolerancePoint={tolerancePoints}
        onEdit={(id) => router.push(`/admin/tolerancePoint/edit/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
