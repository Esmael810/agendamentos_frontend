"use client";
import { getAvailabilities } from "@/app/services/availabilities/getAvailabilities";
import { useEffect, useState } from "react";
import AvailabilityTable from "./components/AvailabilityTable";
import { Availability, CategoryGroup } from "./types";
import CategoryTabs from "../components/shared/CategoryTabs";
import PainelCards from "../components/shared/PainelCards";

function groupByCategory(data: Availability[]): CategoryGroup[] {
  const map = new Map<number, CategoryGroup>();

  for (const item of data) {
    if (!map.has(item.categoryId)) {
      map.set(item.categoryId, {
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        availabilities: [],
      });
    }
    map.get(item.categoryId)!.availabilities.push(item);
  }
  return Array.from(map.values());
}

export default function AdminAvailabilitiesPage() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getAvailabilities();

        const pendentes = all.filter(
          (item: Availability) => item.status === "PENDENTE",
        );
        const grouped = groupByCategory(pendentes);
        setCategories(grouped);

        if (grouped.length > 0) {
          setActiveCategoryId(grouped[0].categoryId);
        }
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
        availabilities: cat.availabilities.filter((a) => a.id !== id),
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
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border-white/20">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h1 className="text-center text-xl font-bold text-gray-800">
            Disponibilidades Pendentes
          </h1>
        </div>

        <div className="px-6 pt-4">
          {categories.length === 0 ? (
            <p className="text-gray-400 text-sm py-4 text-center">
              Nenhuma disponibilidade pendente.
            </p>
          ) : (
            <CategoryTabs
              categories={categories.map((c) => ({
                categoryId: c.categoryId,
                categoryName: c.categoryName,
                items: c.availabilities,
              }))}
              activeId={activeCategoryId}
              onSelect={setActiveCategoryId}
            />
          )}
        </div>
        <div className="px-6 pb-6">
          {activeCategory && (
            <AvailabilityTable
              data={activeCategory.availabilities}
              onRemove={handleRemove}
            />
          )}
        </div>
      </div>
      <PainelCards
        title="Painel de Disponibilidades Pendentes"
        categories={categories.map((c) => ({
          categoryId: c.categoryId,
          categoryName: c.categoryName,
          count: c.availabilities.length,
        }))}
        buttonLabel="Ver Disponibilidades"
        onSelectCategory={handleCardClick}
      />
    </div>
  );
}
