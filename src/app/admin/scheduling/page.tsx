"use client";

import { useEffect, useState } from "react";
import SchedulingTable from "./components/SchedulingsTable";
import { getSchedulings } from "@/app/services/schedulings/getSchedulings";
import { groupSchedulingByCategory, SchedulingCategoryGroup } from "./type";
import CategoryTabs from "../components/shared/CategoryTabs";
import PainelCards from "../components/shared/PainelCards";

export default function AdminSchedulingsPage() {
  const [categories, setCategories] = useState<SchedulingCategoryGroup[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getSchedulings();
        const confirmados = all.filter(
          (item: any) => item.status === "CONFIRMADO",
        );
        const groupe = groupSchedulingByCategory(confirmados);

        setCategories(groupe);
        if (groupe.length > 0) setActiveCategoryId(groupe[0].categoryId);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleRemove(id: number) {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        scheduling: cat.scheduling.filter((s) => s.id !== id),
      })),
    );
  }

  function handleCardClick(categoryId: number) {
    setActiveCategoryId(categoryId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-200 text-sm animate-pulse">Carregando...</div>
      </div>
    );
  }

  const activeCategory = categories.find(
    (c) => c.categoryId === activeCategoryId,
  );

  const painelData = categories.map((cat) => ({
    categoryId: cat.categoryId,
    categoryName: cat.categoryName,
    count: cat.scheduling.length,
  }));

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20 overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h1 className="text-center text-xl font-bold text-gray-800">
            Turnos Confirmados
          </h1>
        </div>

        <div>
          {categories.length === 0 ? (
            <p className="text-gray-400 text-sm py-4 text-center">
              Nenhum turno confirmado
            </p>
          ) : (
            <CategoryTabs
              categories={categories.map((c) => ({
                categoryId: c.categoryId,
                categoryName: c.categoryName,
                items: c.scheduling,
              }))}
              activeId={activeCategoryId}
              onSelect={setActiveCategoryId}
            />
          )}
        </div>
        <div className="px-6 pb-6">
          {activeCategory && (
            <SchedulingTable
              data={activeCategory.scheduling}
              onRemove={handleRemove}
            />
          )}
        </div>
      </div>
      <PainelCards
        title="Painel de Turnos Confirmados"
        categories={painelData}
        buttonLabel="Ver Turnos"
        onSelectCategory={handleCardClick}
      />
    </div>
  );
}
