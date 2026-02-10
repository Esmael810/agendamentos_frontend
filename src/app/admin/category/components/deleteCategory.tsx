"use client";
import { deleteCategory } from "@/app/services/category/deleteCategory";
import { useState } from "react";

interface Props {
  categories: any[];
  onSuccess: () => void;
}

export default function DeleteCategory({ categories, onSuccess }: Props) {
  const [id, setId] = useState<number | null>(null);

  async function handleDelete() {
    if (!id) {
      alert("Selecione uma categoria");
      return;
    }

    if (!confirm("Deseja eliminar esta categoria?")) return;

    await deleteCategory(id);
    setId(null);
    onSuccess();
  }

  return (
    <div>
      <h2 className="font-bold mb-3 text-black">Eliminar Categoria</h2>

      <select
        className="w-full border p-2 rounded mb-3 text-black"
        onChange={(e) => setId(Number(e.target.value))}
      >
        <option value="">Selecionar categoria</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:scale-110 cursor-pointer hover:bg-red-600 transition duration-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
