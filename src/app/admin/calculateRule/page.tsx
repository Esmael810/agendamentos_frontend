"use client";

import { getCalculateRules } from "@/app/services/calculateRules/getCalculateRules";
import { useEffect, useState } from "react";
import { CalculateRule } from "./types";
import CalculateRulesTable from "./components/CalculateRuleTable";
import { useRouter } from "next/navigation";

export default function CalculateRulesPage() {
  const router = useRouter();
  const [rules, setRules] = useState<CalculateRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCalculateRules();
        setRules(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-200 text-sm animate-pulse">Carregando...</div>
      </div>
    );
  }
  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-white text-xl">
          Remunerações por Categorias
        </h1>

        <button
          onClick={() =>
            router.push("/admin/calculateRule/createCalculateRule")
          }
          className="cursor-pointer text-green-400 font-bold transition-all duration-200 hover:scale-110 hover:text-green-500"
        >
          Criar Regra de Remunerações
        </button>
      </div>
      <CalculateRulesTable
        rules={rules}
        onEdit={(id) => router.push(`/admin/calculateRule/edit/${id}`)}
      />
    </div>
  );
}
