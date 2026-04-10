"use client"
import {
  creataCalculaterule,
  CreateCalculateRulePayload,
} from "@/app/services/calculateRules/postCalculateRule";
import {
  Category,
  getCategories,
} from "@/app/services/category/categoryService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const fields = [
  { key: "dailyBaseValue", label: "Valor Base Diário (CVE)" },
  { key: "dayBaseTime", label: "Bónus Base Diurno (%)" },
  { key: "nightlyBaseBonus", label: "Bónus Noturno (%)" },
  { key: "holidayBaseBonus", label: "Bónus Feriado (%)" },
  { key: "baseBonusHolidayNight", label: "Bónus Feriado Noturno (%)" },
  { key: "toleranceBaseBonus", label: "Bónus Tolerância de Ponto (%)" },
];

type FieldKey = (typeof fields)[number]["key"];
type FormValues = Record<FieldKey, string>;

const emptyForm: FormValues = {
  dailyBaseValue: "",
  dayBaseTime: "",
  nightlyBaseBonus: "",
  holidayBaseBonus: "",
  toleranceBaseBonus: "",
};

export default function CreateCalculateRulePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories();
        setCategories(data);
      } finally {
        setLoadingCategories(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (categoryId === "") return alert("Seleciona uma categoria");

    const payload: CreateCalculateRulePayload = {
      categoryId: Number(categoryId),
      dailyBaseValue: parseFloat(form.dailyBaseValue) || 0,
      dayBaseTime: parseFloat(form.dayBaseTime) || 0,
      nightlyBaseBonus: parseFloat(form.nightlyBaseBonus) || 0,
      holidayBaseBonus: parseFloat(form.holidayBaseBonus) || 0,
      baseBonusHolidayNight: parseFloat(form.baseBonusHolidayNight) || 0,
      toleranceBaseBonus: parseFloat(form.toleranceBaseBonus) || 0,
    };

    setLoading(true);
    try {
      await creataCalculaterule(payload);
      alert("Regra de Remuneracao criada com sucesso!");
      router.push("/admin/calculateRule");
    } catch (err: any) {
      alert( "Erro ao criar regra de remuneracao");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Criar Regra de Remuneracao
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
        >
          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value === "" ? "" : Number(e.target.value))
            }
            disabled={loadingCategories}
            className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">
              {loadingCategories ? "Carregando..." : "Selecione a Categoria"}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {fields.map((field) => (
            <input
              key={field.key}
              type="number"
              min={0}
              step="1"
              placeholder={field.label}
              value={form[field.key]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className="border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Guardando..." : "Criar Regra de Cálculo"}
          </button>
        </form>
      </div>
    </div>
  );
}
