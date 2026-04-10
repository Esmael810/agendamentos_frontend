"use client";

import {
  Category,
  getCategories,
} from "@/app/services/category/categoryService";
import { CollaboratorDTO } from "@/app/services/collaborators/getAllCollaboratorService";
import { getCollaboratorById } from "@/app/services/collaborators/getCollaboratorById";
import {
  updateCollaborator,
  UpdateCollaboratorDTO,
} from "@/app/services/collaborators/updateCollaborator";
import { getIslands, Island } from "@/app/services/islands/islandService";
import {
  getMunicipalities,
  Municipality,
} from "@/app/services/municipality/municipalityService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCollaboratorPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [nif, setNif] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [islandId, setIslandId] = useState<number | "">("");
  const [municipalityId, setMunicipalityId] = useState<number | "">("");

  const [islands, setIslands] = useState<Island[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [islandsData, categoriesData, collaboratorData] =
          await Promise.all([
            getIslands(),
            getCategories(),
            getCollaboratorById(id),
          ]);

        setIslands(islandsData);
        setCategories(categoriesData);

        setName(collaboratorData.name);
        setEmail(collaboratorData.email);
        setContact(collaboratorData.contact);
        setNif(collaboratorData.nif);
        setCategoryId(collaboratorData.categoryId);
        setIslandId(collaboratorData.islandId);
        setMunicipalityId(collaboratorData.municipalityId);

       
        if (collaboratorData.islandId) {
          const mun = await getMunicipalities(collaboratorData.islandId);
          setMunicipalities(mun);
        }
      } catch (err) {
        console.error("Erro ao carregar dados do colaborador:", err);
        alert("Erro ao carregar os dados do colaborador");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !name ||
        !email ||
        !contact ||
        !nif ||
        !categoryId ||
        !islandId ||
        !municipalityId
      ) {
        alert("Preencha todos os campos obrigatórios");
        return;
      }

      const payload: UpdateCollaboratorDTO = {
        id,
        name,
        email,
        contact,
        nif,
        categoryId: Number(categoryId),
        islandId: Number(islandId),
        municipalityId: Number(municipalityId),
      };

      await updateCollaborator(payload);
      alert("Colaborador atualizado com sucesso!");
      router.push("/admin/collaborators");
    } catch (err) {
      console.error("Erro ao atualizar colaborador:", err);
      alert("Falha ao atualizar colaborador");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="max-w-md mx-auto p-6 mt-14 bg-white rounded shadow">
      <h1 className="text-xl font-bold text-black">Editar Colaborador</h1>
      <p className="mt-4 text-white">
        ID do Colaborador: <strong>{id}</strong>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Contato"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="NIF"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={islandId}
          onChange={(e) =>
            setIslandId(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border p-2 rounded"
        >
          <option value="">Selecione a Ilha</option>
          {islands.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>

        <select
          value={municipalityId}
          onChange={(e) =>
            setMunicipalityId(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className="border p-2 rounded"
          disabled={municipalities.length === 0}
        >
          <option value="">Selecione o Município</option>
          {municipalities.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value="">Selecione a Categoria</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          {loading ? "Atualizando..." : "Atualizar Colaborador"}
        </button>
      </form>
    </div>
  );
}
