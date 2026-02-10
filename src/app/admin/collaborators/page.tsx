"use client";
import { getAllCollaborator } from "@/app/services/collaborators/getAllCollaboratorService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CollaboratorTable from "./components/collaboratorTable";

export interface Collaborator {
  id: number;
  name: string;
  email: string;
  contact: string;
  nif: string;
  municipality: string;
  island: string;
  category: string;
}

export default function CollaboratorsPage() {
  const router = useRouter();

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  (useEffect(() => {
    async function load() {
      try {
        const data = await getAllCollaborator();
        setCollaborators(data);
      } catch (err) {
        setError("Erro ao carregar colaboradores.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }),
    []);

  const removeCollaborator = (id: number) => {
    setCollaborators((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) {
    return <p> Carregando </p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-white text-xl">Colaboradores</h1>

        <button
          onClick={() => router.push("/admin/collaborators/createCollaborator")}
          className="cursor-pointer text-green-400 font-bold transition-all duration-200 hover:scale-110  hover:text-green-500"
        >
          Criar Colaborador
        </button>
      </div>
      <CollaboratorTable
        collaborators={collaborators}
        onDelete={removeCollaborator}
      />
    </div>
  );
}
