"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarCell } from "./calendarCell";
import "./Calendar.css";
import { useEffect, useState } from "react";
import { ShiftType, TimeBlock } from "../shiftTypes";
import ShiftMenu from "./ShiftMenu";
import TimeBlockModal from "./TimeBlockModal";
import { format } from "date-fns";
import { saveAvailabilities } from "@/app/services/availabilities/availabilityService";
import { useSession } from "next-auth/react";
import {
  Category,
  getCategories,
} from "@/app/services/category/categoryService";

export default function CalendarView() {
  const { data: session, status: authStatus } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSelection, setActiveSelection] = useState<{
    date: Date;
    categoryId: number;
    shift?: ShiftType;
    blocks: TimeBlock[];
  } | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erro ao carregar categorias", err);
      }
    }
    loadCategories();
  }, []);

  if (authStatus === "loading") {
    return <p>A carregar sessão...</p>;
  }

  if (!session) {
    return <p>Não autenticado</p>;
  }

  // console.log("Sessão do usuário:", session.user);
  // console.log("ID do colaborador:", session.user.id);
  const collaboratorId = session.user.id;

  function clickOnCategory(categoryId: number, date: Date) {
    if (activeSelection && activeSelection.blocks.length > 0) {
      alert(
        "Cancelar ou Guardar as seleções atuais para poder selecionar outras.",
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
    if (!activeSelection || !session) {
      return;
    }
    const collaboratorId = Number(session.user.id);

    if (Number.isNaN(collaboratorId)) {
      alert("Colaborador inválido");
      return;
    }

    try {
      await saveAvailabilities(
        collaboratorId,
        activeSelection.date,
        activeSelection.blocks,
      );
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
            categories={categories}
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
