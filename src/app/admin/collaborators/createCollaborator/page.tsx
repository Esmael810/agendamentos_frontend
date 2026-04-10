"use client";

import {
  Category,
  getCategories,
} from "@/app/services/category/categoryService";
import {
  createCollaborator,
  CreateCollaboratorPayload,
} from "@/app/services/collaborators/postCollaboratorService";
import { getIslands, Island } from "@/app/services/islands/islandService";
import {
  getMunicipalities,
  Municipality,
} from "@/app/services/municipality/municipalityService";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreateCollaboratorPage() {
  const router = useRouter();

 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("(+238) ");
  const [nif, setNif] = useState("");
  const [identificationCode, setIdentificationCode] = useState("");

  const [islandId, setIslandId] = useState<number | "">("");
  const [municipalityId, setMunicipalityId] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [islands, setIslands] = useState<Island[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [islandsData, categoriesData] = await Promise.all([
          getIslands(),
          getCategories(),
        ]);
        setIslands(islandsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error( "Erro ao carregar ilhas e categorias:", err);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadMunicipalities() {
      if (islandId === "") {
        setMunicipalities([]);
        setMunicipalityId("");
        return;
      }
      try {
        const data = await getMunicipalities(Number(islandId));
        setMunicipalities(data);
        setMunicipalityId(""); 
      } catch (err) {
        console.error("Erro ao buscar municípios:", err);
        setMunicipalities([]);
        setMunicipalityId("");
      }
    }

    loadMunicipalities();
  }, [islandId]);

  const submitting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      if (!name) return alert("O campo Nome é obrigatório");
      if (!email) return alert("O campo Email é obrigatório");
      if (!contact) return alert("O campo Contato é obrigatório");
      if (!nif) return alert("O campo NIF é obrigatório");
      if (islandId === "") return alert("Selecione uma Ilha");
      if (municipalityId === "") return alert("Selecione um Município");
      if (categoryId === "") return alert("Selecione uma Categoria");
      if (!identificationCode)
        return alert("Preencha o Código de Identificação");

      const payload: CreateCollaboratorPayload = {
        name,
        email,
        contact,
        nif,
        islandId: Number(islandId),
        municipalityId: Number(municipalityId),
        categoryId: Number(categoryId),
        identificationCode,
      };

      //console.log("Payload enviado:", payload);

      await createCollaborator(payload);
      alert("Colaborador Criado com Sucesso");
      router.push("/admin/collaborators");
    } catch (err: any) {
      alert( err.message || "Falha ao criar colaborador");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-8">
      <h1 className="text-xl font-bold mb-4 text-black">Criar Colaborador</h1>
      <form onSubmit={submitting} className="flex flex-col gap-3 text-gray-800">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded text-[12px] placeholder:text-[10px]"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-[12px] placeholder:text-[10px]"
        />
        <input
          type="text"
          placeholder="Contato"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border p-2 rounded text-[12px] placeholder:text-[10px]"
        />
        <input
          type="text"
          placeholder="NIF"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
          className="border p-2 rounded text-[12px] placeholder:text-[10px]"
        />

        <select
          value={islandId}
          onChange={(e) =>
            setIslandId(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border p-2 rounded text-[12px]"
        >
          <option value="">Selecione a Ilha</option>
          {islands.map((island) => (
            <option key={island.id} value={island.id}>
              {island.name}
            </option>
          ))}
        </select>

        <select
          value={municipalityId}
          onChange={(e) =>
            setMunicipalityId(
              e.target.value === "" ? "" : Number(e.target.value),
            )
          }
          className="border p-2 rounded text-[12px]"
          disabled={municipalities.length === 0}
        >
          <option value="">Selecione o Município</option>
          {municipalities.map((mun) => (
            <option key={mun.id} value={mun.id}>
              {mun.name}
            </option>
          ))}
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border p-2 rounded text-[12px]"
        >
          <option value="">Selecione a Categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Código de Identificação(8 caracteres)"
          value={identificationCode}
          onChange={(e) => setIdentificationCode(e.target.value)}
          className="border p-2 rounded text-[12px] placeholder:text-[12px]"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? "Guardando..." : "Criar Colaborador"}
        </button>
      </form>
    </div>
  );
}
