"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToleranceType } from "../types";
import { getIslands, Island } from "@/app/services/islands/islandService";
import {
  getMunicipalities,
  Municipality,
} from "@/app/services/municipality/municipalityService";
import {
  createTolerancePoint,
  CreateTolerancePointPayload,
} from "@/app/services/tolerancesPoint/postTorencePoint";

export default function CreateTolerancePointPage() {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);
  const [loadingIslands, setLoadingIslands] = useState(false);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  useEffect(() => {
    async function load() {
      if (type === "NACIONAL") {
        setIslands([]);
        setMunicipalities([]);
        setSelectedIslandId("");
        setSelectedMunicipalityId("");
        return;
      }
      setLoadingIslands(true);
      try {
        const data = await getIslands();
        setIslands(data);
      } finally {
        setLoadingIslands(false);
      }
    }
    load();
  }, [type]);

  useEffect(() => {
    async function load() {
      if (type !== "MUNICIPALITY" || selectedIslandId === "") {
        setMunicipalities([]);
        setSelectedMunicipalityId("");
        return;
      }
      setLoadingMunicipalities(true);
      try {
        const data = await getMunicipalities(Number(selectedIslandId));
        setMunicipalities(data);
      } finally {
        setLoadingMunicipalities(false);
      }
    }
    load();
  }, [selectedIslandId, type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !date || !startTime || !endTime)
      return alert("Preencha todos os campos obrigatorios");

    if (type === "ISLAND" && selectedIslandId === "")
      return alert("Seleciona uma ilha");

    if (type === "MUNICIPALITY" && selectedMunicipalityId === "")
      return alert("selecione um Municipio");

    const payload: CreateTolerancePointPayload = {
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
    setLoading(true);
    try {
      await createTolerancePoint(payload);
      alert("Tolerância de ponto criada com sucesso!");
      router.push("/admin/tolerancePoint");
    } catch (err: any) {
      alert(err.message || "Erro ao criar tolerância de ponto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Criar Tolerancia de Ponto
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
            className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:black placeholder:text-gray-400"
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Data da Tolerancia
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Hora Inicio
            </label>
            <input
              type="time"
              placeholder="Hora de Início"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:black"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Hora Fim
            </label>
            <input
              type="time"
              placeholder="Hora de Fim"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Tipo (Nacional/ Ilha/ Municipal)
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as ToleranceType);
                setSelectedIslandId("");
                setSelectedMunicipalityId("");
              }}
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:black"
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
              disabled={loadingIslands}
              className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:black"
            >
              <option value="">
                {loadingIslands ? "Carregando..." : "Selecione a Ilha"}
              </option>
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
              disabled={loadingMunicipalities}
              className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:black"
            >
              <option value="">
                {loadingMunicipalities
                  ? "Carregando..."
                  : "Selecione o Município"}
              </option>
              {municipalities.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Guardando..." : "Criar Tolerância de Ponto"}
          </button>
        </form>
      </div>
    </div>
  );
}
