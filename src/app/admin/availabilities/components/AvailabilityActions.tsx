"use client";

import { cancelAvailability } from "@/app/services/availabilities/cancelAvailabilities";
import { confirmAvailability } from "@/app/services/availabilities/confirmAvailabilities";
import { useState } from "react";

interface AvailabilityActionsProps {
  id: number;
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO";
  onSuccess: (id: number) => void;
}

export default function AvailabilityActions({
  id,
  status,
  onSuccess,
}: AvailabilityActionsProps) {
  const [loading, setLoading] = useState<"confirm" | "cancel" | null>(null);
  const isPending = status === "PENDENTE";

  async function handleConfirm() {
    if (!isPending) return;
    setLoading("confirm");
    try {
      await confirmAvailability(id);
      onSuccess(id);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao confirmar disponibilidade",
      );
    } finally {
      setLoading(null);
    }
  }

  async function handleCancel() {
    if (!isPending) return;
    setLoading("cancel");
    try {
      await cancelAvailability(id);
      onSuccess(id);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao cancelar disponibilidade",
      );
    } finally {
      setLoading(null);
    }
  }
  if (!isPending) return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={handleConfirm}
        disabled={loading !== null}
        className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {loading === "confirm" ? "..." : "Confirmar"}
      </button>

      <button
        onClick={handleCancel}
        disabled={loading !== null}
        className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
      >
        {loading === "cancel" ? "..." : "Cancelar"}
      </button>
    </div>
  );
}
