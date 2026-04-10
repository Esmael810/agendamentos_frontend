"use client";

export interface CategoryGroupBase {
  categoryId: number;
  categoryName: string;
  items: { status: string }[];
}

interface CategoryTabsProps {
  categories: CategoryGroupBase[];
  activeId: number | null;
  onSelect: (id: number) => void;
}

export default function CategoryTabs({
  categories,
  activeId,
  onSelect,
}: CategoryTabsProps) {
  if (categories.length === 0) return null;

  return (
    
    <div className="grid grid-cols-4 gap-4 border-b border-gray-200 mb-5">
      {categories.map((cat) => {
        const isActive = cat.categoryId === activeId;

        return (
          <button
            key={cat.categoryId}
            onClick={() => onSelect(cat.categoryId)}
            className={`

              relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer

             ${
               isActive
                 ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 scale-105"
                 : "bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105"
             }
           `}
          >
            {cat.categoryName}
          </button>
        );
      })}
    </div>
  );
}
