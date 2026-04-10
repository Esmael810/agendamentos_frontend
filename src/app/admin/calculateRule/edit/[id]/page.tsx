"use client";
import { getCalculateRuleById } from "@/app/services/calculateRules/getCalculateRuleById";
import {
  updateCalculateRule,
  UpdateCalculateRulePayload,
} from "@/app/services/calculateRules/updateCalculateRule";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fields = [
  { key: "dailyBaseValue", label: "Valor Base Diário (CVE)" },
  { key: "dayBaseTime", label: "Tempo Base Diurno (%)" },
  { key: "nightlyBaseBonus", label: "Bónus Noturno (%)" },
  { key: "holidayBaseBonus", label: "Bónus Feriado (%)" },
  { key: "baseBonusHolidayNight", label: "Bónus Feriado Noturno (%)" },
  { key: "toleranceBaseBonus", label: "Bónus Tolerância de Ponto (%)" },
] as const;

type FieldKey = (typeof fields)[number]["key"];
type FormValues = Record<FieldKey, string>;

export default function EditCalculateRulePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [form, setForm] = useState<FormValues>({
    dailyBaseValue: "",
    dayBaseTime: "",
    nightlyBaseBonus: "",
    holidayBaseBonus: "",
    baseBonusHolidayNight: "",
    toleranceBaseBonus: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCalculateRuleById(id);
        setCategoryName(data.categoryName);
        setCategoryId(data.categoryId);
        setForm({
          dailyBaseValue: String(data.dailyBaseValue ?? ""),
          dayBaseTime: String(data.dayBaseTime ?? ""),
          nightlyBaseBonus: String(data.nightlyBaseBonus ?? ""),
          holidayBaseBonus: String(data.holidayBaseBonus ?? ""),
          baseBonusHolidayNight: String(data.baseBonusHolidayNight ?? ""),
          toleranceBaseBonus: String(data.toleranceBaseBonus ?? ""),
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: UpdateCalculateRulePayload = {
      id,
      categoryId,
      dailyBaseValue: parseFloat(form.dailyBaseValue) || 0,
      dayBaseTime: parseFloat(form.dayBaseTime) || 0,
      nightlyBaseBonus: parseFloat(form.nightlyBaseBonus) || 0,
      holidayBaseBonus: parseFloat(form.holidayBaseBonus) || 0,
      baseBonusHolidayNight: parseFloat(form.baseBonusHolidayNight) || 0,
      toleranceBaseBonus: parseFloat(form.toleranceBaseBonus) || 0,
    };

    setSaving(true);
    try {
      await updateCalculateRule(payload);
      alert("Regra de cálculo atualizada com sucesso!");
      router.push("/admin/calculateRule");
    } catch (err: any) {
      alert("Erro ao atualizar regra de cálculo");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-200 text-sm animate-pulse">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-1 text-center">
          Editar Regra de Remuneracao
        </h1>
        <p className="text-center text-gray-400 text-sm mb-6">{categoryName}</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
        >
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-500">
                {field.label}
              </label>
              <input
                type="number"
                min={0}
                step="1"
                value={form[field.key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60  cursor-pointer"
          >
            {saving ? "Guardando..." : "Atualizar Regra de Cálculo"}
          </button>
        </form>
      </div>
    </div>
  );
}
