"use client";

import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { ToleranceType } from "../../types";
import { getIslands, Island } from "@/app/services/islands/islandService";
import {
  getMunicipalities,
  Municipality,
} from "@/app/services/municipality/municipalityService";
import { getTolerancePointById } from "@/app/services/tolerancesPoint/getTolerancePointById";
import {
  updateTolerancePoint,
  UpdateTolerancePointPayload,
} from "@/app/services/tolerancesPoint/upadateTolerancePoint";

export default function EditTolerancePointPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState<ToleranceType>("NACIONAL");
  const [islands, setIslands] = useState<Island[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [selectedIslandId, setSelectedIslandId] = useState<number | "">("");
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<
    number | ""
  >("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTolerancePointById(id);
        setName(data.name);
        setDate(data.date.split("T")[0]);
        setStartTime(data.startTime.substring(0, 5));
        setEndTime(data.endTime.substring(0, 5));
        setType(data.type);
        if (data.islandId) setSelectedIslandId(data.islandId);
        if (data.municipalityId) setSelectedMunicipalityId(data.municipalityId);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    async function load() {
      if (type === "NACIONAL") {
        setIslands([]);
        setMunicipalities([]);
        return;
      }
      const data = await getIslands();
      setIslands(data);
    }
    load();
  }, [type]);

  useEffect(() => {
    async function load() {
      if (type !== "MUNICIPALITY" || selectedIslandId === "") {
        setMunicipalities([]);
        return;
      }
      const data = await getMunicipalities(Number(selectedIslandId));
      setMunicipalities(data);
    }
    load();
  }, [selectedIslandId, type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: UpdateTolerancePointPayload = {
      id,
      name,
      date,
      startTime: startTime + ":00",
      endTime: endTime + ":00",
      type,
      islandId:
        type === "ISLAND" || type === "MUNICIPALITY"
          ? Number(selectedIslandId)
          : null,
      municipalityId:
        type === "MUNICIPALITY" ? Number(selectedMunicipalityId) : null,
    };
    setSaving(true);
    try {
      await updateTolerancePoint(payload);
      alert("Tolerancia de Ponto atualizada com sucesso!");
      router.push("/admin/tolerancePoint");
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar tolerancia de ponto");
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
      <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black  border border-white/20 p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Editar Tolerancia de Ponto
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
        >
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Nova Data da Tolerancia
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              nova hora do inicio da tolerancia
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Nova hora fim Tolerancia
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Nova(Tipo: nacional/ ilha/ municipal)
            </label>

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as ToleranceType);
                setSelectedIslandId("");
                setSelectedMunicipalityId("");
              }}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="NACIONAL">Nacional</option>
              <option value="ISLAND">Ilha</option>
              <option value="MUNICIPALITY">Município</option>
            </select>
          </div>

          {(type === "ISLAND" || type === "MUNICIPALITY") && (
            <select
              value={selectedIslandId}
              onChange={(e) => setSelectedIslandId(Number(e.target.value))}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="">Selecione a Ilha</option>
              {islands.map((island) => (
                <option key={island.id} value={island.id}>
                  {island.name}
                </option>
              ))}
            </select>
          )}

          {type === "MUNICIPALITY" && selectedIslandId !== "" && (
            <select
              value={selectedMunicipalityId}
              onChange={(e) =>
                setSelectedMunicipalityId(Number(e.target.value))
              }
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="">Selecione o Município</option>
              {municipalities.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? "Guardando..." : "Atualizar Tolerância de Ponto"}
          </button>
        </form>
      </div>
    </div>
  );
}
