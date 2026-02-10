"use client";
import { updateCategory } from "@/app/services/category/updateCategory";
import { useState } from "react";


interface Props {
  categories: any[];
  onSuccess: () => void;
}

export default function UpdateCategory({ categories, onSuccess }: Props) {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState("");

  async function handleUpdate() {
    if (!id || !name.trim()) {
      alert("Selecione e informe o novo nome");
      return;
    }

    await updateCategory(id, name);
    setName("");
    setId(null);
    onSuccess();
  }

  return (
    <div>
      <h2 className="font-bold mb-3 text-black">Atualizar Categoria</h2>

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

      <input
        className="w-full border p-2 rounded mb-3 text-black"
        placeholder="Novo nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-110 cursor-pointer hover:bg-blue-600 transition duration-200"
        >
        
          Atualizar
        </button>
      </div>
    </div>
  );
}
