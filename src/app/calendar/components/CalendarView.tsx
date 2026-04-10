"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarCell } from "./calendarCell";
import "./Calendar.css";
import { useEffect, useRef, useState } from "react";
import { ShiftType, TimeBlock } from "../shiftTypes";
//import ShiftMenu from "./ShiftMenu";
import TimeBlockModal from "./TimeBlockModal";
import { format } from "date-fns";
import { saveAvailabilities } from "@/app/services/availabilities/availabilityService";
import { useSession } from "next-auth/react";
import {
  Category,
  getCategories,
} from "@/app/services/category/categoryService";
import { CalendarStatusMap, CategoryStatus } from "../calendarTypes";
import { getCategoryStatusByDate } from "@/app/services/category/categoryStatus";

export default function CalendarView() {
  const { data: session, status: authStatus } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);

  //const [calendarVersion, setCalendarVersion] = useState(0);
  const calendarStatusRef = useRef<CalendarStatusMap>({});
  const loadingDatesRef = useRef<Set<string>>(new Set());

  const [calendarStatus, setCalendarStatus] = useState<CalendarStatusMap>({});
  const [activeSelection, setActiveSelection] = useState<{
    date: Date;
    categoryId: number;
   // shift?: ShiftType;
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

  async function statusForDate(date: Date) {
    const dateKey = format(date, "yyyy-MM-dd");

    if (
      calendarStatusRef.current[dateKey] ||
      loadingDatesRef.current.has(dateKey)
    ) {
      //  console.log(" Status já existe para", dateKey);
      return;
    }
    //console.log("Carregando status para", dateKey);
    loadingDatesRef.current.add(dateKey);

    try {
      const result = await getCategoryStatusByDate(dateKey);
      //console.log("Resposta do backend:", result);
      const mapStatus: Record<number, CategoryStatus> = {};

      result.forEach((item) => {
        mapStatus[item.categoryId] = item.status as CategoryStatus;
      });

      calendarStatusRef.current = {
        ...calendarStatusRef.current,
        [dateKey]: mapStatus,
      };

      setCalendarStatus({ ...calendarStatusRef.current });
     // setCalendarVersion((v) => v + 1);
    } catch (err) {
      console.error("Erro ao carregar status", dateKey, err);
    } finally {
      loadingDatesRef.current.delete(dateKey);
    }
  }

  function handleDatesSet(dateInfo: any) {
    const current = new Date(dateInfo.start);
    while (current <= new Date(dateInfo.end)) {
      statusForDate(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

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

      const dateKey = format(activeSelection.date, "yyyy-MM-dd");
      delete calendarStatusRef.current[dateKey];
      await statusForDate(activeSelection.date);

      setActiveSelection(null);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao guardar disponibilidades",
      );
    }
  }
  //console.log("Estado atual do calendarStatus:", calendarStatus);

  return (
    <div className=" relative p-4 bg-white rounded-lg shadow  ">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="pt-pt"
        datesSet={handleDatesSet}
        dayCellContent={(args) => (
          <CalendarCell
            dayNumber={args.dayNumberText}
            date={args.date}
            categories={categories}
            activeSelection={activeSelection}
            onCategoryClick={clickOnCategory}
            calendarStatus={calendarStatus}
          />
        )}
      />

      {/*{activeSelection && activeSelection.blocks.length == 0 && (
        <ShiftMenu
          date={activeSelection.date}
          onSelect={(date) =>
            setActiveSelection({
              ...activeSelection,
              date,
            })
          }
          onClose={() => setActiveSelection(null)}
        />
      )}8*/}

       {activeSelection && (
        <TimeBlockModal
          selection={{
            date:   format(activeSelection.date, "yyyy-MM-dd"),
            blocks: activeSelection.blocks,
          }}
          onChangeBlocks={(blocks) =>
            setActiveSelection({ ...activeSelection, blocks })
          }
          onSave={save}
          onClose={() => setActiveSelection(null)}
        />
      )}
    </div>
  );
}
