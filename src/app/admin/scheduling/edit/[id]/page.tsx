"use client";
import React, { useEffect, useState } from "react";
import { Scheduling } from "../../type";
import { useParams, useRouter } from "next/navigation";
import { ShiftType, TimeBlock } from "@/app/calendar/shiftTypes";
import { generateBlockShifts } from "@/utils/generateBlocks";
import { getSchedulingById } from "@/app/services/schedulings/getSchedulingById";
import {
  CollaboratorDTO,
  getAllCollaborator,
} from "@/app/services/collaborators/getAllCollaboratorService";
import { UpdateScheduling } from "@/app/services/schedulings/updateScheduling";

const SHIFTS: ShiftType[] = ["Turno_1", "Turno_2", "Turno_3"];
const SHIFT_LABELS: Record<ShiftType, string> = {
  Turno_1: "Turno 1 — 08h às 16h",
  Turno_2: "Turno 2 — 16h às 00h",
  Turno_3: "Turno 3 — 00h às 08h",
};

const FULL_SHIFT_STARTS: Record<ShiftType, string[]> = {
  Turno_1: ["08:00", "10:00", "12:00", "14:00"],
  Turno_2: ["16:00", "18:00", "20:00", "22:00"],
  Turno_3: ["00:00", "02:00", "04:00", "06:00"],
};

function isCompleteShift(shift: ShiftType, blocks: TimeBlock[]): boolean {
  const expected = FULL_SHIFT_STARTS[shift];
  if (blocks.length !== expected.length) return false;
  const selected = blocks.map((b) => b.startTime).sort();
  return selected.every((s, i) => s === [...expected].sort()[i]);
}

function inferShift(startDateTime: string): ShiftType {
  const hour = new Date(startDateTime).getHours();
  if (hour >= 8 && hour < 16) return "Turno_1";
  if (hour >= 16) return "Turno_2";
  return "Turno_3";
}

function buildDateTime(
  date: string,
  time: string,
  isEnd: boolean,
  shift: ShiftType,
): string {
  if (isEnd && shift === "Turno_2" && time === "00:00") {
    return `${getNextDay(date)}T00:00:00`;
  }
  return `${date}T${time}:00`;
}

function getNextDay(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function EditSchedulingByCollaboratorPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [schedulings, setScheduling] = useState<Scheduling | null>(null);
  const [collaborator, setCollaborator] = useState<CollaboratorDTO[]>([]);
  const [collaboratorId, setCollaboratorId] = useState<number>(0);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState<ShiftType | "">("");
  const [selectedBlocks, setSelectedBlocks] = useState<TimeBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const blocks = shift ? generateBlockShifts(shift as ShiftType) : [];
  const isFull = shift
    ? isCompleteShift(shift as ShiftType, selectedBlocks)
    : false;
  const totalHours = selectedBlocks.length * 2;

  useEffect(() => {
    async function load() {
      try {
        const [scheduling, collbaorators] = await Promise.all([
          getSchedulingById(id),
          getAllCollaborator(),
        ]);
        setScheduling(scheduling);
        setCollaborator(collbaorators);
        setCollaboratorId(scheduling.collaboratorId);
        setDate(new Date(scheduling.start).toISOString().split("T")[0]);

        const inferredShift = inferShift(scheduling.start);
        const startHH = new Date(scheduling.start)
          .toTimeString()
          .substring(0, 5);
        const endHH = new Date(scheduling.end).toTimeString().substring(0, 5);

        setShift(inferredShift);
        setSelectedBlocks([
          {
            startTime: startHH,
            endTime: endHH,
            shift: inferredShift,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const filteredCollaborators = schedulings
    ? collaborator.filter((c) => c.categoryId === schedulings.categoryId)
    : [];

  function handleShiftChange(newShift: ShiftType) {
    setShift(newShift);
    setSelectedBlocks([]);
  }

  function toggleBlock(block: TimeBlock) {
    const exists = selectedBlocks.some((b) => b.startTime === block.startTime);
    if (exists) {
      setSelectedBlocks(
        selectedBlocks.filter((b) => b.startTime !== block.startTime),
      );
    } else {
      setSelectedBlocks([...selectedBlocks, block]);
    }
  }

  function toggleFullShift() {
    if (!shift) return;
    isFull
      ? setSelectedBlocks([])
      : setSelectedBlocks(generateBlockShifts(shift as ShiftType));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!collaboratorId) {
      alert("Seleciona um Collaborador");
      return;
    }
    if (!date) {
      alert("Seleciona uma data");
      return;
    }

    if (!shift) {
      alert("Seleciona um Turno");
      return;
    }
    if (selectedBlocks.length === 0) {
      alert("Seleciona pelo menos um bloco");
      return;
    }

    const sorted = [...selectedBlocks].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    );
    const start = buildDateTime(
      date,
      sorted[0].startTime,
      false,
      shift as ShiftType,
    );
    const end = buildDateTime(
      date,
      sorted[sorted.length - 1].endTime,
      true,
      shift as ShiftType,
    );

    setSaving(true);
    try {
      await UpdateScheduling(id, { collaboratorId, start, end });
      alert("Agendamento atualizado com sucesso!");
      router.push("/admin/scheduling");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar agendamento");
    } finally {
      setSaving(false);
    }
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
      <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Atualizar Turno
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Colaborador
            </label>
            <select
              value={collaboratorId}
              onChange={(e) => setCollaboratorId(Number(e.target.value))}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value={0}>Seleccione o colaborador</option>
              {filteredCollaborators.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Nova Data
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Turno
            </label>
            <select
              value={shift}
              onChange={(e) => handleShiftChange(e.target.value as ShiftType)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="">Seleccione o turno</option>
              {SHIFTS.map((s) => (
                <option key={s} value={s}>
                  {SHIFT_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          {shift && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Horário
                </label>
                <button
                  type="button"
                  onClick={toggleFullShift}
                  className={`text-xs px-3 py-1 rounded border cursor-pointer transition-all
                    ${
                      isFull
                        ? "bg-blue-600 text-white border-blue-700"
                        : "border-blue-400 text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  {isFull ? "8h completo" : "+ 8h completo"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-lg p-3">
                {blocks.map((block) => {
                  const isSelected = selectedBlocks.some(
                    (b) => b.startTime === block.startTime,
                  );
                  return (
                    <button
                      key={block.startTime}
                      type="button"
                      onClick={() => toggleBlock(block)}
                      className={`text-xs p-2 rounded border cursor-pointer transition-all
                        ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-700 font-bold"
                            : "border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                        }`}
                    >
                      {block.startTime} - {block.endTime}
                    </button>
                  );
                })}
              </div>

              {selectedBlocks.length > 0 && (
                <p className="text-xs text-gray-500 text-right">
                  {isFull
                    ? "Turno completo (8h)"
                    : `${selectedBlocks.length} bloco${selectedBlocks.length > 1 ? "s" : ""} (${totalHours}h)`}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={saving || selectedBlocks.length === 0}
            className="mt-2 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? "Guardando..." : "Atualizar Turno"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/scheduling")}
            className="text-red-500 text-sm text-center hover:text-red-700 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
