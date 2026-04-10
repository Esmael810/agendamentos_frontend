import { Category } from "@/app/services/category/categoryService";

import { format } from "date-fns";
import { CategoryStatus } from "../calendarTypes";

interface CalendarCellProps {
  dayNumber: string;
  date: Date;
  categories: Category[];
  activeSelection: { date: Date; categoryId: number } | null;
  onCategoryClick: (categoryId: number, date: Date) => void;
  calendarStatus: Record<string, Record<number, CategoryStatus>>;
}

const STATUS_TEXT_COLOR: Record<CategoryStatus, string> = {
  [CategoryStatus.Occupied]: "text-red-500",
  [CategoryStatus.Limited]: "text-blue-500",
  [CategoryStatus.Vacant]: "text-black",
  [CategoryStatus.Disabled]: "text-gray-400",
};

export function CalendarCell({
  dayNumber,
  date,
  categories,
  activeSelection,
  onCategoryClick,
  calendarStatus,
}: CalendarCellProps) {
  const dateKey = format(date, "yyyy-MM-dd");

  const statusForDate = calendarStatus[dateKey];
  if (statusForDate && Object.keys(statusForDate).length > 0) {
    //console.log(` ${dateKey} tem status:`, statusForDate);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-right p-1 font-bold text-sm text-gray-700 ">
        {dayNumber}
      </div>

      <div className="flex flex-col gap-1 px-1">
        {categories.map((cat) => {
          const isActive =
            activeSelection?.categoryId === cat.id &&
            format(activeSelection.date, "yyyy-MM-dd") ===
              format(date, "yyyy-MM-dd");

          const status =
            calendarStatus[dateKey]?.[cat.id] ?? CategoryStatus.Vacant;
          const isBlocked =
            status === CategoryStatus.Occupied ||
            status === CategoryStatus.Disabled;

          const colorClass = STATUS_TEXT_COLOR[status];

          /* console.log(
            ` ${dateKey} | Cat ${cat.id} (${cat.name}): ${CategoryStatus[status]}  ${colorClass}`
          );*/

          return (
            <div key={cat.id} className="flex justify-between">
              <span
                onClick={() => {
                  if (isBlocked) {
                    // console.log(` Categoria ${cat.id} bloqueada`);
                    return;
                  }

                  onCategoryClick(cat.id, date);
                }}
                className={`
                text-[10px] px-2 py-1 rounded transition-all duration-200
                ${colorClass}
               ${isBlocked ? " opacity-70" : "cursor-pointer hover:scale-105"}
                ${isActive ? "bg-blue-200 underline" : ""}
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
