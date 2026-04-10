"use client";

import { useEffect, useState } from "react";
import CalendarView from "./components/CalendarView";
import { useSession } from "next-auth/react";
import CollaboratorSummary from "./components/CollaboratorSummary";
import { getSummary } from "../services/collaborators/getSummary";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        if (session?.user?.id) {
          const data = await getSummary(session.user.id);
          setSummary(data);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session]);
  return (
    <div className="flex h-[890px] p-6">
      <div className="w-[300px] ml-10 mt-19">
        <button
          onClick={() => router.push("/calendar/availabilitiesByCollaborator")}
          className="mb-4 w-full bg-white/95 text-blue-600 font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-900/30 border border-white/20 hover:bg-white transition-colors cursor-pointer text-sm"
        >
          Minhas Disponibilidades
        </button>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-blue-200 text-sm animate-pulse">
              Carregando resumo...
            </div>
          </div>
        ) : summary ? (
          <CollaboratorSummary summary={summary} />
        ) : null}
      </div>

      <div className=" w-[990px] p-4 ml-auto">
        <h1 className=" text-2xl font-bold mb-6 text-black text-center">
          Gestão de Disponibilidades
        </h1>
        <CalendarView />
      </div>
    </div>
  );
}
