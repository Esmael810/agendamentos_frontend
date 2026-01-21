"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarCell } from "./calendarCell";
import "./Calendar.css";
import { useState } from "react";
import { ShiftType, TimeBlock } from "../shiftTypes";
import ShiftMenu from "./ShiftMenu";
import TimeBlockModal from "./TimeBlockModal";
import { format } from "date-fns";
import { saveAvailabilities } from "@/app/services/availabilities/availabilityService";

export default function CalendarView() {
  const [activeSelection, setActiveSelection] = useState<{
    date: Date;
    categoryId: number;
    shift?: ShiftType;
    blocks: TimeBlock[];
  } | null>(null);

  function clickOnCategory(categoryId: number, date: Date) {
    if (activeSelection && activeSelection.blocks.length > 0) {
      alert(
        "Cancelar ou Guardar as seleções atuais para poder selecionar outras."
      );
      return;
    }
    setActiveSelection({
      date,
      categoryId,
      blocks: [],
    });
  }

  async function save() {
    if (!activeSelection) {
      return;
    }

    try {
      // depois tem que panha colaborador na auth
      await saveAvailabilities(2, activeSelection.date, activeSelection.blocks);
      alert("Disponibilidades guardadas com sucesso!");
      setActiveSelection(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao guardar disponibilidades");
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow  ">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="pt-pt"
        dayCellContent={(args) => (
          <CalendarCell
            dayNumber={args.dayNumberText}
            date={args.date}
            activeSelection={activeSelection}
            onCategoryClick={clickOnCategory}
          />
        )}
      />

      {activeSelection && !activeSelection.shift && (
        <ShiftMenu
          date={activeSelection.date}
          onSelect={(date, shift) =>
            setActiveSelection({
              ...activeSelection,
              shift,
            })
          }
          onClose={() => setActiveSelection(null)}
        />
      )}

      {activeSelection?.shift && (
        <TimeBlockModal
          selection={{
            date: format(activeSelection.date, "yyyy-MM-dd"),
            shift: activeSelection.shift,
            blocks: activeSelection.blocks,
          }}
          onChangeBlocks={(blocks) =>
            setActiveSelection({
              ...activeSelection,
              blocks,
            })
          }
          onSave={save}
          onClose={() => setActiveSelection(null)}
        />
      )}
    </div>
  );
}
