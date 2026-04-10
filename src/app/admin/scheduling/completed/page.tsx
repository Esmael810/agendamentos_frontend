"use client";
import { useEffect, useState } from "react";
import { getSchedulings } from "@/app/services/schedulings/getSchedulings";
import CompletedSchedulingsTable from "./components/CompletedSchedulinsTable";
import { groupSchedulingByCategory, Scheduling, SchedulingCategoryGroup } from "../type";
import CategoryTabs from "../../components/shared/CategoryTabs";
import PainelCards from "../../components/shared/PainelCards";


export default function AdminSchedulingsCompletedPage() {
  const [categories, setCategories] = useState<SchedulingCategoryGroup[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getSchedulings();
        const concluidos = all.filter(
          (item: Scheduling) => item.status === "CONCLUIDO",
        );
        const groupe = groupSchedulingByCategory(concluidos);

        setCategories(groupe);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h1 className="text-center text-xl font-bold text-gray-800">
            Turnos Concluídos
          </h1>
          <div className="px-6 pt-4">
            {categories.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">
                Nenhum turno concluído no momento.
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
              <CompletedSchedulingsTable data={activeCategory.scheduling} />
            )}
          </div>
        </div>
      </div>
      <PainelCards
        title="Painel de Turnos Concluídos"
        categories={painelData}
        buttonLabel="Ver Concluídos"
        onSelectCategory={handleCardClick}
      />
    </div>
  );
}
