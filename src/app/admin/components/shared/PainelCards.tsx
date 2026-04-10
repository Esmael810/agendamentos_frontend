"use client";

import { CategoryGroup } from "../../availabilities/types";

const CATEGORY_COLORS = [
  {
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    light: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    bg: "bg-teal-600",
    hover: "hover:bg-teal-700",
    light: "bg-teal-50",
    text: "text-teal-600",
  },
  {
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
    light: "bg-green-50",
    text: "text-green-600",
  },
  {
    bg: "bg-orange-500",
    hover: "hover:bg-orange-600",
    light: "bg-orange-50",
    text: "text-orange-500",
  },
  {
    bg: "bg-purple-600",
    hover: "hover:bg-purple-700",
    light: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    bg: "bg-cyan-600",
    hover: "hover:bg-cyan-700",
    light: "bg-cyan-50",
    text: "text-cyan-600",
  },
  {
    bg: "bg-rose-600",
    hover: "hover:bg-rose-700",
    light: "bg-rose-50",
    text: "text-rose-600",
  },
  {
    bg: "bg-rose-600",
    hover: "hover:bg-rose-700",
    light: "bg-rose-50",
    text: "text-rose-600",
  },
];

interface PainelCategory {
  categoryId: number;
  categoryName: string;
  count: number;
}

interface PainelCardsProps {
  title: string
  categories: PainelCategory[];
  buttonLabel? : string;
  onSelectCategory: (categoryId: number) => void;
}

export default function PainelCards({
  title,
  categories,
  buttonLabel = "Ver Detalhes",
  onSelectCategory,
}: PainelCardsProps) {
  if (categories.length === 0) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20 p-6 mt-6">
      <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => {
          const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
          
          return (
            <div
              key={cat.categoryId}
              className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className={`${color.bg} px-5 py-6 text-white text-center grow flex flex-col justify-between min-h-30`}>
                <p className="font-bold text-base leading-tight mb-2 line-clamp-2 min-h-10 flex items-center justify-center">{cat.categoryName}</p>
                <hr className="border-white/30 mb-3" />
                <p className="text-3xl font-extrabold leading-none">
                  {cat.count}
                  <span className="text-base font-normal ml-2">
                    {cat.count === 1 ? "Pendente" : "Pendentes"}
                  </span>
                </p>
              </div>

              <div className="bg-white px-4 py-3 text-center mt-auto">
                <button
                  onClick={() => onSelectCategory(cat.categoryId)}
                  className="w-full border border-gray-200 rounded-md py-1.5 text-sm text-gray-600 font-bold hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  {buttonLabel}
                  <span className="text-gray-400">›</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
