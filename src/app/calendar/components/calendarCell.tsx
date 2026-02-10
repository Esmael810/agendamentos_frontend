import { Category } from "@/app/services/category/categoryService";
import { Categorias_Fic } from "@/constantsFic/categorias";
import { format } from "date-fns";


interface CalendarCellProps {
  dayNumber: string;
  date: Date;
  categories: Category[];
  activeSelection: { date: Date; categoryId: number } | null;
  onCategoryClick: (categoryId: number, date: Date) => void;
}

export function CalendarCell({
  dayNumber,
  date,
  categories,
  activeSelection,
  onCategoryClick,
}: CalendarCellProps) {
  
  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-right p-1 font-bold text-sm text-gray-700 ">
        {dayNumber}
      </div>

      <div className="flex flex-col gap-1 px-1">
        {categories.map((cat) => {
          const isActive = activeSelection?.categoryId === cat.id && format(activeSelection.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");; 

          return (
            <div key={cat.id} className="flex justify-between">
              <span
                onClick={() => {
                
                  onCategoryClick(cat.id, date);
                }}
                className={` text-[10px] cursor-pointer
                px-2 py-1 rounded  transition-all duration-200
               
                ${
                  isActive
                    ? "text-blue-500  scale-105"
                    : "text-gray-800 hover:bg-blue-300 hover:scale-105"
                }
              `}
              >
                {cat.name}
              </span>
              {/* <span className="text-[10px] font-bold text-gray-400">(0)</span> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
