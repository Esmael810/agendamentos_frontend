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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllCollaborator();
        setCollaborators(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].category);
        }
      } catch (err) {
        setError("Erro ao carregar colaboradores.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const removeCollaborator = (id: number) => {
    setCollaborators((prev) => prev.filter((c) => c.id !== id));
  };

  const categories = [...new Set(collaborators.map((c) => c.category))];

  const filtered = collaborators.filter((c) => c.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-200 text-sm animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-white text-xl">Colaboradores</h1>
        <button
          onClick={() => router.push("/admin/collaborators/createCollaborator")}
          className="cursor-pointer text-green-400 font-bold transition-all duration-200 hover:scale-110 hover:text-green-500"
        >
          Criar Colaborador
        </button>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20 p-6 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 scale-105"
                : "bg-white/90 text-gray-700 hover:bg-white hover:scale-105"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      </div>

      <CollaboratorTable
        collaborators={filtered}
        onDelete={removeCollaborator}
      />
    </div>
  );
}
