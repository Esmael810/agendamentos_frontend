"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CollaboratorAvailability } from "./types";
import { getAvailabilitiesByCollaborator } from "@/app/services/availabilities/getAvailabilitiesByCollaborator";
import { cancelAvailability } from "@/app/services/availabilities/cancelAvailabilities";
import { deleteAvailability } from "@/app/services/availabilities/deleteAvailabilities";
import AvailabilityTable from "./components/availabilitiesTable";
import { Availability } from "@/app/admin/availabilities/types";
import {
  CollaboratorScheduling,
  getSchedulingsByCollaborator,
} from "@/app/services/schedulings/getSchedulingByCollaborator";
import { cancelScheduling } from "@/app/services/schedulings/cancelShedulings";
import CollaboratorSchedulingTable from "../schedulingsByCollaborator/components/schedulingTable";

type statusTabs = Availability["status"] | "TURNOS";

const tabs: { label: string; value: statusTabs }[] = [
  { label: "Pendentes", value: "PENDENTE" },
  { label: "Confirmado", value: "CONFIRMADO" },
  { label: "Cancelado", value: "CANCELADO" },
  { label: "Turnos", value: "TURNOS" },
];

export default function AvailabilitiesByCollabortorPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [availabilities, setAvailabilities] = useState<
    CollaboratorAvailability[]
  >([]);
  const [schedulings, setSchedulings] = useState<CollaboratorScheduling[]>([]);
  const [loading, setLoading] = useState(true);
  const [activetab, setActiveTab] = useState<statusTabs>("PENDENTE");

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return;
      try {
        const [availData, schedData] = await Promise.all([
          getAvailabilitiesByCollaborator(Number(session.user.id)),
          getSchedulingsByCollaborator(Number(session.user.id)),
        ]);
        setAvailabilities(availData);
        setSchedulings(schedData);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session]);

  async function handleCancel(id: number) {
    if (!confirm("Deseja cancelar esta disponibilidade?")) return;
    try {
      await cancelAvailability(id);
      setAvailabilities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CANCELADO" } : a)),
      );
    } catch (err: any) {
      alert(err.message || "Erro ao cancelar disponibilidade");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja eliminar esta disponibilidade?")) return;
    try {
      await deleteAvailability(id);
      setAvailabilities((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message || "Erro ao eliminar disponibilidade");
    }
  }

  async function handleCancelScheduling(id: number) {
    if (!confirm("Deseja cancelar este turno?")) return;

    try {
      await cancelScheduling(id);
      setSchedulings((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "CANCELADO" } : s)),
      );
    } catch (err: any) {
      alert(err.message || "Erro ao cancelar Turno");
    }
  }

  const filter = availabilities.filter((a) => a.status === activetab);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-200 text-sm animate-pulse">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 mx-20 space-y-6 mt-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Minhas Disponibilidades
          </h1>
          <button
            onClick={() => router.push("/calendar")}
            className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors cursor-pointer"
          >
            ← Voltar
          </button>
        </div>
        <div className="px-6 pt-4">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer text-center ${
                  activetab === tab.value
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 scale-105"
                    : "bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105"
                }`}
              >
                {tab.label}
                {tab.value !== "TURNOS" && (
                  <span className="ml-2 text-xs opacity-75">
                    (
                    {
                      availabilities.filter((a) => a.status === tab.value)
                        .length
                    }
                    )
                  </span>
                )}
                {tab.value === "TURNOS" && (
                  <span className="ml-2 text-xs opacity-75">
                    ({schedulings.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4">
          {activetab === "TURNOS" ? (
            <CollaboratorSchedulingTable
              schedulings={schedulings}
              onCancel={handleCancelScheduling}
            />
          ) : (
            <AvailabilityTable
              availabilities={filter}
              onCancel={handleCancel}
              onDelete={handleDelete}
              showAction={activetab === "PENDENTE"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
